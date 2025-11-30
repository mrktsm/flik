const getPixelFaceHTML = () => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pixelated Face Animation</title>
  <meta name="viewport" content="width=device-width,height=device-height,user-scalable=no,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0">
  <style>
@import url(https://fonts.googleapis.com/css?family=Lato);

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  overflow: hidden;
  margin: 0;
  padding: 0;
}

html, body, #lil {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

#lil {
  animation: oscillate 1000ms alternate ease-in-out infinite;
}

#instructions {
  color: white;
  font-family: Lato, sans-serif;
  font-size: 14px;
  text-align: center;
  padding: 10px;
  transition: opacity 0.3s;
}

body.playing #instructions {
  opacity: 0;
}

audio {
  position: absolute;
  top: 0;
}

audio:nth-of-type(1) { top: 0; }
audio:nth-of-type(2) { top: 2rem; }
audio:nth-of-type(3) { top: 4rem; }

#chano, #from-79th {
  height: 336px;
  width: 336px;
}

#chano {
  position: absolute;
  top: calc(50% - 168px); 
  left: calc(50% - 168px);
  cursor: grab;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  pointer-events: auto;
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
  top: 0; right: 0; bottom: 0; left: 0;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
}

.words div {
  opacity: 0;
  transition: opacity 200ms linear;
}

body.audio-1 .words .words-1 { opacity: 1; }
body.audio-2 .words .words-2 { opacity: 1; }
body.audio-3 .words .words-3 { opacity: 1; }

.words div p {
  color: white;
  position: absolute;
  width: 800px;
  font-size: 1.5rem;
  line-height: 1;
  color: rgba(255,255,255,0.4);
  text-shadow: 
    800px 0 0 rgba(255,255,255,0.4),
    -800px 0 0 rgba(255,255,255,0.4);
  opacity: 0;
}

.words div p:nth-child(odd) {
  right: 100%;
  animation: drift-r 6s linear alternate infinite,
    opacity 300ms linear forwards;
}

.words div p:nth-child(even) {
  left: 100%;
  animation: drift-l 6s linear alternate infinite,
    opacity 300ms linear forwards;
}

.words div p:nth-child(1) { top: 0%; }
.words div p:nth-child(2) { top: 5%; }
.words div p:nth-child(3) { top: 10%; }
.words div p:nth-child(4) { top: 15%; }
.words div p:nth-child(5) { top: 20%; }
.words div p:nth-child(6) { top: 25%; }
.words div p:nth-child(7) { top: 30%; }
.words div p:nth-child(8) { top: 35%; }
.words div p:nth-child(9) { top: 40%; }
.words div p:nth-child(10) { top: 45%; }
.words div p:nth-child(11) { top: 50%; }
.words div p:nth-child(12) { top: 55%; }
.words div p:nth-child(13) { top: 60%; }
.words div p:nth-child(14) { top: 65%; }
.words div p:nth-child(15) { top: 70%; }
.words div p:nth-child(16) { top: 75%; }
.words div p:nth-child(17) { top: 80%; }
.words div p:nth-child(18) { top: 85%; }
.words div p:nth-child(19) { top: 90%; }
.words div p:nth-child(20) { top: 95%; }

.words div p:nth-child(1),
.words div p:nth-child(20) { animation-delay: 0.6s, 0.6s; }
.words div p:nth-child(2),
.words div p:nth-child(19) { animation-delay: 1.2s, 1.2s; }
.words div p:nth-child(3),
.words div p:nth-child(18) { animation-delay: 1.8s, 1.8s; }
.words div p:nth-child(4),
.words div p:nth-child(17) { animation-delay: 2.4s, 2.4s; }
.words div p:nth-child(5),
.words div p:nth-child(16) { animation-delay: 3s, 3s; }
.words div p:nth-child(6),
.words div p:nth-child(15) { animation-delay: 3.6s, 3.6s; }
.words div p:nth-child(7),
.words div p:nth-child(14) { animation-delay: 4.2s, 4.2s; }
.words div p:nth-child(8),
.words div p:nth-child(13) { animation-delay: 4.8s, 4.8s; }
.words div p:nth-child(9),
.words div p:nth-child(12) { animation-delay: 5.4s, 5.4s; }
.words div p:nth-child(10),
.words div p:nth-child(11) { animation-delay: 6s, 6s; }

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

body {
  font-family: Lato, Helvetica, sans-serif;
  font-weight: 400;
  background: #1F1F1F;
  user-select: none;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
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
  animation: background-color 2s linear infinite;
}

body.playing #chano { 
  cursor: grabbing; 
}

body.playing #from-79th {
  transition: transform 2000ms cubic-bezier(0, 1.56, 0.82, 0.83);
  transform: scale(2);
}

body.playing.frame-1 #chano .id-1,
body.playing.frame-2 #chano .id-2,
body.playing.frame-3 #chano .id-3,
body.playing.frame-4 #chano .id-4 {
  opacity: 1;
  visibility: visible;
}

@keyframes background-color {
  0% { background: hsl(0, 70%, 70%); }
  10% { background: hsl(36, 70%, 70%); }
  20% { background: hsl(72, 70%, 70%); }
  30% { background: hsl(108, 70%, 70%); }
  40% { background: hsl(144, 70%, 70%); }
  50% { background: hsl(180, 70%, 70%); }
  60% { background: hsl(216, 70%, 70%); }
  70% { background: hsl(252, 70%, 70%); }
  80% { background: hsl(288, 70%, 70%); }
  90% { background: hsl(324, 70%, 70%); }
  100% { background: hsl(360, 70%, 70%); }
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
<div id="instructions" style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); color: white; font-family: Lato, sans-serif; font-size: 16px; z-index: 1000; pointer-events: none;">Tap anywhere to start</div>
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

console.log("Pixel face script loading...");

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM ready, initializing app...");
  var app = new App();
});

function App() {
  var A = {};
  
  init();
  
  return A;  
  
  function init() {
    console.log("Initializing app...");
    setupData();
    var setup_audios = setupAudios();
    setup_audios.then(function() {
      console.log("Audios ready, setting up events...");
      setupEvents();
    });
    var setup_images = setupImages();
    setup_images.then(function() {
      console.log("Images ready, setting up frames...");
      setupFrames();
      oscillateFrames();
    });
  }
  
  function setupData() {
    A.datas = {};
    A.audios = {};
    A.audio = 1;
    A.audio_playing = false;
    A.img_di = 56;
    A.lil   = document.getElementById("lil");
    A.chano = document.getElementById("chano");
    A.svg   = document.getElementById("from-79th");
    var di = A.img_di;
    A.svg.height = di;
    A.svg.width  = di;
    console.log("Data setup complete. chano:", A.chano ? "found" : "NOT FOUND");
  }
  
  function setupEvents() {
    console.log("Setting up events...");
    
    // Make the ENTIRE document body respond to touch/click
    function handleStart(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Touch/mouse start detected!");
      if (!A.audio_playing) {
        playAudio();
      }
      return false;
    }
    
    function handleMove(e) {
      if(A.audio_playing) {
        var clientX, clientY;
        if(e.touches && e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else {
          clientX = e.clientX;
          clientY = e.clientY;
        }
        chanoTransform({clientX: clientX, clientY: clientY});
      }
      return false;
    }
    
    function handleEnd(e) {
      e.preventDefault();
      console.log("Touch/mouse end detected!");
      pauseAudio();
      return false;
    }
    
    // Add listeners to document.body for maximum coverage
    document.body.addEventListener("mousedown", handleStart, false);
    document.body.addEventListener("touchstart", handleStart, false);
    document.body.addEventListener("mousemove", handleMove, false);
    document.body.addEventListener("touchmove", handleMove, false);
    document.body.addEventListener("mouseup", handleEnd, false);
    document.body.addEventListener("touchend", handleEnd, false);
    document.body.addEventListener("touchcancel", handleEnd, false);
    document.body.addEventListener("click", handleStart, false);
    
    // Also add to chano element
    if(A.chano) {
      A.chano.addEventListener("mousedown", handleStart, false);
      A.chano.addEventListener("touchstart", handleStart, false);
      A.chano.addEventListener("click", handleStart, false);
    }
    
    console.log("Events setup complete!");
  }
  
  function setupImages() {
    return new Promise(function(resolve, reject) {
      var count  = 4,
          di     = A.img_di,
          loaded = 0;
      for(var i = 1; i <= count; i++) {
        var img = new Image();
        img.crossOrigin = "Anonymous";
        var url = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/111863/chano-" + i + ".png";
        img.src = url;
        img.setAttribute("data-order", i);
        
        img.onload = function(e) {
          var image = e.target,
              cvs = document.createElement("canvas"),
              ctx = cvs.getContext("2d");
          cvs.height = di; cvs.width  = di;
          cvs.style.height = di + "px"; cvs.style.width  = di + "px";
          ctx.drawImage(image, 0, 0, di, di);
          
          var img_data = ctx.getImageData(0, 0, di, di);      
          A.datas["id-" + image.getAttribute("data-order")] = img_data;
          loaded++;
          if(loaded === count) {
            console.log("All images loaded!");
            resolve("Images Loaded!");
          }
        }
        
        img.onerror = function(e) {
          console.error("Image load error:", url);
        }
      }
    });
  }
  
  function setupAudios() {
    var lyrics = [
      "Neh neh neh neh neeeeeeeeh...neh neh neh neh neeeeeh.",
      "'member sittin' in class the first time listening to Dilla. Everything's good.",
      "Ahh! Ahh! Ahh! Ahh! Ahh! Ahh! Ahh! Ahh! Ahh! Ahh! Ahh! Ahh! Ahh!"
    ];
    return new Promise(function(resolve, reject) {
      var count  = 3,
          loaded = 0;
      for(var i = 1; i <= count; i++) {
        var url = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/111863/chano-0" + i + ".mp3";
        var audio = new Audio(url);
        var words = document.querySelector(".words");
        var el = document.createElement("div");
        el.className = "words-" + i;
        words.appendChild(el);
        for(var p = 0; p < 20; p++) {
          var paragraph = document.createElement("p");
          paragraph.innerHTML = lyrics[i - 1];
          el.appendChild(paragraph);
        }
        A.audios["id-"+i] = audio;
        audio.setAttribute("preload", "auto");
        audio.setAttribute("loop", true);
        audio.setAttribute("data-order", i);
        audio.addEventListener("canplaythrough", function(e) {
          loaded++;
          console.log("Audio loaded:", loaded, "/", count);
          if(loaded === count) {
            resolve("Audios Loaded!");
          }
        });
        audio.addEventListener("error", function(e) {
          console.error("Audio error:", url, e);
        });
      }
    });
  }
    
  function chanoTransform(e) {
    if(!A.audio_playing || !e) return;
    var halfw = window.innerWidth / 2,
        halfh = window.innerHeight / 2,
        x = e.clientX,
        y = e.clientY;
    
    if(!x || !y) return;
    
    var posx = x > halfw,
        posy = y > halfh,
        ratx = posx ? (x - halfw) / halfw : -1 - (x / -halfw),
        raty = posy ? (y - halfh) / halfh : -1 - (y / -halfh);
    var max_deg = 15,
        max_move = 30;
    var transform = [
      "rotateX("+(max_deg * -raty)+"deg)", 
      "rotateY("+(max_deg * -ratx)+"deg)",
      "skewX("+(max_deg * raty)+"deg)", 
      "skewY("+(max_deg * ratx)+"deg)",
      "translateX("+(max_move * -ratx)+"px)", 
      "translateY("+(max_move * -raty)+"px)"
    ].join(" ");
    A.chano.style.webkitTransform = transform;
    A.chano.style.transform = transform;    
  }
    
  function killTransform() {
    A.chano.style.webkitTransform = "";
    A.chano.style.transform = "";
  }
  
  function playAudio() {
    console.log("Playing audio " + A.audio);
    A.audio_playing = true;
    document.body.className = "playing audio-" + A.audio;
    var audioEl = A.audios["id-"+A.audio];
    if(audioEl) {
      var playPromise = audioEl.play();
      if(playPromise !== undefined) {
        playPromise.then(function() {
          console.log("Audio playing!");
        }).catch(function(error) {
          console.error("Audio play error:", error);
        });
      }
    } else {
      console.error("Audio element not found:", "id-"+A.audio);
    }
  }
  
  function pauseAudio() {
    killTransform();
    var audio = A.audios["id-"+A.audio];
    if(audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    if(A.audio_playing) {
      A.audio++;
      document.body.className = "";
      A.audio_playing = false;    
      if(A.audio > 3) A.audio = 1;
      console.log("Audio paused, next audio:", A.audio);
    }
  }
  
  function oscillateFrames() {
    var current_image = 1;
    var timer = 0;
    var down = true;
    requestAnimationFrame(loop);    
    function loop() {
      timer++;
      if(timer % 2 === 0) {
        drawFrame(current_image);
        if(down) {
          if(current_image === 1) {
            current_image++;
            down = false;
          } else {
            current_image--;
          }
        } else {
          if(current_image === 4) {
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
  
  function drawFrame(which) {
    if(A.lil) {
      A.lil.setAttribute("class", "frame-" + which);
    }
  }
  
  function setupFrames() {
    var xmlns = "http://www.w3.org/2000/svg";
 
    for(var f in A.datas) {
      var set = A.datas[f].data;
      var group = document.createElementNS(xmlns, "g");
      group.setAttributeNS(null, "class", f);      
      A.svg.appendChild(group);
      for(var i = 0; i < (set.length / 4); i++) {
        var row_length = A.img_di;
        var x = (i % A.img_di);
        var y = Math.floor(i / A.img_di);
        var rel_i = i * 4;
        var r = set[rel_i], g = set[rel_i+1], b = set[rel_i+2], a = set[rel_i+3];
        if(r+g+b+a !== 0) {
          var fill = "rgb(" + [r,g,b].join(",") + ")";
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
    console.log("Frames setup complete!");
  }
}
</script>
</body>
</html>`;
};

export default getPixelFaceHTML();
