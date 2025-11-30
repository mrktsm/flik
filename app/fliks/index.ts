// Flik data structure
export interface Flik {
  id: number;
  username: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  backgroundColor: string;
  html?: string;
  css?: string;
  js?: string;
  fullHtml?: string;
}

// Import the pipes JavaScript code
import pipesJS from "./pipes";
import dice3dHTML from "./dice3d";
import thecubeHTML from "./thecube";
import tearableClothHTML from "./tearablecloth";
import clawMachineHTML from "./clawmachine";
import skatingBunnyHTML from "./skatingbunny";
import chanoHTML from "./chano";
import game2048HTML from "./game2048";
import towerblockHTML from "./towerblock";
import tunnelHTML from "./tunnel";
import flappybirdHTML from "./flappybird";
import miniGsapGameHTML from "./miniGsapGame";
import grapeSodaHTML from "./grapeSoda";
import letterfallHTML from "./letterfall";
import shootingHoopsHTML from "./shootingHoops";
import simonHTML from "./simon";
import pixelfaceHTML from "./pixelface";
import hammerHTML from "./hammer";
import spinnerHTML from "./spinner";
import etchASketchHTML from "./etchasketch";
import jigsawHTML from "./jigsaw";
import walkmanHTML from "./walkman";
import helmetHTML from "./helmet";
import tinyPolyWorldHTML from "./tinypolyworld";
import toyfishHTML from "./toyfish";
import photoTearHTML from "./phototear";
import snakeHTML from "./snake";
import marioHTML from "./mario";
import geckosHTML from "./geckos";
import dinosaurMemoryHTML from "./dinosaurmemory";
import dontTouchTheSpikesHTML from "./donttouchthespikes";
import slidePuzzleHTML from "./slidepuzzle";
import flappyDinoHTML from "./flappydino";

export const fliks: Flik[] = [
  {
    id: 1,
    username: "textanimator",
    description: "Elastic string physics ✨ Drag the letters around!",
    likes: 89000,
    comments: 2100,
    shares: 4500,
    backgroundColor: "#f9f9f2",
    html: '<canvas id="c"></canvas><script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.9/dat.gui.min.js"></script>',
    css: `
      html, body {
        height: 100%;
      }
      body {
        font-family: sans-serif;
        padding: 0;
        margin: 0;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-color: #f9f9f2;
        background-image: radial-gradient(circle farthest-side, #F9F9F2 0%, #D6D6D0 100%);
      }
      canvas {
        position: absolute;
        top: 0;
        left: 0;
        touch-action: none;
      }
      .dg.ac {
        display: none !important;
      }
    `,
    js: `
      window.requestAnimationFrame = (function(){
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60); };
      })();

      var ElasticString = (function(document) {
        'use strict';
        function ElasticString(fontSize, fontFamily, friction, spring) {
          this._fontSize = fontSize;
          this.points = [];
          this.fontFamily = fontFamily || 'serif';
          if (friction !== undefined) this.friction = friction;
          if (spring !== undefined) this.spring = spring;
          this._endPoint = new Point();
          this._ctx = document.createElement('canvas').getContext('2d');
        }
        ElasticString.prototype = {
          points: null, fontFamily: 'serif', friction: 0.02, spring: 0.6, _text: '', _fontSize: 1, _endPoint: null,
          setFontSize: function(fontSize) { this._fontSize = fontSize; this.setText(this._text); },
          getFontSize: function() { return this._fontSize; },
          setText: function(text, positions) {
            var points = this.points, p, letter, between, i, len;
            if (text.length < points.length) points = points.slice(0, text.length);
            this._ctx.font = this._fontSize + 'px ' + this.fontFamily;
            for (i = 0, len = text.length; i < len; i++) {
              letter = text.charAt(i); between = this._ctx.measureText(letter).width;
              p = points[i];
              if (p) { p.letter = letter; p.between = between; } 
              else { p = new Point(letter, between); points[i] = p; }
              if (positions && positions.length) { p.x = p.px = positions[i][0]; p.y = p.py = positions[i][1]; }
            }
            this.points = points; this._text = text;
          },
          getText: function() { return this._text; },
          render: function(ctx) {
            var points = this.points, spring = this.spring, dx, dy, dist, scale, p0, p1, size, angle, i, len;
            points.push(this._endPoint);
            this._updatePoint(points[0]);
            for (i = 0, len = points.length - 1; i < len; i++) {
              p0 = points[i]; p1 = points[i + 1];
              this._updatePoint(p1);
              dx = p0.x - p1.x; dy = p0.y - p1.y; dist = Math.sqrt(dx * dx + dy * dy);
              scale = dist ? (p0.between - dist) / dist * 0.5 * spring : 0;
              dx *= scale; dy *= scale;
              p0.x += dx; p0.y += dy; p1.x -= dx; p1.y -= dy;
            }
            for (i = 0; i < len; i++) {
              p0 = points[i]; p1 = points[i + 1];
              dx = p1.x - p0.x; dy = p1.y - p0.y; dist = Math.sqrt(dx * dx + dy * dy); angle = Math.atan2(dy, dx);
              ctx.save(); size = this._fontSize > dist ? this._fontSize : dist;
              ctx.font = size + 'px ' + this.fontFamily;
              ctx.translate(p0.x, p0.y); ctx.rotate(angle); ctx.fillText(p0.letter, 0, 0); ctx.restore();
            }
            points.pop();
          },
          _updatePoint: function(p) {
            var friction = 1 - this.friction, px = p.px, py = p.py;
            p.px = p.x; p.py = p.y;
            if (p.fixed) return;
            p.x += (p.x - px) * friction; p.y += (p.y - py) * friction;
          }
        };
        function Point(letter, between, x, y) {
          this.letter = letter || ''; this.between = between || 0;
          this.x = this.px = x || 0; this.y = this.py = y || 0;
        }
        Point.prototype = { letter: '', between: 1, x: 0, y: 0 };
        return ElasticString;
      })(document);

      (function(window, document) {
        'use strict';
        var TEXT = 'The quick brown fox jumps over the lazy dog.', FONT_SIZE = 25;
        var canvas, context, elasticString, mouse = { x: 0, y: 0 }, drag = null, gui, guiOptions;
        function init() {
          var pos = [], i, len;
          canvas = document.getElementById('c'); context = canvas.getContext('2d'); resize(null);
          elasticString = new ElasticString(FONT_SIZE, 'Georgia, serif');
          for (i = 0, len = TEXT.length; i < len; i++) {
            if (i === 0) pos.push([100, 100]);
            else pos.push([canvas.width * Math.random(), canvas.height * Math.random()]);
          }
          elasticString.setText(TEXT, pos);
          window.addEventListener('resize', resize, false);
          canvas.addEventListener('mousemove', mouseMove, false);
          canvas.addEventListener('mousedown', mouseDown, false);
          canvas.addEventListener('touchmove', function(e) { e.preventDefault(); mouseMove(e.touches[0]); }, false);
          canvas.addEventListener('touchstart', function(e) { e.preventDefault(); mouseDown(e.touches[0]); }, false);
          document.body.addEventListener('mouseup', mouseUp, false);
          document.body.addEventListener('touchend', mouseUp, false);
          guiOptions = { text: elasticString.getText(), fontSize: elasticString.getFontSize() };
          if (typeof dat !== 'undefined') {
            gui = new dat.GUI();
            gui.add(guiOptions, 'text').onFinishChange(function() { elasticString.setText(guiOptions.text); });
            gui.add(guiOptions, 'fontSize', 1, 50).onChange(function() { elasticString.setFontSize(guiOptions.fontSize); });
            gui.add(elasticString, 'friction', 0, 1); gui.add(elasticString, 'spring', 0, 1); gui.close();
          }
          update();
        }
        function resize(e) {
          canvas.width = window.innerWidth; canvas.height = window.innerHeight;
          context.fillStyle = '#3a3a2c';
        }
        function mouseMove(e) { mouse.x = e.clientX || e.pageX; mouse.y = e.clientY || e.pageY; }
        function mouseDown(e) {
          var points = elasticString.points, p, hit = null, rangeSq = FONT_SIZE * FONT_SIZE, hitNear = FONT_SIZE * FONT_SIZE;
          var mx = e.clientX || e.pageX, my = e.clientY || e.pageY, dx, dy, distSq, i, len;
          for (i = 0, len = points.length; i < len; i++) {
            p = points[i]; dx = mx - p.x; dy = my - p.y; distSq = dx * dx + dy * dy;
            if (distSq < rangeSq && distSq < hitNear) { hitNear = distSq; hit = points[i]; }
          }
          drag = hit;
        }
        function mouseUp(e) { drag = null; }
        function update() {
          var points = elasticString.points, p, w = canvas.width, h = canvas.height, i, len;
          if (drag) { drag.x = mouse.x; drag.y = mouse.y; }
          for (i = 0, len = points.length; i < len; i++) {
            p = points[i];
            if (0 > p.x) p.x = 0; if (w < p.x) p.x = w;
            if (0 > p.y) p.y = 0; if (h < p.y) p.y = h;
          }
          context.clearRect(0, 0, canvas.width, canvas.height);
          elasticString.render(context);
          requestAnimationFrame(update);
        }
        init();
      })(window, document);
    `,
  },
  {
    id: 2,
    username: "codewizard",
    description: "3D Pipes visualization 🎨 Drag to rotate, WASD to move!",
    likes: 125000,
    comments: 3420,
    shares: 8900,
    backgroundColor: "#000000",
    html: "",
    css: `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body, html {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #000;
        touch-action: none;
      }
      canvas {
        width: 100% !important;
        height: 100% !important;
        display: block;
      }
    `,
    js: pipesJS,
  },
  {
    id: 3,
    username: "rubiksmaster",
    description:
      "3D Rubik's Cube Simulator! 🧩 Double tap to start, drag faces to rotate. Solve the puzzle!",
    likes: 890000,
    comments: 18000,
    shares: 32000,
    backgroundColor: "#d1d5db",
    fullHtml: thecubeHTML,
  },
  {
    id: 4,
    username: "clothmaster",
    description:
      "Tearable Cloth Physics! 🧵 Drag to tear, right-click to cut. Interactive cloth simulation!",
    likes: 320000,
    comments: 8900,
    shares: 15000,
    backgroundColor: "#F2F2F2",
    fullHtml: tearableClothHTML,
  },
  {
    id: 5,
    username: "dice3dmaster",
    description:
      "Interactive 3D dice roller! 🎲 Click ROLL to throw, +/- to change amount. Drag to rotate!",
    likes: 450000,
    comments: 12000,
    shares: 25000,
    backgroundColor: "#ffffff",
    fullHtml: dice3dHTML,
  },
  {
    id: 6,
    username: "arcadeguru",
    description:
      "Classic Claw Machine! 🎮 Use buttons to move the claw and grab toys! Win prizes!",
    likes: 560000,
    comments: 15000,
    shares: 28000,
    backgroundColor: "#84dfe2",
    fullHtml: clawMachineHTML,
  },
  {
    id: 7,
    username: "skatingbunny",
    description:
      "Skating Bunny! 🐰 Move mouse to guide the bunny, click to jump! Collect carrots on ice!",
    likes: 720000,
    comments: 21000,
    shares: 34000,
    backgroundColor: "#332e2e",
    fullHtml: skatingBunnyHTML,
  },
  {
    id: 8,
    username: "chanomusic",
    description:
      "Interactive Music Player! 🎵 Tap to play music and drag to transform! Colorful beats!",
    likes: 680000,
    comments: 19000,
    shares: 31000,
    backgroundColor: "#1F1F1F",
    fullHtml: chanoHTML,
  },
  {
    id: 9,
    username: "2048master",
    description:
      "Classic 2048 Puzzle Game! 🎯 Swipe to combine tiles and reach 2048! Can you beat it?",
    likes: 950000,
    comments: 28000,
    shares: 42000,
    backgroundColor: "#faf8ef",
    fullHtml: game2048HTML,
  },
  {
    id: 10,
    username: "towerbuilder",
    description:
      "Stack the blocks perfectly! 🏗️ Tap to place blocks and build the tallest tower!",
    likes: 780000,
    comments: 19500,
    shares: 38000,
    backgroundColor: "#D0CBC7",
    fullHtml: towerblockHTML,
  },
  {
    id: 11,
    username: "tunnelflyer",
    description:
      "Fly through the tunnel! 🚀 Touch and drag to control your movement through space!",
    likes: 920000,
    comments: 32000,
    shares: 51000,
    backgroundColor: "#000000",
    fullHtml: tunnelHTML,
  },
  // {
  //   id: 12,
  //   username: "flappymaster",
  //   description:
  //     "Classic Flappy Bird! 🐦 Tap to flap and navigate through the pipes!",
  //   likes: 1200000,
  //   comments: 45000,
  //   shares: 68000,
  //   backgroundColor: "#70c5ce",
  //   fullHtml: flappybirdHTML,
  // },
  {
    id: 13,
    username: "gsapgamer",
    description:
      "Mini GSAP Game! 🎮 A little to the right - interactive animation game!",
    likes: 650000,
    comments: 18000,
    shares: 29000,
    backgroundColor: "#1a1a1a",
    fullHtml: miniGsapGameHTML,
  },
  {
    id: 14,
    username: "grapefan",
    description:
      "Grape Soda Animation! 🍇 Watch the fizzy bubbles and interactive effects!",
    likes: 580000,
    comments: 16500,
    shares: 27000,
    backgroundColor: "#6b2c91",
    fullHtml: grapeSodaHTML,
  },
  {
    id: 15,
    username: "letterfaller",
    description:
      "Letterfall Game! 📝 Catch the falling letters and form words!",
    likes: 720000,
    comments: 22000,
    shares: 36000,
    backgroundColor: "#2c3e50",
    fullHtml: letterfallHTML,
  },
  {
    id: 16,
    username: "hoopshooter",
    description:
      "Shooting Hoops! 🏀 Aim and shoot! Perfect your basketball skills!",
    likes: 890000,
    comments: 25000,
    shares: 41000,
    backgroundColor: "#f39c12",
    fullHtml: shootingHoopsHTML,
  },
  {
    id: 17,
    username: "simonplayer",
    description:
      "Simon Game! 🎯 Follow the pattern and test your memory! Classic fun!",
    likes: 950000,
    comments: 28000,
    shares: 45000,
    backgroundColor: "#2c3e50",
    fullHtml: simonHTML,
  },
  // {
  //   id: 19,
  //   username: "hammeruser",
  //   description: "When all you have is a Hammer! 🔨 Tap to hammer the nail!",
  //   likes: 520000,
  //   comments: 14000,
  //   shares: 24000,
  //   backgroundColor: "#f5f5f5",
  //   fullHtml: hammerHTML,
  // },
  {
    id: 20,
    username: "spinnermaster",
    description:
      "Fidget Spinner 3.0! 🌀 Drag to spin and watch the colors change!",
    likes: 680000,
    comments: 19000,
    shares: 32000,
    backgroundColor: "#ffffff",
    fullHtml: spinnerHTML,
  },
  {
    id: 21,
    username: "etchasketch",
    description:
      "Classic Etch A Sketch! 🎨 Rotate the dials to draw, tap Erase to clear!",
    likes: 750000,
    comments: 22000,
    shares: 38000,
    backgroundColor: "#f5f5f5",
    fullHtml: etchASketchHTML,
  },
  {
    id: 23,
    username: "jigsawmaster",
    description:
      "Jigsaw Puzzle! 🧩 Drag pieces to solve the puzzle! Classic 12-piece challenge!",
    likes: 680000,
    comments: 18500,
    shares: 29000,
    backgroundColor: "#ffffdd",
    fullHtml: jigsawHTML,
  },
  {
    id: 24,
    username: "helmetreveal",
    description:
      "Helmet Reveal! 🪖 Move your finger to reveal the 3D helmet! Interactive reveal effect!",
    likes: 720000,
    comments: 22000,
    shares: 35000,
    backgroundColor: "#ffffff",
    fullHtml: helmetHTML,
  },
  // {
  //   id: 25,
  //   username: "tinypolyworld",
  //   description:
  //     "Tiny Poly World! ✈️ Move your finger to fly the airplane around the rotating 3D world!",
  //   likes: 850000,
  //   comments: 28000,
  //   shares: 42000,
  //   backgroundColor: "#f7d9aa",
  //   fullHtml: tinyPolyWorldHTML,
  // },
  {
    id: 26,
    username: "toyfish",
    description:
      "Swimming Fish Background! 🐠 Watch the beautiful 3D fish swim in the ocean!",
    likes: 920000,
    comments: 31000,
    shares: 48000,
    backgroundColor: "#031F48",
    fullHtml: toyfishHTML,
  },
  // {
  //   id: 27,
  //   username: "phototear",
  //   description:
  //     "Tear the photo! 🖼️ Drag down to tear the photo apart! Satisfying physics!",
  //   likes: 450000,
  //   comments: 12000,
  //   shares: 23000,
  //   backgroundColor: "#17181D",
  //   fullHtml: photoTearHTML,
  // },
  {
    id: 28,
    username: "snakemaster",
    description:
      "Classic Snake Game! 🐍 Swipe to guide the snake and eat apples! Don't hit the walls!",
    likes: 820000,
    comments: 24000,
    shares: 39000,
    backgroundColor: "#d2e0d2",
    fullHtml: snakeHTML,
  },
  {
    id: 29,
    username: "mariofan",
    description:
      "Mario 3 Mini Game! 🍄 Match the pictures to win! Classic fun! Tap to stop the reels.",
    likes: 910000,
    comments: 35000,
    shares: 46000,
    backgroundColor: "#000000",
    fullHtml: marioHTML,
  },
  // {
  //   id: 30,
  //   username: "geckosmaster",
  //   description:
  //     "Geckos Game! 🐍 Move the geckos around and avoid the obstacles!",
  //   likes: 850000,
  //   comments: 28000,
  //   shares: 42000,
  //   backgroundColor: "#f5f5f5",
  //   fullHtml: geckosHTML,
  // },
  {
    id: 31,
    username: "dinosaurus",
    description:
      "Dinosaur Memory Game! 🦖 Flip the cards and match the dinosaurs! Test your memory!",
    likes: 780000,
    comments: 22000,
    shares: 38000,
    backgroundColor: "#16d9e3",
    fullHtml: dinosaurMemoryHTML,
  },
  {
    id: 32,
    username: "spikemaster",
    description:
      "Don't Touch the Spikes! 🐦 Jump to avoid spikes and collect candies! Classic arcade fun!",
    likes: 880000,
    comments: 25000,
    shares: 41000,
    backgroundColor: "#111111",
    fullHtml: dontTouchTheSpikesHTML,
  },
  {
    id: 33,
    username: "slidepuzzle",
    description:
      "Slide Puzzle! 🧩 Arrange the tiles to form the picture! Solvable shuffle every time!",
    likes: 650000,
    comments: 17000,
    shares: 28000,
    backgroundColor: "#ffdb42",
    fullHtml: slidePuzzleHTML,
  },
  {
    id: 34,
    username: "flappydino",
    description:
      "Flappy Dino! 🦖 Tap to fly and avoid the bones! No buttons, just fun!",
    likes: 1200000,
    comments: 45000,
    shares: 68000,
    backgroundColor: "#d7eef4",
    fullHtml: flappyDinoHTML,
  },
];

export default fliks;
