// Full standalone HTML for When All You Have is a Hammer
// Recreated from scratch using CSS background images (spans) like the original

const getHammerHTML = () => {
  // Base64 encoded images
  const hammerBase64 =
    "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";

  const nailBase64 =
    "iVBORw0KGgoAAAANSUhEUgAAABYAAACKCAYAAACuELoDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAO5JREFUeNrs2s0JwjAUwPFEHMARHMURCoVeeqgbOIsb5OJFEJIJXKGjZARfJIciDU1tIh7+Dx795JfX99pb9e3+OCulBlU49pJHyVNpeKcqRajYxP0hVl8ijJ4eSb+buEDzBTZKXiVt37Vez90hCxxkE4Z6WXgKH6AACjZOL+ilMmSRZ2q4gumfDw8YGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgY+H9gXwt2ifN2E9x3rUlU7Ur02BavOFHd+x/jzbAg9qMdruTrZnPbsBZ2uW1YBU/a4Wp8eTanDSFeAgwAdVAu+W9RkLcAAAAASUVORK5CYII=";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>When all you have is a Hammer…</title>
  <meta name="viewport" content="width=device-width,height=device-height,user-scalable=no,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      height: 100%;
    }

    body {
      min-height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
      background: #f5f5f5;
    }

    .hammer,
    .nail,
    .shadow {
      display: block;
      position: absolute;
    }

    .hammer {
      width: 100px;
      height: 250.24154589px;
      background-size: contain;
      background-position: left top;
      background-repeat: no-repeat;
      transition: transform 0.15s;
    }

    .nail {
      width: 10px;
      height: 62.72727273px;
      background-size: cover;
      background-position: left top;
      background-repeat: no-repeat;
      transition: height 0.105s 0.6s;
    }

    .shadow {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 100%;
      transition: width 0.15s;
      width: 160px;
      height: 4px;
    }

    .hammering {
      width: 400px;
      height: 300px;
      position: relative;
      margin: 0 auto 24px;
    }

    .hammering .hammer {
      left: 90px;
      bottom: 45px;
      transform: rotateZ(50deg);
      transform-origin: 50% 70%;
    }

    .hammering .nail {
      right: 90px;
      bottom: 45px;
    }

    .hammering .shadow {
      left: 68px;
      bottom: 45px;
    }

    .hammering.hammered .hammer {
      transform: rotateZ(90deg);
    }

    .hammering.hammered .nail {
      height: 24px;
      transition: height 0.105s 0.045s;
    }

    .hammering.hammered .shadow {
      width: 248px;
    }
  </style>
</head>
<body>
  <figure class="hammering">
    <span class="hammer"></span>
    <span class="nail"></span>
    <span class="shadow"></span>
  </figure>
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

    // Set images via JavaScript (more reliable in WebView)
    (function() {
      const hammerEl = document.querySelector('.hammer');
      const nailEl = document.querySelector('.nail');
      
      const hammerBase64Str = '${hammerBase64}';
      const nailBase64Str = '${nailBase64}';
      
      function setImages() {
        if (hammerEl && hammerBase64Str) {
          hammerEl.style.backgroundImage = 'url(data:image/png;base64,' + hammerBase64Str + ')';
          console.log('Hammer image set via JS, length:', hammerBase64Str.length);
        }
        
        if (nailEl && nailBase64Str) {
          nailEl.style.backgroundImage = 'url(data:image/png;base64,' + nailBase64Str + ')';
          console.log('Nail image set via JS, length:', nailBase64Str.length);
        }
      }
      
      // Try immediately
      setImages();
      
      // Also try on load
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setImages);
      }
      
      // And on window load as fallback
      window.addEventListener('load', setImages);
    })();

    // Hammer interaction
    const hammering = document.querySelector('.hammering');
    
    if (hammering) {
      // Click handler
      hammering.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.add('hammered');
        setTimeout(() => {
          this.classList.remove('hammered');
        }, 200);
      });

      // Touch support
      hammering.addEventListener('touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.add('hammered');
        setTimeout(() => {
          this.classList.remove('hammered');
        }, 200);
      });

      // Pointer events for better compatibility
      hammering.addEventListener('pointerdown', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.add('hammered');
        setTimeout(() => {
          this.classList.remove('hammered');
        }, 200);
      });
    }
  </script>
</body>
</html>`;
};

export default getHammerHTML();
