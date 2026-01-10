// Scrolling adding active class to nav items
document.addEventListener("DOMContentLoaded", () => {
	const observer = new IntersectionObserver(
		(entries) => {
			const navLinks = document.querySelectorAll(
				".header .nav-menu ul li a"
			);

			navLinks.forEach((navLink) => {
				navLink.classList.remove("active");
			});

			const lastSection = entries[entries.length - 1].target;
			const isLastSectionIntersecting =
				entries[entries.length - 1].isIntersecting;

			entries.forEach((entry) => {
				const ref = entry.target.dataset.link;
				const link = document.querySelector(
					`.header .nav-menu ul li a.${ref}`
				);
				const intersecting =
					entry.isIntersecting && entry.intersectionRatio >= 0.5;

				if (
					link &&
					(intersecting ||
						(entry.target === lastSection &&
							isLastSectionIntersecting))
				) {
					link.classList.add("active");
				}
			});
		},
		{
			root: document.querySelector(".container"),
			rootMargin: "0px",
			threshold: [
				...Array.from({length: 1000}, (value, index) => index / 1000),
			],
		}
	);

	document.querySelectorAll(".single-section").forEach((content) => {
		observer.observe(content);
	});
});

const loadProjectsJson = (() => {
	let cached;
	return async () => {
		if (cached) return cached;
		try {
			const res = await fetch("data/projects.json", {cache: "no-store"});
			if (!res.ok) return null;
			const data = await res.json();
			cached = Array.isArray(data) ? data : null;
			return cached;
		} catch {
			return null;
		}
	};
})();

const truncateForCard = (text, limit = 200) => {
	if (!text || typeof text !== "string") {
		return {excerpt: "", truncated: false};
	}
	if (text.length <= limit) {
		return {excerpt: text, truncated: false};
	}
	const slice = text.slice(0, limit);
	const lastSpace = slice.lastIndexOf(" ");
	const excerpt = (lastSpace > 0 ? slice.slice(0, lastSpace) : slice).trim();
	return {excerpt, truncated: true};
};

const setImageIfAvailable = (imgEl, src) => {
	if (!imgEl || !src) return;
	const probe = new Image();
	probe.onload = () => {
		imgEl.src = src;
	};
	probe.src = src;
};

// Favourite Projects Snapshot Rail
document.addEventListener("DOMContentLoaded", () => {
	const rail = document.querySelector("[data-snapshot-rail]");
	if (!rail) return;

	const prevBtn = document.querySelector("[data-snapshot-prev]");
	const nextBtn = document.querySelector("[data-snapshot-next]");

	const scrollByAmount = () =>
		Math.max(220, Math.floor(rail.clientWidth * 0.8));

	const updateButtonState = () => {
		const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
		if (prevBtn) prevBtn.disabled = rail.scrollLeft <= 0;
		if (nextBtn) nextBtn.disabled = rail.scrollLeft >= maxScrollLeft - 2;
	};

	if (prevBtn) {
		prevBtn.addEventListener("click", () => {
			rail.scrollBy({left: -scrollByAmount(), behavior: "smooth"});
		});
	}

	if (nextBtn) {
		nextBtn.addEventListener("click", () => {
			rail.scrollBy({left: scrollByAmount(), behavior: "smooth"});
		});
	}

	rail.addEventListener("scroll", updateButtonState, {passive: true});
	window.addEventListener("resize", updateButtonState);
	updateButtonState();
});

// Render favourites from data/projects.json (featured=true)
document.addEventListener("DOMContentLoaded", async () => {
	const rail = document.querySelector("[data-snapshot-rail]");
	if (!rail) return;
	if (!rail.hasAttribute("data-snapshot-autofill")) return;

	const projects = await loadProjectsJson();
	if (!projects) return;
	const featured = projects.filter((p) => Boolean(p.featured));
	if (!featured.length) return;
	const getProjectImage = (project) =>
		project.imageOverride || project.placeholderImage || project.image;

	rail.innerHTML = "";

	featured.forEach((project) => {
		const a = document.createElement("a");
		a.className = "snapshot-card";
		a.setAttribute("data-project-id", project.id);
		a.href = project.url;
		a.target = "_blank";
		a.rel = "noopener";
		a.setAttribute("aria-label", project.title);

		const media = document.createElement("div");
		media.className = "snapshot-card__media";

		const frame = document.createElement("div");
		frame.className = "preview-frame";
		frame.setAttribute("data-preview-frame", "");
		if (project.accent)
			frame.style.setProperty("--preview-accent", project.accent);

		const img = document.createElement("img");
		img.className = "preview-frame__img";
		img.setAttribute("data-preview-image", "");
		img.loading = "lazy";
		img.alt = `${project.title} preview`;
		setImageIfAvailable(img, getProjectImage(project));

		frame.appendChild(img);
		media.appendChild(frame);

		const meta = document.createElement("div");
		meta.className = "snapshot-card__meta";
		meta.innerHTML = `
			<span class="snapshot-card__title">${project.title}</span>
			<span class="snapshot-card__hint">View</span>
		`;

		a.appendChild(media);
		a.appendChild(meta);
		rail.appendChild(a);
	});
});

// Project previews (optional build-time generated screenshots + accent colors)
document.addEventListener("DOMContentLoaded", async () => {
	const nodes = document.querySelectorAll("[data-project-id]");
	if (!nodes.length) return;
	const projects = await loadProjectsJson();
	if (!projects) return;

	const map = new Map(projects.map((p) => [p.id, p]));
	const getProjectImage = (project) =>
		project.imageOverride || project.placeholderImage || project.image;

	nodes.forEach((node) => {
		const id = node.getAttribute("data-project-id");
		const project = map.get(id);
		if (!project) return;

		const frame = node.querySelector("[data-preview-frame]") || node;
		if (project.accent && frame?.style) {
			frame.style.setProperty("--preview-accent", project.accent);
		}

		const img = node.querySelector("[data-preview-image]");
		const shouldUseGenerated = project.useGeneratedPreview !== false;
		const preferredImage = getProjectImage(project);
		if (
			img &&
			preferredImage &&
			(shouldUseGenerated ||
				project.imageOverride ||
				project.placeholderImage)
		) {
			setImageIfAvailable(img, preferredImage);
		}
	});
});

// Render portfolio from data/projects.json (portfolio=true)
document.addEventListener("DOMContentLoaded", async () => {
	const wrapper = document.querySelector(
		".work-card-wrapper[data-portfolio-autofill]"
	);
	if (!wrapper) return;

	const projects = await loadProjectsJson();
	if (!projects) return;

	const portfolioProjects = projects.filter((p) => p && p.portfolio);
	if (!portfolioProjects.length) return;

	const getProjectImage = (project) =>
		project.imageOverride || project.placeholderImage || project.image;

	wrapper.innerHTML = "";

	portfolioProjects.forEach((project) => {
		const card = document.createElement("div");
		card.className = "card";
		card.setAttribute("data-project-id", project.id);

		const overlay = document.createElement("div");
		overlay.className = "overlay";

		const frame = document.createElement("div");
		frame.className = "preview-frame";
		frame.setAttribute("data-preview-frame", "");
		if (project.accent)
			frame.style.setProperty("--preview-accent", project.accent);

		const img = document.createElement("img");
		img.className = "preview-frame__img";
		img.setAttribute("data-preview-image", "");
		img.loading = "lazy";
		img.alt = project.title || "Project preview";
		const preferredImage = getProjectImage(project);
		setImageIfAvailable(img, preferredImage);
		frame.appendChild(img);

		const title = document.createElement("h5");
		title.className = "h6 project-title";
		title.textContent = project.title || "";

		const content = document.createElement("div");
		content.className = "content";
		const p = document.createElement("p");
		p.className = "content";

		const desc = project.description || "";
		const {excerpt, truncated} = truncateForCard(desc, 200);
		if (excerpt) {
			p.appendChild(document.createTextNode(excerpt));
			if (truncated) {
				p.appendChild(document.createTextNode("... "));
				const btn = document.createElement("button");
				btn.className = "btn";
				btn.type = "button";
				btn.setAttribute("aria-label", "Read More");
				btn.dataset.text = desc;
				btn.textContent = "Read More";
				p.appendChild(btn);
			}
		}
		content.appendChild(p);

		const links = document.createElement("div");
		links.className = "links";

		const addLink = (label, url) => {
			if (!url) return;
			const a = document.createElement("a");
			a.className = "button";
			a.href = url;
			a.target = "_blank";
			a.rel = "noopener";
			a.innerHTML = `${label} <span class="fa-solid fa-chevron-right"></span>`;
			links.appendChild(a);
		};

		if (Array.isArray(project.links) && project.links.length) {
			project.links.forEach((l) => addLink(l.label || "View", l.url));
		} else if (project.url) {
			const isGithub = project.url.includes("github.com/");
			addLink(isGithub ? "Github" : "View", project.url);
		}

		card.appendChild(overlay);
		card.appendChild(frame);
		card.appendChild(title);
		card.appendChild(content);
		card.appendChild(links);
		wrapper.appendChild(card);
	});
});

// Portfolio: bento grid shows all items (no load more)

// Mobile Nav
$(document).ready(function () {
	$(".mobile-nav-toggle").click(function () {
		$(".header-mobile").toggleClass("active");
	});
});

// Portfolio modal (single reusable modal)
document.addEventListener("DOMContentLoaded", () => {
	const modal = document.getElementById("portfolio-modal");
	if (!modal) return;
	const backdrop = document.querySelector(".portfolio-modal-backdrop");
	const titleEl = modal.querySelector(".modal-header h2.h5");
	const textEl = modal.querySelector(".modal-text p");
	let closeTimer = null;

	const parseCssTimeMs = (value) => {
		if (!value) return null;
		const trimmed = String(value).trim();
		if (!trimmed) return null;
		if (trimmed.endsWith("ms")) {
			const n = Number.parseFloat(trimmed.slice(0, -2));
			return Number.isFinite(n) ? n : null;
		}
		if (trimmed.endsWith("s")) {
			const n = Number.parseFloat(trimmed.slice(0, -1));
			return Number.isFinite(n) ? n * 1000 : null;
		}
		const n = Number.parseFloat(trimmed);
		return Number.isFinite(n) ? n : null;
	};

	const getModalDurationMs = () => {
		const cssValue =
			getComputedStyle(modal).getPropertyValue("--modal-duration");
		return parseCssTimeMs(cssValue) ?? 750;
	};

	const close = () => {
		if (!modal.classList.contains("show")) return;
		if (closeTimer) {
			clearTimeout(closeTimer);
			closeTimer = null;
		}
		modal.classList.add("is-closing");
		const duration = getModalDurationMs();
		closeTimer = window.setTimeout(() => {
			modal.classList.remove("show");
			modal.classList.remove("is-closing");
			if (backdrop) backdrop.classList.remove("show");
			closeTimer = null;
		}, duration);
	};

	const open = ({title, text}) => {
		if (closeTimer) {
			clearTimeout(closeTimer);
			closeTimer = null;
		}
		modal.classList.remove("is-closing");
		if (titleEl) titleEl.textContent = title || "";
		if (textEl) textEl.textContent = text || "";
		if (backdrop) backdrop.classList.add("show");
		modal.classList.add("show");
	};

	const closeBtn = modal.querySelector(".modal-header .close");
	if (closeBtn) closeBtn.addEventListener("click", close);
	if (backdrop) backdrop.addEventListener("click", close);

	document.addEventListener("click", (event) => {
		const btn = event.target?.closest?.(".work-card-wrapper .card .btn");
		if (!btn) return;
		const card = btn.closest(".card");
		if (!card) return;
		const cardTitle =
			card.querySelector(".project-title")?.textContent || "";
		const fullText = btn.getAttribute("data-text") || "";
		if (!fullText) return;
		open({title: cardTitle, text: fullText});
	});

	document.addEventListener("keyup", (event) => {
		if (event.key === "Escape") close();
	});
});
