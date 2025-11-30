// Full standalone HTML for Curious Geckos
// Re-added from scratch with touch support fix

const getGeckosHTML = () => `
<!DOCTYPE html>
<html lang="en" class="g_html">

  <head>
    <meta charset="UTF-8">
    <title>Curious Geckos [A CSS-Only Position Aware Experience!]</title>
    <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Curious Geckos</title>
<meta name="description" content="A CSS-only, no JS, no checkbox, position-aware (hover/touch aware) interactive gecko-luring pastime by @warkentien2. Click or hover the screen to play. Hover for better UX. Try it on Chrome Desktop or Edge for best results.">
<!-- Other meta tags for social media-->
<meta property="og:type" content="website">
<meta property="og:title" content="Curious Geckos. World's Most Precise CSS-only Position-Aware Mini-Game!">
<meta property="og:description" content="A CSS-only, no JS, no checkbox, position-aware (hover/touch aware) interactive gecko-luring pastime by @warkentien2. Click or hover the screen to play. Hover for better UX. Try it on Chrome Desktop or Edge for best results.">
<meta property="og:image" content="https://assets.codepen.io/337761/curious-gecko--by-warkentien2.png">
<meta property="og:url" content="https://codepen.io/warkentien2/full/jOJJwEp">
<!-- Twitter-specific tags-->
<meta name="twitter:title" content="Curious Geckos. World's Most Precise CSS-only Position-Aware Mini-Game!">
<meta name="twitter:description" content="A CSS-only, no JS, no checkbox, position-aware (hover/touch aware) interactive gecko-luring pastime by @warkentien2. Click or hover the screen to play. Hover for better UX. Try it on Chrome Desktop or Edge for best results.">
<meta name="twitter:image" content="https://assets.codepen.io/337761/curious-gecko--by-warkentien2.png">
<meta name="twitter:url" content="https://codepen.io/warkentien2/full/jOJJwEp">
<meta name="twitter:card" content="https://assets.codepen.io/337761/curious-gecko--by-warkentien2.png">
<meta name="twitter:site" content="@warkentien2">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato&amp;display=swap" rel="stylesheet">
<style>
.g_html {
  background: black;
}
.g_html body {
  display: none;
}
</style><style>@charset "UTF-8";
/* ------------------------------------------------------------ */
/* ------------------------ Global Vars ----------------------- */
/* ------------------------------------------------------------ */
/* 3 * 33, to near 100% */
/* ------------------------------------------------------------ */
/* -------------------------- Main UI ------------------------- */
/* ------------------------------------------------------------ */
body {
  background: black;
  position: relative;
  margin: 0;
  min-height: 100dvh;
  overflow: hidden;
  --gecko-transition-delay: 0s;
  --gecko-transition-duration: 0.125s;
  cursor: none;
}

.svg-defs {
  width: 0;
  height: 0;
  position: fixed;
}

.fullscreen {
  position: absolute;
  inset: 0 0 0 0;
  overflow: hidden;
  width: 100%;
  height: 100dvh;
}

/* ---------------------------- SCREENS -------------------------- */
.start-screen {
  z-index: 999;
  background: black;
  animation: start-screen-fade-out 3s ease-out forwards;
}
@keyframes start-screen-fade-out {
  0% {
    scale: 10;
    opacity: 1;
    color: black;
  }
  66.67% {
    scale: 1;
    opacity: 1;
  }
  100% {
    opacity: 0;
    scale: 1;
    color: white;
  }
}

.welcome-screen {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  opacity: 0;
  transform: scale(1.025);
  animation: enter-text 0.5s ease-out forwards 1s;
  z-index: 999999999;
  /* ---------------- input-device-specific word choice ---------------- */
}
@keyframes enter-text {
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.welcome-screen h1,
.welcome-screen h2 {
  margin: 1vmin;
  text-shadow: 0 0 2vmin #125d19, 0 0 0.75vmin #072a17;
  color: white;
}
.welcome-screen h1 {
  font-size: min(5dvmin, 2rem);
}
.welcome-screen h2 {
  font-size: min(10dvmin, 4rem);
  font-weight: 900;
}
.welcome-screen h2::before {
  content: "⧼";
}
.welcome-screen h2::after {
  content: "⧽";
  margin-left: 0.25rem;
}
.welcome-screen .touch,
.welcome-screen .hover,
.welcome-screen .tab-only {
  display: none;
}
@media (hover: none) and (pointer: coarse) {
  .welcome-screen {
    /* Styles for touch devices */
  }
  .welcome-screen .touch {
    display: block;
  }
}
@media (hover: hover) and (pointer: fine) {
  .welcome-screen {
    /* Styles for devices with accurate pointing devices like a mouse or stylus */
  }
  .welcome-screen .hover {
    display: block;
  }
}
@media (hover: none) and (pointer: none) {
  .welcome-screen {
    /* Styles for devices that might rely on tab-only navigation */
  }
  .welcome-screen .tab-only {
    display: block;
  }
}
body:is(:hover, .hover) .welcome-screen {
  display: none;
}

/* ------------------------ MAIN UI: Tip component ------------------------ */
.tip-wrapper {
  left: 50%;
  z-index: 9999999;
  background: #ffd994;
  position: fixed;
  bottom: 2.5dvh;
  padding: 0;
  margin: 0;
  font-size: 1em;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0.75em 1em rgba(0, 0, 0, 0.25);
  opacity: 0;
  transition: all 0.125s ease-out, opacity 0.0625s ease-out, bottom 0.125s ease-out 0.125s;
  transform-origin: 50% 33%;
  transform: translate(-50%, 25%);
  animation: tip__fade-in 0.5s ease-out forwards 3s;
  cursor: pointer;
}
body:not(:is(:hover, .hover)) .tip-wrapper {
  display: none;
}
.tip-wrapper .hidden-checkbox {
  display: none;
}
body:has(.tip-wrapper:is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 48;
  --y: 93;
}
.tip-wrapper:active {
  scale: 0.95;
  opacity: 0;
  animation: none;
}
.tip-wrapper:has(.hidden-checkbox:checked) {
  bottom: -7.5dvh;
  opacity: 0;
  animation: none;
}
.tip-wrapper .tip {
  display: flex;
  align-items: stretch;
}
.tip-wrapper .tip::before {
  content: "✕";
  border-radius: 50%;
  border: 2px solid orange;
  color: orange;
  position: absolute;
  top: -0.75em;
  right: -0.75em;
  z-index: 1;
  width: 1.25em;
  height: 1.25em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background: black;
}
.tip-wrapper .tip span {
  display: block;
  display: flex;
  align-items: center;
  height: 2.5em;
  padding: 0 0.75em;
  white-space: nowrap;
}
.tip-wrapper .tip span:first-child {
  background: orange;
  color: white;
  border-radius: 4px 0 0 4px;
}
@keyframes tip__fade-in {
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

/* ------------------------------------------------------------------- */
/* ----------------------- Position Aware Grid ----------------------- */
/* ------------------------------------------------------------------- */
:root {
  --x-axis: 33;
  --y-axis: 33;
  font-family: Lato, Helvetica, Arial, sans-serif;
}

.position-aware-container {
  background: radial-gradient(circle at center, rgba(86, 135, 8, 0.625) 25%, rgba(10, 96, 16, 0.625) 60%, rgba(1, 29, 29, 0.75) 92.5%);
}

.position-aware-grid {
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-rows: repeat(var(--y-axis), 1fr);
  grid-template-columns: 1fr;
  grid-gap: 0;
  z-index: 99999;
  transition: all 0.5s ease-out;
}

tr {
  width: 100dvw;
  height: calc(100dvh / var(--y-axis));
  display: grid;
  grid-template-columns: repeat(var(--x-axis), 1fr);
}

td {
  position: relative;
}
td .gecko-attack-area {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.position-aware-container:has(tr:nth-child(1):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 0;
}

.position-aware-container:has(td:nth-child(1):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 0;
}

.position-aware-container:has(tr:nth-child(2):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 3;
}

.position-aware-container:has(td:nth-child(2):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 3;
}

.position-aware-container:has(tr:nth-child(3):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 6;
}

.position-aware-container:has(td:nth-child(3):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 6;
}

.position-aware-container:has(tr:nth-child(4):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 9;
}

.position-aware-container:has(td:nth-child(4):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 9;
}

.position-aware-container:has(tr:nth-child(5):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 12;
}

.position-aware-container:has(td:nth-child(5):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 12;
}

.position-aware-container:has(tr:nth-child(6):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 15;
}

.position-aware-container:has(td:nth-child(6):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 15;
}

.position-aware-container:has(tr:nth-child(7):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 18;
}

.position-aware-container:has(td:nth-child(7):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 18;
}

.position-aware-container:has(tr:nth-child(8):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 21;
}

.position-aware-container:has(td:nth-child(8):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 21;
}

.position-aware-container:has(tr:nth-child(9):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 24;
}

.position-aware-container:has(td:nth-child(9):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 24;
}

.position-aware-container:has(tr:nth-child(10):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 27;
}

.position-aware-container:has(td:nth-child(10):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 27;
}

.position-aware-container:has(tr:nth-child(11):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 30;
}

.position-aware-container:has(td:nth-child(11):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 30;
}

.position-aware-container:has(tr:nth-child(12):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 33;
}

.position-aware-container:has(td:nth-child(12):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 33;
}

.position-aware-container:has(tr:nth-child(13):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 36;
}

.position-aware-container:has(td:nth-child(13):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 36;
}

.position-aware-container:has(tr:nth-child(14):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 39;
}

.position-aware-container:has(td:nth-child(14):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 39;
}

.position-aware-container:has(tr:nth-child(15):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 42;
}

.position-aware-container:has(td:nth-child(15):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 42;
}

.position-aware-container:has(tr:nth-child(16):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 45;
}

.position-aware-container:has(td:nth-child(16):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 45;
}

.position-aware-container:has(tr:nth-child(17):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 48;
}

.position-aware-container:has(td:nth-child(17):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 48;
}

.position-aware-container:has(tr:nth-child(18):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 51;
}

.position-aware-container:has(td:nth-child(18):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 51;
}

.position-aware-container:has(tr:nth-child(19):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 54;
}

.position-aware-container:has(td:nth-child(19):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 54;
}

.position-aware-container:has(tr:nth-child(20):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 57;
}

.position-aware-container:has(td:nth-child(20):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 57;
}

.position-aware-container:has(tr:nth-child(21):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 60;
}

.position-aware-container:has(td:nth-child(21):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 60;
}

.position-aware-container:has(tr:nth-child(22):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 63;
}

.position-aware-container:has(td:nth-child(22):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 63;
}

.position-aware-container:has(tr:nth-child(23):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 66;
}

.position-aware-container:has(td:nth-child(23):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 66;
}

.position-aware-container:has(tr:nth-child(24):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 69;
}

.position-aware-container:has(td:nth-child(24):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 69;
}

.position-aware-container:has(tr:nth-child(25):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 72;
}

.position-aware-container:has(td:nth-child(25):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 72;
}

.position-aware-container:has(tr:nth-child(26):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 75;
}

.position-aware-container:has(td:nth-child(26):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 75;
}

.position-aware-container:has(tr:nth-child(27):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 78;
}

.position-aware-container:has(td:nth-child(27):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 78;
}

.position-aware-container:has(tr:nth-child(28):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 81;
}

.position-aware-container:has(td:nth-child(28):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 81;
}

.position-aware-container:has(tr:nth-child(29):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 84;
}

.position-aware-container:has(td:nth-child(29):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 84;
}

.position-aware-container:has(tr:nth-child(30):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 87;
}

.position-aware-container:has(td:nth-child(30):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 87;
}

.position-aware-container:has(tr:nth-child(31):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 90;
}

.position-aware-container:has(td:nth-child(31):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 90;
}

.position-aware-container:has(tr:nth-child(32):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 93;
}

.position-aware-container:has(td:nth-child(32):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 93;
}

.position-aware-container:has(tr:nth-child(33):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --y: 96;
}

.position-aware-container:has(td:nth-child(33):is(:hover, .hover)) :is(.fly__wrapper, .gecko__placement) {
  --x: 96;
}

/* ----------------------------------------------------------- */
/* ------------------------ Creatures ------------------------ */
/* ----------------------------------------------------------- */
/* --------------------------- FLY --------------------------- */
/* ----------- FLY: position aware flight mechanics ---------- */
.fly__wrapper {
  --x: 80;
  --y: 130;
  --wing-speed: 10;
  --extra-rotation: 30deg;
  position: absolute;
  --fly-wrapper-width: calc(100 * var(--creature-unit) / var(--x-axis));
  --fly-wrapper-height: calc(100 * var(--creature-unit) / var(--y-axis));
  width: var(--fly-wrapper-width);
  height: var(--fly-wrapper-height);
  will-change: left, top, transform;
  left: calc( 100dvw / (var(--x-axis) * 3) * var(--x) + 50dvw / var(--x-axis) - calc(var(--fly-wrapper-width) / 2) );
  top: calc( 100dvh / (var(--y-axis) * 3) * var(--y) + 50dvh / var(--y-axis) - calc(var(--fly-wrapper-height) / 2) );
  transform: rotate3d(0, 0, 1, calc( atan2(calc(var(--x) * 0.33 - 16), calc(16 - var(--y) * 0.33)) + var(--extra-rotation) ));
  /* Math.floor(33/2) = 16 */
  transform-origin: 50% 50%;
  transition: all 0.25s ease-out;
  pointer-events: none;
  z-index: 4;
  filter: drop-shadow(0 2px calc(var(--creature-unit) / 2.5) rgba(0, 0, 0, 0.25));
}

/* ----------------------- FLY: styles ----------------------- */
.fly {
  --fly-width: calc(var(--creature-unit) * 1.5);
  --fly-height: calc(var(--creature-unit) * 3);
  --fly-color: #145156;
  --fly-shadow: 0 0.125vmin 0.5vmin rgba(30, 85, 85, 0.5),
    0 0 2vmin rgba(30, 85, 85, 0.25);
  position: relative;
  width: var(--fly-width);
  height: var(--fly-height);
  margin: auto;
}
.fly__head {
  position: relative;
  width: 100%;
  height: 30%;
  border-radius: 50%;
  border-top-left-radius: 70% 100%;
  border-top-right-radius: 70% 100%;
  background: linear-gradient(90deg, #ddd, transparent 15%, transparent 30%, #111, transparent 70%, transparent 85%, #ddd), radial-gradient(ellipse 65% 65%, var(--fly-color) 35%, #ddd 45%, dodgerblue 65%, red 80%);
  background-size: 100% 100%, 100% 300%;
  background-position: 0% 0%, 0% 300%;
  box-shadow: var(--fly-shadow);
}
.fly__head::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(ellipse 200% 200%, transparent, transparent 24%, black 25%);
  background-size: 15% 30%;
  background-position: 22.5% 0;
  border-radius: inherit;
}
.fly__body {
  background: radial-gradient(ellipse 100% 100%, var(--fly-color) 15%, #060b0a 35%, #373633 50%);
  background-size: 140% 120%;
  background-position: 50% -50%;
  width: 100%;
  height: 60%;
  border-radius: 30%;
  border-bottom-left-radius: 60% 100%;
  border-bottom-right-radius: 60% 100%;
  box-shadow: var(--fly-shadow);
}
.fly__wing {
  position: absolute;
  top: 30%;
  height: 65%;
  width: 100%;
  background: #cae5fc;
  opacity: 0.625;
}
.fly__wing--left {
  left: -62.5%;
  border-radius: 100% 10% 60% 20%;
  transform-origin: 100% 0;
  animation: flap-left calc(var(--wing-speed) * 1ms) infinite alternate;
}
.fly__wing--right {
  right: -62.5%;
  border-radius: 10% 100% 20% 60%;
  transform-origin: 0 0;
  animation: flap-right calc(var(--wing-speed) * 1ms) infinite alternate;
}

/* ------------------------ FLY: animation ------------------------ */
@keyframes flap-left {
  from {
    rotate: 60deg;
  }
  to {
    rotate: -10deg;
  }
}
@keyframes flap-right {
  from {
    rotate: -60deg;
  }
  to {
    rotate: 10deg;
  }
}
@media (hover: hover) {
  .fly__wrapper {
    transition: transform 0.5s ease-out;
  }

  td span:is(:hover, .hover) {
    transition: none;
  }
}
/* ---------------------------- GECKO ---------------------------- */
:root {
  --members-scale: 0.875;
}

/* --------------- GECKO: position aware FLY tracking mechanics ----------------- */
.gecko__placement {
  position: absolute;
  left: calc(var(--head-x, 0) * 1dvw);
  top: calc(var(--head-y, 0) * 1dvh);
  rotate: calc(var(--head-initial-rotation, 0) * 1deg);
  z-index: -1;
  --abs-angle-over-90: calc(
    1 - 2 * var(--is-x-flipped, 0) * 1 - 2 * var(--is-y-flipped, 0)
  );
  scale: calc(1 - 2 * var(--is-x-flipped, 0)) calc(1 - 2 * var(--is-y-flipped, 0));
  /* default placement */
  --x: 48;
  --y: 45;
  /* Relative coordinates */
  --dx: calc(
    var(--abs-angle-over-90) *
      min(
        var(--x, 0) - var(--head-x, 0),
        var(--x, 0) - var(--head-x, 0) + var(--head-x-offset, 0)
      )
  );
  --dy: calc(
    max(
      calc(var(--head-initial-rotation, 0) - 90),
      min(
        var(--y, 0) - var(--head-y, 0),
        var(--y, 0) - var(--head-y, 0) + var(--head-y-offset, 0)
      )
    )
  );
  /* Angle calculation using atan2 */
  --head-angle: max(
    var(--min-head-angle),
    min(
      var(--max-head-angle),
      calc(
        (atan2(var(--dy), var(--dx)) * var(--head-angle-intensity, 1)) -
          calc(
            (
                var(--head-initial-rotation, 0) * var(--head-angle-intensity, 1) *
                  1deg
              ) + var(--head-angle-correction, 0deg)
          )
      )
    )
  );
}

/* --------------------- GECKO: shared styles --------------------- */
.gecko {
  --gecko-viewport-width: 2000;
  --gecko-width: calc(100 * var(--creature-unit));
  --gecko-height: calc(100 * var(--creature-unit));
  --gecko-proportionate-size: calc(
    var(--gecko-width) / var(--gecko-viewport-width)
  );
  position: absolute;
  --gecko-placement-x: calc(-49.25 + var(--x-offset, 0));
  --gecko-placement-y: calc(-57.5 + var(--y-offset, 0));
  top: calc(var(--gecko-placement-y) * var(--creature-unit));
  left: calc(var(--gecko-placement-x) * var(--creature-unit));
  width: var(--gecko-width);
  height: var(--gecko-height);
  aspect-ratio: 1/1;
  color: #666;
  transition: all var(--gecko-transition-duration, 0.5s) ease;
}

.gecko__body-part {
  --translate-x-member: 0;
  --translate-y-member: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all var(--gecko-transition-duration, 0.5s) ease;
  width: calc(var(--width) * var(--gecko-proportionate-size));
  height: calc(var(--height) * var(--gecko-proportionate-size));
  left: calc(var(--left) * var(--gecko-proportionate-size));
  top: calc(var(--top) * var(--gecko-proportionate-size));
  transform-origin: var(--transform-origin-x) var(--transform-origin-y);
  transform: translate3d(var(--translate-x-member, 0px), var(--translate-y-member, 0px), 0) scale(var(--scale-member, 1)) rotate3d(0, 0, 1, calc(var(--rotate-member, 0) * 1deg));
  opacity: var(--opacity);
}
.gecko__body-part svg {
  position: absolute;
  width: 100%;
  height: 100%;
}

.gecko__shoulders {
  --left: 904;
  --top: 433;
  --transform-origin-x: 50%;
  --transform-origin-y: 78%;
  --transform-origin-opacity: 1;
  --rotate-member: 63;
  --top: 1000;
  --torso: 1;
}
.gecko__shoulders .gecko__thorax {
  --left: -1;
  --top: -17;
  --transform-origin-x: 50%;
  --transform-origin-y: 60%;
  --transform-origin-opacity: 1;
  --rotate-member: calc(var(--torso) * 35);
}
.gecko__shoulders .gecko__arm--left {
  --left: -91;
  --top: 54;
  --transform-origin-x: 80%;
  --transform-origin-y: 35%;
  --transform-origin-opacity: 1;
  --scale-member: var(--members-scale);
  --rotate-member: -45;
}
.gecko__shoulders .gecko__forearm--left {
  --left: -65;
  --top: 40;
  --transform-origin-x: 80%;
  --transform-origin-y: 67%;
  --transform-origin-opacity: 1;
  --rotate-member: 60;
}
.gecko__shoulders .gecko__hand--left {
  --left: -84;
  --top: -71;
  --transform-origin-x: 79%;
  --transform-origin-y: 70%;
  --transform-origin-opacity: 1;
  --rotate-member: -25;
}
.gecko__shoulders .gecko__arm--right {
  --left: 137;
  --top: 53;
  --transform-origin-x: 20%;
  --transform-origin-y: 35%;
  --transform-origin-opacity: 1;
  --scale-member: var(--members-scale);
  --rotate-member: -30;
}
.gecko__shoulders .gecko__forearm--right {
  --left: 91;
  --top: 30;
  --transform-origin-x: 26%;
  --transform-origin-y: 62%;
  --transform-origin-opacity: 1;
  --rotate-member: 5;
}
.gecko__shoulders .gecko__hand--right {
  --left: 74;
  --top: -79;
  --transform-origin-x: 13%;
  --transform-origin-y: 59%;
  --transform-origin-opacity: 1;
  --rotate-member: -40;
}
.gecko__shoulders .gecko__ribs {
  --left: 5;
  --top: 48;
  --transform-origin-x: 50%;
  --transform-origin-y: 21%;
  --transform-origin-opacity: 1;
  --rotate-member: calc(
    -1 * var(--torso) * 30
  );
}
.gecko__shoulders .gecko__back {
  --left: -14;
  --top: 43;
  --transform-origin-x: 35%;
  --transform-origin-y: 41%;
  --transform-origin-opacity: 1;
  --rotate-member: calc(
    -1 * var(--torso) * 16
  );
}
.gecko__shoulders .gecko__hips {
  --hip-rotation: -1;
  --left: 27;
  --top: 426;
  --transform-origin-x: 50%;
  --transform-origin-y: 14%;
  --transform-origin-opacity: 1;
  --rotate-member: calc(var(--hip-rotation) * var(--torso) * 37);
}
.gecko__shoulders .gecko__tail--0 {
  --left: 9;
  --top: 96;
  --transform-origin-x: 50%;
  --transform-origin-y: 26%;
  --transform-origin-opacity: 1;
  --rotate-member: calc(var(--hip-rotation) * 15);
}
.gecko__shoulders .gecko__tail--1 {
  --left: -1;
  --top: 165;
  --transform-origin-x: 50%;
  --transform-origin-y: 26%;
  --transform-origin-opacity: 1;
  --rotate-member: calc(var(--hip-rotation) * 20);
}
.gecko__shoulders .gecko__tail--2 {
  --left: 10;
  --top: 105;
  --transform-origin-x: 50%;
  --transform-origin-y: 26%;
  --transform-origin-opacity: 1;
  --rotate-member: calc(var(--hip-rotation) * 20);
}
.gecko__shoulders .gecko__tail--3 {
  --left: 9;
  --top: 92;
  --transform-origin-x: 50%;
  --transform-origin-y: 26%;
  --transform-origin-opacity: 1;
  --rotate-member: calc(var(--hip-rotation) * 20);
}
.gecko__shoulders .gecko__tail--4 {
  --left: 11;
  --top: 108;
  --transform-origin-x: 50%;
  --transform-origin-y: 26%;
  --transform-origin-opacity: 1;
  --rotate-member: calc(var(--hip-rotation) * 20);
}
.gecko__shoulders .gecko__tail--5 {
  --left: 11;
  --top: 85;
  --transform-origin-x: 50%;
  --transform-origin-y: 26%;
  --transform-origin-opacity: 1;
  --rotate-member: calc(var(--hip-rotation) * 20);
}
.gecko__shoulders .gecko__tail--6 {
  --left: 9;
  --top: 73;
  --transform-origin-x: 50%;
  --transform-origin-y: 26%;
  --transform-origin-opacity: 1;
  --rotate-member: calc(var(--hip-rotation) * 20);
}
.gecko__shoulders .gecko__tail--7 {
  --left: 5;
  --top: 53;
  --transform-origin-x: 50%;
  --transform-origin-y: 26%;
  --transform-origin-opacity: 1;
  --rotate-member: calc(var(--hip-rotation) * 20);
}
.gecko__shoulders .gecko__tail--8 {
  --left: 8;
  --top: 52;
  --transform-origin-x: 50%;
  --transform-origin-y: 26%;
  --transform-origin-opacity: 1;
  --rotate-member: calc(var(--hip-rotation) * 20);
}
.gecko__shoulders .gecko__tail--9 {
  --left: 4;
  --top: 42;
  --transform-origin-x: 50%;
  --transform-origin-y: 15%;
  --transform-origin-opacity: 1;
  --rotate-member: calc(var(--hip-rotation) * 20);
}
.gecko__shoulders .gecko__tail--10 {
  --left: 5;
  --top: 55;
  --transform-origin-x: 50%;
  --transform-origin-y: 19%;
  --transform-origin-opacity: 1;
  --rotate-member: calc(var(--hip-rotation) * 15);
  z-index: -1;
}
.gecko__shoulders .gecko__leg--left {
  --left: -124;
  --top: 49;
  --transform-origin-x: 90%;
  --transform-origin-y: 55%;
  --transform-origin-opacity: 1;
  --scale-member: var(--members-scale);
  --rotate-member: -30;
}
.gecko__shoulders .gecko__shin--left {
  --left: -76;
  --top: 10;
  --transform-origin-x: 87%;
  --transform-origin-y: 22%;
  --transform-origin-opacity: 1;
  --rotate-member: -15;
}
.gecko__shoulders .gecko__foot--left {
  --left: -105;
  --top: 25;
  --transform-origin-x: 82%;
  --transform-origin-y: 42%;
  --transform-origin-opacity: 1;
  --rotate-member: -15;
}
.gecko__shoulders .gecko__leg--right {
  --left: 89;
  --top: 48;
  --transform-origin-x: 10%;
  --transform-origin-y: 55%;
  --transform-origin-opacity: 1;
  --scale-member: var(--members-scale);
  --rotate-member: -20;
}
.gecko__shoulders .gecko__shin--right {
  --left: 160;
  --top: 4;
  --transform-origin-x: 10%;
  --transform-origin-y: 29%;
  --transform-origin-opacity: 1;
  --rotate-member: 50;
}
.gecko__shoulders .gecko__foot--right {
  --left: 58;
  --top: 0;
  --transform-origin-x: 15%;
  --transform-origin-y: 45%;
  --transform-origin-opacity: 1;
  --rotate-member: 5;
}
.gecko__shoulders .gecko__neck__body {
  --left: -15;
  --top: -60;
  --transform-origin-x: 50%;
  --transform-origin-y: 90%;
  --transform-origin-opacity: 1;
  --rotate-member: calc(var(--head-angle) * 1 / 6);
}
.gecko__shoulders .gecko__neck__head {
  --left: -5;
  --top: -54;
  --transform-origin-x: 50%;
  --transform-origin-y: 66%;
  --transform-origin-opacity: 1;
  --rotate-member: calc(var(--head-angle) * 1 / 3);
}
.gecko__shoulders .gecko__head {
  --left: -104;
  --top: -169;
  --transform-origin-x: 50%;
  --transform-origin-y: 65%;
  --transform-origin-opacity: 1;
  --rotate-member: calc(var(--head-angle) * 1 / 2);
}

/* ----------------- GECKO: unique body styles ------------------ */
.gecko__placement--1 {
  --head-x: var(--gecko-1-x);
  --head-y: var(--gecko-1-y);
  z-index: var(--gecko-1-z);
  filter: drop-shadow(calc(var(--creature-unit) / -2.5) 0 calc(var(--creature-unit) / 2) rgba(0, 0, 0, 0.25));
}
.gecko__placement--1 .gecko__shoulders {
  --rotate-member: 80;
}
.gecko__placement--1 .gecko__thorax {
  --rotate-member: 0;
}
.gecko__placement--1 .gecko__arm--right {
  --rotate-member: 30;
  --transform-origin-x: 0%;
  --transform-origin-y: 45%;
}
.gecko__placement--1 .gecko__forearm--right {
  --rotate-member: -50;
}
.gecko__placement--1 .gecko__hand--right {
  --rotate-member: 0;
}
.gecko__placement--1 .gecko__neck__body {
  --top: -62.5;
  --transform-origin-x: 50%;
  --transform-origin-y: 95%;
}
.gecko__placement--1 .gecko__neck__head {
  --transform-origin-x: 45%;
}

.gecko__placement--2 {
  --head-x: var(--gecko-2-x);
  --head-y: var(--gecko-2-y);
  --head-initial-rotation: 90;
  z-index: var(--gecko-2-z);
  filter: drop-shadow(calc(var(--creature-unit) / -2.5) 0 calc(var(--creature-unit) / 2) rgba(0, 0, 0, 0.25));
}
.gecko__placement--2 .gecko {
  --x-offset: 3;
  --y-offset: 0;
}
.gecko__placement--2 .gecko__hips {
  --hip-rotation: -0.5;
}
.gecko__placement--2 .gecko__tail--0 {
  --rotate-member: -4;
}
.gecko__placement--2 .gecko__tail--1,
.gecko__placement--2 .gecko__tail--2,
.gecko__placement--2 .gecko__tail--3,
.gecko__placement--2 .gecko__tail--4,
.gecko__placement--2 .gecko__tail--5,
.gecko__placement--2 .gecko__tail--6,
.gecko__placement--2 .gecko__tail--7 {
  --rotate-member: -5;
}
.gecko__placement--2 .gecko__tail--8 {
  --rotate-member: -4;
}
.gecko__placement--2 .gecko__tail--9 {
  --rotate-member: -3;
}
.gecko__placement--2 .gecko__tail--10 {
  --rotate-member: -2;
}
.gecko__placement--2 .gecko__arm--left {
  --rotate-member: 30;
}
.gecko__placement--2 .gecko__forearm--left {
  --rotate-member: 20;
}
.gecko__placement--2 .gecko__arm--right {
  --rotate-member: -10;
}
.gecko__placement--2 .gecko__forearm--right {
  --rotate-member: -50;
}
.gecko__placement--2 .gecko__hand--right {
  --rotate-member: 0;
}
.gecko__placement--2 .gecko__leg--left {
  --rotate-member: -20;
}
.gecko__placement--2 .gecko__leg--right {
  --rotate-member: -35;
}
.gecko__placement--2 .gecko__shin--right {
  --rotate-member: 70;
}
.gecko__placement--2 .gecko__foot--right {
  --rotate-member: -10;
}

.gecko__placement--3 {
  --head-x: var(--gecko-3-x);
  --head-y: var(--gecko-3-y);
  --is-x-flipped: 1;
  filter: drop-shadow(calc(var(--creature-unit) / -2.5) 0 calc(var(--creature-unit) / 2) rgba(0, 0, 0, 0.25));
  z-index: var(--gecko-3-z);
}
.gecko__placement--3 .gecko {
  --x-offset: 3;
  --y-offset: 0;
}
.gecko__placement--3 .gecko__shoulders {
  --rotate-member: 70;
}
.gecko__placement--3 .gecko__hips {
  --rotate-member: -40;
}
.gecko__placement--3 .gecko__tail--0 {
  --rotate-member: -15;
}
.gecko__placement--3 .gecko__tail--1 {
  --rotate-member: -20;
}
.gecko__placement--3 .gecko__tail--2 {
  --rotate-member: -25;
}
.gecko__placement--3 .gecko__tail--3,
.gecko__placement--3 .gecko__tail--4 {
  --rotate-member: -15;
}
.gecko__placement--3 .gecko__tail--7 {
  --hip-rotation: 1;
  --rotate-member: 0;
}
.gecko__placement--3 .gecko__tail--8,
.gecko__placement--3 .gecko__tail--9,
.gecko__placement--3 .gecko__tail--10 {
  --rotate-member: 12;
}

.gecko__neck__body,
.gecko__neck__head,
.gecko__head {
  will-change: transform;
  transform: translate3d(var(--translate-x-member, 0px), var(--translate-y-member, 0px), 0) rotate3d(0, 0, 1, var(--rotate-member));
  transition: transform var(--gecko-transition-duration, 0.125s) ease-in var(--gecko-transition-delay, 0s);
}

.gecko__neck__body {
  transform: translate3d(var(--translate-x-member, 0px), var(--translate-y-member, 0px), 0) rotate3d(0, 0, 1, calc(var(--body-neck-offset, 30deg) + var(--rotate-member)));
}

/* ---------------------------------------------------------------------- */
/* ------------------------- EXTRA INTERACTIONS ------------------------- */
/* ---------------------------------------------------------------------- */
/* ------------------------ GECKO: tail animation ----------------------- */
.gecko__placement--1 {
  --offset-delay: 3.375s;
  --multiplier: 0.0875;
}

.gecko__placement--2 {
  --offset-delay: 3s;
  --multiplier: 0.1;
}

.gecko__placement--3 {
  --offset-delay: 2s;
  --multiplier: 0.075;
}

.gecko__body-part[class*=gecko__tail] {
  will-change: transform;
  transform-style: preserve-3d;
  animation: inherit;
  animation-delay: calc(var(--offset-delay) + var(--delay, 1) * 1s);
}

.gecko__hips > .gecko__body-part[class*=gecko__tail] {
  --delay: calc(var(--multiplier) * 1);
  animation: flinch 0.75s ease-out forwards;
  animation-delay: calc(var(--offset-delay) + var(--delay, 1) * 1s);
}
.gecko__hips > .gecko__body-part[class*=gecko__tail] > .gecko__body-part[class*=gecko__tail] {
  --delay: calc(var(--multiplier) * 2);
}
.gecko__hips > .gecko__body-part[class*=gecko__tail] > * > .gecko__body-part[class*=gecko__tail] {
  --delay: calc(var(--multiplier) * 3);
}
.gecko__hips > .gecko__body-part[class*=gecko__tail] > * > * > .gecko__body-part[class*=gecko__tail] {
  --delay: calc(var(--multiplier) * 4);
}
.gecko__hips > .gecko__body-part[class*=gecko__tail] > * > * > * > .gecko__body-part[class*=gecko__tail] {
  --delay: calc(var(--multiplier) * 5);
}
.gecko__hips > .gecko__body-part[class*=gecko__tail] > * > * > * > * > .gecko__body-part[class*=gecko__tail] {
  --delay: calc(var(--multiplier) * 6);
}
.gecko__hips > .gecko__body-part[class*=gecko__tail] > * > * > * > * > * > .gecko__body-part[class*=gecko__tail] {
  --delay: calc(var(--multiplier) * 7);
}
.gecko__hips > .gecko__body-part[class*=gecko__tail] > * > * > * > * > * > * > .gecko__body-part[class*=gecko__tail] {
  --delay: calc(var(--multiplier) * 8);
}
.gecko__hips > .gecko__body-part[class*=gecko__tail] > * > * > * > * > * > * > * > .gecko__body-part[class*=gecko__tail] {
  --delay: calc(var(--multiplier) * 9);
}
.gecko__hips > .gecko__body-part[class*=gecko__tail] > * > * > * > * > * > * > * > * > .gecko__body-part[class*=gecko__tail] {
  --delay: calc(var(--multiplier) * 10);
}
.gecko__hips > .gecko__body-part[class*=gecko__tail] > * > * > * > * > * > * > * > * > * > .gecko__body-part[class*=gecko__tail] {
  --delay: calc(var(--multiplier) * 11);
}
@keyframes flinch {
  0% {
    transform: translate3d(var(--translate-x-member, 0px), var(--translate-y-member, 0px), 0) scale3d(var(--scale-member, 1), 1, 1) rotate3d(0, 0, 1, calc(var(--rotate-member, 0) * 1deg));
  }
  50% {
    transform: translate3d(var(--translate-x-member, 0px), var(--translate-y-member, 0px), 0) scale3d(var(--scale-member, 1), 1, 1) rotate3d(0, 0, 1, calc( max(var(--rotate-member, 0), -1 * var(--rotate-member, 0)) * 2.5deg * var(--delay) ));
  }
  100% {
    transform: translate3d(var(--translate-x-member, 0px), var(--translate-y-member, 0px), 0) scale3d(var(--scale-member, 1), 1, 1) rotate3d(0, 0, 1, calc(var(--rotate-member, 0) * 1deg));
  }
}

/* ------------- GECKO: attack body placement and motion limitation ------------ */
:root {
  --creature-unit-percentage: 12%;
  --creature-unit: 1.75vh;
  --gecko-1-x: 1;
  --gecko-1-y: 40;
  --gecko-1-z: 3;
  --gecko-2-x: 70;
  --gecko-2-y: 0;
  --gecko-2-z: 2;
  --gecko-3-x: 100;
  --gecko-3-y: 15;
  --gecko-3-z: 3;
}
:root .gecko__placement--1 {
  --min-head-angle: -80deg;
  --max-head-angle: 45deg;
  --head-x-offset: 21;
  --head-y-offset: -6;
}
:root .gecko__placement--2 {
  --min-head-angle: -55deg;
  --max-head-angle: 70deg;
  --head-angle-intensity: 1.25;
  --head-x-offset: 0;
  --head-y-offset: -15;
}
:root .gecko__placement--3 {
  --min-head-angle: -65deg;
  --max-head-angle: 60deg;
  --head-x-offset: 3;
  --head-y-offset: 9;
}
:root [class*=gecko-trap-] > .gecko-attack-area {
  display: none;
}
:root [class*=_base] > .gecko-attack-area {
  display: block;
}
@media screen and (min-width: 200vh) {
  :root {
    --creature-unit: min(1.875vh, 0.625vw);
    --gecko-1-x: 9;
    --gecko-1-y: 42.5;
    --gecko-2-x: 70;
    --gecko-2-y: 0;
    --gecko-3-x: 97.5;
    --gecko-3-y: 30;
  }
  :root .gecko__placement--1 .gecko__arm--left {
    --left: -75;
    --top: 15;
    --rotate-member: 5;
    --transform-origin-x: 50%;
    --transform-origin-y: 40%;
  }
  :root .gecko__placement--1 .gecko__forearm--left {
    --rotate-member: 50;
  }
  :root .gecko__placement--1 .gecko__hand--left {
    --rotate-member: -35;
    --transform-origin-x: 75%;
  }
  :root .gecko__placement--2 {
    --head-angle-intensity: 1;
    --head-y-offset: -21;
  }
  :root [class*=gecko-trap-] > .gecko-attack-area {
    display: none;
  }
  :root [class*=_min200] > .gecko-attack-area {
    display: block;
  }
}
@media screen and (min-width: 250vh) {
  :root {
    --creature-unit: max(1.75vh, 0.5vw);
  }
  :root .gecko__placement--1 {
    --head-angle-correction: 5deg;
  }
  :root .gecko__placement--2 {
    --head-angle-intensity: 1.25;
    --head-angle-correction: 5deg;
  }
  :root .gecko__placement--3 {
    --head-angle-correction: 5deg;
  }
  :root [class*=gecko-trap-] > .gecko-attack-area {
    display: none;
  }
  :root [class*=_min250] > .gecko-attack-area {
    display: block;
  }
}
@media screen and (min-width: 300vh) {
  :root .gecko__placement--1 {
    --head-angle-intensity: 0.875;
    --head-angle-correction: 5deg;
  }
  :root .gecko__placement--2 {
    --head-angle-intensity: 1.5;
  }
  :root [class*=gecko-trap-] > .gecko-attack-area {
    display: none;
  }
  :root [class*=_min300] > .gecko-attack-area {
    display: block;
  }
}
@media screen and (min-width: 350vh) {
  :root .gecko__placement--1 {
    --head-angle-correction: 0deg;
  }
  :root .gecko__placement--2 {
    --head-angle-correction: 5deg;
    --head-x-offset: 12;
    --head-y-offset: -24;
  }
  :root .gecko__placement--3 {
    --head-angle-correction: 0deg;
  }
  :root [class*=gecko-trap-] > .gecko-attack-area {
    display: none;
  }
  :root [class*=_min350] > .gecko-attack-area {
    display: block;
  }
}
@media screen and (min-width: 450vh) {
  :root {
    --creature-unit: max(2dvh, calc(100dvw / 33 * 0.15));
  }
  :root [class*=gecko-trap-] > .gecko-attack-area {
    display: none;
  }
  :root [class*=_min450] > .gecko-attack-area {
    display: block;
  }
}
@media screen and (max-width: 166vh) {
  :root {
    --gecko-1-x: 1.25;
    --gecko-1-y: 45;
    --gecko-1-z: 1;
    --gecko-2-x: 65.75;
    --gecko-2-y: 0;
    --gecko-3-x: 100;
    --gecko-3-y: 17.5;
  }
  :root .gecko__placement--1 .gecko__arm--left {
    --left: -75;
    --top: 15;
    --rotate-member: 5;
    --transform-origin-x: 50%;
    --transform-origin-y: 40%;
  }
  :root .gecko__placement--1 .gecko__forearm--left {
    --rotate-member: 50;
  }
  :root .gecko__placement--1 .gecko__hand--left {
    --rotate-member: -35;
    --transform-origin-x: 75%;
  }
  :root [class*=gecko-trap-] > .gecko-attack-area {
    display: none;
  }
  :root [class*=_max166] > .gecko-attack-area {
    display: block;
  }
}
@media screen and (max-width: 150vh) {
  :root {
    --creature-unit: 1.625vh;
    --gecko-1-x: 2.5;
    --gecko-1-y: 45;
    --gecko-2-x: 61.5;
    --gecko-2-y: 0;
    --gecko-3-x: 100;
    --gecko-3-y: 20;
  }
  :root [class*=gecko-trap-] > .gecko-attack-area {
    display: none;
  }
  :root [class*=_max150] > .gecko-attack-area {
    display: block;
  }
}
@media screen and (max-width: 125vh) {
  :root {
    --creature-unit: 1.5vh;
    --gecko-1-x: 3.75;
    --gecko-1-y: 45;
    --gecko-2-x: 80;
    --gecko-2-y: 0;
    --gecko-3-x: 100;
    --gecko-3-y: 55;
    --gecko-3-z: 1;
  }
  :root .gecko__placement--1 {
    --head-x-offset: 0;
    --head-y-offset: -9;
  }
  :root .gecko__placement--3 {
    --head-x-offset: 21;
    --head-y-offset: 6;
  }
  :root [class*=gecko-trap-] > .gecko-attack-area {
    display: none;
  }
  :root [class*=_max125] > .gecko-attack-area {
    display: block;
  }
}
@media screen and (max-width: 100vh) {
  :root {
    --creature-unit: 1.33vh;
    --gecko-1-x: 5;
    --gecko-1-y: 30;
    --gecko-1-z: 3;
    --gecko-2-x: 75;
    --gecko-2-y: 0;
    --gecko-3-x: 100;
    --gecko-3-y: 55;
  }
  :root .gecko__placement--1 {
    --head-x-offset: -9;
  }
  :root .gecko__placement--2 {
    --head-x-offset: 6;
    --head-y-offset: -12;
  }
  :root .gecko__placement--3 {
    --head-x-offset: 24;
    --head-y-offset: -4;
  }
  :root [class*=gecko-trap-] > .gecko-attack-area {
    display: none;
  }
  :root [class*=_max100] > .gecko-attack-area {
    display: block;
  }
}
@media screen and (max-width: 75vh) {
  :root {
    --gecko-1-x: 5;
    --gecko-1-y: 25;
    --gecko-1-z: 3;
    --gecko-2-x: 80;
    --gecko-2-y: 0;
    --gecko-3-x: 100;
    --gecko-3-y: 62.5;
  }
  :root [class*=gecko-trap-] > .gecko-attack-area {
    display: none;
  }
  :root [class*=_max75] > .gecko-attack-area {
    display: block;
  }
}
@media screen and (max-width: 66.6vh) {
  :root {
    --creature-unit: 1.25vh;
    --gecko-1-x: 5;
    --gecko-1-y: 62.5;
    --gecko-1-z: 3;
    --gecko-2-x: 70;
    --gecko-2-y: 0;
    --gecko-3-x: 100;
    --gecko-3-y: 40;
  }
  :root .gecko__placement--1 {
    --head-x-offset: -15;
    --head-y-offset: -5;
  }
  :root .gecko__placement--2 {
    --head-angle-correction: 10deg;
    --head-x-offset: 0;
    --head-y-offset: -6;
  }
  :root .gecko__placement--3 {
    --head-angle-intensity: 2;
    --head-x-offset: 6;
    --head-y-offset: 3;
  }
  :root [class*=gecko-trap-] > .gecko-attack-area {
    display: none;
  }
  :root [class*=_max66] > .gecko-attack-area {
    display: block;
  }
}
@media screen and (max-width: 50vh) {
  :root {
    --creature-unit: 1vh;
    --gecko-1-x: 5;
    --gecko-1-y: 30;
    --gecko-1-z: 3;
    --gecko-2-x: 65;
    --gecko-2-y: 0;
    --gecko-3-x: 103.5;
    --gecko-3-y: 67.5;
  }
  :root .gecko__placement--1 {
    --head-angle-intensity: 1.5;
  }
  :root .gecko__placement--2 {
    --head-angle-correction: 0deg;
    --head-x-offset: 18;
    --head-y-offset: -3;
  }
  :root .gecko__placement--3 {
    --head-angle-intensity: 3;
  }
  :root [class*=gecko-trap-] > .gecko-attack-area {
    display: none;
  }
  :root [class*=_max50] > .gecko-attack-area {
    display: block;
  }
}

/* --------------- GECKO & FLY: (restart) attack animation -------------- */
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) {
  --gecko-transition-duration: 0.075s;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) td:is(:hover, .hover) {
  position: absolute;
  top: 0;
  left: 0;
  width: 200vmax;
  height: 200vmax;
  transform: translate(-50%, -50%);
  z-index: 1000000;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .fly {
  --wing-speed: 0s;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 {
  --head-angle-correction: -10deg;
  --head-x-offset: 12;
  --head-y-offset: 0;
  /* reset tail animation */
}
@media screen and (min-width: 200vh) {
  body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 {
    --head-angle-correction: -15deg;
  }
}
@media screen and (min-width: 250vh) {
  body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 {
    --head-x-offset: 6;
    --head-angle-intensity: 0.875;
  }
}
@media screen and (min-width: 300vh) {
  body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 {
    --head-angle-correction: -10deg;
    --head-angle-intensity: 0.625;
    --head-x-offset: 24;
    --head-y-offset: 9;
  }
}
@media screen and (max-width: 150vh) {
  body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 {
    --head-angle-correction: -10deg;
    --head-angle-intensity: 1.1;
    --head-x-offset: 12;
    --head-y-offset: 9;
  }
}
@media screen and (max-width: 125vh) {
  body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 {
    --head-angle-intensity: 1.25;
  }
}
@media screen and (max-width: 100vh) {
  body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 {
    --head-angle-intensity: 1.5;
    --head-x-offset: 30;
    --head-y-offset: 15;
  }
}
@media screen and (max-width: 75vh) {
  body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 {
    --head-angle-correction: -10deg;
    --head-angle-intensity: 1.75;
    --head-x-offset: 36;
  }
}
@media screen and (max-width: 66.6vh) {
  body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 {
    --head-angle-intensity: 2;
  }
}
@media screen and (max-width: 50vh) {
  body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 {
    --head-x-offset: 42;
    --head-angle-intensity: 2.375;
    --head-angle-correction: -10deg;
  }
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__shoulders {
  --translate-x-member: calc(var(--creature-unit-percentage) * 2.5);
  --translate-y-member: calc(var(--creature-unit-percentage) * -1.667);
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__shoulders > svg {
  animation: eat__shoulders 0.125s ease-in-out forwards 0.25s;
  animation-iteration-count: 2;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__ribs {
  --rotate-member: calc(-1 * var(--torso) * 25);
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__back {
  --rotate-member: calc(-1 * var(--torso) * 14);
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__hips {
  --rotate-member: calc(var(--hip-rotation) * var(--torso) * 30);
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__arm--left {
  --rotate-member: -62;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__forearm--left {
  --rotate-member: 15;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__hand--left {
  --rotate-member: 42;
  --translate-x-member: calc(var(--creature-unit-percentage) * -0.25);
  --translate-y-member: calc(var(--creature-unit-percentage) * 0.5);
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__arm--right {
  --rotate-member: 16;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__forearm--right {
  --rotate-member: 43;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__hand--right {
  --rotate-member: -72;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__leg--left {
  --rotate-member: -76;
  --translate-x-member: calc(var(--creature-unit-percentage) * -1.25);
  --translate-y-member: calc(var(--creature-unit-percentage) * -0.25);
  z-index: -1;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__shin--left {
  --rotate-member: 26;
  --translate-x-member: calc(var(--creature-unit-percentage) * -1.25);
  --translate-y-member: calc(var(--creature-unit-percentage) * 0.25);
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__foot--left {
  --rotate-member: -23;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__leg--right {
  --rotate-member: -10;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__shin--right {
  --rotate-member: 35;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__foot--right {
  --rotate-member: -3;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 :is(.gecko__tail--3, .gecko__tail--4, .gecko__tail--5) {
  --rotate-member: -22.5;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 :is(.gecko__tail--6, .gecko__tail--7, .gecko__tail--8, .gecko__tail--9) {
  --rotate-member: -15;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__tail--10 {
  --rotate-member: -15;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__neck__body {
  --body-neck-offset: 15deg;
  --translate-x-member: calc(var(--creature-unit-percentage) * 0.625);
  --translate-y-member: calc(var(--creature-unit-percentage) * -0.25);
  --transform-origin-x: 50%;
  --transform-origin-y: 80%;
  --rotate-member: calc(var(--head-angle) * 1 / 2);
  animation: eat__neck__body 0.125s ease-in-out backwards 0.2s;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__neck__head {
  --rotate-member: calc(var(--head-angle) * 1 / 3);
  animation: eat__neck__head 0.125s ease-in-out backwards 0.2s;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__head {
  --translate-y-member: calc(var(--creature-unit-percentage) * 0.25);
  --rotate-member: calc(var(--head-angle) * 1 / 6);
  animation: eat__head 0.125s ease-in-out backwards 0.2s;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__body-part[class*=gecko__tail] {
  animation: none;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .restart-screen {
  animation: finish__use-restart-screen 1ms linear forwards 0.625s;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .fly__wrapper {
  z-index: 0;
  animation: eat__fly 0.0625s ease-in-out forwards 0.2s, reset-fly 1ms linear forwards 0.625s;
  transition: none;
}
body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement {
  animation: reset-gecko 1ms linear forwards 0.625s;
}
@media screen and (min-width: 200vh) {
  body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__arm--left {
    --rotate-member: -40;
    --translate-x-member: calc(var(--creature-unit-percentage) * 0.5);
    --translate-y-member: calc(var(--creature-unit-percentage) * 2.5);
  }
  body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__forearm--left {
    --rotate-member: 79;
  }
  body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__hand--left {
    --rotate-member: -17;
    --transform-origin-x: 50%;
  }
}
@media screen and (max-width: 166vh) {
  body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__arm--left {
    --rotate-member: -40;
    --translate-x-member: calc(var(--creature-unit-percentage) * 0.5);
    --translate-y-member: calc(var(--creature-unit-percentage) * 2.5);
  }
  body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__forearm--left {
    --rotate-member: 79;
  }
  body:has(:is(.gecko-trap-1_base,
    .gecko-trap-1_min200,
    .gecko-trap-1_min250,
    .gecko-trap-1_min300,
    .gecko-trap-1_min350,
    .gecko-trap-1_min450,
    .gecko-trap-1_max166,
    .gecko-trap-1_max150,
    .gecko-trap-1_max125,
    .gecko-trap-1_max100,
    .gecko-trap-1_max75,
    .gecko-trap-1_max66,
    .gecko-trap-1_max50) span:is(:hover, .hover)) .gecko__placement--1 .gecko__hand--left {
    --rotate-member: -17;
    --transform-origin-x: 50%;
  }
}

body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) {
  --gecko-transition-duration: 0.075s;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) td:is(:hover, .hover) {
  position: absolute;
  top: 0;
  left: 0;
  width: 200vmax;
  height: 200vmax;
  transform: translate(-50%, -50%);
  z-index: 1000000;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .fly {
  --wing-speed: 0s;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 {
  --head-x-offset: 15;
  --head-y-offset: -24;
  --head-angle-intensity: 1.1;
  --head-angle-correction: -5deg;
  /* reset tail animation */
}
@media screen and (min-width: 250vh) {
  body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 {
    --head-y-offset: -30;
    --head-angle-intensity: 1;
  }
}
@media screen and (min-width: 300vh) {
  body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 {
    --head-angle-intensity: 0.875;
  }
}
@media screen and (max-width: 150vh) {
  body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 {
    --head-angle-intensity: 1;
  }
}
@media screen and (max-width: 125vh) {
  body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 {
    --head-x-offset: 24;
    --head-angle-intensity: 0.75;
    --head-angle-correction: -10deg;
  }
}
@media screen and (max-width: 100vh) {
  body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 {
    --head-x-offset: 12;
    --head-y-offset: -6;
    --head-angle-intensity: 1.25;
  }
}
@media screen and (max-width: 75vh) {
  body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 {
    --head-x-offset: 15;
    --head-angle-intensity: 1.125;
  }
}
@media screen and (max-width: 66.6vh) {
  body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 {
    --head-x-offset: 21;
    --head-angle-correction: -10deg;
  }
}
@media screen and (max-width: 50vh) {
  body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 {
    --head-x-offset: 15;
    --head-angle-intensity: 0.75;
  }
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__shoulders {
  --rotate-member: 65;
  --translate-x-member: calc(var(--creature-unit-percentage) * 3);
  --translate-y-member: calc(var(--creature-unit-percentage) * 0.667);
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__shoulders > svg {
  animation: eat__shoulders 0.125s ease-in-out forwards 0.25s;
  animation-iteration-count: 2;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__ribs {
  --rotate-member: calc(-1 * var(--torso) * 25);
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__back {
  --rotate-member: calc(-1 * var(--torso) * 14);
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__hips {
  --rotate-member: calc(var(--hip-rotation) * var(--torso) * 30);
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__arm--left {
  --rotate-member: -5;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__forearm--left {
  --rotate-member: 25;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__hand--left {
  --rotate-member: 5;
  --translate-x-member: calc(var(--creature-unit-percentage) * -0.25);
  --translate-y-member: calc(var(--creature-unit-percentage) * 0.25);
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__arm--right {
  --rotate-member: 29.5;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__forearm--right {
  --rotate-member: -63;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__hand--right {
  --rotate-member: -29;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__leg--left {
  --rotate-member: -42;
  z-index: -1;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__shin--left {
  --rotate-member: -10;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__foot--left {
  --rotate-member: -10;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__leg--right {
  --rotate-member: -45;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__shin--right {
  --rotate-member: 60;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__foot--right {
  --rotate-member: 0;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 :is(.gecko__tail--1,
          .gecko__tail--2,
          .gecko__tail--3,
          .gecko__tail--4,
          .gecko__tail--5,
          .gecko__tail--6) {
  --rotate-member: -7.5;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__tail--7 {
  --rotate-member: -5;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__tail--8 {
  --rotate-member: -3.75;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__tail--9,
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__tail--10 {
  --rotate-member: -2.5;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__neck__body {
  --body-neck-offset: 15deg;
  --translate-x-member: calc(var(--creature-unit-percentage) * 0.625);
  --translate-y-member: calc(var(--creature-unit-percentage) * -0.25);
  --transform-origin-x: 50%;
  --transform-origin-y: 80%;
  --rotate-member: calc(var(--head-angle) * 1 / 2);
  animation: eat__neck__body 0.125s ease-in-out backwards 0.2s;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__neck__head {
  --rotate-member: calc(var(--head-angle) * 1 / 3);
  animation: eat__neck__head 0.125s ease-in-out backwards 0.2s;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__head {
  --translate-y-member: calc(var(--creature-unit-percentage) * 0.25);
  --rotate-member: calc(var(--head-angle) * 1 / 6);
  animation: eat__head 0.125s ease-in-out backwards 0.2s;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement--2 .gecko__body-part[class*=gecko__tail] {
  animation: none;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .restart-screen {
  animation: finish__use-restart-screen 1ms linear forwards 0.625s;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .fly__wrapper {
  z-index: 0;
  animation: eat__fly 0.125s ease-in-out forwards 0.2s, reset-fly 1ms linear forwards 0.625s;
  transition: none;
}
body:has(:is(.gecko-trap-2_base,
    .gecko-trap-2_min200,
    .gecko-trap-2_min250,
    .gecko-trap-2_min300,
    .gecko-trap-2_min350,
    .gecko-trap-2_min450,
    .gecko-trap-2_max166,
    .gecko-trap-2_max150,
    .gecko-trap-2_max125,
    .gecko-trap-2_max100,
    .gecko-trap-2_max75,
    .gecko-trap-2_max66,
    .gecko-trap-2_max50) span:is(:hover, .hover)) .gecko__placement {
  animation: reset-gecko 1ms linear forwards 0.625s;
}

body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) {
  --gecko-transition-duration: 0.075s;
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) td:is(:hover, .hover) {
  position: absolute;
  top: 0;
  left: 0;
  width: 200vmax;
  height: 200vmax;
  transform: translate(-50%, -50%);
  z-index: 1000000;
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .fly {
  --wing-speed: 0s;
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 {
  --head-angle-intensity: 1.1;
  --head-angle-correction: -15deg;
  /* reset tail animation */
}
@media screen and (min-width: 250vh) {
  body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 {
    --head-angle-intensity: 1;
  }
}
@media screen and (min-width: 300vh) {
  body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 {
    --head-angle-intensity: 0.875;
  }
}
@media screen and (max-width: 150vh) {
  body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 {
    --head-angle-intensity: 1.25;
    --head-angle-correction: -15deg;
  }
}
@media screen and (max-width: 125vh) {
  body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 {
    --head-angle-intensity: 1.625;
  }
}
@media screen and (max-width: 100vh) {
  body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 {
    --head-angle-intensity: 2.125;
    --head-angle-correction: -30deg;
  }
}
@media screen and (max-width: 75vh) {
  body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 {
    --head-angle-intensity: 2.5;
  }
}
@media screen and (max-width: 66.6vh) {
  body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 {
    --head-angle-intensity: 2.625;
    --head-angle-correction: -25deg;
    --head-y-offset: -3;
  }
}
@media screen and (max-width: 50vh) {
  body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 {
    --head-angle-intensity: 3.5;
    --head-angle-correction: -27.5deg;
  }
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 .gecko__shoulders {
  --translate-x-member: calc(var(--creature-unit-percentage) * 4);
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 .gecko__shoulders > svg {
  animation: eat__shoulders 0.125s ease-in-out forwards 0.25s;
  animation-iteration-count: 2;
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 .gecko__ribs {
  --rotate-member: calc(-1 * var(--torso) * 25);
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 .gecko__back {
  --rotate-member: calc(-1 * var(--torso) * 14);
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 .gecko__hips {
  --rotate-member: calc(var(--hip-rotation) * var(--torso) * 30);
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 .gecko__arm--left {
  --rotate-member: -61;
  --translate-y-member: calc(var(--creature-unit-percentage) * 1.25);
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 .gecko__forearm--left {
  --rotate-member: 15;
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 .gecko__hand--left {
  --rotate-member: 34;
  --translate-x-member: calc(var(--creature-unit-percentage) * -0.25);
  --translate-y-member: calc(var(--creature-unit-percentage) * 0.25);
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 .gecko__arm--right {
  --rotate-member: -10;
  --translate-x-member: calc(var(--creature-unit-percentage) * -0.25);
  --translate-y-member: calc(var(--creature-unit-percentage) * -0.5);
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 .gecko__forearm--right {
  --rotate-member: 41;
  --translate-x-member: calc(var(--creature-unit-percentage) * 0.25);
  --translate-y-member: calc(var(--creature-unit-percentage) * 0.25);
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 .gecko__hand--right {
  --rotate-member: -95;
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 .gecko__leg--left {
  --rotate-member: -65;
  --translate-x-member: calc(var(--creature-unit-percentage) * -0.5);
  z-index: -1;
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 .gecko__shin--left {
  --rotate-member: 25;
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 .gecko__foot--left {
  --rotate-member: -37.5;
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 .gecko__leg--right {
  --rotate-member: -35;
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 .gecko__shin--right {
  --rotate-member: 65;
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 .gecko__foot--right {
  --rotate-member: -10;
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 :is(.gecko__tail--1,
          .gecko__tail--2,
          .gecko__tail--3,
          .gecko__tail--4,
          .gecko__tail--5) {
  --rotate-member: -15;
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 :is(.gecko__tail--6,
          .gecko__tail--7,
          .gecko__tail--8,
          .gecko__tail--9,
          .gecko__tail--10) {
  --rotate-member: -10;
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 .gecko__neck__body {
  --body-neck-offset: 15deg;
  --translate-x-member: calc(var(--creature-unit-percentage) * 0.625);
  --translate-y-member: calc(var(--creature-unit-percentage) * -0.25);
  --transform-origin-x: 50%;
  --transform-origin-y: 80%;
  --rotate-member: calc(var(--head-angle) * 1 / 2);
  animation: eat__neck__body 0.125s ease-in-out backwards 0.2s;
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 .gecko__neck__head {
  --rotate-member: calc(var(--head-angle) * 1 / 3);
  animation: eat__neck__head 0.125s ease-in-out backwards 0.2s;
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 .gecko__head {
  --translate-y-member: calc(var(--creature-unit-percentage) * 0.25);
  --rotate-member: calc(var(--head-angle) * 1 / 6);
  animation: eat__head 0.125s ease-in-out backwards 0.2s;
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement--3 .gecko__body-part[class*=gecko__tail] {
  animation: none;
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .restart-screen {
  animation: finish__use-restart-screen 1ms linear forwards 0.625s;
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .fly__wrapper {
  z-index: 0;
  animation: eat__fly 0.0625s ease-in-out forwards 0.2s, reset-fly 1ms linear forwards 0.625s;
  transition: none;
}
body:has(:is(.gecko-trap-3_base,
    .gecko-trap-3_min200,
    .gecko-trap-3_min250,
    .gecko-trap-3_min300,
    .gecko-trap-3_min350,
    .gecko-trap-3_min450,
    .gecko-trap-3_max166,
    .gecko-trap-3_max150,
    .gecko-trap-3_max125,
    .gecko-trap-3_max100,
    .gecko-trap-3_max75,
    .gecko-trap-3_max66,
    .gecko-trap-3_max50) span:is(:hover, .hover)) .gecko__placement {
  animation: reset-gecko 1ms linear forwards 0.625s;
}

/* ----------- GECKO & FLY: (restart) post-attack logic and animation ---------- */
.restart-screen {
  display: grid;
  place-items: center;
  cursor: crosshair;
}
.restart-screen:is(:hover, .hover) {
  z-index: 999999999;
}
.restart-screen:is(:hover, .hover) .restart-area {
  animation: start-pulsing-restart-area 1ms linear forwards 1s, pulse-restart-area 1s ease-out infinite 1s;
}
body:has(.restart-screen:is(:hover, .hover)) {
  --gecko-transition-duration: 1s;
}
.restart-screen .restart-area {
  flex: none;
  position: relative;
  margin: auto;
  background-color: transparent;
  width: 33vmin;
  height: 33vmin;
  border-radius: 50%;
  box-shadow: inset 0 0 15vmin skyblue;
  transition: all 0s linear;
  opacity: 0.25;
  margin-top: 100dvh;
  box-sizing: border-box;
}
.restart-screen .restart-area:is(:hover, .hover) {
  margin-top: auto;
  width: 100vmin;
  height: 100vmin;
  opacity: 0;
  border-radius: 0;
  animation: none;
}
.restart-screen:has(.restart-area:is(:hover, .hover)) {
  animation: restart-screen-hover 1ms linear forwards 0.375s;
}
body:has(.restart-screen > .restart-area:is(:hover, .hover)) .fly__wrapper {
  transition: all 0.375s ease-out, rotate 0.375s linear;
  --x: 50;
  --y: 50;
  transform: none;
  rotate: -50deg;
  z-index: 4;
}

@keyframes restart-screen-hover {
  to {
    z-index: 0;
  }
}
@keyframes start-pulsing-restart-area {
  to {
    margin-top: auto;
  }
}
@keyframes pulse-restart-area {
  0% {
    transform: scale(0.5);
    opacity: 0.25;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
/* target browsers: */
@supports (-webkit-appearance: none) and (stroke-color: transparent) {
  /* CSS rules for Safari */
  body {
    --gecko-transition-delay: 0.1s;
    --gecko-transition-duration: 0.25s;
    cursor: crosshair;
  }
}
@supports (-moz-appearance: none) {
  /* CSS rules for Firefox */
  body {
    --gecko-transition-delay: 0.1s;
    --gecko-transition-duration: 0.25s;
    cursor: crosshair;
  }

  .gecko__placement--3 {
    /* flip shadow direction on FF */
    filter: drop-shadow(calc(var(--creature-unit) / 2.5) 0 calc(var(--creature-unit) / 3) rgba(0, 0, 0, 0.25));
  }
}
/* Input device */
@media (hover: none) and (pointer: coarse) {
  /* CSS rules for touch-only devices */
  body:has(.gecko-attack-area:is(:hover, .hover)) .restart-screen .restart-area {
    margin-top: auto;
    pointer-events: none;
    opacity: 0;
    animation: start-pulsing-restart-area 1ms linear forwards 1s, pulse-restart-area 1s ease-out infinite 1s;
  }
  body:has(.gecko-attack-area:is(:hover, .hover)) .fly__wrapper {
    opacity: 0;
    --x: 80;
    --y: 130;
    rotate: -180deg;
    animation: none;
  }

  body:has(.restart-screen:is(:hover, .hover)) .position-aware-container .gecko__placement {
    --x: 48;
    --y: 60;
  }
  body:has(.restart-screen:is(:hover, .hover)) .position-aware-container .gecko__placement .gecko__body-part {
    animation: none !important;
  }
  body:has(.restart-screen:is(:hover, .hover)) .fly__wrapper {
    transition: none;
    --x: 80;
    --y: 130;
    rotate: -180deg;
  }

  body:has(.restart-screen > .restart-area:is(:hover, .hover)) .gecko__placement {
    --x: 50;
    --y: 50;
  }
  body:has(.restart-screen > .restart-area:is(:hover, .hover)) .fly__wrapper {
    transition: all 0.375s ease-out, rotate 0.375s linear;
    --x: 50;
    --y: 50;
    transform: none;
    rotate: -50deg;
    z-index: 4;
  }

  .gecko__neck__body,
.gecko__neck__head,
.gecko__head {
    --gecko-transition-duration: 0.25s;
  }
}
@media (hover: hover) and (pointer: fine) {
  /* CSS rules for mouse and trackpad devices */
  /* Chrome Desktop */
  @supports (-webkit-appearance: none) {
    /* CSS for Chrome and Edge */
    body .tip-wrapper {
      display: none;
    }
  }
  @supports (-webkit-appearance: none) and (stroke-color: transparent) {
    /* CSS rules for Safari */
    body .tip-wrapper {
      display: flex;
    }
  }
  @supports (-moz-appearance: none) {
    /* CSS rules for Firefox */
    body .tip-wrapper {
      display: flex;
    }
    body .tip-wrapper .tip span:first-child {
      font-size: 2em;
      height: 1.25em;
      padding: 0 0.375em;
    }
  }
}
@keyframes eat__shoulders {
  to {
    transform: translateY(calc(var(--creature-unit-percentage) * -0.125));
  }
}
@keyframes eat__neck__body {
  to {
    --translate-y-member: calc(var(--creature-unit-percentage) * -0.375);
  }
}
@keyframes eat__neck__head {
  to {
    --translate-y-member: calc(var(--creature-unit-percentage) * -0.5);
  }
}
@keyframes eat__head {
  to {
    --translate-y-member: calc(var(--creature-unit-percentage) * -0.25);
  }
}
@keyframes eat__fly {
  to {
    opacity: 0;
  }
}
@keyframes reset-fly {
  to {
    --x: 80;
    --y: 130;
    rotate: -180deg;
  }
}
@keyframes reset-gecko {
  to {
    --x: 48;
    --y: 35;
  }
}
@keyframes finish__use-restart-screen {
  to {
    z-index: 999999999;
  }
}
/* ------------------------------------------------------------ */
/* ------------------------ Preload CSS ----------------------- */
/* ------------------------------------------------------------ */
body {
  display: block !important;
}</style>

  </head>
    
  <body>
  <div class="fullscreen start-screen" tabindex="0"></div>
<div class="fullscreen welcome-screen" tabindex="0">
  <h1>Welcome to
    <big> <strong>Curious Geckos</strong></big>
  </h1>
  <h2 class="touch">Touch to start</h2>
  <h2 class="hover">Hover to start</h2>
  <h2 class="tab-only"><small> <small>"Please use a mouse, a track pad, or your mobile device"</small></small></h2>
</div>
<div class="fullscreen restart-screen" tabindex="0">
  <div class="restart-area"></div>
</div>
<div class="fullscreen position-aware-container" tabindex="0">
  <table class="fullscreen position-aware-grid" tabindex="0">
    <tbody>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_base"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_min450"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max166"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_base"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_min450"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max75"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_max75"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_max75"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_max75"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max166"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_max150"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_min250"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_min300"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max75"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max75"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_max75"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max166 gecko-trap-3_max150"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_min250"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_min300"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max75"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max166 gecko-trap-3_max150"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_min250"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_min300"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_min350"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max100"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max166 gecko-trap-3_max150"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_min200 gecko-trap-3_min250"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_min300"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_min350"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_base"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_min450"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max100"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max50"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max50"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max166"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_base"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_min200"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_min300"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_min350"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-2_max66"><span class="gecko-attack-area"></span>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_base"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_min450"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_min200 gecko-trap-1_min250 gecko-trap-1_max166"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max100"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max75 gecko-trap-1_max50"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_max50"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max50"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max50"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max100 gecko-trap-2_max50"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-2_min200"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max166"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_min350 gecko-trap-2_max50"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_min200 gecko-trap-2_max50"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_base"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_min200"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max50"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max50"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-2_max125 gecko-trap-2_max100 gecko-trap-2_max66"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max66"><span class="gecko-attack-area"></span>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_min350 gecko-trap-1_max166"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_min200 gecko-trap-1_min250 gecko-trap-1_min300 gecko-trap-1_max166 gecko-trap-1_max150"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_max166 gecko-trap-1_max150"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_max125"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max100"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max75 gecko-trap-1_max50"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_max50"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max66"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-2_max100 gecko-trap-2_max50"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max50"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max50"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max50"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_max166"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_min350"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_min250"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_min300"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_min350"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-2_max100"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max125 gecko-trap-2_max75"><span class="gecko-attack-area"></span>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_min300 gecko-trap-1_min350"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_min250 gecko-trap-1_min300 gecko-trap-1_max150"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_max166 gecko-trap-1_max150"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max125"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max100"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max75"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_max50"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max150"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-2_max66"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max66"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max100 gecko-trap-2_max66"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_min250 gecko-trap-2_max125 gecko-trap-2_max66"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max166"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_min250"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_min250 gecko-trap-3_min300"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_min350 gecko-trap-3_min450"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-2_max100"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-2_max125 gecko-trap-2_max75"><span class="gecko-attack-area"></span>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_min350"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_min300"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_max166"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max125"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_max100"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_max75"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_max75"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_max75"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_max66"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_max66"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_max66"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-2_min250 gecko-trap-2_min300 gecko-trap-2_min350 gecko-trap-2_max100 gecko-trap-2_max66"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max125 gecko-trap-2_max66"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max66"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_min200 gecko-trap-2_min350 gecko-trap-2_max66"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_min300 gecko-trap-2_max66"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_min250 gecko-trap-3_min300"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_min350 gecko-trap-3_min450"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max100"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-2_max125 gecko-trap-2_max75"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max75"><span class="gecko-attack-area"></span>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_base gecko-trap-1_min350"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_min300"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_min250 gecko-trap-1_max166"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max125"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max66"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_max66"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max166"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-2_min300"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max125 gecko-trap-2_max100"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max100 gecko-trap-2_max75"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_base gecko-trap-2_min250 gecko-trap-2_min350 gecko-trap-2_max100 gecko-trap-2_max75"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_base gecko-trap-2_min300 gecko-trap-2_max100 gecko-trap-2_max75"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_base gecko-trap-2_max100 gecko-trap-2_max75"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_min200 gecko-trap-3_min250"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_min300 gecko-trap-3_min450"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max75"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max75"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max125"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_base gecko-trap-1_min350"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_min300"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_min200 gecko-trap-1_min250 gecko-trap-1_max166"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max125"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-2_max150"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max166"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-2_min250 gecko-trap-2_min300 gecko-trap-2_max150"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_min300 gecko-trap-2_min350"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max125"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_min250 gecko-trap-2_min300 gecko-trap-2_max125"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_min250 gecko-trap-2_max166 gecko-trap-2_max125"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_min200 gecko-trap-3_min250"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_min300"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max125"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_base gecko-trap-1_min350"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_min300"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_min200 gecko-trap-1_min250 gecko-trap-1_max166 gecko-trap-1_max150"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max125"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-2_max150"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max166"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-2_min250 gecko-trap-2_max150"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_min250 gecko-trap-2_min300 gecko-trap-2_min350"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_base gecko-trap-2_min250 gecko-trap-2_min350"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_base gecko-trap-2_min250 gecko-trap-2_min300"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max166"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max125"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_min200"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_min300"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_base"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_base gecko-trap-1_min350"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_min300"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_min200 gecko-trap-1_min250 gecko-trap-1_max166 gecko-trap-1_max150"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max125"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-2_max166 gecko-trap-2_max150"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_max166 gecko-trap-2_max150"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_max75"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_max125"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_base gecko-trap-2_min250 gecko-trap-2_min300 gecko-trap-2_min350"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_base gecko-trap-2_max166"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_min300"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_base"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_min350"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_min200 gecko-trap-1_min250 gecko-trap-1_min300"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_max166 gecko-trap-1_max150"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max125"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-2_max166"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_max125"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_base gecko-trap-2_min300 gecko-trap-2_min350 gecko-trap-2_max166"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_base"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_min300"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_base"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_min200 gecko-trap-1_min250 gecko-trap-1_min300 gecko-trap-1_max166 gecko-trap-1_max150"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max100"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max125"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_min300"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_min300 gecko-trap-1_max166"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_min200 gecko-trap-1_min250 gecko-trap-1_min300 gecko-trap-1_max166"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max75"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max100"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max125"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_min450"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_min300 gecko-trap-1_max166"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_min250"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max66"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_max66"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_max75 gecko-trap-3_max50"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_max50"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max100"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max125"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-2_min450"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max66"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_max75 gecko-trap-3_max50"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_max50"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max100"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_max125"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max66"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-1_max66"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max100"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_max125 gecko-trap-3_max100"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_max125"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-1_max66"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_max75"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max50"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max75"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max50"><span class="gecko-attack-area"></span>
        </td>
        <td class="gecko-trap-3_max75"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max75"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td class="gecko-trap-3_max75"><span class="gecko-attack-area"></span>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="fly__wrapper">
    <div class="fly">
      <div class="fly__head"></div>
      <div class="fly__body"></div>
      <div class="fly__wing fly__wing--left"></div>
      <div class="fly__wing fly__wing--right"></div>
    </div>
  </div>
  <div class="gecko__placement gecko__placement--2">
    <div class="gecko">
      <div class="gecko__body-part gecko__shoulders" style="--width: 164; --height: 201">
        <div class="gecko__body-part gecko__ribs" style="--width: 174; --height: 319">
          <svg viewBox="0 0 174 319">
            <path fill="#E3C651" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M162 104C174 46 131 1 87 1 33 1-11 48 4 104c16 60 17 72 0 133s38 83 83 81c41-3 101-16 82-79-21-67-19-78-7-135Z"></path>
            <path fill="url('#scales--2')" data-scales="" d="M162 104C174 46 131 1 87 1 33 1-11 48 4 104c16 60 17 72 0 133s38 83 83 81c41-3 101-16 82-79-21-67-19-78-7-135Z"></path>
          </svg>
          <div class="gecko__body-part gecko__back" style="--width: 199; --height: 575">
            <svg viewBox="0 0 199 575">
              <path fill="#DDC04E" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M147 83C111-30 86-23 50 83 4 221-27 344 37 468c65 127 82 155 137-1 56-156 1-295-27-384Z"></path>
              <path fill="none" d="M119 400c4 12-20 10-29 1-5-6 14 7 21 0 6-5-23-4-18-12 4-7 12-5 18-9 8-5-30 3-18-4 12-6 32-7 26 4-3 7-18 10-18 10s15 3 18 10Zm-24-38c12 5 25 2 25 2v-6s-15 5-10-3c2-4 9-2 10-6 5-9-37 6-25 13Zm1-16c11-4 23 1 25-8 1-5-9 6-14-2-3-5 16-7 10-10s-9-2-14 7c-2 5 3-4-8-5s-6 20 1 18Zm-9-25c-9 6 25 4 30-3 4-5-11 1-13-4s16-9 10-12c-5-3-3 4-10 6-8 2-10-7-14-3-6 6 10 8 9 12-1 6-7 0-12 4Z"></path>
              <path fill="none" d="M90 299c10 6 12 5 24-4 5-4 1-14-5-14-6-1 4 11-1 12-9 1-3-9-8-10-5-2 4 15-4 13-7-1-1-11-6-12-6-2-6 11 0 15Zm11-35c-6 8-18 6-15 12 3 5 12 0 12 0s19 4 17-3c-1-5-10 2-12-3-4-7 17-3 13-9-6-7-21-8-30 2-4 6 20-7 15 1Z"></path>
              <path fill="none" d="M87 235c-7-1-5 23 3 21 4-1-2-7 1-8 9-6 31 9 25 1s-8-5-20-6c-12 0-3-8-9-8Zm-5-7c6 7 44 12 32 1-5-5-7 1-14 0-9-2-24-8-18-1Z"></path>
              <path fill="none" d="M83 217c10 11 33 12 32-4-1-6-3-11-9-9-5 1 4 9 0 12-9 4-4-10-9-10s2 13-5 11c-10-3 2-12-3-11-6 1-10 7-6 11Zm-1-22c-13 10 42 9 29-1-5-3-18 1-13-4 5-4 9-3 13-6 12-12-45-8-32 1 8 5 13-11 15-3 2 5-6 8-12 13Z"></path>
              <path fill="none" d="M78 165c-1 9 7 15 12 8 2-4-12-1-5-11 9-10 26 22 27 10 0-18 1-24-9-23-9 1 7 15 0 13-5-1-4-5-8-8-9-6-16 1-17 11Z"></path>
              <path fill="url('#belly')" d="M147 83C111-30 86-23 50 83 4 221-27 344 37 468c65 127 82 155 137-1 56-156 1-295-27-384Z"></path>
              <path fill="url('#scales--2')" data-scales="" d="M147 83C111-30 86-23 50 83 4 221-27 344 37 468c65 127 82 155 137-1 56-156 1-295-27-384Z"></path>
            </svg>
            <div class="gecko__body-part gecko__hips" style="--width: 164; --height: 215">
              <div class="gecko__body-part gecko__tail--0" style="--width: 142; --height: 286">
                <div class="gecko__body-part gecko__tail--1" style="--width: 142; --height: 218">
                  <div class="gecko__body-part gecko__tail--2" style="--width: 122; --height: 206">
                    <div class="gecko__body-part gecko__tail--3" style="--width: 102; --height: 192">
                      <div class="gecko__body-part gecko__tail--4" style="--width: 84; --height: 162">
                        <div class="gecko__body-part gecko__tail--5" style="--width: 71; --height: 130">
                          <div class="gecko__body-part gecko__tail--6" style="--width: 56; --height: 102">
                            <div class="gecko__body-part gecko__tail--7" style="--width: 51; --height: 97">
                              <div class="gecko__body-part gecko__tail--8" style="--width: 40; --height: 81">
                                <div class="gecko__body-part gecko__tail--9" style="--width: 33; --height: 98">
                                  <div class="gecko__body-part gecko__tail--10" style="--width: 25; --height: 111">
                                    <svg viewBox="0 0 25 111">
                                      <path fill="#6D501D" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M2 29c6 41 6 81 14 81 7-1 3-38 8-82C27-5-4-11 2 29Z"></path>
                                      <path fill="url('#belly')" d="M2 29c6 41 6 81 14 81 7-1 3-38 8-82C27-5-4-11 2 29Z"></path>
                                      <path fill="url('#scales--2')" data-scales="" d="M2 29c6 41 6 81 14 81 7-1 3-38 8-82C27-5-4-11 2 29Z"></path>
                                    </svg>
                                  </div>
                                  <svg viewBox="0 0 33 98">
                                    <path fill="#735620" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M3 49c4 31 3 48 14 48 12 0 10-13 13-46C34 9 31 0 16 1 0 1-2 11 3 49Z"></path>
                                    <path fill="url('#belly')" d="M3 49c4 31 3 48 14 48 12 0 10-13 13-46C34 9 31 0 16 1 0 1-2 11 3 49Z"></path>
                                    <path fill="url('#scales--2')" data-scales="" d="M3 49c4 31 3 48 14 48 12 0 10-13 13-46C34 9 31 0 16 1 0 1-2 11 3 49Z"></path>
                                  </svg>
                                </div>
                                <svg viewBox="0 0 40 81">
                                  <path fill="#795C22" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M2 32c3 43 9 47 19 48 11 1 16-2 18-42C40 8 43 1 21 1 1 1-1 4 2 32Z"></path>
                                  <path fill="url('#belly')" d="M2 32c3 43 9 47 19 48 11 1 16-2 18-42C40 8 43 1 21 1 1 1-1 4 2 32Z"></path>
                                  <path fill="url('#scales--2')" data-scales="" d="M2 32c3 43 9 47 19 48 11 1 16-2 18-42C40 8 43 1 21 1 1 1-1 4 2 32Z"></path>
                                </svg>
                              </div>
                              <svg viewBox="0 0 51 97">
                                <path fill="#7F6225" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M4 46c5 34 6 52 26 50 20-3 16-15 18-50 2-30 7-44-20-45S-2 8 4 46Z"></path>
                                <path fill="url('#belly')" d="M4 46c5 34 6 52 26 50 20-3 16-15 18-50 2-30 7-44-20-45S-2 8 4 46Z"></path>
                                <path fill="url('#scales--2')" data-scales="" d="M4 46c5 34 6 52 26 50 20-3 16-15 18-50 2-30 7-44-20-45S-2 8 4 46Z"></path>
                              </svg>
                            </div>
                            <svg viewBox="0 0 56 102">
                              <path fill="#856828" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M2 43c5 47 6 58 30 58 23 0 22-13 23-55 1-35 2-44-25-45S-1 15 2 43Z"></path>
                              <path fill="url('#belly')" d="M2 43c5 47 6 58 30 58 23 0 22-13 23-55 1-35 2-44-25-45S-1 15 2 43Z"></path>
                              <path fill="url('#scales--2')" data-scales="" d="M2 43c5 47 6 58 30 58 23 0 22-13 23-55 1-35 2-44-25-45S-1 15 2 43Z"></path>
                            </svg>
                          </div>
                          <svg viewBox="0 0 71 130">
                            <path fill="#8C6F2C" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M2 57c6 43 12 72 38 72s23-17 29-75C73 8 56-3 30 2 3 6-2 23 2 57Z"></path>
                            <path fill="url('#belly')" d="M2 57c6 43 12 72 38 72s23-17 29-75C73 8 56-3 30 2 3 6-2 23 2 57Z"></path>
                            <path fill="url('#scales--2')" data-scales="" d="M2 57c6 43 12 72 38 72s23-17 29-75C73 8 56-3 30 2 3 6-2 23 2 57Z"></path>
                          </svg>
                        </div>
                        <svg viewBox="0 0 84 162">
                          <path fill="#92752D" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M5 79c8 47 1 83 40 82 38 0 35-19 38-97C85 9 69 0 38 1 5 3-5 25 5 79Z"></path>
                          <path fill="url('#belly')" d="M5 79c8 47 1 83 40 82 38 0 35-19 38-97C85 9 69 0 38 1 5 3-5 25 5 79Z"></path>
                          <path fill="url('#scales--2')" data-scales="" d="M5 79c8 47 1 83 40 82 38 0 35-19 38-97C85 9 69 0 38 1 5 3-5 25 5 79Z"></path>
                        </svg>
                      </div>
                      <svg viewBox="0 0 102 192">
                        <path fill="#987B30" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M6 101c9 69 5 90 49 90 43-1 37-15 43-95 6-68 11-93-46-95C-4 0-3 32 6 101Z"></path>
                        <path fill="url('#belly')" d="M6 101c9 69 5 90 49 90 43-1 37-15 43-95 6-68 11-93-46-95C-4 0-3 32 6 101Z"></path>
                        <path fill="url('#scales--2')" data-scales="" d="M6 101c9 69 5 90 49 90 43-1 37-15 43-95 6-68 11-93-46-95C-4 0-3 32 6 101Z"></path>
                      </svg>
                    </div>
                    <svg viewBox="0 0 122 206">
                      <path fill="#9E8133" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M3 88c13 106 28 117 61 117 32-1 40-8 54-111 11-83-4-89-50-93C21-3-7 5 3 88Z"></path>
                      <path fill="url('#belly')" d="M3 88c13 106 28 117 61 117 32-1 40-8 54-111 11-83-4-89-50-93C21-3-7 5 3 88Z"></path>
                      <path fill="url('#scales--2')" data-scales="" d="M3 88c13 106 28 117 61 117 32-1 40-8 54-111 11-83-4-89-50-93C21-3-7 5 3 88Z"></path>
                    </svg>
                  </div>
                  <svg viewBox="0 0 142 218">
                    <path fill="#A48736" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M2 90c7 107 26 127 74 127 48-1 51-30 62-125 8-67 3-92-57-91C20 1-3 6 2 90Z"></path>
                    <path fill="url('#belly')" d="M2 90c7 107 26 127 74 127 48-1 51-30 62-125 8-67 3-92-57-91C20 1-3 6 2 90Z"></path>
                    <path fill="url('#scales--2')" data-scales="" d="M2 90c7 107 26 127 74 127 48-1 51-30 62-125 8-67 3-92-57-91C20 1-3 6 2 90Z"></path>
                  </svg>
                </div>
                <svg viewBox="0 0 142 286">
                  <path fill="#AA8D38" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M141 162C138 56 107-1 75 1 44 3 2 120 1 178c-1 83-5 108 66 107 70-1 77-15 74-123Z"></path>
                  <path fill="url('#belly')" d="M141 162C138 56 107-1 75 1 44 3 2 120 1 178c-1 83-5 108 66 107 70-1 77-15 74-123Z"></path>
                  <path fill="url('#scales--2')" data-scales="" d="M141 162C138 56 107-1 75 1 44 3 2 120 1 178c-1 83-5 108 66 107 70-1 77-15 74-123Z"></path>
                </svg>
              </div>
              <div class="gecko__body-part gecko__leg--left" style="--width: 201; --height: 114">
                <div class="gecko__body-part gecko__shin--left" style="--width: 131; --height: 143">
                  <div class="gecko__body-part gecko__foot--left" style="--width: 162; --height: 211">
                    <svg viewBox="0 0 162 211">
                      <path fill="#B1953B" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M148 162c-4-12-8-39 7-54 10-9 6-21 0-30-9-12-18-7-27-10-2-7-4-10 2-29 8-26-8-28-8-28l-2-9-4 8s-17 4-6 36c2 7 4 26-17 1-22-25-38-14-38-14l-13-6 10 12s-2 20 29 27c12 3 4 30-24 26-41-5-42 12-42 12l-14 7c4 2 15 3 15 3s5 20 60-4c32-11 17 9-3 17-31 12-38 28-34 38l-11 17c3-4 17-10 17-10s11 19 51-36c21-29 42-19 25 18s6 41 6 41l4 14c4-17 2-5 5-14 15 0 14-22 12-33Z"></path>
                      <path fill="url('#scales--2')" data-scales="" d="M148 162c-4-12-8-39 7-54 10-9 6-21 0-30-9-12-18-7-27-10-2-7-4-10 2-29 8-26-8-28-8-28l-2-9-4 8s-17 4-6 36c2 7 4 26-17 1-22-25-38-14-38-14l-13-6 10 12s-2 20 29 27c12 3 4 30-24 26-41-5-42 12-42 12l-14 7c4 2 15 3 15 3s5 20 60-4c32-11 17 9-3 17-31 12-38 28-34 38l-11 17c3-4 17-10 17-10s11 19 51-36c21-29 42-19 25 18s6 41 6 41l4 14c4-17 2-5 5-14 15 0 14-22 12-33Z"></path>
                    </svg>
                  </div>
                  <svg viewBox="0 0 131 143">
                    <path fill="#B79B3E" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M102 64c4-12 18-1 27-31 5-17-8-40-33-29-15 7-43 41-58 69-16 28-10 14-28 24-29 16 16 61 37 40 21-22 50-56 55-73Z"></path>
                    <path fill="url('#scales--2')" data-scales="" d="M102 64c4-12 18-1 27-31 5-17-8-40-33-29-15 7-43 41-58 69-16 28-10 14-28 24-29 16 16 61 37 40 21-22 50-56 55-73Z"></path>
                  </svg>
                </div>
                <svg viewBox="0 0 201 114">
                  <path fill="#BDA141" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M140 111c51 14 96-65 17-99C113-7 62 2 27 11c-38 16-31 59-1 62 22 1 23 0 36 9 21 14 55 23 78 29Z"></path>
                  <path fill="url('#scales--2')" data-scales="" d="M140 111c51 14 96-65 17-99C113-7 62 2 27 11c-38 16-31 59-1 62 22 1 23 0 36 9 21 14 55 23 78 29Z"></path>
                </svg>
              </div>
              <div class="gecko__body-part gecko__leg--right" style="--width: 211; --height: 105">
                <div class="gecko__body-part gecko__shin--right" style="--width: 107; --height: 130">
                  <div class="gecko__body-part gecko__foot--right" style="--width: 174; --height: 229">
                    <svg viewBox="0 0 174 229">
                      <path fill="#C3A743" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M37 60c1 6 0 14-3 15-14 7-19 2-28 16-8 14-5 19 14 39-17 63-28 64-10 84l4 13 8-13c14-5 17-26 14-54s19-41 34-10c12 26 27 56 42 46l13 7-6-13s17-12-31-48c-23-17-5-43 24-27 35 17 47-7 47-7l13-5-13-6c-10-14-19-10-45-4-25 6-43-7-23-15 16-6 35-19 29-31 4-8 9-13 9-13l-16 5c-6-6-17-7-33 21-8 13-29 19-21-4 8-22 9-34-2-39V3c-5 9-5 9-10 13-23 14-10 33-10 44Z"></path>
                      <path fill="url('#scales--2')" data-scales="" d="M37 60c1 6 0 14-3 15-14 7-19 2-28 16-8 14-5 19 14 39-17 63-28 64-10 84l4 13 8-13c14-5 17-26 14-54s19-41 34-10c12 26 27 56 42 46l13 7-6-13s17-12-31-48c-23-17-5-43 24-27 35 17 47-7 47-7l13-5-13-6c-10-14-19-10-45-4-25 6-43-7-23-15 16-6 35-19 29-31 4-8 9-13 9-13l-16 5c-6-6-17-7-33 21-8 13-29 19-21-4 8-22 9-34-2-39V3c-5 9-5 9-10 13-23 14-10 33-10 44Z"></path>
                    </svg>
                  </div>
                  <svg viewBox="0 0 107 130">
                    <path fill="#CAAD45" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M97 83C78 62 52 15 35 5 18-6 2 9 1 30s21 24 23 35c11 37 29 35 48 59 6 7 25 7 31-5 6-10 3-26-6-36Z"></path>
                    <path fill="url('#scales--2')" data-scales="" d="M97 83C78 62 52 15 35 5 18-6 2 9 1 30s21 24 23 35c11 37 29 35 48 59 6 7 25 7 31-5 6-10 3-26-6-36Z"></path>
                  </svg>
                </div>
                <svg viewBox="0 0 211 105">
                  <path fill="#D0B349" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M199 13C184-5 134 2 96 4 56 7 7 17 2 50s11 60 60 52c49-7 60-40 123-34 33 4 29-37 14-55Z"></path>
                  <path fill="url('#scales--2')" data-scales="" d="M199 13C184-5 134 2 96 4 56 7 7 17 2 50s11 60 60 52c49-7 60-40 123-34 33 4 29-37 14-55Z"></path>
                </svg>
              </div>
              <svg viewBox="0 0 164 215">
                <path fill="#D7BA4A" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M157 71C138 32 169 1 83 1-5 1 25 48 6 77c-18 28 12 78 37 107 31 37 49 43 78 0 26-39 55-71 36-113Z"></path>
                <path fill="url('#scales--2')" data-scales="" d="M157 71C138 32 169 1 83 1-5 1 25 48 6 77c-18 28 12 78 37 107 31 37 49 43 78 0 26-39 55-71 36-113Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="gecko__body-part gecko__thorax" style="--width: 181; --height: 171">
          <svg viewBox="0 0 181 171">
            <path fill="#D0B349" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M167 143c17-26 17-58 0-88C139 5 77-30 22 41c-15 19-35 54-8 98 28 45 133 36 153 4Z"></path>
            <path fill="url('#scales--2')" data-scales="" d="M167 143c17-26 17-58 0-88C139 5 77-30 22 41c-15 19-35 54-8 98 28 45 133 36 153 4Z"></path>
          </svg>
          <div class="gecko__body-part gecko__arm--left" style="--width: 138; --height: 104">
            <div class="gecko__body-part gecko__forearm--left" style="--width: 101; --height: 64">
              <div class="gecko__body-part gecko__hand--left" style="--width: 136; --height: 131">
                <svg viewBox="0 0 136 131">
                  <path fill="#B1953B" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M56 118c29-19 36-12 48-10s27-21 17-29c-8-7-15-10-3-20 21-18 19-24 14-28l3-12-11 5c-10-4-15 10-16 16-7 17-16 28-17 6 4-31-6-39-14-38l-7-7s-2 2-3 9c-9 10 3 27 5 31s8 36-6 6C56 17 44 11 36 18l-10-6c1 6 3 5 4 12-4 16 12 24 19 29 5 4 8 10 9 13 4 8 0 6-11-4-16-23-29-27-36-21L1 39s-1 3 5 10C5 69 34 73 38 75s37 22 9 25c-23 3-31 10-32 14l-9 4 12 7c7 9 22 4 38-7Z"></path>
                  <path fill="url('#scales--2')" data-scales="" d="M56 118c29-19 36-12 48-10s27-21 17-29c-8-7-15-10-3-20 21-18 19-24 14-28l3-12-11 5c-10-4-15 10-16 16-7 17-16 28-17 6 4-31-6-39-14-38l-7-7s-2 2-3 9c-9 10 3 27 5 31s8 36-6 6C56 17 44 11 36 18l-10-6c1 6 3 5 4 12-4 16 12 24 19 29 5 4 8 10 9 13 4 8 0 6-11-4-16-23-29-27-36-21L1 39s-1 3 5 10C5 69 34 73 38 75s37 22 9 25c-23 3-31 10-32 14l-9 4 12 7c7 9 22 4 38-7Z"></path>
                </svg>
              </div>
              <svg viewBox="0 0 101 64">
                <path fill="#B79B3E" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M87 63c10-3 15-9 13-24-1-9-10-15-19-23C67 5 54 7 40 5 23 3 18-5 6 10c-9 12-4 23 1 25 6 1 60 34 80 28Z"></path>
                <path fill="url('#scales--2')" data-scales="" d="M87 63c10-3 15-9 13-24-1-9-10-15-19-23C67 5 54 7 40 5 23 3 18-5 6 10c-9 12-4 23 1 25 6 1 60 34 80 28Z"></path>
              </svg>
            </div>
            <svg viewBox="0 0 138 104">
              <path fill="#D0B349" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M63 74c7-4 17-4 21-4 0 0 11 7 19 8 25 1 43-34 29-56-7-11-14-24-32-20-16 2-30 22-42 28-23 11-30 20-42 26-27 12-13 51 6 47 18-4 32-25 41-29Z"></path>
              <path fill="url('#scales--2')" data-scales="" d="M63 74c7-4 17-4 21-4 0 0 11 7 19 8 25 1 43-34 29-56-7-11-14-24-32-20-16 2-30 22-42 28-23 11-30 20-42 26-27 12-13 51 6 47 18-4 32-25 41-29Z"></path>
            </svg>
          </div>
          <div class="gecko__body-part gecko__arm--right" style="--width: 140; --height: 105">
            <div class="gecko__body-part gecko__forearm--right" style="--width: 109; --height: 75">
              <div class="gecko__body-part gecko__hand--right" style="--width: 148; --height: 159">
                <svg viewBox="0 0 148 159">
                  <path fill="#B1953B" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M8 79c-13 11-5 28 4 32 8 5 8 2 17 3 14 1 21 3 34 19 14 35 26 19 26 19l11 6-7-10s16-10-21-32c-13-16 5-17 23-15 34 13 40-8 40-8l11-4-12-3s-3-17-41-4c-16 2-41 1-6-15 41-9 30-25 30-25l7-10-11 3s-10-12-37 17c-28 19-28 10-9-7 22-17 10-27 10-27l4-11-9 7S57 7 50 34c-2 10-23 34-22 15 2-30-5-37-10-37L15 2l-3 10c-15 5-4 31-1 35 4 5 12 31-3 32Z"></path>
                  <path fill="url('#scales--2')" data-scales="" d="M8 79c-13 11-5 28 4 32 8 5 8 2 17 3 14 1 21 3 34 19 14 35 26 19 26 19l11 6-7-10s16-10-21-32c-13-16 5-17 23-15 34 13 40-8 40-8l11-4-12-3s-3-17-41-4c-16 2-41 1-6-15 41-9 30-25 30-25l7-10-11 3s-10-12-37 17c-28 19-28 10-9-7 22-17 10-27 10-27l4-11-9 7S57 7 50 34c-2 10-23 34-22 15 2-30-5-37-10-37L15 2l-3 10c-15 5-4 31-1 35 4 5 12 31-3 32Z"></path>
                </svg>
              </div>
              <svg viewBox="0 0 109 75">
                <path fill="#B79B3E" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M18 20C5 22-4 43 4 57c11 19 27 23 56 8 16-9 36-25 43-30 13-10 1-35-23-34-17 0-36 14-62 19Z"></path>
                <path fill="url('#scales--2')" data-scales="" d="M18 20C5 22-4 43 4 57c11 19 27 23 56 8 16-9 36-25 43-30 13-10 1-35-23-34-17 0-36 14-62 19Z"></path>
              </svg>
            </div>
            <svg viewBox="0 0 140 105">
              <path fill="#D0B349" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M102 47C81 43 62 23 41 8 5-21-17 40 20 67c8 6 22 9 34 8 11-1 12 1 26 12 21 16 34 19 45 17 26-5 12-50-23-57Z"></path>
              <path fill="url('#scales--2')" data-scales="" d="M102 47C81 43 62 23 41 8 5-21-17 40 20 67c8 6 22 9 34 8 11-1 12 1 26 12 21 16 34 19 45 17 26-5 12-50-23-57Z"></path>
            </svg>
          </div>
        </div>
        <svg viewBox="0 0 164 201">
          <path fill="#EFD157" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M163 71c-2-20-17-39-27-48C107-5 75-3 37 9 0 20 0 66 1 80c1 15 5 27 17 75 16 66 127 54 133 2 6-45 14-66 12-86Z"></path>
          <path fill="url('#scales--2')" data-scales="" d="M163 71c-2-20-17-39-27-48C107-5 75-3 37 9 0 20 0 66 1 80c1 15 5 27 17 75 16 66 127 54 133 2 6-45 14-66 12-86Z"></path>
        </svg>
        <div class="gecko__body-part gecko__neck__body" style="--width: 154; --height: 176">
          <svg viewBox="0 0 154 176">
            <path fill="#F5D758" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M140 136c27-46 7-97-11-113C98-5 58-8 23 23 1 42-7 104 11 140c18 37 94 58 129-4Z"></path>
            <path fill="url('#scales--2')" data-scales="" d="M140 136c27-46 7-97-11-113C98-5 58-8 23 23 1 42-7 104 11 140c18 37 94 58 129-4Z"></path>
          </svg>
          <div class="gecko__body-part gecko__neck__head" style="--width: 164; --height: 203">
            <svg viewBox="0 0 164 203">
              <path fill="#F7DD5B" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M151 158c25-87 8-110-12-133-31-35-87-29-116 0C-7 55-2 95 13 168c11 51 123 44 138-10Z"></path>
              <path fill="url('#scales--2')" data-scales="" d="M151 158c25-87 8-110-12-133-31-35-87-29-116 0C-7 55-2 95 13 168c11 51 123 44 138-10Z"></path>
            </svg>
            <div class="gecko__body-part gecko__head" style="--width: 367; --height: 371">
              <svg viewBox="0 0 371 374" fill="none">
                <path fill="#F9E35D" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M208 334c-39 4-63 10-103-46-19-28-35-99 4-145 6-21 7-30 21-50 5-33 28-75 57-76s53 54 55 60l7 20c12 15 13 24 19 40 29 23 35 84 17 118-15 26-38 76-77 79Z"></path>
                <path fill="url('#scales--2')" data-scales="" d="M208 334c-39 4-63 10-103-46-19-28-35-99 4-145 6-21 7-30 21-50 5-33 28-75 57-76s53 54 55 60l7 20c12 15 13 24 19 40 29 23 35 84 17 118-15 26-38 76-77 79Z"></path>
                <path fill="#FDFD87" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M119 141c18-21 34-61 27-61-4 0-15 2-27 21-9 12-11 33 0 40Z"></path>
                <path fill="url('#scales--2')" data-scales="" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M119 141c18-21 34-61 27-61-4 0-15 2-27 21-9 12-11 33 0 40Z"></path>
                <path fill="url(#eye-gradient-0)" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path fill="url(#eye-gradient-0)" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path fill="url(#eye-gradient-1)" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path fill="url(#eye-gradient-1)" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path fill="url(#eye-gradient-2)" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path fill="url(#eye-gradient-2)" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path fill="#FDFD87" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M113 136c12 20 47-58 33-58-8 0-4 7-15 27-13 24-22 26-18 31Z"></path>
                <path fill="url('#scales--2')" data-scales="" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M113 136c12 20 47-58 33-58-8 0-4 7-15 27-13 24-22 26-18 31Z"></path>
                <path fill="#F4D753" d="M116 143c47 22 75-40 39-64-11-8-6 3-19 28-16 32-28 32-20 36Z"></path>
                <path fill="url('#scales--2')" data-scales="" d="M116 143c47 22 75-40 39-64-11-8-6 3-19 28-16 32-28 32-20 36Z"></path>
                <path fill="#FDFD87" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M256 139c-20-19-37-63-30-60 6 3 14 2 28 20 8 12 13 28 2 40Z"></path>
                <path fill="url('#scales--2')" data-scales="" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M256 139c-20-19-37-63-30-60 6 3 14 2 28 20 8 12 13 28 2 40Z"></path>
                <path fill="url(#eye-gradient-3)" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path fill="url(#eye-gradient-3)" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path fill="url(#eye-gradient-4)" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path fill="url(#eye-gradient-4)" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path fill="url(#eye-gradient-5)" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path fill="url(#eye-gradient-5)" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path fill="#FDFD87" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M260 138c-14 19-51-59-37-60 8 0 1 8 13 28 14 23 30 24 24 32Z"></path>
                <path fill="url('#scales--2')" data-scales="" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M260 138c-14 19-51-59-37-60 8 0 1 8 13 28 14 23 30 24 24 32Z"></path>
                <path fill="#F4D753" d="M254 145c-44 17-75-38-39-64 13-10 4 3 18 27 17 31 37 31 21 37Z"></path>
                <path fill="url('#scales--2')" data-scales="" d="M254 145c-44 17-75-38-39-64 13-10 4 3 18 27 17 31 37 31 21 37Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="gecko__placement gecko__placement--1">
    <div class="gecko">
      <div class="gecko__body-part gecko__shoulders" style="--width: 164; --height: 201">
        <div class="gecko__body-part gecko__ribs" style="--width: 174; --height: 319">
          <svg viewBox="0 0 174 319">
            <path fill="#BFABDD" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M162 104C174 46 131 1 87 1 33 1-11 48 4 104c16 60 17 72 0 133s38 83 83 81c41-3 101-16 82-79-21-67-19-78-7-135Z"></path>
            <path fill="url('#scales--1')" data-scales="" d="M162 104C174 46 131 1 87 1 33 1-11 48 4 104c16 60 17 72 0 133s38 83 83 81c41-3 101-16 82-79-21-67-19-78-7-135Z"></path>
            <path data-leopard-spot="" fill="#221b0b" d="M144 163c4-1 5-4 5-8 0-1-1-6-13-11-11-5-15 3-11 4 2 1 3 4 4 7l2 4c1 3 9 5 13 4Zm2-36c5-1 7 4 2 8-1 2-2 1-4 0l-2-1c-2 0-2-6 4-7Zm-2-18c6 3 9 5 10 1 2-4 1-7-3-7-5 0-10 1-8 5l1 1Z"></path>
          </svg>
          <div class="gecko__body-part gecko__back" style="--width: 199; --height: 575">
            <svg viewBox="0 0 199 575">
              <path fill="#B9A5D8" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M147 83C111-30 86-23 50 83 4 221-27 344 37 468c65 127 82 155 137-1 56-156 1-295-27-384Z"></path>
              <path fill="none" d="M119 400c4 12-20 10-29 1-5-6 14 7 21 0 6-5-23-4-18-12 4-7 12-5 18-9 8-5-30 3-18-4 12-6 32-7 26 4-3 7-18 10-18 10s15 3 18 10Zm-24-38c12 5 25 2 25 2v-6s-15 5-10-3c2-4 9-2 10-6 5-9-37 6-25 13Zm1-16c11-4 23 1 25-8 1-5-9 6-14-2-3-5 16-7 10-10s-9-2-14 7c-2 5 3-4-8-5s-6 20 1 18Zm-9-25c-9 6 25 4 30-3 4-5-11 1-13-4s16-9 10-12c-5-3-3 4-10 6-8 2-10-7-14-3-6 6 10 8 9 12-1 6-7 0-12 4Z"></path>
              <path fill="none" d="M90 299c10 6 12 5 24-4 5-4 1-14-5-14-6-1 4 11-1 12-9 1-3-9-8-10-5-2 4 15-4 13-7-1-1-11-6-12-6-2-6 11 0 15Zm11-35c-6 8-18 6-15 12 3 5 12 0 12 0s19 4 17-3c-1-5-10 2-12-3-4-7 17-3 13-9-6-7-21-8-30 2-4 6 20-7 15 1Z"></path>
              <path fill="none" d="M87 235c-7-1-5 23 3 21 4-1-2-7 1-8 9-6 31 9 25 1s-8-5-20-6c-12 0-3-8-9-8Zm-5-7c6 7 44 12 32 1-5-5-7 1-14 0-9-2-24-8-18-1Z"></path>
              <path fill="none" d="M83 217c10 11 33 12 32-4-1-6-3-11-9-9-5 1 4 9 0 12-9 4-4-10-9-10s2 13-5 11c-10-3 2-12-3-11-6 1-10 7-6 11Zm-1-22c-13 10 42 9 29-1-5-3-18 1-13-4 5-4 9-3 13-6 12-12-45-8-32 1 8 5 13-11 15-3 2 5-6 8-12 13Z"></path>
              <path fill="none" d="M78 165c-1 9 7 15 12 8 2-4-12-1-5-11 9-10 26 22 27 10 0-18 1-24-9-23-9 1 7 15 0 13-5-1-4-5-8-8-9-6-16 1-17 11Z"></path>
              <path fill="url('#scales--1')" data-scales="" d="M147 83C111-30 86-23 50 83 4 221-27 344 37 468c65 127 82 155 137-1 56-156 1-295-27-384Z"></path>
              <path data-leopard-spot="" fill="#221b0b" d="M160 121a147 147 0 0 0-36 17c-7 3-6-4-4-10 0-4 1-8-1-8-5-1-17 18-3 31 10 9 24 7 36 5l17-2h1l-2-6-12-2c-9-1-17-2-19-4-1-3 5-4 11-6l14-5-2-10Zm20 70c-3 0-8 0-14-12-3-7-11-4-20-1-6 3-13 5-19 5s-11 29-3 28c3 0 8-2 13-5 10-4 23-10 29-7l11 8 8 6-5-22ZM24 440c7 4 16 5 17 0 0-5-2-6-4-8-2-1-4-3 0-11l1-2c3-5 9-17 6-27-10-26-14-24-21-20l-7 3c-4 1-7 3-9 6l2 12 3-1c25-7 14 13 7 27l-2 2 7 19ZM2 347l3 8c3 5 16 1 12-8s-1-14 2-19 6-10 6-21l-1-7c-2-6-4-12-2-21 4-15-1-19-5-22s-7-5-5-15c4-17 8-18 11-19 2-1 5-2 8-20 1-7-4-12-8-17l-3-3c-8 33-15 65-17 97 2 3 5 6 5 14s-3 13-5 18l-2 5 1 30Zm23-181c3 4 12 9 18 5 5-3 6-6 7-8l4-6c3-2 3-9 4-14l2-9c3-6 1-10-1-14-2-2-3-5-2-8 1-5-5-12-11-16l-6 19v16c-6 19-9 22-12 21l-3 14Zm112 170c-3-10 2-14 32-29 30-14 23 9 11 9-24 0-32 28-3 20 9-3 19 9 18 19-2 12-12 16-21 20-8 3-16 6-16 14 0 6 6 8 13 11 8 3 18 6 15 18-5 24-51 9-25 3 26-5 12-15-15-15-23 0-12-41-2-46 6-3 11-2 16-1 6 2 11 3 12-4 2-9-3-9-11-8s-19 3-24-11Zm52-66c-2 15-34 40-45 29-8-9-15-12-20-14-7-3-12-5-15-16-4-12 2-17 11-23 5-4 11-8 15-14 5-7 40-1 49 10 9 12-6 13-13 6-19-19-36 25-23 31 16 8 23 2 30-3 4-4 7-6 11-6ZM35 297c5 50 12 107 46 107l7 7c8 9 9 10 28-7 5-5 3-9 1-13-3-4-6-9 0-19 11-18 14-52-13-80-31-32-15-49-4-61 5-5 9-10 8-14-1-6 0-11 2-17 2-9 4-18-3-30l-6-14c-3-8-4-10-20-10-13 0-16 5-28 33l-8 17c-10 21-14 64-10 101ZM60 68c-8 9-6 12-1 19 4 5 10 12 12 25 15 5 14 0 14-5 0-3-1-6 1-8l6-3c3 0 6 0 8-9 4-15-9-21-14-19-8 3-13 1-17 0-4-2-6-3-9 0Z"></path>
              <path fill="url('#belly')" d="M147 83C111-30 86-23 50 83 4 221-27 344 37 468c65 127 82 155 137-1 56-156 1-295-27-384Z"></path>
            </svg>
            <div class="gecko__body-part gecko__hips" style="--width: 164; --height: 215">
              <div class="gecko__body-part gecko__tail--0" style="--width: 142; --height: 286">
                <div class="gecko__body-part gecko__tail--1" style="--width: 142; --height: 218">
                  <div class="gecko__body-part gecko__tail--2" style="--width: 122; --height: 206">
                    <div class="gecko__body-part gecko__tail--3" style="--width: 102; --height: 192">
                      <div class="gecko__body-part gecko__tail--4" style="--width: 84; --height: 162">
                        <div class="gecko__body-part gecko__tail--5" style="--width: 71; --height: 130">
                          <div class="gecko__body-part gecko__tail--6" style="--width: 56; --height: 102">
                            <div class="gecko__body-part gecko__tail--7" style="--width: 51; --height: 97">
                              <div class="gecko__body-part gecko__tail--8" style="--width: 40; --height: 81">
                                <div class="gecko__body-part gecko__tail--9" style="--width: 33; --height: 98">
                                  <div class="gecko__body-part gecko__tail--10" style="--width: 25; --height: 111">
                                    <svg viewBox="0 0 25 111">
                                      <path fill="#ECE1FF" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M2 29c6 41 6 81 14 81 7-1 3-38 8-82C27-5-4-11 2 29Z"></path>
                                      <path fill="url('#scales--1')" data-scales="" d="M2 29c6 41 6 81 14 81 7-1 3-38 8-82C27-5-4-11 2 29Z"></path>
                                      <path data-leopard-spot="" fill="#221b0b" d="M2 29c6 41 6 81 14 81 7-1 3-38 8-82C27-5-4-11 2 29Z"></path>
                                      <path fill="url('#belly')" d="M2 29c6 41 6 81 14 81 7-1 3-38 8-82C27-5-4-11 2 29Z"></path>
                                    </svg>
                                  </div>
                                  <svg viewBox="0 0 33 98">
                                    <path fill="#EFE6FF" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M3 49c4 31 3 48 14 48 12 0 10-13 13-46C34 9 31 0 16 1 0 1-2 11 3 49Z"></path>
                                    <path fill="url('#scales--1')" data-scales="" d="M3 49c4 31 3 48 14 48 12 0 10-13 13-46C34 9 31 0 16 1 0 1-2 11 3 49Z"></path>
                                    <path data-leopard-spot="" fill="#221b0b" d="M2 41c3 0 3 1 3 3l1 5c0 3 2 3 6 2l6-1c0-3 3-3 7-3l1 1c3 0 4 0 5-2l1-20C29 11 3 13 1 21l1 20ZM2 8c1 1 3 2 9 1 2-1 2-2 2-3 0-2 0-3 6-3 5 0 5 1 5 3-1 1-1 3 2 4h4c-2-7-6-9-14-9C9 1 4 3 2 8Z"></path>
                                    <path fill="url('#belly')" d="M3 49c4 31 3 48 14 48 12 0 10-13 13-46C34 9 31 0 16 1 0 1-2 11 3 49Z"></path>
                                  </svg>
                                </div>
                                <svg viewBox="0 0 40 81">
                                  <path fill="#ECE2FD" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M2 32c3 43 9 47 19 48 11 1 16-2 18-42C40 8 43 1 21 1 1 1-1 4 2 32Z"></path>
                                  <path fill="url('#scales--1')" data-scales="" d="M2 32c3 43 9 47 19 48 11 1 16-2 18-42C40 8 43 1 21 1 1 1-1 4 2 32Z"></path>
                                  <path data-leopard-spot="" fill="#221b0b" d="m2 32 1 14c3 0 3 1 3 2 0 2 0 4 9 3 2-1 2-2 2-3 0-2 0-3 6-3 5 0 5 1 5 3-1 1-1 3 2 4 5 1 6-1 6-3s0-3 2-3a81 81 0 0 0 1-8 597 597 0 0 1 0-15c-11-6-19-6-24-4h-3c-7 2-10 3-11 7l1 6Z"></path>
                                  <path fill="url('#belly')" d="M2 32c3 43 9 47 19 48 11 1 16-2 18-42C40 8 43 1 21 1 1 1-1 4 2 32Z"></path>
                                </svg>
                              </div>
                              <svg viewBox="0 0 51 97">
                                <path fill="#E6DCFB" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M4 46c5 34 6 52 26 50 20-3 16-15 18-50 2-30 7-44-20-45S-2 8 4 46Z"></path>
                                <path fill="url('#scales--1')" data-scales="" d="M4 46c5 34 6 52 26 50 20-3 16-15 18-50 2-30 7-44-20-45S-2 8 4 46Z"></path>
                                <path data-leopard-spot="" fill="#221b0b" d="M17 56c4 2 6 2 1 9-8 8 15 15 11 2-7-8-4-9 2-10 5-2 12-4 17-10v14c-1 24-2 33-18 35-18 2-20-13-25-40l-1-9c4 6 9 8 13 9Z"></path>
                                <path fill="url('#belly')" d="M4 46c5 34 6 52 26 50 20-3 16-15 18-50 2-30 7-44-20-45S-2 8 4 46Z"></path>
                              </svg>
                            </div>
                            <svg viewBox="0 0 56 102">
                              <path fill="#E3D6F7" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M2 43c5 47 6 58 30 58 23 0 22-13 23-55 1-35 2-44-25-45S-1 15 2 43Z"></path>
                              <path fill="url('#scales--1')" data-scales="" d="M2 43c5 47 6 58 30 58 23 0 22-13 23-55 1-35 2-44-25-45S-1 15 2 43Z"></path>
                              <path data-leopard-spot="" fill="#221b0b" d="M54 72V62s-21 1-34-3C8 55 4 49 2 45l1 4c2 23 4 37 9 44 3 2 7 3 10 1 2-2 0-3-2-4s-6-3-2-8c6-10 21-2 20 3l-4 6c-2 2-3 3 0 3 10-1 10-8 11-12 0-3 0-4 3-3l6-3v-4Z"></path>
                              <path fill="url('#belly')" d="M2 43c5 47 6 58 30 58 23 0 22-13 23-55 1-35 2-44-25-45S-1 15 2 43Z"></path>
                            </svg>
                          </div>
                          <svg viewBox="0 0 71 130">
                            <path fill="#DDD0F3" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M2 57c6 43 12 72 38 72s23-17 29-75C73 8 56-3 30 2 3 6-2 23 2 57Z"></path>
                            <path fill="url('#scales--1')" data-scales="" d="M2 57c6 43 12 72 38 72s23-17 29-75C73 8 56-3 30 2 3 6-2 23 2 57Z"></path>
                            <path data-leopard-spot="" fill="#221b0b" d="M8 92a360 360 0 0 1-7-42c3 6 10 22 33 26 27 5 35-24 35-24l-1 12-4 38c-2 19-32 24-46 16-4-5-6-12-8-19l1 1c3 2 7 6 13 6 3 0 3 2 3 4 0 3 0 7 12 4l-1-2c-1-3-3-8 5-10 12-3 17-12 0-10l-16-1c-6-1-8-1 0 5 4 6-12 6-19-4Z"></path>
                            <path fill="url('#belly')" d="M2 57c6 43 12 72 38 72s23-17 29-75C73 8 56-3 30 2 3 6-2 23 2 57Z"></path>
                          </svg>
                        </div>
                        <svg viewBox="0 0 84 162">
                          <path fill="#D9CDF1" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M5 79c8 47 1 83 40 82 38 0 35-19 38-97C85 9 69 0 38 1 5 3-5 25 5 79Z"></path>
                          <path fill="url('#scales--1')" data-scales="" d="M5 79c8 47 1 83 40 82 38 0 35-19 38-97C85 9 69 0 38 1 5 3-5 25 5 79Z"></path>
                          <path data-leopard-spot="" fill="#221b0b" d="M7 93 5 79C2 62 1 48 2 37c26 10 22 25 19 37-2 9-3 15 7 17s9-4 7-11-4-15 13-11c9 2 17 0 23-1 10-2 14-3 4 15-6 10-7 10-10 13l-7 7c-8 7-5 6 0 5s11-3 12 1-10 7-20 10c-8 2-16 4-15 7 0 3 5 1 10-2 7-3 14-7 18-4 6 3 3 4-2 5-5 0-14 2-19 8-8 9-46-2-24-26 2-4 2-4 0-5-2 0-7-2-11-9Z"></path>
                          <path fill="url('#belly')" d="M5 79c8 47 1 83 40 82 38 0 35-19 38-97C85 9 69 0 38 1 5 3-5 25 5 79Z"></path>
                        </svg>
                      </div>
                      <svg viewBox="0 0 102 192">
                        <path fill="#D5C8ED" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M6 101c9 69 5 90 49 90 43-1 37-15 43-95 6-68 11-93-46-95C-4 0-3 32 6 101Z"></path>
                        <path fill="url('#scales--1')" data-scales="" d="M6 101c9 69 5 90 49 90 43-1 37-15 43-95 6-68 11-93-46-95C-4 0-3 32 6 101Z"></path>
                        <path data-leopard-spot="" fill="#221b0b" d="M84 162c8-3 6 9-10 22l-7 6-12 1c-36 0-40-15-45-59l-1-11c3 10 6-4 3-17 10 11 20 18 31 20-12 15-4 23 2 13 21 10 17 21 15 27s-3 7 24-2ZM2 61l1 12c5-1 7 2 10 5 4 3 7 7 14 4 4-2 10 0 16 2 4 1 8 2 10 1 1-2-1-4-3-7-1-3-3-5-2-6 3-7 22-8 28-4 2 2 1 6 0 9-1 2-2 4 0 5 5 1 9-2 13-4 4-3 7-5 11-4 2-21 2-36-1-47-15 2-45 5-53 3l1 5c2 8 4 14-6 14h-4c-6 1-13 2-11-17l-11-5c-3-2-7-4-10-4l-2 7v1c3 5 5 12-1 16l-1 2 1 12ZM28 3c4 3 9 1 14-2L28 3Zm47 122 16-9c7 2 2 17-17 17-12 0-7-3 1-8Z"></path>
                        <path fill="url('#belly')" d="M6 101c9 69 5 90 49 90 43-1 37-15 43-95 6-68 11-93-46-95C-4 0-3 32 6 101Z"></path>
                      </svg>
                    </div>
                    <svg viewBox="0 0 122 206">
                      <path fill="#CBBBE6" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M3 88c13 106 28 117 61 117 32-1 40-8 54-111 11-83-4-89-50-93C21-3-7 5 3 88Z"></path>
                      <path fill="url('#scales--1')" data-scales="" d="M3 88c13 106 28 117 61 117 32-1 40-8 54-111 11-83-4-89-50-93C21-3-7 5 3 88Z"></path>
                      <path data-leopard-spot="" fill="#221b0b" d="m113 125 3-15a81 81 0 0 1-33 28c-4 1-7 3-8 8-2 5-4 2-6-1-3-4-8-10-14-5-3 2-2 7 0 10 1 4 2 7-6 3-14-7-13-9-13-11l-2-2c-15-6-14-12-13-19 0-6 1-12-9-17-4-2-2 7 0 16 1 10 3 20-1 17 2 12 4 22 7 30l5 7c4 6 8 12 15 9 2-2 5 0 9 2 6 2 14 6 25 1 2-2-1-3-5-3-6-1-14-2-10-7 4-7 22-14 28-10 2 2 0 6-1 9-2 2-3 4-1 5 9 2 14-4 18-9l4-4c3-11 6-25 8-42Z"></path>
                      <path fill="url('#belly')" d="M3 88c13 106 28 117 61 117 32-1 40-8 54-111 11-83-4-89-50-93C21-3-7 5 3 88Z"></path>
                    </svg>
                  </div>
                  <svg viewBox="0 0 142 218">
                    <path fill="#C9B9E4" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M2 90c7 107 26 127 74 127 48-1 51-30 62-125 8-67 3-92-57-91C20 1-3 6 2 90Z"></path>
                    <path fill="url('#scales--1')" data-scales="" d="M2 90c7 107 26 127 74 127 48-1 51-30 62-125 8-67 3-92-57-91C20 1-3 6 2 90Z"></path>
                    <path data-leopard-spot="" fill="#221b0b" d="M94 162c-1 7-1 12-4 12-15 0-32-32-25-40 6-7 4-13 3-17v-5l-4-14-5-17c6-37 31-18 35 0 1 5 4 11 7 16 4 9 9 18 6 28-12 11-13 26-13 37Zm-36 13c2 1 4 2 1 7-6 9-21 18-33 10-5-3-3-4 1-6 6-3 15-7 7-21l-12-10c-7-6-16-13-13-19 1-5 0-10-1-14-2-5-2-7 8 2s21 9 28 9c7 1 10 1 8 6-8 30 1 34 6 36Z"></path>
                    <path fill="url('#belly')" d="M2 90c7 107 26 127 74 127 48-1 51-30 62-125 8-67 3-92-57-91C20 1-3 6 2 90Z"></path>
                  </svg>
                </div>
                <svg viewBox="0 0 142 286">
                  <path fill="#BEADDD" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M141 162C138 56 107-1 75 1 44 3 2 120 1 178c-1 83-5 108 66 107 70-1 77-15 74-123Z"></path>
                  <path fill="url('#scales--1')" data-scales="" d="M141 162C138 56 107-1 75 1 44 3 2 120 1 178c-1 83-5 108 66 107 70-1 77-15 74-123Z"></path>
                  <path data-leopard-spot="" fill="#221b0b" d="M6 260a221 221 0 0 1-5-77l1-14c7 9 15 10 21 11l6 2 6 2c4 2 7 4 7 6l-1 3c0 3-1 6 1 7 3 1 17 4 17 0l-2-5c-3-3-5-7 2-5 19 4 35 2 44 0 2-1 3 1 4 3 2 4 4 8 12 4 4-3 9-5 12-3-3 5-11 14-18 14l-8-4c-4-2-8-5-20-4-19 1-16 6-13 11l1 1c3 5-35 10-40 5l-1-1c-5-5-15-15-21-8-7 6-3 26 7 30 5 2 10 0 15-1s9-2 10 1l3 4c5 6 12 15 8 19-4 3-9 1-14-2-5-2-9-4-12-3l-22 4Zm83 24c-1-7-4-14-7-15-6-2-18-17-7-21l9-5c14-7 23-12 27 3 1 8 7 18 12 26l1 1c-8 7-19 10-35 11ZM28 112c-5-3-7-7-8-9l-3-4-3 8-2 9c2 0 7 1 7 3l-1 3-1 13c0 4 11 9 19 11 4 1 6-3 8-7s3-8 6-6c3 1 3 4 3 7 1 5 2 9 7 11 10 2 24 1 34-3 2-1 2-4 1-7 0-3-1-7 2-8 4-3 18-7 23-7 1 1-1 6-3 11l-3 6c4-1 7-3 9-5l8-5s8-1 7-9c-1-7-9-8-9-8l-7-2c-3-1-5-2-5 1-2 4-16 7-25 9l-7 2c6 18-28 24-25 2-16-4-25-11-31-15l-1-1Z"></path>
                  <path fill="url('#belly')" d="M141 162C138 56 107-1 75 1 44 3 2 120 1 178c-1 83-5 108 66 107 70-1 77-15 74-123Z"></path>
                </svg>
              </div>
              <div class="gecko__body-part gecko__leg--left" style="--width: 201; --height: 114">
                <div class="gecko__body-part gecko__shin--left" style="--width: 131; --height: 143">
                  <div class="gecko__body-part gecko__foot--left" style="--width: 162; --height: 211">
                    <svg viewBox="0 0 162 211">
                      <path fill="#A48ECC" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M148 162c-4-12-8-39 7-54 10-9 6-21 0-30-9-12-18-7-27-10-2-7-4-10 2-29 8-26-8-28-8-28l-2-9-4 8s-17 4-6 36c2 7 4 26-17 1-22-25-38-14-38-14l-13-6 10 12s-2 20 29 27c12 3 4 30-24 26-41-5-42 12-42 12l-14 7c4 2 15 3 15 3s5 20 60-4c32-11 17 9-3 17-31 12-38 28-34 38l-11 17c3-4 17-10 17-10s11 19 51-36c21-29 42-19 25 18s6 41 6 41l4 14c4-17 2-5 5-14 15 0 14-22 12-33Z"></path>
                      <path fill="url('#scales--1')" data-scales="" d="M148 162c-4-12-8-39 7-54 10-9 6-21 0-30-9-12-18-7-27-10-2-7-4-10 2-29 8-26-8-28-8-28l-2-9-4 8s-17 4-6 36c2 7 4 26-17 1-22-25-38-14-38-14l-13-6 10 12s-2 20 29 27c12 3 4 30-24 26-41-5-42 12-42 12l-14 7c4 2 15 3 15 3s5 20 60-4c32-11 17 9-3 17-31 12-38 28-34 38l-11 17c3-4 17-10 17-10s11 19 51-36c21-29 42-19 25 18s6 41 6 41l4 14c4-17 2-5 5-14 15 0 14-22 12-33Z"></path>
                    </svg>
                  </div>
                  <svg viewBox="0 0 131 143">
                    <path fill="#AE99D3" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M102 64c4-12 18-1 27-31 5-17-8-40-33-29-15 7-43 41-58 69-16 28-10 14-28 24-29 16 16 61 37 40 21-22 50-56 55-73Z"></path>
                    <path fill="url('#scales--1')" data-scales="" d="M102 64c4-12 18-1 27-31 5-17-8-40-33-29-15 7-43 41-58 69-16 28-10 14-28 24-29 16 16 61 37 40 21-22 50-56 55-73Z"></path>
                    <path data-leopard-spot="" fill="#221b0b" d="M69 101c-5 5-13 4-11 0 1-4 11-11 11 0Zm-32 10c-4 1-10-10-5-10 5-1 10 10 5 10Zm43-42c-3 4-9 10-11 6-2-3-5-13 0-14 5-2 15 3 11 8Zm-33 6c2 0 6 5 3 7s-13-2-13-4c0-3 10-5 10-3Z"></path>
                  </svg>
                </div>
                <svg viewBox="0 0 201 114">
                  <path fill="#BFABDC" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M140 111c51 14 96-65 17-99C113-7 62 2 27 11c-38 16-31 59-1 62 22 1 23 0 36 9 21 14 55 23 78 29Z"></path>
                  <path fill="url('#scales--1')" data-scales="" d="M140 111c51 14 96-65 17-99C113-7 62 2 27 11c-38 16-31 59-1 62 22 1 23 0 36 9 21 14 55 23 78 29Z"></path>
                  <path data-leopard-spot="" fill="#221b0b" d="M126 77c-3-3-15-2-21 4l-2 1c-3 3-3 3 0 8 2 2 16 1 18-4l4-5c1-2 2-2 1-4ZM96 51c-8 7-15 10-16 0-2-10 11-10 16-10 2 0 4-4 6-9 2-6 4-11 7-7 6 8 10 18-13 26ZM59 67c4 1 7 0 9-4 1-4 0-12-2-14l-4-2c-3-1-6-3-6-5-1-4-10-2-6 11 3 12 8 14 9 14Zm33-48 3-1c3-10-13-6-13 0 0 5 6 3 10 1ZM16 53c-1 6 8 5 13 0 2-2 1-3 1-4l-1-3c0-4-11 1-13 7Zm35-38c10-3 18-3 15 7-3 9-15 4-19 2-2-1-6 2-9 5-4 4-9 8-10 3-1-9-1-20 23-17Z"></path>
                </svg>
              </div>
              <div class="gecko__body-part gecko__leg--right" style="--width: 211; --height: 105">
                <div class="gecko__body-part gecko__shin--right" style="--width: 107; --height: 130">
                  <div class="gecko__body-part gecko__foot--right" style="--width: 174; --height: 229">
                    <svg viewBox="0 0 174 229">
                      <path fill="#A48ECC" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M37 60c1 6 0 14-3 15-14 7-19 2-28 16-8 14-5 19 14 39-17 63-28 64-10 84l4 13 8-13c14-5 17-26 14-54s19-41 34-10c12 26 27 56 42 46l13 7-6-13s17-12-31-48c-23-17-5-43 24-27 35 17 47-7 47-7l13-5-13-6c-10-14-19-10-45-4-25 6-43-7-23-15 16-6 35-19 29-31 4-8 9-13 9-13l-16 5c-6-6-17-7-33 21-8 13-29 19-21-4 8-22 9-34-2-39V3c-5 9-5 9-10 13-23 14-10 33-10 44Z"></path>
                      <path fill="url('#scales--1')" data-scales="" d="M37 60c1 6 0 14-3 15-14 7-19 2-28 16-8 14-5 19 14 39-17 63-28 64-10 84l4 13 8-13c14-5 17-26 14-54s19-41 34-10c12 26 27 56 42 46l13 7-6-13s17-12-31-48c-23-17-5-43 24-27 35 17 47-7 47-7l13-5-13-6c-10-14-19-10-45-4-25 6-43-7-23-15 16-6 35-19 29-31 4-8 9-13 9-13l-16 5c-6-6-17-7-33 21-8 13-29 19-21-4 8-22 9-34-2-39V3c-5 9-5 9-10 13-23 14-10 33-10 44Z"></path>
                    </svg>
                  </div>
                  <svg viewBox="0 0 107 130">
                    <path fill="#AE99D3" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M97 83C78 62 52 15 35 5 18-6 2 9 1 30s21 24 23 35c11 37 29 35 48 59 6 7 25 7 31-5 6-10 3-26-6-36Z"></path>
                    <path fill="url('#scales--1')" data-scales="" d="M97 83C78 62 52 15 35 5 18-6 2 9 1 30s21 24 23 35c11 37 29 35 48 59 6 7 25 7 31-5 6-10 3-26-6-36Z"></path>
                    <path data-leopard-spot="" fill="#221b0b" d="M74 70c4 2 5 14 0 12-5-3-5-15 0-12ZM59 38c3 2 5 4 2 7-3 4-8-5-2-7ZM43 57c5 0 8 1 9 4 0 4-7 9-7 7l-2-2c-2-1-4-3 0-9Z"></path>
                  </svg>
                </div>
                <svg viewBox="0 0 211 105">
                  <path fill="#BFABDC" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M199 13C184-5 134 2 96 4 56 7 7 17 2 50s11 60 60 52c49-7 60-40 123-34 33 4 29-37 14-55Z"></path>
                  <path fill="url('#scales--1')" data-scales="" d="M199 13C184-5 134 2 96 4 56 7 7 17 2 50s11 60 60 52c49-7 60-40 123-34 33 4 29-37 14-55Z"></path>
                  <path data-leopard-spot="" fill="#221b0b" d="M182 41c1-7 1-10 5-10 4 1 6 4 4 7-3 3-6 7-9 3Zm-45 7c0-6 5-8 8-9 4-1 11-1 8 4l-1 5c0 3 0 4-3 4h-4c-4 0-8-1-8-4Zm-26 7c4 6 13 9 17 5 3-3 0-5-4-7-5-2-10-5-5-12 4-7 0-11-4-13-2-2-4-4 1-6 9-5 16-10 12-19h-6l-14 1c9 6 11 11 2 14-7 2-12 9 0 13 3 2 2 6 1 10-1 5-3 10 0 14ZM89 67c-4 2-3 4-3 7l1 4c1 9 9 4 12 0l2-4 1-4c0-3-8-5-13-3Zm3-24c4-4 1-8-5-7-2 0-2 2-2 3l-1 3c-1 2 4 4 8 1Zm95-31c4 1 7 4 4 6s-12-4-4-6Zm-26-8c4 1 7 2 7 7 0 4-3 11-6 13h-5c-3 1-6 1-7 3-2 4-10-2-3-12 8-10 13-11 14-11Z"></path>
                </svg>
              </div>
              <svg viewBox="0 0 164 215">
                <path fill="#C0AEDF" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M157 71C138 32 169 1 83 1-5 1 25 48 6 77c-18 28 12 78 37 107 31 37 49 43 78 0 26-39 55-71 36-113Z"></path>
                <path fill="url('#scales--1')" data-scales="" d="M157 71C138 32 169 1 83 1-5 1 25 48 6 77c-18 28 12 78 37 107 31 37 49 43 78 0 26-39 55-71 36-113Z"></path>
                <path data-leopard-spot="" fill="#221b0b" d="M12 139c29 6 28 8 24 14-1 3-3 6-3 11 0 17 24-7 18-26-3-13-16-11-24-10-5 0-8 0-7-2 2-10 9-14 14-18 7-6 12-10 3-23-5-7 1-16 7-24 4-5 7-10 7-14 1-4-3-5-8-7-5-1-12-3-14-11-3-3-6-5-8-5-3 5-4 11-5 18l7 2c4 1 8 2 6 7-1 3-5 5-8 8-8 4-16 9-1 26 11 14 2 19-7 25-3 2-7 4-9 7l8 22Zm140-81-1-4c-3-5-15-4-18-1-2 3 7 11 13 14 4 2 7-1 8-4l-1-1-1-4Zm1 59c-7 9-20 0-20-11 0-16 13-8 13-2 0 2 2 2 4 2 4 1 8 2 3 11ZM90 32C74 49 56 71 77 75c19 3 26 10 3 30-8 6 3 10 13 14l14 6c6 5-3 7-12 10-6 2-13 3-15 6-16 23 22 58 17 43-11-35-1-36 10-37 7 0 15-1 18-9 4-10-3-17-10-22-10-8-19-16 3-32 16-12 9-15-11-20-11-2-33-13 0-26 27-10 4-29-17-6Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="gecko__body-part gecko__thorax" style="--width: 181; --height: 171">
          <svg viewBox="0 0 181 171">
            <path fill="#C5B5E2" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M167 143c17-26 17-58 0-88C139 5 77-30 22 41c-15 19-35 54-8 98 28 45 133 36 153 4Z"></path>
            <path fill="url('#scales--1')" data-scales="" d="M167 143c17-26 17-58 0-88C139 5 77-30 22 41c-15 19-35 54-8 98 28 45 133 36 153 4Z"></path>
          </svg>
          <div class="gecko__body-part gecko__arm--left" style="--width: 138; --height: 104">
            <div class="gecko__body-part gecko__forearm--left" style="--width: 101; --height: 64">
              <div class="gecko__body-part gecko__hand--left" style="--width: 136; --height: 131">
                <svg viewBox="0 0 136 131">
                  <path fill="#A48ECC" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M56 118c29-19 36-12 48-10s27-21 17-29c-8-7-15-10-3-20 21-18 19-24 14-28l3-12-11 5c-10-4-15 10-16 16-7 17-16 28-17 6 4-31-6-39-14-38l-7-7s-2 2-3 9c-9 10 3 27 5 31s8 36-6 6C56 17 44 11 36 18l-10-6c1 6 3 5 4 12-4 16 12 24 19 29 5 4 8 10 9 13 4 8 0 6-11-4-16-23-29-27-36-21L1 39s-1 3 5 10C5 69 34 73 38 75s37 22 9 25c-23 3-31 10-32 14l-9 4 12 7c7 9 22 4 38-7Z"></path>
                  <path fill="url('#scales--1')" data-scales="" d="M56 118c29-19 36-12 48-10s27-21 17-29c-8-7-15-10-3-20 21-18 19-24 14-28l3-12-11 5c-10-4-15 10-16 16-7 17-16 28-17 6 4-31-6-39-14-38l-7-7s-2 2-3 9c-9 10 3 27 5 31s8 36-6 6C56 17 44 11 36 18l-10-6c1 6 3 5 4 12-4 16 12 24 19 29 5 4 8 10 9 13 4 8 0 6-11-4-16-23-29-27-36-21L1 39s-1 3 5 10C5 69 34 73 38 75s37 22 9 25c-23 3-31 10-32 14l-9 4 12 7c7 9 22 4 38-7Z"></path>
                </svg>
              </div>
              <svg viewBox="0 0 101 64">
                <path fill="#AE99D3" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M87 63c10-3 15-9 13-24-1-9-10-15-19-23C67 5 54 7 40 5 23 3 18-5 6 10c-9 12-4 23 1 25 6 1 60 34 80 28Z"></path>
                <path fill="url('#scales--1')" data-scales="" d="M87 63c10-3 15-9 13-24-1-9-10-15-19-23C67 5 54 7 40 5 23 3 18-5 6 10c-9 12-4 23 1 25 6 1 60 34 80 28Z"></path>
                <path data-leopard-spot="" fill="#221b0b" d="M55 20c-4 2-7 3-9 0s2-11 3-9l2 1c3 0 5 0 4 8Zm-6 24c-3 0-6-2-5-6 2-4 10 2 5 6ZM22 22c-4 0-11-11-5-11 5 0 11 11 5 11Z"></path>
              </svg>
            </div>
            <svg viewBox="0 0 138 104">
              <path fill="#BFABDC" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M63 74c7-4 17-4 21-4 0 0 11 7 19 8 25 1 43-34 29-56-7-11-14-24-32-20-16 2-30 22-42 28-23 11-30 20-42 26-27 12-13 51 6 47 18-4 32-25 41-29Z"></path>
              <path fill="url('#scales--1')" data-scales="" d="M63 74c7-4 17-4 21-4 0 0 11 7 19 8 25 1 43-34 29-56-7-11-14-24-32-20-16 2-30 22-42 28-23 11-30 20-42 26-27 12-13 51 6 47 18-4 32-25 41-29Z"></path>
              <path data-leopard-spot="" fill="#221b0b" d="M90 22c-3 8-13 14-17 12-2-1-2-2-1-4l1-5c0-7 12-14 15-12 5 2 4 3 3 7l-1 2Zm-5 32c2 3 3 4 1 8-3 4-11 6-13 3l-1-4 1-4c0-6 6-13 10-6l2 3Zm-27 3c3-3 3-8 0-14-1-3-2-2-4 0l-4 4c-3 0-3 2-2 4l2 6c0 5 5 2 8 0ZM48 74c-5 4-10 1-8-4s8-5 8-3v3c1 1 2 2 0 4Zm-30 4c4-1 3-4 0-10v-1c-4-2-5 3-6 7s2 5 6 4Zm7 13c-4 1-9 0-7-3 2-4 13-2 7 3Z"></path>
            </svg>
          </div>
          <div class="gecko__body-part gecko__arm--right" style="--width: 140; --height: 105">
            <div class="gecko__body-part gecko__forearm--right" style="--width: 109; --height: 75">
              <div class="gecko__body-part gecko__hand--right" style="--width: 148; --height: 159">
                <svg viewBox="0 0 148 159">
                  <path fill="#A48ECC" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M8 79c-13 11-5 28 4 32 8 5 8 2 17 3 14 1 21 3 34 19 14 35 26 19 26 19l11 6-7-10s16-10-21-32c-13-16 5-17 23-15 34 13 40-8 40-8l11-4-12-3s-3-17-41-4c-16 2-41 1-6-15 41-9 30-25 30-25l7-10-11 3s-10-12-37 17c-28 19-28 10-9-7 22-17 10-27 10-27l4-11-9 7S57 7 50 34c-2 10-23 34-22 15 2-30-5-37-10-37L15 2l-3 10c-15 5-4 31-1 35 4 5 12 31-3 32Z"></path>
                  <path fill="url('#scales--1')" data-scales="" d="M8 79c-13 11-5 28 4 32 8 5 8 2 17 3 14 1 21 3 34 19 14 35 26 19 26 19l11 6-7-10s16-10-21-32c-13-16 5-17 23-15 34 13 40-8 40-8l11-4-12-3s-3-17-41-4c-16 2-41 1-6-15 41-9 30-25 30-25l7-10-11 3s-10-12-37 17c-28 19-28 10-9-7 22-17 10-27 10-27l4-11-9 7S57 7 50 34c-2 10-23 34-22 15 2-30-5-37-10-37L15 2l-3 10c-15 5-4 31-1 35 4 5 12 31-3 32Z"></path>
                </svg>
              </div>
              <svg viewBox="0 0 109 75">
                <path fill="#AE99D3" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M18 20C5 22-4 43 4 57c11 19 27 23 56 8 16-9 36-25 43-30 13-10 1-35-23-34-17 0-36 14-62 19Z"></path>
                <path fill="url('#scales--1')" data-scales="" d="M18 20C5 22-4 43 4 57c11 19 27 23 56 8 16-9 36-25 43-30 13-10 1-35-23-34-17 0-36 14-62 19Z"></path>
                <path data-leopard-spot="" fill="#221b0b" d="M66 61h1c1-6-1-8-2-9-2 0-2-1 2-3 7-3 4-12 1-12-2 0-2-2-2-4 1-2 1-4-1-4-7-1-9 1-8 6 0 3 2 4 4 4v2c-2 2-2 2-1 3s2 2-1 4c-5 3-5 3-3 5 1 1 4 4 3 12l2-1 1-1 4-2Zm21-46 4-1c4 1 9 1 4-5-3-5-13 6-8 6Zm0 22c4 0 7-2 5-6s-10 3-5 6ZM57 20c5 1 8 2 9-1 2-3-3-10-4-8l-2 1c-2 0-5 1-3 8Z"></path>
              </svg>
            </div>
            <svg viewBox="0 0 140 105">
              <path fill="#BFABDC" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M102 47C81 43 62 23 41 8 5-21-17 40 20 67c8 6 22 9 34 8 11-1 12 1 26 12 21 16 34 19 45 17 26-5 12-50-23-57Z"></path>
              <path fill="url('#scales--1')" data-scales="" d="M102 47C81 43 62 23 41 8 5-21-17 40 20 67c8 6 22 9 34 8 11-1 12 1 26 12 21 16 34 19 45 17 26-5 12-50-23-57Z"></path>
              <path data-leopard-spot="" fill="#221b0b" d="M123 72c-4-1-3-4-2-11h1c3-3 5 2 7 5 1 4-2 6-6 6ZM81 55c-4-2-9-8-8-14 1-2 2-1 4 0 2 2 4 3 7 3 5 0 9 5 5 10-3 5-5 4-8 1Zm-35 0c-4 1-7 1-9-3s-2-11 0-14l4-3c2-1 5-3 5-5 0-4 10-3 8 10-2 12-6 15-8 15Zm7 2c-1 3-2 4 1 7 3 4 11 4 13 1v-3l-1-5c-1-5-7-12-11-4l-2 4Zm37 21c6 3 10 0 7-5-2-5-8-4-8-1v2c-1 2-1 3 1 4Zm25 14c4 1 9-1 6-4-2-3-13 0-6 4Z"></path>
            </svg>
          </div>
        </div>
        <svg viewBox="0 0 164 201">
          <path fill="#C5B5E2" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M163 71c-2-20-17-39-27-48C107-5 75-3 37 9 0 20 0 66 1 80c1 15 5 27 17 75 16 66 127 54 133 2 6-45 14-66 12-86Z"></path>
          <path fill="url('#scales--1')" data-scales="" d="M163 71c-2-20-17-39-27-48C107-5 75-3 37 9 0 20 0 66 1 80c1 15 5 27 17 75 16 66 127 54 133 2 6-45 14-66 12-86Z"></path>
          <path data-leopard-spot="" fill="#221b0b" d="M19 47c29-14 24-23 40-21 22 1 28-17 49-8 15 6 22 10 25 32 4 23 13 2 12 32 0 24 4 10 6 27 2 15-11 17-15 22-44 21-33 42-53 44-48 4-47-11-64-47-14-29-30-68 0-81Zm106 77c16-13-5-24-7-25-24-7-17 6-36 4-16-1-8-13-23-15-21-2 5-31-12-26-16 5-48 26-23 38 25 11 2 18 19 24 13 4 36-8 45 0 13 12 21 12 37 0Zm3 33c-10-5-17 16-23 24 9 11 13 0 21 0 7 0 4 5 13-5 9-11 4-18 0-15-3 3-2 3-11-4Z"></path>
        </svg>
        <div class="gecko__body-part gecko__neck__body" style="--width: 154; --height: 176">
          <svg viewBox="0 0 154 176">
            <path fill="#D9CDF1" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M140 136c27-46 7-97-11-113C98-5 58-8 23 23 1 42-7 104 11 140c18 37 94 58 129-4Z"></path>
            <path fill="url('#scales--1')" data-scales="" d="M140 136c27-46 7-97-11-113C98-5 58-8 23 23 1 42-7 104 11 140c18 37 94 58 129-4Z"></path>
            <path data-leopard-spot="" fill="#221b0b" d="m12 142 8-15c3-7 5-11 12-13 9-3 14-8 18-13 5-6 10-11 22-11 16 1 24 2 35 19 9 14 11 14 21 14l12 1 6 1a98 98 0 0 1-8 15c-3-1-8-1-12 1-10 4-13 9-16 13-3 7-6 13-24 17-7 2-11 0-15-2s-8-4-15-2c-10 3-12-6-13-13 0-5-1-10-7-5l-10 9c-6-5-10-10-14-16Z"></path>
          </svg>
          <div class="gecko__body-part gecko__neck__head" style="--width: 164; --height: 203">
            <svg viewBox="0 0 164 203">
              <path fill="#E6DCFB" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M151 158c25-87 8-110-12-133-31-35-87-29-116 0C-7 55-2 95 13 168c11 51 123 44 138-10Z"></path>
              <path fill="url('#scales--1')" data-scales="" d="M151 158c25-87 8-110-12-133-31-35-87-29-116 0C-7 55-2 95 13 168c11 51 123 44 138-10Z"></path>
              <path data-leopard-spot="" fill="#221b0b" d="m23 186 2-4c3-7 4-11 12-14 9-3 13-8 17-13 5-6 10-12 22-12 15 0 23 1 35 18 6 9 7 8 9 8 3-1 6-2 18 7l2 1c-27 30-91 34-117 9Z"></path>
            </svg>
            <div class="gecko__body-part gecko__head" style="--width: 367; --height: 371">
              <svg viewBox="0 0 371 374" fill="none">
                <path fill="#EDE3FF" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M208 334c-39 4-63 10-103-46-19-28-35-99 4-145 6-21 7-30 21-50 5-33 28-75 57-76s53 54 55 60l7 20c12 15 13 24 19 40 29 23 35 84 17 118-15 26-38 76-77 79Z"></path>
                <path fill="url('#scales--1')" data-scales="" d="M208 334c-39 4-63 10-103-46-19-28-35-99 4-145 6-21 7-30 21-50 5-33 28-75 57-76s53 54 55 60l7 20c12 15 13 24 19 40 29 23 35 84 17 118-15 26-38 76-77 79Z"></path>
                <path data-leopard-spot="" fill="#221b0b" d="M214 71c2 2 5 4 7 10 7 16-10 21-20 19-6-1-5-3-3-8 2-4 4-8 5-15 3-12-1-13-4-14-3 0-6-1-6-7 0-25 13-14 15 0 1 10 3 12 6 15Zm-59 14 5-10c3-3 5-6 5-16 0-14 3-35 13-7 2 5 1 7-1 9s-5 6-5 18c0 9 4 14 7 17 2 3 3 5-1 6-10 3-28 1-23-17ZM95 204c4-26 21-48 21-48l5-5c5-5 9-10 16-1 2 2-1 8-4 15-6 14-14 32-3 46 21 31 106 34 116 0 5-13 0-25-5-35-4-9-8-18-5-26 4-12 7-10 12-6 2 3 5 5 9 6 11 3 15 12 24 54 8 34-11 56-35 60s-34 0-43-4c-6-2-12-4-22-4l-21 3c-15 4-33 8-44 3-17-9-25-32-21-58Zm26 81c-11 10 2 23 19 35 20 3 25-3 25-15 0-5-2-6-5-7-4-1-9-3-11-13-4-12-16-10-28 0Zm126 23v1c-9 12-27 21-31 10-3-6 0-8 3-9 2-1 4-2 4-6 0-16 7-17 12-17h5c18 6 9 18 7 21Zm-42-30c-3-6-5-9-14-6l-2 2c-2 0-3 1-1 6l2 8c0 4 0 5 6 6 9 2 12-10 9-16Zm9-81c16-15-3-60-12-53-5 4-9 0-13-4-7-6-15-12-27 9-4 8 17 31 35 15 17-17 11 55-27 24-51-43-7 58 44 9Z"></path>
                <path fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M119 141c18-21 34-61 27-61-4 0-15 2-27 21-9 12-11 33 0 40Z"></path>
                <path fill="url('#scales--1')" data-scales="" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M119 141c18-21 34-61 27-61-4 0-15 2-27 21-9 12-11 33 0 40Z"></path>
                <path fill="url(#eye-gradient-0)" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path fill="url(#eye-gradient-0)" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path fill="url(#eye-gradient-1)" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path fill="url(#eye-gradient-1)" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path fill="url(#eye-gradient-2)" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path fill="url(#eye-gradient-2)" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M113 136c12 20 47-58 33-58-8 0-4 7-15 27-13 24-22 26-18 31Z"></path>
                <path fill="url('#scales--1')" data-scales="" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M113 136c12 20 47-58 33-58-8 0-4 7-15 27-13 24-22 26-18 31Z"></path>
                <path fill="#E3D6F7" d="M116 143c47 22 75-40 39-64-11-8-6 3-19 28-16 32-28 32-20 36Z"></path>
                <path fill="url('#scales--1')" data-scales="" d="M116 143c47 22 75-40 39-64-11-8-6 3-19 28-16 32-28 32-20 36Z"></path>
                <path fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M256 139c-20-19-37-63-30-60 6 3 14 2 28 20 8 12 13 28 2 40Z"></path>
                <path fill="url('#scales--1')" data-scales="" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M256 139c-20-19-37-63-30-60 6 3 14 2 28 20 8 12 13 28 2 40Z"></path>
                <path fill="url(#eye-gradient-3)" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path fill="url(#eye-gradient-3)" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path fill="url(#eye-gradient-4)" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path fill="url(#eye-gradient-4)" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path fill="url(#eye-gradient-5)" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path fill="url(#eye-gradient-5)" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M260 138c-14 19-51-59-37-60 8 0 1 8 13 28 14 23 30 24 24 32Z"></path>
                <path fill="url('#scales--1')" data-scales="" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M260 138c-14 19-51-59-37-60 8 0 1 8 13 28 14 23 30 24 24 32Z"></path>
                <path fill="#E3D6F7" d="M254 145c-44 17-75-38-39-64 13-10 4 3 18 27 17 31 37 31 21 37Z"></path>
                <path fill="url('#scales--1')" data-scales="" d="M254 145c-44 17-75-38-39-64 13-10 4 3 18 27 17 31 37 31 21 37Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="gecko__placement gecko__placement--3">
    <div class="gecko">
      <div class="gecko__body-part gecko__shoulders" style="--width: 164; --height: 201">
        <div class="gecko__body-part gecko__ribs" style="--width: 174; --height: 319">
          <svg viewBox="0 0 174 319">
            <path fill="#FF853D" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M162 104C174 46 131 1 87 1 33 1-11 48 4 104c16 60 17 72 0 133s38 83 83 81c41-3 101-16 82-79-21-67-19-78-7-135Z"></path>
            <path fill="url('#scales--3')" data-scales="" d="M162 104C174 46 131 1 87 1 33 1-11 48 4 104c16 60 17 72 0 133s38 83 83 81c41-3 101-16 82-79-21-67-19-78-7-135Z"></path>
          </svg>
          <div class="gecko__body-part gecko__back" style="--width: 199; --height: 575">
            <svg viewBox="0 0 199 575">
              <path fill="#FC803C" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M147 83C111-30 86-23 50 83 4 221-27 344 37 468c65 127 82 155 137-1 56-156 1-295-27-384Z"></path>
              <path fill="none" d="M119 400c4 12-20 10-29 1-5-6 14 7 21 0 6-5-23-4-18-12 4-7 12-5 18-9 8-5-30 3-18-4 12-6 32-7 26 4-3 7-18 10-18 10s15 3 18 10Zm-24-38c12 5 25 2 25 2v-6s-15 5-10-3c2-4 9-2 10-6 5-9-37 6-25 13Zm1-16c11-4 23 1 25-8 1-5-9 6-14-2-3-5 16-7 10-10s-9-2-14 7c-2 5 3-4-8-5s-6 20 1 18Zm-9-25c-9 6 25 4 30-3 4-5-11 1-13-4s16-9 10-12c-5-3-3 4-10 6-8 2-10-7-14-3-6 6 10 8 9 12-1 6-7 0-12 4Z"></path>
              <path fill="none" d="M90 299c10 6 12 5 24-4 5-4 1-14-5-14-6-1 4 11-1 12-9 1-3-9-8-10-5-2 4 15-4 13-7-1-1-11-6-12-6-2-6 11 0 15Zm11-35c-6 8-18 6-15 12 3 5 12 0 12 0s19 4 17-3c-1-5-10 2-12-3-4-7 17-3 13-9-6-7-21-8-30 2-4 6 20-7 15 1Z"></path>
              <path fill="none" d="M87 235c-7-1-5 23 3 21 4-1-2-7 1-8 9-6 31 9 25 1s-8-5-20-6c-12 0-3-8-9-8Zm-5-7c6 7 44 12 32 1-5-5-7 1-14 0-9-2-24-8-18-1Z"></path>
              <path fill="none" d="M83 217c10 11 33 12 32-4-1-6-3-11-9-9-5 1 4 9 0 12-9 4-4-10-9-10s2 13-5 11c-10-3 2-12-3-11-6 1-10 7-6 11Zm-1-22c-13 10 42 9 29-1-5-3-18 1-13-4 5-4 9-3 13-6 12-12-45-8-32 1 8 5 13-11 15-3 2 5-6 8-12 13Z"></path>
              <path fill="none" d="M78 165c-1 9 7 15 12 8 2-4-12-1-5-11 9-10 26 22 27 10 0-18 1-24-9-23-9 1 7 15 0 13-5-1-4-5-8-8-9-6-16 1-17 11Z"></path>
              <path fill="url('#belly')" d="M147 83C111-30 86-23 50 83 4 221-27 344 37 468c65 127 82 155 137-1 56-156 1-295-27-384Z"></path>
              <path fill="url('#scales--3')" data-scales="" d="M147 83C111-30 86-23 50 83 4 221-27 344 37 468c65 127 82 155 137-1 56-156 1-295-27-384Z"></path>
            </svg>
            <div class="gecko__body-part gecko__hips" style="--width: 164; --height: 215">
              <div class="gecko__body-part gecko__tail--0" style="--width: 142; --height: 286">
                <div class="gecko__body-part gecko__tail--1" style="--width: 142; --height: 218">
                  <div class="gecko__body-part gecko__tail--2" style="--width: 122; --height: 206">
                    <div class="gecko__body-part gecko__tail--3" style="--width: 102; --height: 192">
                      <div class="gecko__body-part gecko__tail--4" style="--width: 84; --height: 162">
                        <div class="gecko__body-part gecko__tail--5" style="--width: 71; --height: 130">
                          <div class="gecko__body-part gecko__tail--6" style="--width: 56; --height: 102">
                            <div class="gecko__body-part gecko__tail--7" style="--width: 51; --height: 97">
                              <div class="gecko__body-part gecko__tail--8" style="--width: 40; --height: 81">
                                <div class="gecko__body-part gecko__tail--9" style="--width: 33; --height: 98">
                                  <div class="gecko__body-part gecko__tail--10" style="--width: 25; --height: 111">
                                    <svg viewBox="0 0 25 111">
                                      <path fill="#A592E6" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M2 29c6 41 6 81 14 81 7-1 3-38 8-82C27-5-4-11 2 29Z"></path>
                                      <path fill="url('#belly')" d="M2 29c6 41 6 81 14 81 7-1 3-38 8-82C27-5-4-11 2 29Z"></path>
                                      <path fill="url('#scales--3')" data-scales="" d="M2 29c6 41 6 81 14 81 7-1 3-38 8-82C27-5-4-11 2 29Z"></path>
                                    </svg>
                                  </div>
                                  <svg viewBox="0 0 33 98">
                                    <path fill="#A290E0" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M3 49c4 31 3 48 14 48 12 0 10-13 13-46C34 9 31 0 16 1 0 1-2 11 3 49Z"></path>
                                    <path fill="url('#belly')" d="M3 49c4 31 3 48 14 48 12 0 10-13 13-46C34 9 31 0 16 1 0 1-2 11 3 49Z"></path>
                                    <path fill="url('#scales--3')" data-scales="" d="M3 49c4 31 3 48 14 48 12 0 10-13 13-46C34 9 31 0 16 1 0 1-2 11 3 49Z"></path>
                                  </svg>
                                </div>
                                <svg viewBox="0 0 40 81">
                                  <path fill="#AC97E7" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M2 32c3 43 9 47 19 48 11 1 16-2 18-42C40 8 43 1 21 1 1 1-1 4 2 32Z"></path>
                                  <path fill="url('#belly')" d="M2 32c3 43 9 47 19 48 11 1 16-2 18-42C40 8 43 1 21 1 1 1-1 4 2 32Z"></path>
                                  <path fill="url('#scales--3')" data-scales="" d="M2 32c3 43 9 47 19 48 11 1 16-2 18-42C40 8 43 1 21 1 1 1-1 4 2 32Z"></path>
                                </svg>
                              </div>
                              <svg viewBox="0 0 51 97">
                                <path fill="#B49BE9" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M4 46c5 34 6 52 26 50 20-3 16-15 18-50 2-30 7-44-20-45S-2 8 4 46Z"></path>
                                <path fill="url('#belly')" d="M4 46c5 34 6 52 26 50 20-3 16-15 18-50 2-30 7-44-20-45S-2 8 4 46Z"></path>
                                <path fill="url('#scales--3')" data-scales="" d="M4 46c5 34 6 52 26 50 20-3 16-15 18-50 2-30 7-44-20-45S-2 8 4 46Z"></path>
                              </svg>
                            </div>
                            <svg viewBox="0 0 56 102">
                              <path fill="#C399D6" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M2 43c5 47 6 58 30 58 23 0 22-13 23-55 1-35 2-44-25-45S-1 15 2 43Z"></path>
                              <path fill="url('#belly')" d="M2 43c5 47 6 58 30 58 23 0 22-13 23-55 1-35 2-44-25-45S-1 15 2 43Z"></path>
                              <path fill="url('#scales--3')" data-scales="" d="M2 43c5 47 6 58 30 58 23 0 22-13 23-55 1-35 2-44-25-45S-1 15 2 43Z"></path>
                            </svg>
                          </div>
                          <svg viewBox="0 0 71 130">
                            <path fill="#CE9FDB" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M2 57c6 43 12 72 38 72s23-17 29-75C73 8 56-3 30 2 3 6-2 23 2 57Z"></path>
                            <path fill="#E2D6F9" fill-rule="evenodd" d="M65 96v-1c0-6-1-4-3-3-2 2-4 4-5 3-5-3-10 0-8 3l3 1 6 2 6 3v-1l1-7Z" clip-rule="evenodd"></path>
                            <path fill="url('#belly')" d="M2 57c6 43 12 72 38 72s23-17 29-75C73 8 56-3 30 2 3 6-2 23 2 57Z"></path>
                            <path fill="url('#scales--3')" data-scales="" d="M2 57c6 43 12 72 38 72s23-17 29-75C73 8 56-3 30 2 3 6-2 23 2 57Z"></path>
                          </svg>
                        </div>
                        <svg viewBox="0 0 84 162">
                          <path fill="#DF9FCA" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M5 79c8 47 1 83 40 82 38 0 35-19 38-97C85 9 69 0 38 1 5 3-5 25 5 79Z"></path>
                          <path fill="#E2D9FB" fill-rule="evenodd" d="M34 104c7-7 5 1-2 7-8 7-18 8-13 3 1-2 0-2-1-2-3-1-7-1-9-11-1-6 1-4 5-1 5 4 13 11 20 4Z" clip-rule="evenodd"></path>
                          <path fill="url('#belly')" d="M5 79c8 47 1 83 40 82 38 0 35-19 38-97C85 9 69 0 38 1 5 3-5 25 5 79Z"></path>
                          <path fill="url('#scales--3')" data-scales="" d="M5 79c8 47 1 83 40 82 38 0 35-19 38-97C85 9 69 0 38 1 5 3-5 25 5 79Z"></path>
                        </svg>
                      </div>
                      <svg viewBox="0 0 102 192">
                        <path fill="#F2A0BA" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M6 101c9 69 5 90 49 90 43-1 37-15 43-95 6-68 11-93-46-95C-4 0-3 32 6 101Z"></path>
                        <path fill="#E6DDFF" fill-rule="evenodd" d="m6 101 2 12c8 26 50 26 42 9-4-8 4-24 13-14 6 7 3 11 1 15-3 3-6 6-1 12 7 7 25-6 23-19-2-12 8-10 10 0a848 848 0 0 0 5-79c-5-6-87-16-97-6-4 16-1 40 2 70Zm4 26 1 16c4 4 18 5 23 1 1-2 0-2-3-2-5 0-13-1-17-7l-4-8Zm29 21c-3-1-3 3 0 5 12 2 16-6 12-8-3-1-4 0-6 2-1 1-3 2-6 1Zm23-30c-2 5-7 5-8 3-2-4 9-9 8-3Zm-45 36 3 1c8-3 14 0 11 4-2 3-4 1-5 0l-3-2-3 1c-2 1-4 1-5-2s0-3 2-2Zm29-25c-3 4-10 2-7-1 2-3 13-6 7 1Zm-15-4c17-7-19-15-15-8 4 8 11 8 15 8Z" clip-rule="evenodd"></path>
                        <path fill="url('#belly')" d="M6 101c9 69 5 90 49 90 43-1 37-15 43-95 6-68 11-93-46-95C-4 0-3 32 6 101Z"></path>
                        <path fill="url('#scales--3')" data-scales="" d="M6 101c9 69 5 90 49 90 43-1 37-15 43-95 6-68 11-93-46-95C-4 0-3 32 6 101Z"></path>
                      </svg>
                    </div>
                    <svg viewBox="0 0 122 206">
                      <path fill="#EE4963" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M3 88c13 106 28 117 61 117 32-1 40-8 54-111 11-83-4-89-50-93C21-3-7 5 3 88Z"></path>
                      <path fill="#E6DDFF" fill-rule="evenodd" d="M68 145c6 10 23 3 19-5-2-4-5-2-7 0-4 3-7 6-12-2-3-6 0-6 6-6 9-1 26-2 42-22l-3 15c-11 73-20 79-49 80-3-5-4-9-3-11 0-3 4-6 7-8 4-3 9-6 4-13-8-11-25 0-23 5 4 8 9 5 13 2 2-2 5-4 6-2 2 3 0 5-3 7s-7 6-7 13c0 3 2 5 4 7-28 0-42-10-54-82l-1-4c12 10 11 7 10 3-1-3-2-7 4-3 11 6 15 12 17 16 1 3 2 4 6 2-7-6 12-13 24 8Zm24 33c4 1 2 6 0 11-4 7-22-1-14-4l5-4c2-2 4-4 9-3Z" clip-rule="evenodd"></path>
                      <path fill="url('#belly')" d="M3 88c13 106 28 117 61 117 32-1 40-8 54-111 11-83-4-89-50-93C21-3-7 5 3 88Z"></path>
                      <path fill="url('#scales--3')" data-scales="" d="M3 88c13 106 28 117 61 117 32-1 40-8 54-111 11-83-4-89-50-93C21-3-7 5 3 88Z"></path>
                    </svg>
                  </div>
                  <svg viewBox="0 0 142 218">
                    <path fill="#F13D5A" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M2 90c7 107 26 127 74 127 48-1 51-30 62-125 8-67 3-92-57-91C20 1-3 6 2 90Z"></path>
                    <path fill="url('#belly')" d="M2 90c7 107 26 127 74 127 48-1 51-30 62-125 8-67 3-92-57-91C20 1-3 6 2 90Z"></path>
                    <path fill="url('#scales--3')" data-scales="" d="M2 90c7 107 26 127 74 127 48-1 51-30 62-125 8-67 3-92-57-91C20 1-3 6 2 90Z"></path>
                  </svg>
                </div>
                <svg viewBox="0 0 142 286">
                  <path fill="#F3544E" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M141 162C138 56 107-1 75 1 44 3 2 120 1 178c-1 83-5 108 66 107 70-1 77-15 74-123Z"></path>
                  <path fill="url('#belly')" d="M141 162C138 56 107-1 75 1 44 3 2 120 1 178c-1 83-5 108 66 107 70-1 77-15 74-123Z"></path>
                  <path fill="url('#scales--3')" data-scales="" d="M141 162C138 56 107-1 75 1 44 3 2 120 1 178c-1 83-5 108 66 107 70-1 77-15 74-123Z"></path>
                </svg>
              </div>
              <div class="gecko__body-part gecko__leg--left" style="--width: 201; --height: 114">
                <div class="gecko__body-part gecko__shin--left" style="--width: 131; --height: 143">
                  <div class="gecko__body-part gecko__foot--left" style="--width: 162; --height: 211">
                    <svg viewBox="0 0 162 211">
                      <path fill="#CB6231" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M148 162c-4-12-8-39 7-54 10-9 6-21 0-30-9-12-18-7-27-10-2-7-4-10 2-29 8-26-8-28-8-28l-2-9-4 8s-17 4-6 36c2 7 4 26-17 1-22-25-38-14-38-14l-13-6 10 12s-2 20 29 27c12 3 4 30-24 26-41-5-42 12-42 12l-14 7c4 2 15 3 15 3s5 20 60-4c32-11 17 9-3 17-31 12-38 28-34 38l-11 17c3-4 17-10 17-10s11 19 51-36c21-29 42-19 25 18s6 41 6 41l4 14c4-17 2-5 5-14 15 0 14-22 12-33Z"></path>
                      <path fill="url('#scales--3')" data-scales="" d="M148 162c-4-12-8-39 7-54 10-9 6-21 0-30-9-12-18-7-27-10-2-7-4-10 2-29 8-26-8-28-8-28l-2-9-4 8s-17 4-6 36c2 7 4 26-17 1-22-25-38-14-38-14l-13-6 10 12s-2 20 29 27c12 3 4 30-24 26-41-5-42 12-42 12l-14 7c4 2 15 3 15 3s5 20 60-4c32-11 17 9-3 17-31 12-38 28-34 38l-11 17c3-4 17-10 17-10s11 19 51-36c21-29 42-19 25 18s6 41 6 41l4 14c4-17 2-5 5-14 15 0 14-22 12-33Z"></path>
                    </svg>
                  </div>
                  <svg viewBox="0 0 131 143">
                    <path fill="#D26633" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M102 64c4-12 18-1 27-31 5-17-8-40-33-29-15 7-43 41-58 69-16 28-10 14-28 24-29 16 16 61 37 40 21-22 50-56 55-73Z"></path>
                    <path fill="url('#scales--3')" data-scales="" d="M102 64c4-12 18-1 27-31 5-17-8-40-33-29-15 7-43 41-58 69-16 28-10 14-28 24-29 16 16 61 37 40 21-22 50-56 55-73Z"></path>
                  </svg>
                </div>
                <svg viewBox="0 0 201 114">
                  <path fill="#D96B33" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M140 111c51 14 96-65 17-99C113-7 62 2 27 11c-38 16-31 59-1 62 22 1 23 0 36 9 21 14 55 23 78 29Z"></path>
                  <path fill="url('#scales--3')" data-scales="" d="M140 111c51 14 96-65 17-99C113-7 62 2 27 11c-38 16-31 59-1 62 22 1 23 0 36 9 21 14 55 23 78 29Z"></path>
                </svg>
              </div>
              <div class="gecko__body-part gecko__leg--right" style="--width: 211; --height: 105">
                <div class="gecko__body-part gecko__shin--right" style="--width: 107; --height: 130">
                  <div class="gecko__body-part gecko__foot--right" style="--width: 174; --height: 229">
                    <svg viewBox="0 0 174 229">
                      <path fill="#E06F36" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M37 60c1 6 0 14-3 15-14 7-19 2-28 16-8 14-5 19 14 39-17 63-28 64-10 84l4 13 8-13c14-5 17-26 14-54s19-41 34-10c12 26 27 56 42 46l13 7-6-13s17-12-31-48c-23-17-5-43 24-27 35 17 47-7 47-7l13-5-13-6c-10-14-19-10-45-4-25 6-43-7-23-15 16-6 35-19 29-31 4-8 9-13 9-13l-16 5c-6-6-17-7-33 21-8 13-29 19-21-4 8-22 9-34-2-39V3c-5 9-5 9-10 13-23 14-10 33-10 44Z"></path>
                      <path fill="url('#scales--3')" data-scales="" d="M37 60c1 6 0 14-3 15-14 7-19 2-28 16-8 14-5 19 14 39-17 63-28 64-10 84l4 13 8-13c14-5 17-26 14-54s19-41 34-10c12 26 27 56 42 46l13 7-6-13s17-12-31-48c-23-17-5-43 24-27 35 17 47-7 47-7l13-5-13-6c-10-14-19-10-45-4-25 6-43-7-23-15 16-6 35-19 29-31 4-8 9-13 9-13l-16 5c-6-6-17-7-33 21-8 13-29 19-21-4 8-22 9-34-2-39V3c-5 9-5 9-10 13-23 14-10 33-10 44Z"></path>
                    </svg>
                  </div>
                  <svg viewBox="0 0 107 130">
                    <path fill="#E77337" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M97 83C78 62 52 15 35 5 18-6 2 9 1 30s21 24 23 35c11 37 29 35 48 59 6 7 25 7 31-5 6-10 3-26-6-36Z"></path>
                    <path fill="url('#scales--3')" data-scales="" d="M97 83C78 62 52 15 35 5 18-6 2 9 1 30s21 24 23 35c11 37 29 35 48 59 6 7 25 7 31-5 6-10 3-26-6-36Z"></path>
                  </svg>
                </div>
                <svg viewBox="0 0 211 105">
                  <path fill="#EE7838" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M199 13C184-5 134 2 96 4 56 7 7 17 2 50s11 60 60 52c49-7 60-40 123-34 33 4 29-37 14-55Z"></path>
                  <path fill="url('#scales--3')" data-scales="" d="M199 13C184-5 134 2 96 4 56 7 7 17 2 50s11 60 60 52c49-7 60-40 123-34 33 4 29-37 14-55Z"></path>
                </svg>
              </div>
              <svg viewBox="0 0 164 215">
                <path fill="#F57C3A" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M157 71C138 32 169 1 83 1-5 1 25 48 6 77c-18 28 12 78 37 107 31 37 49 43 78 0 26-39 55-71 36-113Z"></path>
                <path fill="url('#scales--3')" data-scales="" d="M157 71C138 32 169 1 83 1-5 1 25 48 6 77c-18 28 12 78 37 107 31 37 49 43 78 0 26-39 55-71 36-113Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="gecko__body-part gecko__thorax" style="--width: 181; --height: 171">
          <svg viewBox="0 0 181 171">
            <path fill="#EE7838" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M167 143c17-26 17-58 0-88C139 5 77-30 22 41c-15 19-35 54-8 98 28 45 133 36 153 4Z"></path>
            <path fill="url('#scales--3')" data-scales="" d="M167 143c17-26 17-58 0-88C139 5 77-30 22 41c-15 19-35 54-8 98 28 45 133 36 153 4Z"></path>
          </svg>
          <div class="gecko__body-part gecko__arm--left" style="--width: 138; --height: 104">
            <div class="gecko__body-part gecko__forearm--left" style="--width: 101; --height: 64">
              <div class="gecko__body-part gecko__hand--left" style="--width: 136; --height: 131">
                <svg viewBox="0 0 136 131">
                  <path fill="#CB6231" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M56 118c29-19 36-12 48-10s27-21 17-29c-8-7-15-10-3-20 21-18 19-24 14-28l3-12-11 5c-10-4-15 10-16 16-7 17-16 28-17 6 4-31-6-39-14-38l-7-7s-2 2-3 9c-9 10 3 27 5 31s8 36-6 6C56 17 44 11 36 18l-10-6c1 6 3 5 4 12-4 16 12 24 19 29 5 4 8 10 9 13 4 8 0 6-11-4-16-23-29-27-36-21L1 39s-1 3 5 10C5 69 34 73 38 75s37 22 9 25c-23 3-31 10-32 14l-9 4 12 7c7 9 22 4 38-7Z"></path>
                  <path fill="url('#scales--3')" data-scales="" d="M56 118c29-19 36-12 48-10s27-21 17-29c-8-7-15-10-3-20 21-18 19-24 14-28l3-12-11 5c-10-4-15 10-16 16-7 17-16 28-17 6 4-31-6-39-14-38l-7-7s-2 2-3 9c-9 10 3 27 5 31s8 36-6 6C56 17 44 11 36 18l-10-6c1 6 3 5 4 12-4 16 12 24 19 29 5 4 8 10 9 13 4 8 0 6-11-4-16-23-29-27-36-21L1 39s-1 3 5 10C5 69 34 73 38 75s37 22 9 25c-23 3-31 10-32 14l-9 4 12 7c7 9 22 4 38-7Z"></path>
                </svg>
              </div>
              <svg viewBox="0 0 101 64">
                <path fill="#D26633" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M87 63c10-3 15-9 13-24-1-9-10-15-19-23C67 5 54 7 40 5 23 3 18-5 6 10c-9 12-4 23 1 25 6 1 60 34 80 28Z"></path>
                <path fill="url('#scales--3')" data-scales="" d="M87 63c10-3 15-9 13-24-1-9-10-15-19-23C67 5 54 7 40 5 23 3 18-5 6 10c-9 12-4 23 1 25 6 1 60 34 80 28Z"></path>
              </svg>
            </div>
            <svg viewBox="0 0 138 104">
              <path fill="#EE7838" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M63 74c7-4 17-4 21-4 0 0 11 7 19 8 25 1 43-34 29-56-7-11-14-24-32-20-16 2-30 22-42 28-23 11-30 20-42 26-27 12-13 51 6 47 18-4 32-25 41-29Z"></path>
              <path fill="url('#scales--3')" data-scales="" d="M63 74c7-4 17-4 21-4 0 0 11 7 19 8 25 1 43-34 29-56-7-11-14-24-32-20-16 2-30 22-42 28-23 11-30 20-42 26-27 12-13 51 6 47 18-4 32-25 41-29Z"></path>
            </svg>
          </div>
          <div class="gecko__body-part gecko__arm--right" style="--width: 140; --height: 105">
            <div class="gecko__body-part gecko__forearm--right" style="--width: 109; --height: 75">
              <div class="gecko__body-part gecko__hand--right" style="--width: 148; --height: 159">
                <svg viewBox="0 0 148 159">
                  <path fill="#CB6231" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M8 79c-13 11-5 28 4 32 8 5 8 2 17 3 14 1 21 3 34 19 14 35 26 19 26 19l11 6-7-10s16-10-21-32c-13-16 5-17 23-15 34 13 40-8 40-8l11-4-12-3s-3-17-41-4c-16 2-41 1-6-15 41-9 30-25 30-25l7-10-11 3s-10-12-37 17c-28 19-28 10-9-7 22-17 10-27 10-27l4-11-9 7S57 7 50 34c-2 10-23 34-22 15 2-30-5-37-10-37L15 2l-3 10c-15 5-4 31-1 35 4 5 12 31-3 32Z"></path>
                  <path fill="url('#scales--3')" data-scales="" d="M8 79c-13 11-5 28 4 32 8 5 8 2 17 3 14 1 21 3 34 19 14 35 26 19 26 19l11 6-7-10s16-10-21-32c-13-16 5-17 23-15 34 13 40-8 40-8l11-4-12-3s-3-17-41-4c-16 2-41 1-6-15 41-9 30-25 30-25l7-10-11 3s-10-12-37 17c-28 19-28 10-9-7 22-17 10-27 10-27l4-11-9 7S57 7 50 34c-2 10-23 34-22 15 2-30-5-37-10-37L15 2l-3 10c-15 5-4 31-1 35 4 5 12 31-3 32Z"></path>
                </svg>
              </div>
              <svg viewBox="0 0 109 75">
                <path fill="#D26633" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M18 20C5 22-4 43 4 57c11 19 27 23 56 8 16-9 36-25 43-30 13-10 1-35-23-34-17 0-36 14-62 19Z"></path>
                <path fill="url('#scales--3')" data-scales="" d="M18 20C5 22-4 43 4 57c11 19 27 23 56 8 16-9 36-25 43-30 13-10 1-35-23-34-17 0-36 14-62 19Z"></path>
              </svg>
            </div>
            <svg viewBox="0 0 140 105">
              <path fill="#EE7838" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M102 47C81 43 62 23 41 8 5-21-17 40 20 67c8 6 22 9 34 8 11-1 12 1 26 12 21 16 34 19 45 17 26-5 12-50-23-57Z"></path>
              <path fill="url('#scales--3')" data-scales="" d="M102 47C81 43 62 23 41 8 5-21-17 40 20 67c8 6 22 9 34 8 11-1 12 1 26 12 21 16 34 19 45 17 26-5 12-50-23-57Z"></path>
            </svg>
          </div>
        </div>
        <svg viewBox="0 0 164 201">
          <path fill="#FF8D43" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M163 71c-2-20-17-39-27-48C107-5 75-3 37 9 0 20 0 66 1 80c1 15 5 27 17 75 16 66 127 54 133 2 6-45 14-66 12-86Z"></path>
          <path fill="url('#scales--3')" data-scales="" d="M163 71c-2-20-17-39-27-48C107-5 75-3 37 9 0 20 0 66 1 80c1 15 5 27 17 75 16 66 127 54 133 2 6-45 14-66 12-86Z"></path>
        </svg>
        <div class="gecko__body-part gecko__neck__body" style="--width: 154; --height: 176">
          <svg viewBox="0 0 154 176">
            <path fill="#FF9144" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M140 136c27-46 7-97-11-113C98-5 58-8 23 23 1 42-7 104 11 140c18 37 94 58 129-4Z"></path>
            <path fill="url('#scales--3')" data-scales="" d="M140 136c27-46 7-97-11-113C98-5 58-8 23 23 1 42-7 104 11 140c18 37 94 58 129-4Z"></path>
          </svg>
          <div class="gecko__body-part gecko__neck__head" style="--width: 164; --height: 203">
            <svg viewBox="0 0 164 203">
              <path fill="#FF9746" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M151 158c25-87 8-110-12-133-31-35-87-29-116 0C-7 55-2 95 13 168c11 51 123 44 138-10Z"></path>
              <path fill="url('#scales--3')" data-scales="" d="M151 158c25-87 8-110-12-133-31-35-87-29-116 0C-7 55-2 95 13 168c11 51 123 44 138-10Z"></path>
            </svg>
            <div class="gecko__body-part gecko__head" style="--width: 367; --height: 371">
              <svg viewBox="0 0 371 374" fill="none">
                <path fill="#FF9C48" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M208 334c-39 4-63 10-103-46-19-28-35-99 4-145 6-21 7-30 21-50 5-33 28-75 57-76s53 54 55 60l7 20c12 15 13 24 19 40 29 23 35 84 17 118-15 26-38 76-77 79Z"></path>
                <path fill="url('#scales--3')" data-scales="" d="M208 334c-39 4-63 10-103-46-19-28-35-99 4-145 6-21 7-30 21-50 5-33 28-75 57-76s53 54 55 60l7 20c12 15 13 24 19 40 29 23 35 84 17 118-15 26-38 76-77 79Z"></path>
                <path fill="#FFC46F" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M119 141c18-21 34-61 27-61-4 0-15 2-27 21-9 12-11 33 0 40Z"></path>
                <path fill="url('#scales--3')" data-scales="" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M119 141c18-21 34-61 27-61-4 0-15 2-27 21-9 12-11 33 0 40Z"></path>
                <path fill="url(#eye-gradient-0)" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path fill="url(#eye-gradient-0)" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path fill="url(#eye-gradient-1)" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path fill="url(#eye-gradient-1)" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path fill="url(#eye-gradient-2)" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path fill="url(#eye-gradient-2)" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M147 84c-2 13-11 32-26 49-21-20-2-56 26-49Z"></path>
                <path fill="#FFC46F" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M113 136c12 20 47-58 33-58-8 0-4 7-15 27-13 24-22 26-18 31Z"></path>
                <path fill="url('#scales--3')" data-scales="" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M113 136c12 20 47-58 33-58-8 0-4 7-15 27-13 24-22 26-18 31Z"></path>
                <path fill="#FF913F" d="M116 143c47 22 75-40 39-64-11-8-6 3-19 28-16 32-28 32-20 36Z"></path>
                <path fill="url('#scales--3')" data-scales="" d="M116 143c47 22 75-40 39-64-11-8-6 3-19 28-16 32-28 32-20 36Z"></path>
                <path fill="#FFC46F" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M256 139c-20-19-37-63-30-60 6 3 14 2 28 20 8 12 13 28 2 40Z"></path>
                <path fill="url('#scales--3')" data-scales="" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M256 139c-20-19-37-63-30-60 6 3 14 2 28 20 8 12 13 28 2 40Z"></path>
                <path fill="url(#eye-gradient-3)" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path fill="url(#eye-gradient-3)" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path fill="url(#eye-gradient-4)" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path fill="url(#eye-gradient-4)" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path fill="url(#eye-gradient-5)" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path fill="url(#eye-gradient-5)" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M226 84c2 13 11 32 26 49 21-20 2-56-26-49Z"></path>
                <path fill="#FFC46F" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M260 138c-14 19-51-59-37-60 8 0 1 8 13 28 14 23 30 24 24 32Z"></path>
                <path fill="url('#scales--3')" data-scales="" stroke="rgba(0,0,0,0.375)" stroke-width="1" d="M260 138c-14 19-51-59-37-60 8 0 1 8 13 28 14 23 30 24 24 32Z"></path>
                <path fill="#FF913F" d="M254 145c-44 17-75-38-39-64 13-10 4 3 18 27 17 31 37 31 21 37Z"></path>
                <path fill="url('#scales--3')" data-scales="" d="M254 145c-44 17-75-38-39-64 13-10 4 3 18 27 17 31 37 31 21 37Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<label class="tip-wrapper">
  <input class="hidden-checkbox" type="checkbox"/>
  <div class="tip"> <span>ⓘ </span><span>For best UX, try Chrome Desktop (or Edge)</span></div>
</label>
<svg class="svg-defs" width="100%" height="100%">
  <defs>
    <radialgradient id="eye-gradient-0" cx="0" cy="0" r="1" gradientTransform="matrix(-29 -21 25 -34 131 103)" gradientUnits="userSpaceOnUse">
      <stop offset=".3"></stop>
      <stop offset=".5" stop-color="#D7D04F"></stop>
      <stop offset=".6" stop-color="#B4BA4D"></stop>
      <stop offset="1" stop-color="#1B2919"></stop>
    </radialgradient>
    <lineargradient id="eye-gradient-1" x1="120.3" x2="127.1" y1="86" y2="109" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1A3316"></stop>
      <stop offset="1" stop-color="#EBFF9D" stop-opacity="0"></stop>
    </lineargradient>
    <lineargradient id="eye-gradient-2" x1="102.1" x2="134.4" y1="136.2" y2="127.5" gradientUnits="userSpaceOnUse">
      <stop></stop>
      <stop offset="1" stop-opacity="0"></stop>
    </lineargradient>
    <radialgradient id="eye-gradient-3" cx="0" cy="0" r="1" gradientTransform="matrix(29 -22 25 34 243 103)" gradientUnits="userSpaceOnUse">
      <stop offset=".3"></stop>
      <stop offset=".5" stop-color="#D7D04F"></stop>
      <stop offset=".6" stop-color="#B4BA4D"></stop>
      <stop offset="1" stop-color="#1B2919"></stop>
    </radialgradient>
    <lineargradient id="eye-gradient-4" x1="252.8" x2="246" y1="86" y2="109" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1A3316"></stop>
      <stop offset="1" stop-color="#EBFF9D" stop-opacity="0"></stop>
    </lineargradient>
    <lineargradient id="eye-gradient-5" x1="270.9" x2="238.7" y1="136.2" y2="127.5" gradientUnits="userSpaceOnUse">
      <stop></stop>
      <stop offset="1" stop-opacity="0"></stop>
    </lineargradient>
    <lineargradient id="belly" x1="0%" x2="100%" y1="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(254,243,244,0.125)"></stop>
      <stop offset="20%" stop-color="transparent"></stop>
      <stop offset="50%" stop-color="transparent"></stop>
      <stop offset="85%" stop-color="rgba(254,243,244,0.125)"></stop>
      <stop offset="100%" stop-color="rgba(244,223,224,0.625)"></stop>
    </lineargradient>
    <pattern id="scales--1" width="50" height="50" patternUnits="userSpaceOnUse">
      <path fill="rgba(127,93,160,0.175)" d="M36 4c3-1 6-2 9-1v1l-4 7h-1c-1 0-3 0-4-2V4m14 19c-2-1-3-3-4-6h-1l3-4h2v10M30 0l-6 4h-1c-2 0-3-1-3-3V0h10M0 13l3 2c1 3 0 6-1 8v1H1l-1-1V13m20 37 1-3h1c3-1 6 0 8 1v2H20m17-18c-1-2 0-4 1-5h9v1c-1 3-3 5-6 6l-4-2m8 15c-3 0-6 0-8-2a1 1 0 0 1-1 0 1 1 0 0 1 1-1l6-5h1c2 1 3 2 3 4 0 1 0 3-2 4M34 34c2 0 3 1 3 3 1 2 0 3-1 5h-1l-8-2a1 1 0 0 1 0-1c1-2 3-4 7-5M11 6c-2 3-4 4-7 5H3C2 8 3 5 4 2h5c2 0 2 2 2 4m2 12V9h1c2 1 5 3 6 6l-2 4c-2 1-3 0-5-1m22-4c1 3 0 6-1 8l-1 1v-1c-3-1-4-3-5-6v-1c0-2 1-3 3-3s3 0 4 2M2 43l7-4 1 1-2 8H3c-2-1-2-3-2-5h1m10-11c-4 0-6-2-8-4a1 1 0 0 1 0-1c2-2 5-2 8-3h1l2 4v1c0 1-1 3-3 3m13-11 7 5v1c-3 2-5 2-9 2-2-1-2-3-2-4v-1l4-3m-8 15c2-1 4 0 5 1l1 4-1 1c-2 2-5 3-7 3h-1a1 1 0 0 1 0-1c0-3 1-5 3-8"></path>
    </pattern>
    <pattern id="scales--2" width="50" height="50" patternUnits="userSpaceOnUse">
      <path fill="rgba(129,89,14,0.1125)" d="M36 4c3-1 6-2 9-1v1l-4 7h-1c-1 0-3 0-4-2V4m14 19c-2-1-3-3-4-6h-1l3-4h2v10M30 0l-6 4h-1c-2 0-3-1-3-3V0h10M0 13l3 2c1 3 0 6-1 8v1H1l-1-1V13m20 37 1-3h1c3-1 6 0 8 1v2H20m17-18c-1-2 0-4 1-5h9v1c-1 3-3 5-6 6l-4-2m8 15c-3 0-6 0-8-2a1 1 0 0 1-1 0 1 1 0 0 1 1-1l6-5h1c2 1 3 2 3 4 0 1 0 3-2 4M34 34c2 0 3 1 3 3 1 2 0 3-1 5h-1l-8-2a1 1 0 0 1 0-1c1-2 3-4 7-5M11 6c-2 3-4 4-7 5H3C2 8 3 5 4 2h5c2 0 2 2 2 4m2 12V9h1c2 1 5 3 6 6l-2 4c-2 1-3 0-5-1m22-4c1 3 0 6-1 8l-1 1v-1c-3-1-4-3-5-6v-1c0-2 1-3 3-3s3 0 4 2M2 43l7-4 1 1-2 8H3c-2-1-2-3-2-5h1m10-11c-4 0-6-2-8-4a1 1 0 0 1 0-1c2-2 5-2 8-3h1l2 4v1c0 1-1 3-3 3m13-11 7 5v1c-3 2-5 2-9 2-2-1-2-3-2-4v-1l4-3m-8 15c2-1 4 0 5 1l1 4-1 1c-2 2-5 3-7 3h-1a1 1 0 0 1 0-1c0-3 1-5 3-8"></path>
    </pattern>
    <pattern id="scales--3" width="50" height="50" patternUnits="userSpaceOnUse">
      <path fill="rgba(224,57,57,0.1625)" d="M36 4c3-1 6-2 9-1v1l-4 7h-1c-1 0-3 0-4-2V4m14 19c-2-1-3-3-4-6h-1l3-4h2v10M30 0l-6 4h-1c-2 0-3-1-3-3V0h10M0 13l3 2c1 3 0 6-1 8v1H1l-1-1V13m20 37 1-3h1c3-1 6 0 8 1v2H20m17-18c-1-2 0-4 1-5h9v1c-1 3-3 5-6 6l-4-2m8 15c-3 0-6 0-8-2a1 1 0 0 1-1 0 1 1 0 0 1 1-1l6-5h1c2 1 3 2 3 4 0 1 0 3-2 4M34 34c2 0 3 1 3 3 1 2 0 3-1 5h-1l-8-2a1 1 0 0 1 0-1c1-2 3-4 7-5M11 6c-2 3-4 4-7 5H3C2 8 3 5 4 2h5c2 0 2 2 2 4m2 12V9h1c2 1 5 3 6 6l-2 4c-2 1-3 0-5-1m22-4c1 3 0 6-1 8l-1 1v-1c-3-1-4-3-5-6v-1c0-2 1-3 3-3s3 0 4 2M2 43l7-4 1 1-2 8H3c-2-1-2-3-2-5h1m10-11c-4 0-6-2-8-4a1 1 0 0 1 0-1c2-2 5-2 8-3h1l2 4v1c0 1-1 3-3 3m13-11 7 5v1c-3 2-5 2-9 2-2-1-2-3-2-4v-1l4-3m-8 15c2-1 4 0 5 1l1 4-1 1c-2 2-5 3-7 3h-1a1 1 0 0 1 0-1c0-3 1-5 3-8"></path>
    </pattern>
  </defs>
</svg>
    <script  src="./script.js"></script>

  
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        // Throttling function using requestAnimationFrame
        let ticking = false;
        let lastTarget = null;
        let lastHoveredElements = [];

        // Optimized function to simulate hover
        const updateHover = (x, y) => {
          if (ticking) return;
          
          ticking = true;
          requestAnimationFrame(() => {
            const target = document.elementFromPoint(x, y);
            
            // If target hasn't changed, no need to do anything expensive
            if (!target || target === lastTarget) {
                ticking = false;
                return;
            }
            
            lastTarget = target;

            // Identify new elements to hover
            const newHoveredElements = [];
            let el = target;
            while (el && el !== document.body) {
               if (el.tagName === 'TD' || el.tagName === 'TR' || el.classList.contains('start-screen') || el.classList.contains('welcome-screen')) {
                   newHoveredElements.push(el);
               }
               el = el.parentElement;
            }

            // Optimization: Only change classes if the set of elements is different
            // Simple check: length diff or first element diff (heuristic)
            // For correctness, we'll just do the diff:
            
            // Remove .hover from elements that are no longer hovered
            for (const oldEl of lastHoveredElements) {
                if (!newHoveredElements.includes(oldEl)) {
                    oldEl.classList.remove('hover');
                }
            }

            // Add .hover to new elements
            for (const newEl of newHoveredElements) {
                if (!lastHoveredElements.includes(newEl)) {
                    newEl.classList.add('hover');
                }
            }
            
            lastHoveredElements = newHoveredElements;
            ticking = false;
          });
        };
        
        // Touch event listeners
        document.addEventListener('touchstart', (e) => {
           // e.preventDefault(); // Optional, might block clicks
           const touch = e.touches[0];
           updateHover(touch.clientX, touch.clientY);
        }, { passive: false });
        
        document.addEventListener('touchmove', (e) => {
           e.preventDefault(); // Important to stop scrolling
           const touch = e.touches[0];
           updateHover(touch.clientX, touch.clientY);
        }, { passive: false });

        // Start screen handling - simulate focus/hover to dismiss welcome screen
        // The welcome screen likely disappears on hover or click
        const welcome = document.querySelector('.welcome-screen');
        if (welcome) {
            welcome.addEventListener('touchstart', () => {
                welcome.classList.add('hover');
                // Force focus if needed
                welcome.focus();
            });
        }
      });
    </script>
  </body>
  
</html>

`;

export default getGeckosHTML();
