<?php
// Unlisted page: discourage indexing
header('X-Robots-Tag: noindex, nofollow', true);

$pageTitle = 'Guides | Rob Howdle';
$robotsMeta = 'noindex,nofollow';
$navBase = 'index.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?php include 'inc/header.blade.php'; ?>
</head>

<body>
    <div class="wrapper">
        <?php include ('inc/navigation.blade.php'); ?>

        <div class="container">
            <section class="single-section single-section--pi-2 guides-page" id="guides" data-link="home">
                <div class="text-image">
                    <h2 class="section-title">Guides</h2>
                    <p class="guides-intro">
                        In 2020, I was browsing through various Facebook groups and I kept seeing the same questions come up.
                        I thought, “There should be something written down for new members to refer to which would answer these questions.”
                        <br><br>
                        From there, the New Builder Guides were created. I started with Control Systems, then expanded into other areas.
                        The guides are written mostly for new builders, but they’re also useful for experienced builders who might not be aware of other options.
                        <br><br>
                        They’re based on my own research and on feedback from the community — written by builders, for builders.
                        You can view and download the guides below.
                    </p>

                    <div class="guides-grid" aria-label="New Builder Guides">
                        <article class="guide-card">
                            <div class="guide-card__top">
                                <div>
                                    <h3 class="guide-card__title">The World of Electronics</h3>
                                    <p class="guide-card__meta">Version V1.0 • Last update 25/02/2021</p>
                                </div>
                                <a class="guide-card__cta" href="downloads/guides/The_World_of_Electronics_V1.0.pdf" target="_blank" rel="noopener" aria-label="View or download The World of Electronics PDF">
                                    View / Download
                                </a>
                            </div>
                            <p class="guide-card__desc">
                                The World of Electronics was written to give builders an overview of the things you’ll come across when dealing with droid electronics.
                                Electronics is something most new builders fear, and the goal is to point you in the right direction to learn more and answer many of the initial questions.
                            </p>
                        </article>

                        <article class="guide-card">
                            <div class="guide-card__top">
                                <div>
                                    <h3 class="guide-card__title">New Builder Guide</h3>
                                    <p class="guide-card__meta">Version V2.0 • Last update 27/07/2022</p>
                                </div>
                                <a class="guide-card__cta" href="downloads/guides/New_Builder_Guide_2.0.pdf" target="_blank" rel="noopener" aria-label="View or download New Builder Guide PDF">
                                    View / Download
                                </a>
                            </div>
                            <p class="guide-card__desc">
                                The New Builder Guide was written to help guide new members into the Droid Building Community.
                                It covers the most common questions: where to go, who to talk to, which sites to register on, and more.
                            </p>
                        </article>

                        <article class="guide-card">
                            <div class="guide-card__top">
                                <div>
                                    <h3 class="guide-card__title">Control System Guide</h3>
                                    <p class="guide-card__meta">Version V4.0 • Last update 27/07/2022</p>
                                </div>
                                <a class="guide-card__cta" href="downloads/guides/Droid_Control_Systems_4.0.pdf" target="_blank" rel="noopener" aria-label="View or download Control System Guide PDF">
                                    View / Download
                                </a>
                            </div>
                            <p class="guide-card__desc">
                                The Control System Guide covers different ways to control your droid (R2-D2s, Mouse Droids, BB-8s, and more),
                                with honest pros/cons of each system and community comments from builders who use them.
                            </p>
                            <p class="guide-card__note">
                                For quick access to this guide’s assets,
                                <a href="downloads/assets/ChrisCarpenterShadowMDWiring.pdf" target="_blank" rel="noopener">click here</a>.
                            </p>
                        </article>
                    </div>
                </div>
            </section>
        </div>

        <?php include ('inc/footer.blade.php'); ?>
    </div>
</body>

</html>
