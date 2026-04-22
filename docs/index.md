---
title: "INAV Docs"
description: "Welcome to INAV Docs"
noStyle: true
components:
  meta: true
  css: true
  menubar: true # Use the site's top navigation
  scripts: true # Enable interactive components
  mainScripts: true
  favicon: true
---

<head>
    <link rel="stylesheet" href="/assets/css/landing-page.css">
    <script src="/assets/js/hero-slider-auto.js"></script>
</head>

<div class="wrapper">
    <video class="video"
        autoPlay
        playsInline
        loop
        muted >
        <source src="/assets/images/brand/inavbgv.mp4" type="video/mp4" />
    </video>
    <div class="mask"></div>
    <img src="/assets/images/brand/inav_home.png" class="content" />
</div>

::: grids

::: grid
::: card "Hardware" icon:cpu
INAV works on many flight controllers from many different manufacturers with further support of additional peripherals such as pitot tubes, rangefinder/optical flow sensors, and more.
:::
:::

::: grid
::: card "Open Source Software" icon:code
INAV is free and open source software that is actively developed by many contributers from around the world. Large version releases occur annually and smaller, maintenance releases throughout the year.
:::
:::

::: grid
::: card "Community" icon:users
With a large, enthusiastic, and active community of 16.4k members in the official Facebook and 8900 in Discord, getting up and going with your INAV build will be a breeze.
:::
:::

:::


<div style="text-align: left; padding-left: 1rem; margin-bottom: 1rem;">
  <h2>Hardware Partners</h2>
</div>

::: hero layout:slider
== slide
<div style="display: flex; justify-content: space-around; align-items: center;">
  <img src="/assets/images/mfg/mateksys-logo.png" alt="Hardware Partner 1" style="max-width: 30%; height: auto;">
  <img src="/assets/images/mfg/mateksys-logo.png" alt="Hardware Partner 2" style="max-width: 30%; height: auto;">
  <img src="/assets/images/mfg/mateksys-logo.png" alt="Hardware Partner 3" style="max-width: 30%; height: auto;">
</div>

== slide
<div style="display: flex; justify-content: space-around; align-items: center;">
  <img src="/assets/images/mfg/mateksys-logo.png" alt="Hardware Partner 1" style="max-width: 30%; height: auto;">
  <img src="/assets/images/mfg/mateksys-logo.png" alt="Hardware Partner 2" style="max-width: 30%; height: auto;">
  <img src="/assets/images/mfg/mateksys-logo.png" alt="Hardware Partner 3" style="max-width: 30%; height: auto;">
</div>
:::

<footer style="display: flex; justify-content: space-between; padding: 2rem; background-color: var(--bg-color); border-top: 1px solid var(--border-color);">
  <div style="flex: 1; text-align: center;">
    <h5>Docs</h5>
    <ul style="list-style: none; padding: 0;">
      <li><a href="/welcome" target="_blank">Documentation</a></li>
      <li><a href="/downloads" target="_blank">Downloads</a></li>
    </ul>
  </div>
  <div style="flex: 1; text-align: center;">
    <h5>Community</h5>
    <ul style="list-style: none; padding: 0;">
      <li><a href="https://github.com/iNavFlight/inav/discussions" target="_blank">Github Discussions</a></li>
      <li><a href="https://discord.gg/peg2hhbYwN" target="_blank">Discord</a></li>
      <li><a href="https://www.facebook.com/groups/INAVOfficial" target="_blank">Facebook</a></li>
      <li><a href="https://t.me/INAVFlight" target="_blank">Telegram</a></li>
    </ul>
  </div>
  <div style="flex: 1; text-align: center;">
    <h5>More</h5>
    <ul style="list-style: none; padding: 0;">
      <li><a href="https://github.com/iNavFlight/inav" target="_blank">Github</a></li>
      <li><a href="https://www.rcgroups.com/forums/showthread.php?3666667-INAV-for-fixed-wing" target="_blank">RC Groups</a></li>
    </ul>
  </div>
</footer>
    <p>Content for the third column.</p>
  </div>
</footer>