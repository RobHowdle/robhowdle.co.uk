<section id="about" data-link="about" class="lg-bg single-section">
  <div class="single-section--pi-2">
    <div class="inner-wrapper--1680-lg">
      <h4 class="h3 section-title">About Me</h4>
      <p>
        Technology in general has always fascinated me. I can always be found brainstorming new ideas, reading
        up on
        the
        latest tech news or devising solutions to solve common problems. After building my first website around
        the
        age
        of 8 using nothing but Notepad, I found everything about programming interesting. The fact that it is
        ever
        changing made it even more fun to pursue. My ultimate goal is to become a truly bespoke Full Stack
        Developer,
        someone who can jump into any project head-on without being hindered by a lack of general knowledge,
        absence
        of
        experience with different programming languages, or an inability to understand what a client wants, even
        when
        they may not have a clear idea themselves.
      </p>

      <div class="about-grid">
        <div class="about-card about-card--profile">
          <div class="about-avatar">
            <img src="assets/img/rob.webp" alt="Image of me from a previous job" loading="lazy">
          </div>
          <div class="about-badges" aria-label="Highlights">
            <span class="about-badge">Laravel</span>
            <span class="about-badge">Vue</span>
            <span class="about-badge">WordPress</span>
            <span class="about-badge">DevOps</span>
          </div>
        </div>

        <div class="about-stack">Initial
          <div class="about-card about-card--quote">
            <div class="about-quote">
              <span class="fa-solid fa-quote-left"></span>
              This industry can be frustrating and difficult at times, but out of all the jobs I
              have ever had, I have experienced no greater satisfaction than when I am presented with a
              challenging task, working through the problem and ultimately finding a solution that meets
              the clients needs and brings them happiness (especially when it would be easier to find
              shortcuts).
              <span class="fa-solid fa-quote-right"></span>
            </div>
          </div>

          <div class="about-card about-card--facts">
            <h4 class="h6 section-sub-title">Things to know</h4>
            <ul class="about-facts">
              <li>
                <span class="about-facts__key">Age</span>
                <span class="about-facts__val"><?php
                                                $dob = '1994-10-08';
                                                echo date_diff(date_create($dob), date_create('today'))->y;
                                                ?></span>
              </li>
              <li>
                <span class="about-facts__key">Years in industry</span>
                <span class="about-facts__val"><?php echo date('Y') - '2018'; ?></span>
              </li>
              <li>
                <span class="about-facts__key">Town</span>
                <span class="about-facts__val">Bishop Auckland, UK</span>
              </li>
              <li>
                <span class="about-facts__key">Driving</span>
                <span class="about-facts__val">Yes (own car)</span>
              </li>
              <li class="about-facts__full">
                <span class="about-facts__key">Hobbies</span>
                <span class="about-facts__val">Building and Crafts, Music, Nature Walks, Mechanics,
                  Photography, Late Night Drives</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>