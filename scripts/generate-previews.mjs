import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import {fileURLToPath} from "node:url";

import {chromium} from "playwright";
import {PNG} from "pngjs";

const PROJECT_ROOT = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	".."
);
const PUBLIC_ROOT = path.join(PROJECT_ROOT, "public");
const DEFAULT_VIEWPORT = {width: 1366, height: 768};

function log(message) {
	process.stdout.write(`${message}\n`);
}

function hexFromRgb({r, g, b}) {
	const toHex = (n) => n.toString(16).padStart(2, "0");
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function computeAverageColor(png, {sampleStride = 8} = {}) {
	const {data, width, height} = png;

	let rTotal = 0;
	let gTotal = 0;
	let bTotal = 0;
	let count = 0;

	for (let y = 0; y < height; y += sampleStride) {
		for (let x = 0; x < width; x += sampleStride) {
			const idx = (width * y + x) << 2;
			const a = data[idx + 3];
			if (a < 200) continue;

			const r = data[idx];
			const g = data[idx + 1];
			const b = data[idx + 2];

			// Skip near-white and near-black pixels to avoid biasing toward backgrounds.
			const max = Math.max(r, g, b);
			const min = Math.min(r, g, b);
			if (max > 245) continue;
			if (max < 15) continue;
			if (max - min < 6) continue; // low saturation-ish

			rTotal += r;
			gTotal += g;
			bTotal += b;
			count += 1;
		}
	}

	if (!count) {
		return {r: 34, g: 211, b: 238}; // fallback accent
	}

	return {
		r: Math.round(rTotal / count),
		g: Math.round(gTotal / count),
		b: Math.round(bTotal / count),
	};
}

async function ensureDir(filePath) {
	await fs.mkdir(path.dirname(filePath), {recursive: true});
}

async function loadProjects() {
	const projectsPath = path.join(PUBLIC_ROOT, "data", "projects.json");
	const raw = await fs.readFile(projectsPath, "utf8");
	const projects = JSON.parse(raw);
	if (!Array.isArray(projects)) {
		throw new Error("public/data/projects.json must be an array");
	}
	return {projects, projectsPath};
}

async function saveProjects(projectsPath, projects) {
	const json = JSON.stringify(projects, null, 2) + "\n";
	await fs.writeFile(projectsPath, json, "utf8");
}

function shouldCapture(project, {only} = {}) {
	if (!project?.url || !project?.image) return false;
	if (project.useGeneratedPreview === false) return false;
	if (!only) return true;
	if (only === "featured") return Boolean(project.featured);
	if (only === "portfolio") return Boolean(project.portfolio);
	return true;
}

async function capture() {
	const args = new Set(process.argv.slice(2));
	const only = args.has("--featured")
		? "featured"
		: args.has("--portfolio")
		? "portfolio"
		: null;
	const force = args.has("--force");
	const idArg = process.argv.find((arg) => arg.startsWith("--id="));
	const onlyId = idArg ? idArg.split("=")[1] : null;

	const {projects, projectsPath} = await loadProjects();
	const targetProjects = projects
		.filter((p) => shouldCapture(p, {only}))
		.filter((p) => (onlyId ? p.id === onlyId : true));

	if (!targetProjects.length) {
		log("No matching projects found to capture.");
		return;
	}

	log(
		`Capturing ${targetProjects.length} preview(s) ${
			only ? `(${only})` : ""
		}...`
	);

	const browser = await chromium.launch();
	try {
		for (const project of targetProjects) {
			const outPath = path.join(PUBLIC_ROOT, project.image);
			await ensureDir(outPath);

			if (!force) {
				try {
					await fs.access(outPath);
					log(`- Skipping (exists): ${project.title}`);
					continue;
				} catch {
					// continue
				}
			}

			log(`- Capturing: ${project.title}`);
			const page = await browser.newPage({viewport: DEFAULT_VIEWPORT});
			try {
				const targetUrl = project.previewUrl || project.url;
				await page.goto(targetUrl, {
					waitUntil: "domcontentloaded",
					timeout: 60_000,
				});
				await page.waitForTimeout(1500);
				await page.screenshot({
					path: outPath,
					fullPage: false,
					type: "png",
				});

				const buf = await fs.readFile(outPath);
				const png = PNG.sync.read(buf);
				const rgb = computeAverageColor(png);
				if (!project.lockAccent) {
					project.accent = hexFromRgb(rgb);
					log(`  accent: ${project.accent}`);
				} else {
					log(`  accent locked: ${project.accent || "(none)"}`);
				}
			} catch (err) {
				log(`  failed: ${String(err?.message || err)}`);
				project.accent = project.accent || "#22d3ee";
			} finally {
				await page.close();
			}
		}
	} finally {
		await browser.close();
	}

	await saveProjects(projectsPath, projects);
	log("Done.");
}

capture().catch((err) => {
	process.stderr.write(`${String(err?.stack || err)}\n`);
	process.exitCode = 1;
});
