// Full standalone HTML for Etch A Sketch
const getEtchASketchHTML = () => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Etch A Sketch</title>
  <meta name="viewport" content="width=device-width,height=device-height,user-scalable=no,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0">
  <link href="https://fonts.googleapis.com/css?family=Aladin|Fira+Sans" rel="stylesheet">
  <style>
@charset "UTF-8";
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

:root {
  font-size: calc(16px + (28 - 16) * (100vw - 300px)/(1440 - 300));
}

body {
  font: 1em "Fira Sans", sans-serif;
  line-height: 1.5;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  position: relative;
}

button {
  font: 1em "Fira Sans", sans-serif;
  line-height: 1.5;
}

a, a:visited {
  color: #d90009;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

a:active {
  color: #b80008;
}

button, button > span {
  color: #fff;
  display: inline-block;
}

button {
  background-color: transparent;
  border: 0;
  border-radius: 0.2em;
  overflow: hidden;
  position: absolute;
  top: 3em;
  left: 0.75em;
  transition: opacity 0.15s linear;
  -webkit-appearance: none;
  z-index: 1;
  transform: scale(0.7);
  transform-origin: top left;
}
button > span {
  background-color: #333;
  padding: 0.5em 1em;
  transition: all 0.15s linear;
  width: 100%;
  height: 100%;
}
button:hover > span, button > span:focus {
  background-color: #1a1a1a;
}
button:active > span {
  background-color: #000;
}
button:focus {
  outline: 0;
  /* The button’s span should be focused instead */
}

canvas {
  border-radius: 0.75em;
  border-top: 0.4em solid #970007;
  border-right: 0.4em solid #b80008;
  border-bottom: 0.4em solid #b80008;
  border-left: 0.4em solid #970007;
  display: block;
  width: 22.25em;
  height: 16.25em;
}

p {
  margin-bottom: 1.5em;
}

.top, .middle {
  width: 100%;
}

.top {
  color: #ffea75;
  font-size: 1em;
  font-weight: normal;
  letter-spacing: 0.1em;
  line-height: 2;
  text-align: center;
  transform: scaleY(0.9);
}
.top span {
  font-style: italic;
}
.top .caps {
  margin: 0 0.5em;
}
.top .cursive {
  font-size: 2em;
}

.middle {
  display: flex;
  align-items: flex-end;
}
.middle .dial-label {
  font-size: 2em;
  height: 1em;
  line-height: 1;
  width: 1.9375em;
}
.middle .dial-label svg {
  width: 0.75em;
  height: 0.75em;
}

/* Interface */
.board {
  background-color: #d90009;
  border-radius: 0.5em;
  box-shadow: 0.4em 0.4em 0 #b80008 inset, -0.4em -0.4em 0 #970007 inset;
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  width: 30em;
  height: 25em;
  text-shadow: 1px 1px #000;
  will-change: transform;
  transform: scale(0.65);
  transform-origin: center center;
  position: relative;
  flex-shrink: 0;
}

.note {
  margin: 1.5em auto;
  width: 100%;
  max-width: 24em;
}

.hide {
  height: 0;
  margin: 0;
  visibility: hidden;
  position: absolute;
  width: 0;
  overflow: hidden;
}

.info {
  font-size: 0.5em;
  width: calc(100% - 18em);
}

.dial {
  background-image: radial-gradient(#bbb 4%, #fff 5%);
  border-radius: 50%;
  border-top: 0.4em solid #ddd;
  border-right: 0.4em solid #bbb;
  border-bottom: 0.4em solid #bbb;
  border-left: 0.4em solid #ddd;
  cursor: grab;
  margin: 0.5em;
  width: 3.5em;
  height: 3.5em;
}

.dial-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
}

.dial-label, .safety {
  opacity: 0.5;
}

.dial-label {
  text-align: center;
}

.safety {
  font-weight: bold;
  letter-spacing: 0.25em;
  text-align: center;
}

/* Typography */
.caps {
  text-transform: uppercase;
}

.cursive {
  font-family: "Aladin", cursive;
}

/* Animation */
.shaking {
  animation: shake 0.6s ease-out;
}

@keyframes shake {
  from, to {
    transform: scale(0.65) translateY(0);
  }
  12.5% {
    transform: scale(0.65) translateY(-4%);
  }
  25% {
    transform: scale(0.65) translateY(4%);
  }
  50% {
    transform: scale(0.65) translateY(-1%);
  }
}
  </style>
</head>
<body>
  <button id="erase" tabindex="-1">
    <span tabindex="0">Erase</span>
  </button>
  <div id="note" class="note hide">
    <p><strong>Note</strong>: Shaking your device to erase works but not inside this iframe. <a href="javascript:window.open(location.href)">Open separately in another tab</a>, then give it a try!</p>
  </div>
  <div class="board">
    <div class="top">
      <span class="caps">Magic</span>
      <span class="cursive">Etch A Sketch</span><sup>&reg;</sup>
      <span class="caps">Screen</span>
    </div>
    <div class="middle">
      <span class="dial-label">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 48 48" enable-background="new 0 0 48 48">
          <g>
            <polygon points="10.792,16.5 1,24.563 10.792,32.5 10.792,27.5 38.208,27.5 38.208,32.5 48,24.5 38.208,16.5 38.208,21.5 10.792,21.5"/>
          </g>
          <g>
            <polygon fill="#fff" points="9.792,15.5 0,23.563 9.792,31.5 9.792,26.5 37.208,26.5 37.208,31.5 47,23.5 37.208,15.5 37.208,20.5 9.792,20.5"/>
          </g>
        </svg>
      </span>
      <canvas></canvas>
      <span class="dial-label">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 48 48" enable-background="new 0 0 48 48">
          <g>
            <polygon points="16,38.209 24.063,48 32,38.209 27,38.209 27,10.792 32,10.792 24,1 16,10.792 21,10.792 21,38.209"/>
          </g>
          <g>
            <polygon fill="#fff" points="15,37.209 23.063,47 31,37.209 26,37.209 26,9.792 31,9.792 23,0 15,9.792 20,9.792 20,37.209"/>
          </g>
        </svg>
      </span>
    </div>
    <div class="dial" id="horz"></div>
    <div class="info">
      <div class="dial-labels">
        <span class="dial-label">Horizontal<br>Dial</span>
        <span class="dial-label">Vertical<br>Dial</span>
      </div>
      <div class="safety">
        <span class="caps">Magic screen is glass set in sturdy plastic frame<br>Use with care</span>
      </div>
    </div>
    <div class="dial" id="vert"></div>
  </div>
  <script>
    // Console forwarding
    const originalLog = console.log;
    const originalError = console.error;
    console.log = function(...args) {
      window.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'log', message: args.join(' ') }));
      originalLog.apply(console, args);
    };
    console.error = function(...args) {
      window.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'error', message: args.join(' ') }));
      originalError.apply(console, args);
    };
    
    window.onerror = function(msg, url, lineNo, columnNo, error) {
      const message = 'Error: ' + msg + ' at ' + url + ':' + lineNo;
      window.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'error', message: message }));
      return false;
    };
    
    // Override console.clear to prevent clearing in WebView
    console.clear = function() {
      // Do nothing - don't clear console in WebView
    };
  </script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/utils/Draggable.min.js"></script>
  <script>
console.clear();
window.addEventListener("load",app);

function app() {
	var cnv = document.querySelector("canvas"),
		c = cnv.getContext("2d"),
		root = document.querySelector(":root"),
		rootFS = window.getComputedStyle(root).getPropertyValue("font-size"),
		u = +rootFS.substr(0,rootFS.length-2),
		uw = 22.25,
		uh = 16.25,
		// canvas dimensions
		w = u * uw,
		h = u * uh,
		// scale, keep at 2 for best retina results
		s = 2;

	// set canvas dimensions with scale
	cnv.width = w * s;
	cnv.height = h * s;
	cnv.style.width = uw + "em";
	cnv.style.height = uh + "em";
	c.scale(s,s);
	
	var stylus = {
			x: w/2,
			y: h/2,
			w: 3
		},
		draw = function(color) {
			c.fillStyle = color;
			c.fillRect(stylus.x,stylus.y,stylus.w,stylus.w);
		},
		checkPos = function() {
			// x bounds
			if (stylus.x < 0) {
				stylus.x = 0;
			} else if (stylus.x > w - stylus.w) {
				stylus.x = w - stylus.w;
			}
			// y bounds
			if (stylus.y < 0) {
				stylus.y = 0;
			} else if (stylus.y > h - stylus.w) {
				stylus.y = h - stylus.w;
			}
		},
		shadeBrd = function() {
			c.fillStyle = "#bbb";
			c.fillRect(0,0,w,h);
		},
		erase = function() {
			let op = 0,
				opInc = 0.05,
				incStop = 0.5,
				doIt = function() {
					op += opInc;
					c.globalAlpha = op;
					shadeBrd();
					if (op < incStop) {
						setTimeout(doIt,1000/60);
					} else {
						op = 0;
						c.globalAlpha = 1;
					}
				};
			doIt();
		},
		move = function(d) {
			draw("#555");
			let inc = 2;
			// 0 = left, 1 = up, 2 = right, 3 = down
			switch (d) {
				case 0:
					stylus.x -= inc;
					break;
				case 1:
					stylus.y -= inc;
					break;
				case 2:
					stylus.x += inc;
					break;
				case 3:
					stylus.y += inc;
					break;
				default:
					break;
			}
			checkPos();
			draw("#eee");
		},
		moveKbd = function(e) {
			draw("#555");
			if (e && e.keyCode) {
				let inc = 2;
				switch (e.keyCode) {
					case 37:
						stylus.x -= inc;
						break;
					case 38:
						stylus.y -= inc;
						break;
					case 39:
						stylus.x += inc;
						break;
					case 40:
						stylus.y += inc;
						break;
					default:
						break;
				}
				// prevent scrolling at same time
				if (e.keyCode >= 37 && e.keyCode <= 40) {
					e.preventDefault();
				}
			}
			checkPos();
			draw("#eee");
		},
		getAngle = function(ele) {
			let el = document.querySelector(ele),
				elTr = el.style.transform,
				// break down matrix value of crank transform and get angle
				matrixVal = elTr.split('(')[1].split(')')[0].split(','),
				cos1 = matrixVal[0],
				sin = matrixVal[1],
				angle = Math.round(Math.atan2(sin, cos1) * (180 / Math.PI));
			
			// convert negative angles to positive, correct -0 issue
			if (angle < 0) {
				angle += 360;
				if (angle == "-0") {
					angle = 0;
				}
			}
			return angle;
		},
		dialH = 0,
		dialHFn = Draggable.create("#horz", {
			type: "rotation",
			throwProps: true,
			onDrag: function() {
				let aH = getAngle("#horz");
				if (aH > dialH) {
					move(2);
				} else if (aH < dialH) {
					move(0);
				}
				dialH = aH;
			}
		}),
		dialV = 0,
		dialVFn = Draggable.create("#vert", {
			type: "rotation",
			throwProps: true,
			onDrag: function() {
				let aV = getAngle("#vert");
				if (aV > dialV) {
					move(1);
				} else if (aV < dialV) {
					move(3);
				}
				dialV = aV;
			}
		}),
		shakeBrd = function() {
			let brd = document.querySelector(".board");
			brd.className = "";
			void brd.offsetWidth;
			brd.className = "board shaking";
		};
	shadeBrd();
	
	if ("ontouchstart" in document.documentElement) {
		if (window.parent != window.self) {
			document.querySelector("#note").classList.remove("hide");
		} else {
			// interacting with board on iOS would cause accidental panning
			document.addEventListener("touchmove", function(e) {
        		e.preventDefault();
    		});
		}
	}
	
	// erase via device shake
	if (window.DeviceMotionEvent) {
		window.addEventListener("devicemotion",function(e) {
			let az = Math.round(e.acceleration.z);
			if (az < -16) {
				erase();
			}
		});
	}
	// erase via button
	let erEvent = "ontouchend" in document.documentElement ? "touchend" : "click";
	document.querySelector("#erase").addEventListener(erEvent, function() {
		shakeBrd();
		erase();
	});
	// draw with arrow keys
	document.addEventListener("keydown", moveKbd);
}
  </script>
</body>
</html>`;
};

export default getEtchASketchHTML();
