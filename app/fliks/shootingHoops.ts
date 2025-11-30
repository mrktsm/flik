// Full standalone HTML for Shooting Hoops
const getShootingHoopsHTML = () => {
  return `<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <title>Shooting Hoops</title>
    <meta name="viewport" content="width=device-width,height=device-height,user-scalable=no,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Kameron:700">
    <style>
@import url("https://fonts.googleapis.com/css?family=Kameron:700");
html, body {
  box-sizing: border-box;
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
  overflow: hidden;
  touch-action: none;
}

*, *:before, *:after {
  box-sizing: inherit;
}

svg {
  fill: #fffcff;
  height: 30%;
  left: 25%;
  overflow: visible;
  position: absolute;
  stroke: black;
  top: 20%;
  width: 50%;
  z-index: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}

.stage {
  background: #feebcb;
  height: 100%;
  overflow: hidden;
  position: relative;
  visibility: hidden;
  width: 100%;
}

#bHoop {
  stroke-width: 5;
}
#bHoop .shadow {
  display: none;
}

#basket #net {
  fill: none;
  stroke: #CCC;
  stroke-miterlimit: 10;
}
#basket #ring {
  fill: #df4931;
  stroke: none;
}

#ball {
  cursor: pointer;
  fill: #df4931;
  stroke: none;
}
#ball .ballPath {
  -webkit-clip-path: url(#clip-path);
          clip-path: url(#clip-path);
}
#ball .ballStripe {
  fill: none;
  stroke: #fff;
  stroke-miterlimit: 10;
}

ul {
  list-style-type: none;
  padding: 0;
  top: 0;
}

li {
  display: inline-block;
  width: 33%;
}

.copy {
  display: none;
}

.score-display {
  position: absolute;
  top: 7%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  color: #2c2c2c;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.score-display #hits {
  font-size: 3.5rem;
  font-weight: 600;
  margin: 0;
  padding: 0;
  letter-spacing: -1px;
}

.score-display #accuracy {
  font-size: 0.85rem;
  font-weight: 500;
  margin: 0;
  padding: 0;
  opacity: 0.5;
  letter-spacing: 0.5px;
}
    </style>

  </head>
    
  <body>
  <div class="stage">

 <svg id="bHoop" viewBox="0 0 120 90" preserveAspectRatio="xMidYMin" xmlns="http://www.w3.org/2000/svg">
   <rect class="shadow" x="30" y="40" width="115" height="85" />
   <rect x="2.5" y="2.5" width="115" height="85" />
   <rect x="33" y="30" width="54" height="40" />
 </svg>

 <svg id="basket" viewBox="0 0 120 90" preserveAspectRatio="xMidYMin">
   <g id="net">
    <line x1="33" y1="76" x2="74.1" y2="117.1"/>
    <line x1="87" y1="76" x2="45.6" y2="117.4"/>
    <line x1="78.3" y1="73.8" x2="43.2" y2="109"/>
    <line x1="68.1" y1="73.8" x2="41.9" y2="100"/>
    <line x1="58.2" y1="73.8" x2="39.5" y2="92.5"/>
    <line x1="47.4" y1="73.8" x2="36.5" y2="84.7"/>
    <line x1="40.7" y1="73.5" x2="76.3" y2="109.1"/>
    <line x1="51.6" y1="73.8" x2="77.7" y2="99.9"/>
    <line x1="61.9" y1="73.8" x2="80.4" y2="92.3"/>
    <line x1="72.2" y1="73.8" x2="82.7" y2="84.3"/>
    <line x1="39.5" y1="92.5" x2="64.1" y2="117.2"/>
    <line x1="42.7" y1="106.3" x2="54.5" y2="118.1"/>
    <line x1="80.4" y1="92.3" x2="54.5" y2="118.1"/>
    <line x1="77.3" y1="105.8" x2="65.7" y2="117.4"/>
   </g>
   <rect id="ring" x="28" y="70" width="64" height="6" rx="3"/>
 </svg>

 <svg id="ball" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" class="noSelect">
  <defs>
    <clipPath id="clip-path">
      <circle cx="25" cy="25" r="24"/>
    </clipPath>
  </defs>
  <title>Basketball</title>
  <circle cx="25" cy="25" r="24"/>
  <g class="ballPath">
      <path class="ballStripe" d="M2.4,8.1a25,25,0,0,1,9.5-2.3c4.9-.2,9.5,1.2,13.8,2.5s5.5,1.9,9.3,2.1,4.5-.2,5.8-1a6.6,6.6,0,0,0,2.7-3.1"/>
      <path class="ballStripe" d="M26.4,0c2.8,2.5,9.5,9,11.1,19.1C40.2,35.7,26.8,47.5,25.2,49"/>
      <path class="ballStripe" d="M-5,26.5a71.1,71.1,0,0,1,23.5-9.1,77,77,0,0,1,33,.7"/>
      <path class="ballStripe" d="M4,42.3a35.5,35.5,0,0,0,6.9-2.8c9.3-5,10.1-11.2,19.8-15.8,4.3-2,6.7-2.1,8.1-1.9,5.5.6,8.5,5.1,8.9,5.7,3.4,5.2.7,10.6.3,11.3"/>
  </g>
</svg>

</div>

<div class="score-display">
 <div id="hits">0</div>
 <div id="accuracy">0%</div>
</div>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js'></script>
    <script>
/*
On init
 On screen rotation
 Update the ball's initial position
*/

// wait until DOM is ready
document.addEventListener("DOMContentLoaded", function(event) {

 // wait until window, stylesheets, images, links, and other media assets are loaded
 window.onload = function() {

  // All ready, let's go!


  /* ***************************
  Things we are going to need
  **************************** */

  // A Vector
  var Vector = {
   _x: 1,
   _y: 0,

   create: function(x, y) {
   var obj = Object.create(this);
   obj.setX(x);
   obj.setY(y);
   return obj;
   },

   setX: function(value) {
   this._x = value;
   },

   getX: function() {
   return this._x
   },

   setY: function(value) {
   this._y = value;
   },

   getY: function() {
   return this._y;
   },

   setAngle: function(angle) {
   var length = this.getLength();
   this._x = Math.cos(angle) * length;
   this._y = Math.sin(angle) * length;
   },

   getAngle: function() {
   return Math.atan2(this._y, this._x);
   },

   setLength: function(length) {
   var angle = this.getAngle();
   this._x = Math.cos(angle) * length;
   this._y = Math.sin(angle) * length;
   },

   getLength: function() {
   return Math.sqrt(this._x * this._x + this._y * this._y);
   },

   add: function(v2) {
   return Vector.create(this._x + v2.getX(), this._y + v2.getY());
   },

   subtract: function(v2) {
   return Vector.create(this._x - v2.getX(), this._y - v2.getY());
   },

   scale: function(value) {
   return Vector.create(this._x * value, this._x * value);
   }
  };



  // A Particle
  var Particle = {
   position: null,
   velocity: null,
   gravity: null,

   create: function(x, y, speed, direction, grav) {
   var obj = Object.create(this);
   obj.position = Vector.create(x, y);
   obj.velocity = Vector.create(0, 0);
   obj.velocity.setLength(speed);
   obj.velocity.setAngle(direction);
   obj.gravity = Vector.create(0, grav || 0);

   return obj;
   },

   accelerate: function(vector) {
   this.velocity = this.velocity.add(vector);
   },

   update: function() {
   this.velocity = this.velocity.add(this.gravity);
   this.position = this.position.add(this.velocity);
   }
  };



  // Ball and basket vars
  var ball = document.getElementById("ball"),
      offsetY,
      ballRadius,
      basket = document.getElementById("basket"),
      basketWidth,
      ratio,
      scale,
      w,
      h;

  // Motion vars
  var p,
      start,
      force,
      timestamp = null,
      lastMouse,
      hasThrown = false,
      highEnough = false,
      lastY,
      rot;

  // Score vars
  var shots = 0,
      hits = 0,
      score = 0,
      accuracy = 0;

  
  
  window.addEventListener("resize", resize);
  window.addEventListener("orientationchange", resize);
  
  
  resize();
   
  
  // Wait a second before fading the elements in to prevent a flash of unpositioned/unstyled content
  TweenMax.to(".stage", 1, {autoAlpha:1, delay:1});


  
  
  
  
  function addEvents() {

   ball.addEventListener("mousedown", grabBall);
   ball.addEventListener("touchstart", grabBall);
   ball.addEventListener("mouseup", releaseBall);
   ball.addEventListener("touchend", releaseBall);
   
  }
  
  
  
  
  function removeEvents() {

   ball.removeEventListener("mousedown", grabBall);
   ball.removeEventListener("touchstart", grabBall);
   ball.removeEventListener("mouseup", releaseBall);
   ball.removeEventListener("touchend", releaseBall);

  }
  


  function resize() {
   
   // For some reason, we need to re-add the touch events every time the orientation change, if we don't the touchmove fails after the touchstart. Bizzarre.
   removeEvents();
   
   addEvents();
   
   
   offsetY = ball.getBoundingClientRect().height*1.5;

   // Find the smallest value of the SVG holding the basketball - it will give us the ball's radius
   ballRadius = Math.min(ball.getBoundingClientRect().width, ball.getBoundingClientRect().height);

   basketWidth = Math.round(basket.querySelector("rect").getBoundingClientRect().width);

   // Work out how the ratio between the basket's width and the ball's radius, make it a tiny smaller just for safety
   ratio = basketWidth / ballRadius - 0.1;

   w = window.innerWidth;
   h = window.innerHeight;
   
   // Make sure the basketall has no previous GSAP's transforms on it
   TweenMax.set(ball, {clearProps:"all"});

   // Move the basketball to its starting offset
  TweenMax.set(ball, {y:"+="+offsetY}); // We need a number rather than a percentage to use later with collision calculation.

   scale = TweenMax.to(ball, 0.5, {scale:ratio, ease:Power1.easeInOut}).progress(1).pause(0);

  }




  function tick() {
   var currY = p.position.getY();
   var currX = p.position.getX();

   if(hasThrown) {

    if(currY < 0) highEnough = true;

      // Has the ball been thrown high enough
      if(highEnough) {

        // Is it falling?
       if(lastY < currY && force.getLength() > 15) {
         basket.style.zIndex = 1;


         // Has it hit the basket
         if(currY < 10 && currY > -10) {
           hasThrown = false;

           // Was it on target?
           if(currX > basketWidth*0.1 && currX < basketWidth || currX < -basketWidth*0.1 && currX > -basketWidth) {

             // Create an oposite force angled in relation to the basket
             force.setX(currX/10);
             force.setLength(force.getLength()*0.7);
             p.velocity = force;

             basket.style.zIndex = 0;


            } else if(currX <= basketWidth && currX >= -basketWidth) {
              // Yes
              score += 2;
              hits += 1;
             
             // Three pointer?
             if(force.getX() > 2 || force.getX() < -2) {
              score += 1;
             }
             
             
             TweenMax.to("#net", 1, {scaleY:1.1, transformOrigin:"50% 0", ease:Elastic.easeOut});
             TweenMax.to("#net", 0.3, {scale:1, transformOrigin:"50% 0", ease:Power2.easeInOut, delay:0.6});
            }
          }
        }
      }
   }

   p.update();
   TweenMax.set(ball, {
    x:p.position.getX(),
    y:currY,
    rotation:rot
   });


   lastY = currY;

  };



  

  function grabBall(e) {
   
   e.preventDefault();

   p = Particle.create(0, offsetY, 0, 0, 0);
   force = Vector.create(0,0);
   start = Vector.create(getMouse(e).x, getMouse(e).y-offsetY);

   document.addEventListener("mousemove", moveBall);
   document.addEventListener("touchmove", moveBall);
  };


  

  function moveBall(e) {
   
   e.preventDefault();

   getSpeed(e);

   //  Update the ball's position
   TweenMax.set(ball, {x:p.position.getX(), y:p.position.getY()});

  };

  
  

  function releaseBall() {

   // Stop tracking the mousedown/touchdown
   ball.removeEventListener("mousedown", grabBall);
   ball.removeEventListener("touchstart", grabBall);
   // Stop tracking the mousemove
   document.removeEventListener("mousemove", moveBall);
   document.removeEventListener("touchmove", moveBall);
   // Reset the mouse tracking defaults
   timestamp = null;
   lastMouseX = null;
   lastMouseY = null;

   hasThrown = true;

   shots += 1;

   scale.play(0)

   // Limit how hard the ball can be thrown. Improves user accuracy diminishes realistic movement
   if(force.getLength() > 30) force.setLength(30);
   p.velocity = force;
   p.gravity = Vector.create(0,0.8);
   
   if(force.getX() > 0) {
    rot = "-=4";
   } else {
    rot = "+=4";
   }

   //  Start GSAP's tick so more physics-like movement can take place
   TweenMax.ticker.addEventListener("tick", tick);

   // Stop it after some period of time - saves having to write edges and floor logic and the user can shoot every three seconds or so
   TweenMax.delayedCall(2, reset);

  };



  
  function reset() {

   TweenMax.ticker.removeEventListener("tick", tick);

   p.gravity = 0;

   hasThrown = false;
   highEnough = false;

   basket.style.zIndex = 0;

   ball.addEventListener("mousedown", grabBall);
   ball.addEventListener("touchstart", grabBall);

   updateScore();


   TweenMax.to(ball, 1, {
    x:0,
    y:offsetY,
    scale:1,
    rotation:0,
    ease:Power3.easeOut
   });

  };




  function getMouse(e) {

   return {
    x:e.clientX || e.targetTouches[0].clientX,
    y:e.clientY || e.targetTouches[0].clientY
   };

  };



  
  function getSpeed(e) {

   e.preventDefault();

   if(timestamp === null) {
    timestamp = Date.now();
    lastMouse = getMouse(e);
    return;
   };

   var now = Date.now(),
   currMouse = getMouse(e),
   dx = currMouse.x - lastMouse.x,
   dy = currMouse.y - lastMouse.y;
   
   // Let's make the angle less steep
   dy *= 2;
   dx /= 2;

   timestamp = now;
   lastMouse = currMouse;

   force = Vector.create(dx, dy);
   p.position.setX(getMouse(e).x - start.getX());
   p.position.setY(getMouse(e).y - start.getY());

  };



  
  function updateScore() {
   accuracy = hits / shots;

   document.getElementById("hits").innerHTML = score;
   document.getElementById("accuracy").innerHTML = Math.round(accuracy * 100) + "%"
  }
 };
});
    </script>

  </body>
  
</html>`;
};

export default getShootingHoopsHTML();

