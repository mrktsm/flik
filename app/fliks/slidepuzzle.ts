
const getSlidePuzzleHTML = () => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Slide Puzzle</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <style>
    html, body {
      padding: 0;
      margin: 0;
      background: #ffdb42;
      height: 100%;
      width: 100%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      touch-action: none;
    }

    * {
      box-sizing: border-box;
    }

    .slides {
      padding: 20px;
      background: white;
      border-radius: 20px;
      border-bottom: 8px solid #f5c600;
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }

    .slides ul {
      display: block;
      padding: 0;
      margin: 0;
      list-style: none;
      width: 300px;
      height: 300px;
      position: relative;
      background: whitesmoke;
      border-radius: 6px;
      padding: 3px;
    }

    .slides ul li {
      display: block;
      position: absolute;
      width: 33.33%;
      height: 33.33%;
      padding: 2px;
      transition: all 0.2s ease;
    }

    .slides ul li button {
      display: block;
      border: 0;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      position: relative;
      background-color: #d6d6d6;
      background-repeat: no-repeat;
      background-size: 300% auto; /* 3 columns so 300% */
      cursor: pointer;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    .slides ul li button:focus, .slides ul li button:active {
      outline: 0;
    }
    
    @media (max-width: 350px) {
      .slides ul {
        width: 280px;
        height: 280px;
      }
    }
  </style>
</head>
<body>

<div class="slides">
 <ul>
   <li><button></button></li>
   <li><button></button></li>
   <li><button></button></li>
   <li><button></button></li>
   <li><button></button></li>
   <li><button></button></li>
   <li><button></button></li>
   <li><button></button></li>
   <!-- 9th slot is empty initially -->
 </ul> 
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

const app = {
  init: function() {
    this.container = document.querySelector('.slides ul');
    this.tiles = Array.from(document.querySelectorAll('.slides ul li'));
    // Use the requested GIF
    this.image = 'https://i.giphy.com/media/13gvXfEVlxQjDO/giphy.webp';
    
    this.setup();
    this.addEvents();
    
    // Shuffle instantly on start
    setTimeout(() => {
      this.scramble(150);
    }, 500); // Small delay to let image load slightly
  },

  setup: function() {
    let row = 0;
    let col = 0;

    // Grid tracking [y][x] -> element or null
    // We won't strictly need a 2D array if we trust the DOM attributes, 
    // but it helps to visualize. 
    // The original code used DOM query for collision check.
    
    this.tiles.forEach((tile, i) => {
      this.setPosition(tile, col, row);
      
      // Setup background
      const btn = tile.querySelector('button');
      if (btn) {
        btn.style.backgroundImage = "url(" + this.image + ")";
        // position x% y%
        // 0% 0% (top left), 50% 0% (top center), 100% 0% (top right)
        // for 3 items: 0, 50, 100. 
        // formula: col * 50, row * 50
        btn.style.backgroundPosition = (col * 50) + "% " + (row * 50) + "%";
      }

      col++;
      if (col > 2) {
        col = 0;
        row++;
      }
    });
  },

  setPosition: function(tile, x, y) {
    tile.style.left = (x * 33.33) + "%";
    tile.style.top = (y * 33.33) + "%";
    tile.setAttribute('data-x', x);
    tile.setAttribute('data-y', y);
  },

  addEvents: function() {
    this.tiles.forEach(tile => {
      tile.addEventListener('click', () => {
        this.move(tile, true);
      });
      // Touch support handled by click usually, but for fast tapping:
      tile.addEventListener('touchstart', (e) => {
         e.preventDefault(); // prevent double fire
         this.move(tile, true);
      });
    });
  },

  // Returns true if moved
  move: function(tile, animate) {
    const x = parseInt(tile.getAttribute('data-x'));
    const y = parseInt(tile.getAttribute('data-y'));

    // Check neighbors for empty spot
    // We are looking for a spot that has NO tile.
    // The easiest way is to check if (x-1, y) is occupied, etc.
    
    const dirs = [
      { dx: -1, dy: 0 }, // left
      { dx: 1, dy: 0 },  // right
      { dx: 0, dy: -1 }, // up
      { dx: 0, dy: 1 }   // down
    ];

    for (let d of dirs) {
      const nx = x + d.dx;
      const ny = y + d.dy;

      // Check bounds
      if (nx >= 0 && nx <= 2 && ny >= 0 && ny <= 2) {
        // Check if occupied
        const occupied = document.querySelector(\`.slides ul li[data-x="\${nx}"][data-y="\${ny}"]\`);
        if (!occupied) {
          // Empty spot found at nx, ny! Move there.
          if (!animate) {
             tile.style.transition = 'none';
          } else {
             tile.style.transition = 'all 0.2s ease';
          }
          
          this.setPosition(tile, nx, ny);
          
          if (!animate) {
            // Force reflow if needed, or just restore transition after a tick
             setTimeout(() => {
                tile.style.transition = 'all 0.2s ease';
             }, 10);
          }
          return true;
        }
      }
    }
    return false;
  },

  scramble: function(moves) {
    // To ensure solvability, we make N random valid moves.
    // Getting the empty slot position first would be efficient, but 
    // simply picking a random tile and trying to move it is easier and works fast enough.
    
    let moveCount = 0;
    let attempts = 0;
    const maxAttempts = moves * 10; // Avoid infinite loops

    // Disable transitions for instant shuffle
    this.tiles.forEach(t => t.style.transition = 'none');

    while (moveCount < moves && attempts < maxAttempts) {
      const randomTile = this.tiles[Math.floor(Math.random() * this.tiles.length)];
      if (this.move(randomTile, false)) {
        moveCount++;
      }
      attempts++;
    }
    
    // Restore transitions
    setTimeout(() => {
        this.tiles.forEach(t => t.style.transition = 'all 0.2s ease');
    }, 50);
    
    console.log('Scrambled with ' + moveCount + ' moves');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
</script>
</body>
</html>`;
};

export default getSlidePuzzleHTML();

