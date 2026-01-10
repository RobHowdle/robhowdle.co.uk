<?php $navBase = $navBase ?? ''; ?>

<div class="header">
  <div class="overlay"></div>
  <div class="profile">
    <img src="assets/img/profile-img.webp" alt="Portrait Image of Me">
    <h1>Robert Howdle</h1>
    <h2>Developer</h2>
    <div class="social-links">
      <a href="tel:07305988990" aria-label="Call me at 07305988990">
        <i class="fa-solid fa-phone"></i>
      </a>
      <a href="mailto:robhowdle94@gmail.com" aria-label="Email me at robhowdle94@gmail.com">
        <i class="fa-solid fa-envelope"></i>
      </a>
      <a href="https://github.com/RobHowdle" target="_blank" aria-label="View my Github Profile">
        <i class="fa-brands fa-github"></i>
      </a>
    </div>
  </div>

  <nav class="nav-menu">
    <ul>
      <li>
        <a class="btn home" href="<?php echo htmlspecialchars($navBase, ENT_QUOTES, 'UTF-8'); ?>#home" aria-label="Link to the home section">
          <i class="fa-solid fa-house"></i>
          <span>Home</span>
        </a>
      </li>
      <li>
        <a class="btn about" href="<?php echo htmlspecialchars($navBase, ENT_QUOTES, 'UTF-8'); ?>#about" aria-label="Link to the about section">
          <i class="fa-solid fa-user"></i>
          <span>About</span>
        </a>
      </li>
      <li>
        <a class="btn portfolio" href="<?php echo htmlspecialchars($navBase, ENT_QUOTES, 'UTF-8'); ?>#portfolio" aria-label="Link to the portfolio section">
          <i class="fa-solid fa-file"></i>
          <span>Portfolio</span>
        </a>
      </li>
      <li>
        <a class="btn outside" href="<?php echo htmlspecialchars($navBase, ENT_QUOTES, 'UTF-8'); ?>#outside" aria-label="Link to the outside of work section">
          <i class="fa-solid fa-person-hiking"></i>
          <span>Outside</span>
        </a>
      </li>
    </ul>
  </nav>
</div>

<div class="header-mobile dg-bg">
  <div class="left-col">
    <a href="<?php echo htmlspecialchars($navBase, ENT_QUOTES, 'UTF-8'); ?>#home">
      <img src="assets/img/rob-moji.PNG" alt="My Moji">
    </a>
  </div>

  <div class="center-col">
    <nav class="nav-menu">
      <ul>
        <li>
          <a class="btn home" href="<?php echo htmlspecialchars($navBase, ENT_QUOTES, 'UTF-8'); ?>#home" aria-label="Link to the home section">
            <span>Home</span>
          </a>
        </li>
        <li>
          <a class="btn about" href="<?php echo htmlspecialchars($navBase, ENT_QUOTES, 'UTF-8'); ?>#about" aria-label="Link to the about section">
            <span>About</span>
          </a>
        </li>
        <li>
          <a class="btn portfolio" href="<?php echo htmlspecialchars($navBase, ENT_QUOTES, 'UTF-8'); ?>#portfolio" aria-label="Link to the portfolio section">
            <span>Portfolio</span>
          </a>
        </li>
        <li>
          <a class="btn outside" href="<?php echo htmlspecialchars($navBase, ENT_QUOTES, 'UTF-8'); ?>#outside" aria-label="Link to the outside of work section">
            <span>Outside</span>
          </a>
        </li>
      </ul>
    </nav>

    <div class="social-links">
      <a href="tel:07305988990" aria-label="Call me at 07305988990">
        <i class="fa-solid fa-phone"></i>
      </a>
      <a href="mailto:robhowdle94@gmail.com" aria-label="Email me at robhowdle94@gmail.com">
        <i class="fa-solid fa-envelope"></i>
      </a>
      <a href="https://github.com/RobHowdle" target="_blank" aria-label="View my Github Profile">
        <i class="fa-brands fa-github"></i>
      </a>
    </div>
  </div>
</div>