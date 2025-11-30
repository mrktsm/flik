// Full standalone HTML for Chano Music Player
const getChanoHTML = () => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chano Music Player</title>
  <meta name="viewport" content="width=device-width,height=device-height,user-scalable=no,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0">
  <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      height: 100%;
      width: 100%;
      touch-action: none;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      background: transparent;
    }

    body {
      font-family: Lato, Helvetica, sans-serif;
      font-weight: 400;
      background: #1F1F1F;
      user-select: none;
      overflow: hidden;
      position: fixed;
      width: 100%;
      height: 100%;
      touch-action: none;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      margin: 0;
      padding: 0;
      background-color: #1F1F1F;
    }

    #lil {
      animation: oscillate 1000ms alternate ease-in-out infinite;
      position: relative;
      width: 100%;
      height: 100%;
      pointer-events: none;
      touch-action: none;
      background: transparent;
      z-index: 1;
    }

    #chano, #from-79th {
      height: 336px;
      width: 336px;
    }

    #chano {
      position: absolute;
      top: calc(50% - 168px);
      left: calc(50% - 168px);
      cursor: grab;
      pointer-events: auto !important;
      z-index: 10;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
    }

    #from-79th {
      display: block;
      transition: transform 200ms ease-in-out;
      border-radius: 50%;
      transform: scale(1);
      pointer-events: none;
    }

    #from-79th g {
      opacity: 0;
      visibility: hidden;
    }

    @keyframes oscillate {
      from { transform: scale(0.95); }
      to   { transform: scale(1); }
    }

    .words {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: hidden;
      z-index: -1;
      pointer-events: none;
    }

    .words div {
      opacity: 0;
      transition: opacity 200ms linear;
    }

    body.audio-1 .words-1,
    body.audio-2 .words-2,
    body.audio-3 .words-3 {
      opacity: 1;
    }

    .words p {
      color: white;
      position: absolute;
      width: 800px;
      font-size: 1.5rem;
      line-height: 1;
      color: rgba(255,255,255,0.4);
      text-shadow: 800px 0 0 rgba(255,255,255,0.4), -800px 0 0 rgba(255,255,255,0.4);
      opacity: 0;
      pointer-events: none;
    }

    .words p:nth-child(odd) {
      right: 100%;
      animation: drift-r 6s linear alternate infinite, opacity 300ms linear forwards;
    }

    .words p:nth-child(even) {
      left: 100%;
      animation: drift-l 6s linear alternate infinite, opacity 300ms linear forwards;
    }

    .words p:nth-child(1) { top: 0%; }
    .words p:nth-child(2) { top: 5.26316%; }
    .words p:nth-child(3) { top: 10.5263%; }
    .words p:nth-child(4) { top: 15.7895%; }
    .words p:nth-child(5) { top: 21.0526%; }
    .words p:nth-child(6) { top: 26.3158%; }
    .words p:nth-child(7) { top: 31.5789%; }
    .words p:nth-child(8) { top: 36.8421%; }
    .words p:nth-child(9) { top: 42.1053%; }
    .words p:nth-child(10) { top: 47.3684%; }
    .words p:nth-child(11) { top: 52.6316%; }
    .words p:nth-child(12) { top: 57.8947%; }
    .words p:nth-child(13) { top: 63.1579%; }
    .words p:nth-child(14) { top: 68.4211%; }
    .words p:nth-child(15) { top: 73.6842%; }
    .words p:nth-child(16) { top: 78.9474%; }
    .words p:nth-child(17) { top: 84.2105%; }
    .words p:nth-child(18) { top: 89.4737%; }
    .words p:nth-child(19) { top: 94.7368%; }
    .words p:nth-child(20) { top: 100%; }

    @keyframes drift-r {
      from { right: 100%; }
      to   { right: -800px; }
    }

    @keyframes drift-l {
      from { left: 100%; }
      to   { left: -800px; }
    }

    @keyframes opacity {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    body:not(.playing) #chano .id-1 {
      opacity: 1;
      visibility: visible;
    }

    body:not(.playing) #from-79th:hover {
      transition: transform 1000ms cubic-bezier(0, 1.56, 0.82, 0.83);
      transform: scale(1.2);
    }

    body.playing {
      cursor: grabbing;
      animation: background-color 2s linear infinite !important;
    }

    body.playing #chano {
      cursor: grabbing;
    }

    body.playing #from-79th {
      transition: transform 2000ms cubic-bezier(0, 1.56, 0.82, 0.83);
      transform: scale(2);
    }

    body.playing .frame-1 #chano .id-1,
    body.playing .frame-2 #chano .id-2,
    body.playing .frame-3 #chano .id-3,
    body.playing .frame-4 #chano .id-4 {
      opacity: 1;
      visibility: visible;
    }

    @keyframes background-color {
      0% { background-color: hsl(0, 70, 70); }
      10% { background-color: hsl(36, 70, 70); }
      20% { background-color: hsl(72, 70, 70); }
      30% { background-color: hsl(108, 70, 70); }
      40% { background-color: hsl(144, 70, 70); }
      50% { background-color: hsl(180, 70, 70); }
      60% { background-color: hsl(216, 70, 70); }
      70% { background-color: hsl(252, 70, 70); }
      80% { background-color: hsl(288, 70, 70); }
      90% { background-color: hsl(324, 70, 70); }
      100% { background-color: hsl(360, 70, 70); }
    }
  </style>
</head>
<body>
  <section id="lil">
    <div id="chano">
      <svg id="from-79th" viewBox="0 0 56 56"></svg>
    </div>
  </section>
  <div class="words"></div>

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

    var app = new App();

    function App() {
      var A = {};

      init();

      return A;

      /**************
      initialization
      **************/

      function init() {
        // Make sure DOM is ready
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', function() {
            initializeApp();
          });
        } else {
          initializeApp();
        }
      }

      function initializeApp() {
        setupData();
        
        // Set up events immediately (don't wait for audio/images)
        setTimeout(function() {
          setupEvents();
          console.log("Events set up");
        }, 100);
        
        var setup_audios = setupAudios();
        setup_audios.then(function() {
          console.log("Audio loaded");
        });
        
        var setup_images = setupImages();
        setup_images.then(function() {
          setupFrames();
          oscillateFrames();
          console.log("Images loaded, frames set up");
        });
      }

      /**************
      setters
      **************/

      function setupData() {
        A.datas = {};
        A.audios = {};
        A.audio = 1;
        A.audio_playing = false;
        A.img_di = 56;
        A.lil = document.getElementById("lil");
        A.chano = document.getElementById("chano");
        A.svg = document.getElementById("from-79th");
        var di = A.img_di;
        A.svg.height = di;
        A.svg.width = di;
      }

      function setupEvents() {
        console.log("Setting up events for chano:", A.chano);
        
        // Unified pointer event handler (works for both mouse and touch)
        function handlePointerDown(e) {
          console.log("Pointer down event:", e.type, e.pointerType);
          e.preventDefault();
          e.stopPropagation();
          if (!A.audio_playing) {
            playAudio();
          }
          return false;
        }

        function handlePointerMove(e) {
          if (A.audio_playing) {
            e.preventDefault();
            chanoTransform(e);
          }
        }

        function handlePointerUp(e) {
          e.preventDefault();
          e.stopPropagation();
          if (A.audio_playing) {
            pauseAudio();
          }
          return false;
        }

        // Use pointer events (most reliable for WebView)
        A.chano.addEventListener("pointerdown", handlePointerDown);
        A.chano.addEventListener("pointermove", handlePointerMove);
        A.chano.addEventListener("pointerup", handlePointerUp);
        A.chano.addEventListener("pointercancel", handlePointerUp);

        // Also try on window/document for better capture
        window.addEventListener("pointermove", function(e) {
          if (A.audio_playing && (e.target === A.chano || A.chano.contains(e.target))) {
            handlePointerMove(e);
          }
        });
        
        // Mouse events as fallback
        A.chano.addEventListener("mousedown", function(e) {
          console.log("Mouse down");
          handlePointerDown(e);
        });
        
        document.addEventListener("mousemove", function(e) {
          if (A.audio_playing) {
            chanoTransform(e);
          }
        });
        document.addEventListener("mouseup", function(e) {
          handlePointerUp(e);
        });

        // Touch events (alternative for older browsers)
        A.chano.addEventListener("touchstart", function(e) {
          console.log("Touch start - touches:", e.touches.length);
          e.preventDefault();
          e.stopPropagation();
          if (!A.audio_playing) {
            playAudio();
          }
          return false;
        }, false);
        
        A.chano.addEventListener("touchmove", function(e) {
          if (A.audio_playing && e.touches && e.touches.length > 0) {
            e.preventDefault();
            var touch = e.touches[0];
            var fakeEvent = {
              clientX: touch.clientX,
              clientY: touch.clientY
            };
            chanoTransform(fakeEvent);
          }
          return false;
        }, false);
        
        A.chano.addEventListener("touchend", function(e) {
          console.log("Touch end");
          e.preventDefault();
          e.stopPropagation();
          pauseAudio();
          return false;
        }, false);

        // Click handler as ultimate fallback
        A.chano.onclick = function(e) {
          console.log("Click event");
          e.preventDefault();
          e.stopPropagation();
          if (!A.audio_playing) {
            playAudio();
          } else {
            pauseAudio();
          }
          return false;
        };

        // Also try body-level touch events as last resort
        document.body.addEventListener("touchstart", function(e) {
          var target = e.target;
          if (target === A.chano || (A.chano.contains && A.chano.contains(target))) {
            console.log("Body touch start on chano");
            e.preventDefault();
            e.stopPropagation();
            if (!A.audio_playing) {
              playAudio();
            }
          }
        }, false);

        // Ensure chano is interactive
        A.chano.style.cursor = "pointer";
        A.chano.style.touchAction = "none";
        A.chano.setAttribute("tabindex", "0");
        A.chano.setAttribute("role", "button");
      }

      // setup images wrapped in a promise
      function setupImages() {
        return new Promise(function(resolve, reject) {
          var count = 4,
            di = A.img_di,
            loaded = 0;

          for (var i = 1; i <= count; i++) {
            var img = new Image();
            img.crossOrigin = "Anonymous";
            var url = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/111863/chano-" + i + ".png";
            img.src = url;
            img.setAttribute("data-order", i);

            img.onload = function(e) {
              var image = e.target,
                cvs = document.createElement("canvas"),
                ctx = cvs.getContext("2d");
              cvs.height = di;
              cvs.width = di;
              cvs.style.height = di + "px";
              cvs.style.width = di + "px";
              ctx.drawImage(image, 0, 0, di, di);

              var img_data = ctx.getImageData(0, 0, di, di);
              A.datas["id-" + image.getAttribute("data-order")] = img_data;
              loaded++;

              if (loaded === count) {
                resolve("Images Loaded!");
              }
            };

            img.onerror = function(e) {
              console.error("Failed to load image:", url);
              loaded++;
              if (loaded === count) {
                resolve("Images Loaded!");
              }
            };
          }
        });
      }

      // setup audios
      function setupAudios() {
        var lyrics = [
          "Neh neh neh neh neeeeeeeeh...neh neh neh neh neeeeeh.",
          "'member sittin' in class the first time listening to Dilla. Everything's good.",
          "Ahh! Ahh! Ahh! Ahh! Ahh! Ahh! Ahh! Ahh! Ahh! Ahh! Ahh! Ahh! Ahh!"
        ];

        return new Promise(function(resolve, reject) {
          var count = 3,
            loaded = 0;

          for (var i = 1; i <= count; i++) {
            var url = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/111863/chano-0" + i + ".mp3";
            var audio = new Audio(url);
            var words = document.querySelector(".words");
            var el = document.createElement("div");
            el.className = "words-" + i;
            words.appendChild(el);

            for (var p = 0; p < 20; p++) {
              var paragraph = document.createElement("p");
              paragraph.innerHTML = lyrics[i - 1];
              el.appendChild(paragraph);
            }

            A.audios["id-" + i] = audio;
            audio.setAttribute("preload", "auto");
            audio.setAttribute("loop", true);
            audio.setAttribute("data-order", i);

            audio.addEventListener("canplaythrough", function(e) {
              loaded++;
              if (loaded === count) {
                resolve("Audios Loaded!");
              }
            });

            audio.addEventListener("error", function(e) {
              console.error("Failed to load audio:", url);
              loaded++;
              if (loaded === count) {
                resolve("Audios Loaded!");
              }
            });
          }
        });
      }

      /**************
      events
      **************/

      function chanoTransform(e) {
        if (!A.audio_playing) return;

        var clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
        var clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

        var halfw = window.innerWidth / 2,
          halfh = window.innerHeight / 2,
          x = clientX,
          y = clientY,
          posx = x > halfw,
          posy = y > halfh,
          ratx = posx ? (x - halfw) / halfw : -1 - (x / -halfw),
          raty = posy ? (y - halfh) / halfh : -1 - (y / -halfh);

        var max_deg = 15,
          max_move = 30;

        var transform = [
          "rotateX(" + (max_deg * -raty) + "deg)",
          "rotateY(" + (max_deg * -ratx) + "deg)",
          "skewX(" + (max_deg * raty) + "deg)",
          "skewY(" + (max_deg * ratx) + "deg)",
          "translateX(" + (max_move * -ratx) + "px)",
          "translateY(" + (max_move * -raty) + "px)"
        ].join(" ");

        A.chano.style.webkitTransform = transform;
        A.chano.style.transform = transform;
      }

      function killTransform() {
        A.chano.style.webkitTransform = "";
        A.chano.style.transform = "";
      }

      function playAudio() {
        A.audio_playing = true;
        document.body.className = "playing audio-" + A.audio;
        var audio = A.audios["id-" + A.audio];
        if (audio) {
          audio.play().catch(function(err) {
            console.error("Error playing audio:", err);
          });
        }
      }

      function pauseAudio() {
        killTransform();
        var audio = A.audios["id-" + A.audio];
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }

        if (A.audio_playing) {
          A.audio++;
          document.body.className = "";
          A.audio_playing = false;
          if (A.audio > 3) A.audio = 1;
        }
      }

      /**************
      drawers
      **************/

      function oscillateFrames() {
        var current_image = 1;
        var timer = 0;
        var down = true;
        requestAnimationFrame(loop);

        function loop() {
          timer++;

          if (timer % 2 === 0) {
            drawFrame(current_image);
            if (down) {
              if (current_image === 1) {
                current_image++;
                down = false;
              } else {
                current_image--;
              }
            } else {
              if (current_image === 4) {
                current_image--;
                down = true;
              } else {
                current_image++;
              }
            }
          }

          requestAnimationFrame(loop);
        }
      }

      // switch classname and let css handle the animation for us
      function drawFrame(which) {
        A.lil.setAttribute("class", "frame-" + which);
      }

      // draw all the svg elements
      function setupFrames() {
        var xmlns = "http://www.w3.org/2000/svg";

        for (var f in A.datas) {
          var set = A.datas[f].data;
          var group = document.createElementNS(xmlns, "g");
          group.setAttributeNS(null, "class", f);
          A.svg.appendChild(group);

          for (var i = 0; i < (set.length / 4); i++) {
            var row_length = A.img_di;
            var x = (i % A.img_di);
            var y = Math.floor(i / A.img_di);
            var rel_i = i * 4;
            var r = set[rel_i],
              g = set[rel_i + 1],
              b = set[rel_i + 2],
              a = set[rel_i + 3];

            if (r + g + b + a !== 0) {
              var fill = "rgb(" + [r, g, b].join(",") + ")";
              var rect = document.createElementNS(xmlns, "rect");
              rect.setAttributeNS(null, "x", x);
              rect.setAttributeNS(null, "y", y);
              rect.setAttributeNS(null, "width", 1);
              rect.setAttributeNS(null, "height", 1);
              rect.setAttributeNS(null, "fill", fill);
              group.appendChild(rect);
            }
          }
        }
      }
    }
  </script>
</body>
</html>`;
};

export default getChanoHTML();

