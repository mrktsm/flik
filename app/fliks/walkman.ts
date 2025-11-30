// Full standalone HTML for Sony Walkman TPS-L2
const getWalkmanHTML = () => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sony Walkman TPS-L2</title>
  <meta name="viewport" content="width=device-width,height=device-height,user-scalable=no,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0">
  <style>
/* Globals
------------------------ */
*, *:after, *:before {-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;transform-style: preserve-3d;}
html {height: 100%;}
body {margin: 0px;background:#333641;height: 100%;perspective: 1500px;overflow: hidden;}
ul{margin:0;padding:0px;}

.instructions{display: none;}
.dev-controls{display: none;}

/* effects 
------------------------ */
  .noise{background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/21555/noise.jpg") repeat;height: 100%;position: absolute;top: 0;left: 0;width: 100%;z-index: 1;opacity: 0.05;pointer-events: none;}

/* Transition speeds 
------------------------ */
  .transition-03{transition: all 0.3s cubic-bezier(0.48, 0, 0.28, 0.99);}
  .transition-05{transition: all 0.5s cubic-bezier(0.48, 0, 0.28, 0.99);}

/* Walkman 
------------------------ */
 .walkman {width: 336px;height: 520px;margin: auto;position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%) rotateY(0deg) rotateX(0deg) rotateZ(0) translateZ(-90px);transform-origin: 50% 50%;cursor: move;user-select: none;touch-action: none;will-change: transform;}
  .walkman.cover-open{
  transform: translate(-50%, -50%) rotateY(-14deg) rotateX(0deg) rotateZ(0) translateZ(-90px);
}

/* Walkman - Viewing angles 
------------------------ */
  .walkman.top-view{transform: translate(-50%, -50%) rotateY(-9deg) rotateX(-66deg) rotateZ(0) translateZ(-56px) translateY(-136px);}
  .walkman.bottom-view{transform: translate(-50%, -50%) rotateY(10deg) rotateX(87deg) rotateZ(0) translateZ(-60px);}
  .walkman.left-view{transform: translate(-50%, -50%) rotateY(68deg) rotateX(0deg) rotateZ(0) translateZ(-90px);}
  .walkman.right-view{transform: translate(-50%, -50%) rotateY(-78deg) rotateX(0deg) rotateZ(0) translateZ(-90px);}
  .walkman.back-view{transform: translate(-50%, -50%) rotateY(-208deg) rotateX(0deg) rotateZ(0) translateZ(-90px);}

/* Walkman - Swivel animation
------------------------ */
  .walkman.swivel {
    animation: swivel 10s linear infinite;
  }

  @keyframes swivel {
    0% {
      transform: translate(-50%, -50%) rotateY(0deg) rotateX(0deg) rotateZ(0) translateZ(-90px);
    }
    50% {
      transform: translate(-50%, -50%) rotateY(360deg) rotateX(40deg) rotateZ(0) translateZ(-90px);
    }
    100% {
      transform: translate(-50%, -50%) rotateY(720deg) rotateX(0deg) rotateZ(0) translateZ(-90px);
    }
  }

/* Basic cube defs 
------------------------ */
  .cube {transform-style: preserve-3d;transform-origin: 50% 100%;position: relative;backface-visibility: hidden;}
  .cube:before {content: ' ';display: block;position: absolute;bottom: 0;left: 0;transform-origin: 0 0;backface-visibility: inherit;background: rgba(230, 97, 0, 0.8);height: 100%;width: 100%;transform: translatey(100%) rotatex(90deg);backface-visibility: visible;}
  .cube:after {content: ' ';display: block;position: absolute;bottom: 0;left: 0;transform-origin: 0 0;backface-visibility: inherit;background: rgba(230, 97, 0, 0.8);height: 100%;width: 100%;transform: translatey(100%) rotatex(180deg);}
  .cube .sides-x {position: absolute;top: 0;left: 0;transform-origin: 0 0;background: #1d3661;height: 100%;width: 100%;}
  .cube .sides-z {position: absolute;top: 0;left: 0;height: 100%;width: 100%;transform-origin: 0 0;backface-visibility: hidden;}
  .cube .sides-x:before {content: ' ';display: block;width: 100%;height: 100%;background: rgba(33, 150, 243, 0.8);transform: rotatey(-89deg);transform-origin: 0 0;position: absolute;backface-visibility: hidden;}
  .cube .sides-x:after {content: ' ';display: block;width: 100%;height: 100%;background: rgba(33, 150, 243, 0.8);transform: rotatey(90deg);transform-origin: 100% 0;position: absolute;right: 0px;top: 0;}
  .cube .sides-z:before {content: ' ';display: block;width: 100%;height: 100%;background: rgba(219, 49, 247, 0.76);transform: translateZ(112px);transform-origin: 0 0;position: absolute;}
  .cube .sides-z:after {content: ' ';display: block;content: ' ';display: block;width: 100%;height: 100%;background: #222730;transform: rotatex(90deg);transform-origin: 0 0;position: absolute;}


/* Walkman top
------------------------ */
  .walkman-top {width: 271px;height: 80px;}
  .walkman-top:before {height: 112px;background: #28303e;z-index: 1;transform: translatez(112px) translatey(100%) rotatex(-90deg);width: calc(100% - 1px);}
  .walkman-top:after{background: linear-gradient(-135deg, rgb(58, 98, 159) 0%,rgb(86, 138, 215) 100%);box-shadow: inset 5px 0px 0px 0px rgba(255, 255, 255, 0.06);}
  .walkman-top > .sides-x {}
  .walkman-top > .sides-z {}
  .walkman-top > .sides-x:before {width: 114px;background: linear-gradient(45deg, rgb(57, 103, 170) 0%,rgb(86, 138, 215) 100%);box-shadow: inset -5px 0px 0px 0px rgba(255, 255, 255, 0.1),inset 5px 0px 0px 0px rgba(255, 255, 255, 0.06),inset 0px 6px 0px 0px rgba(255, 255, 255, 0.08);transform: rotatey(-89deg) translatex(-1px);}
  .walkman-top > .sides-x:after {width: 112px;background: #3f5173;}
  .walkman-top > .sides-z:before {background: #4d6186;background: linear-gradient(45deg, rgb(54, 87, 149) 0%,rgb(86, 138, 215) 100%);box-shadow: inset 0px -1px 0px rgba(21, 28, 39, 0.53), inset 0px 6px 0px 0px rgba(255, 255, 255, 0.1), inset 5px 0px 0px 0px rgba(255, 255, 255, 0.1),inset -2px 0px 0px rgb(71, 93, 128);z-index: 1;}
  .walkman-top > .sides-z:after {height: 113px;background: linear-gradient(45deg, rgb(54, 87, 149) 0%,rgb(86, 138, 215) 100%);box-shadow: inset 0px -4px 0px 0px rgba(255, 255, 255, 0.17),inset 5px 0px 0px 0px rgba(255, 255, 255, 0.08);}


  .hot-line {top: -21px;width: 50px;height: 21px;position: absolute;left: 74px;transform: translatez(68px);cursor: pointer;}
  .hot-line:before {height: 28px;background: rgb(230, 97, 0);box-shadow: -10px 0px 10px rgba(0, 0, 0, 0.11),  0px 0px 10px rgba(255, 255, 255, 0.59);}
  .hot-line:after{background: rgb(230, 97, 0);}
  .hot-line .sides-x {background: #ff7800;}
  .hot-line .sides-z {background: #ff7800;}
  .hot-line .sides-x:before {width: 28px;background: #ff7800;}
  .hot-line .sides-x:after {width: 28px;z-index: 1;background: #e27f00;}
  .hot-line .sides-z:before {transform: translateZ(28px);background: #ff9105;z-index: 1;}
  .hot-line .sides-z:after {height: 28px;background: #ffa22c;}
  .hotline-active .hot-line{height: 5px;transform: translatey(16px) translatez(68px);}

  .headphone-inputs{top: -31px;width: 100px;height: 28px;position: absolute;left: 174px;transform: translatey(100%) rotatex(90deg) translatez(12px) translatey(82px);}
  .headphone-inputs:before{content:'Headphones';font-family: "Idlewild A";font-weight: 700;position: absolute;top: -27px;letter-spacing: 0.2em;color: rgb(183, 202, 229);transform: scale(0.35);left: -76px;text-shadow: 1px -2px 5px #2f4262, 0px 4px 10px rgba(255, 255, 255, 0.38);}
  .headphone-inputs:after{content: 'HotLine';font-family: "Idlewild A";font-weight: 700;position: absolute;top: -40px;letter-spacing: 0.2em;color: #677fa4;transform: scale(0.35);left: -163px;background: rgb(182, 202, 231);padding: 10px 14px;box-shadow: 1px -2px 5px #2f4262, 0px 4px 10px rgba(255, 255, 255, 0.38);border-radius: 6px;}
  .headphone-inputs > span{display: block;position: absolute;background: #21783e;border-radius: 100%;width: 28px;height: 28px;top: 0px;box-shadow: inset -1px 1px 2px rgba(0, 0, 0, 0.67), 0 1px 3px rgba(255, 255, 255, 0.64);}
  .headphone-inputs > span:nth-child(1):before,.headphone-inputs > span:nth-child(2):before{font-family: "Idlewild A";font-weight: 700;position: absolute;letter-spacing: 0.2em;color: rgb(183, 202, 229);transform: scale(0.35);text-shadow: 1px -2px 5px #2f4262, 0px 4px 10px rgba(255, 255, 255, 0.38);}
  .headphone-inputs > span:nth-child(1):before{content: 'A';top: -17px;left: 3px;}
  .headphone-inputs > span:nth-child(2):before{content: 'B';top: -17px;left: 3px;}
  .headphone-inputs > span:nth-child(2){left: 48px;}
  .headphone-inputs > span > span{background: #225132;display: block;width: 18px;height: 18px;border-radius: 20px;position: absolute;margin: auto;left: 0;right: 0;top: 0;bottom: 0;border: 3px solid #d5d5d5;box-shadow: inset 0px 8px 2px black;}

  .operation{top: -31px;width: 10px;height: 10px;position: absolute;right: 19px;transform: translatey(100%) rotatex(90deg) translatez(-15px) translatey(23px);background: #345893;border-radius: 10px;box-shadow: 0px 0px 0px 3px rgb(88, 134, 204),-1px 1px 2px 3px rgba(255, 255, 255, 0.26),1px -1px 2px 4px rgba(21, 34, 56, 0.23), inset 1px -1px 0px 3px rgba(0, 0, 0, 0.42);}
  .hotline-active .operation{background: #ff0000;box-shadow: 0px 0px 10px 3px red,0px 0px 0px 3px rgb(88, 134, 204),-1px 1px 2px 3px rgba(255, 255, 255, 0.26),1px -1px 2px 4px rgba(21, 34, 56, 0.23), inset 1px -1px 0px 3px rgba(0, 0, 0, 0.06);}
  .operation:before{content:'Operation';font-family: "Idlewild A";font-weight: 700;position: absolute;top: -3px;letter-spacing: 0.2em;color: rgb(183, 202, 229);transform: scale(0.35);left: -114px;text-shadow: 1px -2px 5px #2f4262, 0px 4px 10px rgba(255, 255, 255, 0.38);font-size: 13px;}

/* Walkman Base
------------------------ */
  .walkman-base{top: 80px;width: 271px;height: 440px;position: absolute;z-index: 0;}
  .walkman-base:before {height: 84px;background: linear-gradient(-225deg, rgb(26, 50, 90) 20%,rgb(32, 66, 125) 120%);}
  .walkman-base:after{background: linear-gradient(195deg, #19315b 2%,rgb(86, 138, 215) 120%);box-shadow: inset 5px 0px 0px 0px rgba(255, 255, 255, 0.06);}
  .walkman-base .swing-arm{display:block;position: absolute;bottom: 0;left: 0;transform-origin: 0 0;backface-visibility: inherit;background: rgb(34, 42, 56);height: 130px;width: 24px;transform: translatez(45px) translatex(150px) translatey(100%) rotatex(90deg) rotatez(90deg);transition: all 0.5s cubic-bezier(0.48, 0, 0.28, 0.99);backface-visibility: visible;}
  .closed .walkman-base .swing-arm{transform: translatez(57px) translatex(158px) translatey(100%) rotatex(90deg) rotatez(90deg);}
  .cover-open .walkman-base .swing-arm{transform: translatez(57px) translatex(138px) translatey(100%) rotatex(92deg) rotatez(60deg);}

  .walkman-base .sides-x {}
  .walkman-base .sides-z {}
  .walkman-base .sides-x:before {width: 89px;background: linear-gradient(5deg, #24457e 20%,rgb(86, 138, 215) 120%);box-shadow: inset 5px 0px 0px 0px rgba(255, 255, 255, 0.06);transform: rotatey(-89deg) translatex(-2px) translatez(0px);}
  .walkman-base .sides-x:after {width: 85px;z-index: 1;background: #3f5173;}
  .walkman-base .sides-z:before {transform: translateZ(74px);background: transparent;z-index: 1;}
  .walkman-base .sides-z:after {height: 75px;}

  .base-decals{}
  .base-decals p{color: rgb(73, 115, 180);transform: rotatey(180deg) translate3d(-67px, 17px, 1px);font-family: arial;font-weight: bold;font-size: 40px;display: inline-block;margin: 0;position: absolute;text-shadow: 1px 1px rgba(187, 213, 255, 0.31),0px -1px rgba(0, 0, 0, 0.3);}

/* Walkman Foot
------------------------ */
  .walkman-foot{top: 80px;width: 6px;height: 486px;position: absolute;z-index: 0;transform: translatez(0px) translatex(-6px) translatey(-60px) translatez(21px) rotatex(0deg);}
  .walkman-foot:before {height: 65px;background: #192f55;}
  .walkman-foot:after{background: #1a2e50;}
  .walkman-foot .sides-x{}
  .walkman-foot .sides-x:before {width: 65px;background: #1d3661;transform: rotatey(-89deg) translatex(-1px);}
  .walkman-foot .sides-x:after {width: 65px;z-index: 1;background: #1d3661;}
  .walkman-foot .sides-z:before {transform: translateZ(59px);background: #264377;z-index: 1;}
  .walkman-foot .sides-z:after {height: 59px;background: #2a4c86;}
  .walkman-foot .foot-decals{transform: rotatey(-89deg) translate3d(28px, 0px, 30px);width: 60px;height: 100%;position: relative;padding-left: 4px;}
  .walkman-foot .foot-decals > li{border-left: 2px solid #162846;display: inline-block;height: 100%;width: 15px;text-align: center;margin-right: -4px;position: relative;}
  .walkman-foot .foot-decals > li:before,.walkman-foot .foot-decals > li:after{content:' ';display:block;height: 100%;border-left: 2px solid #162846;position: absolute;left: 3px;}
  .walkman-foot .foot-decals > li:before{}
  .walkman-foot .foot-decals > li:after{left: 8px;}

  .walkman-foot .foot-decals .screw{width: 10px;height: 10px;background: #1b212d;display: block;position: absolute;border-radius: 20px;box-shadow: inset -1px 0px 0px rgba(255, 255, 255, 0.19) ,0px 0px 0px 1px rgb(13, 23, 38) ,-1px 0px 0px 1px rgba(255, 255, 255, 0.2);}
  .walkman-foot .foot-decals .screw:nth-child(1){top: 28px;left: 25px;}
  .walkman-foot .foot-decals .screw:nth-child(2){left: 25px;top: 95px;}
  .walkman-foot .foot-decals .screw:nth-child(3){left: 25px;bottom: 72px;}
  .walkman-foot .foot-decals .screw:before{content:' ';display:block;width: 7px;height: 1px;background: #0c0e14;position: absolute;top: 5px;left: 1px;transform: rotatez(-48deg);}
  .walkman-foot .foot-decals .screw:after{content: ' ';display: block;width: 7px;height: 1px;background: #0c0e14;position: absolute;top: 5px;left: 1px;transform: rotatez(46deg);}

  .tone{position: absolute;background: #234073;bottom: 141px;width: 43px;height: 87px;box-shadow: 0px 1px 0px rgba(77, 122, 190, 0.39),0px -1px 0px rgba(10, 26, 49, 0.51);}
  .tone .tone-switch{position: absolute;background: #12141a;width: 12px;height: 66px;border-radius: 0px 3px 3px 0px;top: 16px;box-shadow: 0px 1px 0px rgba(77, 122, 190, 0.39),0px -1px 0px rgba(10, 26, 49, 0.51);cursor: pointer;}
  .tone-switch:before{content:'Tone';font-family: "Idlewild A";font-weight: 700;position: absolute;letter-spacing: 0.06em;color: rgb(105, 136, 189);transform: scale(0.35);left: -18px;top: -19px;line-height: 23px;pointer-events: none;}
  .tone-switch ul{margin: 0;padding: 7px 0 0 0;list-style: none;background: #1f2535;width: 6px;height: 50px;position: absolute;top: 4px;left: 3px;border-radius: 2px;}
  .tone-switch-active .tone-switch ul{top: 12px;}
  .tone-switch ul li{display: block;margin: 0px;border-bottom: 1px solid hsla(0, 0%, 100%, 0.09);border-top: 1px solid rgb(19, 21, 27);height: 3px;}
  .tone span{font-family: "Idlewild A";font-weight: 700;position: absolute;letter-spacing: 0.06em;color: rgb(105, 136, 189);transform: scale(0.3);left: -9px;top: 8px;line-height: 23px;}

  .walkman-foot .hover-helpers{position: absolute;display: block;background: rgba(255, 0, 0, 0.5);width: 0px;height: 519px;top: 0px;transform: translate3d(5px,-19px,30px) rotatey(-90deg);transform-origin: 0 100%;backface-visibility: visible;}
  
  .walkman-foot .hover-helpers:before{content:' ';position: absolute;display: block;background: rgba(176, 96, 128, 0);width: 140px;height: 519px;top: 0px;transform: translate3d(-32px,1px,-10px) rotatey(-90deg);transform-origin: 0 100%;backface-visibility: visible;}

/* Walkman Cover
------------------------ */
  .walkman-cover {top: 80px;width: 271px;height: 440px;position: absolute;transform-origin: 0%;transform: rotateY(-41deg) rotateX(0deg) rotateZ(0deg) translateZ(51px) translatex(59px) translatey(0px);backface-visibility: visible;cursor: pointer;/* opacity: 0; */}
  .walkman-cover *,.walkman-cover *:before,.walkman-cover *:after{backface-visibility: visible;}
  .walkman-cover.closed{transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg) translateZ(75px) translatex(1px) translatey(0px);}
  .eject .walkman-cover.closed{transform: rotateY(-6deg) rotateX(0deg) rotateZ(0deg) translateZ(74px) translatex(9px) translatey(0px);}
  
  .walkman-cover:before {height: 28px;background: linear-gradient(-235deg, rgb(26, 50, 90) 20%,rgb(32, 66, 125) 120%);border-radius: 0px 10px 0px 0px;transform: translatey(100%) rotatex(90deg) translatey(10px);}
  .walkman-cover:after{display:none;}
  .window:after{content:' ';display:block;background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/21555/sony_branding.svg) no-repeat;position: absolute;width: 187px;height: 394px;transform: translateZ(0px);z-index: 1;top: -72px;background-size: 94% 100%;left: -12px;backface-visibility: hidden;}
  .walkman-cover .sides-x {background: transparent;pointer-events: none;}
  .walkman-cover .sides-z {pointer-events: none;}
  .walkman-cover .sides-x:before {width: 27px;background: #1d202b;backface-visibility: visible;transform: rotatey(-89deg) translatex(10px);}
  .walkman-cover .sides-x:after {width: 36px;z-index: 1;background: #4d6186;opacity: 0;}
  .walkman-cover .sides-z:before {transform: translateZ(36px);z-index: 1;background: linear-gradient(45deg, rgb(54, 87, 149) 20%,rgb(86, 138, 215) 120%);box-shadow: inset 0px 3px 2px rgba(255, 255, 255, 0.15), inset 5px 0px 0px 0px rgba(255, 255, 255, 0.1),inset -2px 0px 0px rgb(71, 93, 128);-webkit-mask-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/21555/cover-mask.svg);z-index: 1;}
  .walkman-cover .sides-z:after {height: 36px;opacity: 0;}
  .walkman-cover .window{position: absolute;width: 93px;height: 253px;transform: translateZ(36px);z-index: 1;top: 89px;left: 69px;border-radius: 4px;background: linear-gradient(135deg,  rgba(255,255,255,0.2) 0%,rgba(255,255,255,0) 50%);box-shadow: 0px 0px 0px 5px rgba(0, 0, 0, 0.23),inset 1px 1px 0px rgba(255, 255, 255, 0.11);}
  .walkman-cover .sides-x span{position: inherit;top: inherit;left: inherit;transform-origin: inherit;height: inherit;width: 28px;display: block;transform: rotatey(-90deg) translatex(10px);background: linear-gradient(35deg, rgb(44, 81, 145) 20%,rgb(86, 138, 215) 120%);box-shadow: inset -5px 0px 0px 0px rgba(255, 255, 255, 0.1);}

/* Walkman Bay
------------------------ */
  .walkman-bay{top: 80px;width: 271px;height: 440px;position: absolute;transform-origin: 0 0;transform: rotateY(0deg) rotateX(0deg) rotateZ(0) translateZ(84px);background-repeat: no-repeat;background: linear-gradient(90deg, rgb(35, 35, 49) 0%,rgb(43, 53, 66) 100%);/* z-index: 2; */transform-style: preserve-3d;backface-visibility: visible;will-change: transform;}
  .walkman-bay:before{content:' ';display:block;position: absolute;width: 100%;height: 100%;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIUlEQVQIW2O08Ij5z8DAwHBixxJGEM2IIQASRQZgZcgAAKatCAWFOfCfAAAAAElFTkSuQmCC);background-size: 4px;-webkit-mask: linear-gradient(to right, rgba(0,0,0,1) -400%,rgba(0,0,0,0) 20%,rgba(0,0,0,1) 80%);/* opacity: 0; */}
  .guides-heads{position: absolute;right: 0;background: rgb(33, 38, 47);width: 66px;height: 280px;top: 80px;border-radius: 10px 0px 0px 10px;box-shadow: inset 14px 0px 17px -10px rgba(0, 0, 0, 0.35), -2px 0px 0px rgba(255, 255, 255, 0.05);z-index: 1;}
  .guides-heads .guide{width: 17px;height: 17px;background: #6d6d6d;border-radius: 100px;position: absolute;perspective: 1500px;transform-style: preserve-3d;transform-origin: 50% 100%;box-shadow: 1px 0px 0px white;}
  .guides-heads .guide:nth-child(1){top: 32px;right: 11px;}
  .guides-heads .guide:nth-child(2){top: 75px;right: 18px;}
  .guides-heads .guide:nth-child(3){top: 188px;right: 18px;}
  .guides-heads .guide:nth-child(4){top: 229px;right: 11px;opacity: 0;}
  .spooler-plates{position: absolute;left: 74px;background: rgb(33, 38, 47);width: 101px;height: 151px;top: 142px;border-radius: 6px;box-shadow: inset 14px 0px 17px -10px rgba(0, 0, 0, 0.35), -2px 0px 0px rgba(255, 255, 255, 0.05);z-index: 1;}
  .spooler-plates .plate{position: absolute;left: 13px;background: linear-gradient(45deg, rgb(73, 82, 97) 0%,rgb(188, 204, 234) 100%);width: 77px;height: 106px;top: 23px;border-radius: 2px;box-shadow: inset -2px 0px 0px rgba(255, 255, 255, 0.33);}
  .spooler-plate{position: absolute;left: 28px;background: rgb(179, 143, 76);width: 44px;height: 44px;box-shadow: 1px 0px 0px rgb(255, 200, 93);border-radius: 100px;}
  .spooler-plate:nth-child(2){top: -34px;}
  .spooler-plate:nth-child(3){bottom: -36px;}

/* Cylinder
------------------------ */
  .shape, .face, .face-wrapper, .cr {position: absolute;transform-style: preserve-3d;}
  .shape {top: 50%;left: 50%;width: 0;height: 0;transform-origin: 50%;}
  .face, .face-wrapper {overflow: hidden;transform-origin: 0 0;backface-visibility: hidden;}
  .face {background-size: 100% 100%!important;background-position: center;left: 100%;width: 100%;height: 100%}
  .shader {position: absolute;left: 0;top: 0;width: 100%;height: 100%}
  [class*="cylinder"] .side {left: 50%;height: 100%;}
  [class*="cylinder"] .tp {transform: rotateX(90deg) translateY(-50%) translatex(-100%);}
  [class*="cylinder"] .bm {transform: rotateX(-90deg) translateY(-50%);}
  [class*="cylinder"] .tp, [class*="cylinder"] .bm, [class*="cylinder"] .tp .shader, [class*="cylinder"] .bm .shader {border-radius: 50%;}
  [class*="cylinder"] .bm {top: 100%;}

/* Guide spool
------------------------ */
  .guide-spool{transform: translatez(72px) rotateX(-90deg) rotateY(-230deg) rotateZ(0deg);opacity:1;width: 10px;height: 30px;transform-style: preserve-3d;transform-origin: 50% 100%;backface-visibility: visible;}
  .guide-spool .tp, .guide-spool .bm {width: 10px;height: 10px;}
  .guide-spool .side {width: 5px;height: 100%;}
  .guide-spool .s0 ,.tape-spool .s0 {transform: rotateY(22.5deg) translate3D(-50%, 0, 5px);}
  .guide-spool .s1{transform: rotateY(67.5deg) translate3D(-50%, 0, 5px);}
  .guide-spool .s2{transform: rotateY(112.5deg) translate3D(-50%, 0, 5px);}
  .guide-spool .s3{transform: rotateY(157.5deg) translate3D(-50%, 0, 5px);}
  .guide-spool .s4{transform: rotateY(202.5deg) translate3D(-50%, 0, 5px);}
  .guide-spool .s5{transform: rotateY(247.5deg) translate3D(-50%, 0, 5px);}
  .guide-spool .s6{transform: rotateY(292.5deg) translate3D(-50%, 0, 5px);}
  .guide-spool .s7{transform: rotateY(337.5deg) translate3D(-50%, 0, 5px);}
  .guide-spool .face, .guide-spool .side {background-color: #a9adb3;}
  .guide1{top: 90px;transform: translatex(111px) translatez(-4px) rotateX(-90deg) rotateY(-230deg) rotateZ(0deg);}
  .guide2{top: 134px;transform: translatex(104px) translatez(-4px) rotateX(-90deg) rotateY(-230deg) rotateZ(0deg);}
  .guide3{top: 246px;transform: translatex(104px) translatez(-4px) rotateX(-90deg) rotateY(-230deg) rotateZ(0deg);}
  .guide4{top: 368px;transform: translatex(78px) translatez(79px) rotateX(-90deg) rotateY(-230deg) rotateZ(0deg);opacity: 0;}

/* Tape spools
------------------------ */
  .tape-spool{transform: translatez(72px) rotateX(-90deg) rotateY(-290deg) rotateZ(0deg);opacity:1;width: 34px;height: 30px;transform-style: preserve-3d;transform-origin: 50% 100%;backface-visibility: visible;will-change: transform;}
  .tape-spool .tp, .tape-spool .bm {width: 34px;height: 34px;position: absolute;}
  .tape-spool .side {width: 14px;height: 100%;}
  .tape-spool .shader{opacity: 0.28;}
  .tape-spool .s0 {transform: rotateY(22.5deg) translate3D(-50%, 0, 16px);}
  .tape-spool .s1 {transform: rotateY(67.5deg) translate3D(-50%, 0, 16px);}
  .tape-spool .s2 {transform: rotateY(112.5deg) translate3D(-50%, 0, 16px);}
  .tape-spool .s3 {transform: rotateY(157.5deg) translate3D(-50%, 0, 16px);}
  .tape-spool .s4 {transform: rotateY(202.5deg) translate3D(-50%, 0, 16px);}
  .tape-spool .s5 {transform: rotateY(247.5deg) translate3D(-50%, 0, 16px);}
  .tape-spool .s6 {transform: rotateY(292.5deg) translate3D(-50%, 0, 16px);}
  .tape-spool .s7 {transform: rotateY(337.5deg) translate3D(-50%, 0, 16px);}
  .tape-spool .face, .tape-spool .side {background-color: #111215;}
  .tape-spool-1{top: 100px;transform: translatex(-27px) translatez(-4px) rotateX(-90deg) rotateY(0deg) rotateZ(0deg);}
  .tape-spool-2{top: 277px;transform: translatex(-27px) translatez(-4px) rotateX(-90deg) rotateY(0deg) rotateZ(0deg);}
  .direction-decal{width: 22px;height: 22px;position: absolute;top: 5px;left: 8px;transform: rotate(0deg);}
  .tape-spool .tp:before{content:' ';display:block;z-index: 1;background: red;width: 2px;height: 2px;position: absolute;margin: auto;top: 0;bottom: 0;left: 0;right: 0;opacity:0;}
  .direction-decal span{display: block;background: white;width: 7px;height: 2px;position: absolute;left: 0px;right: 0;}
  .direction-decal span:nth-child(1){transform: rotate(-154deg);left: -1px;bottom: 12px;}
  .direction-decal span:nth-child(2){transform: rotate(331deg);left: 12px;bottom: 12px;}
  .direction-decal span:nth-child(3){transform: rotate(-90deg);bottom: 2px;left: 5px;width: 7px;}

/* Tape spool playing
------------------------ */

  /* Playing */

  .playing .tape-spool{
    animation: spool-playing 2.5s linear infinite;
  }
  @keyframes spool-playing {
    0% {
      transform: translatex(-27px) translatez(-4px) rotateX(-90deg) rotateY(0deg) rotateZ(0deg);
    }
    100% {
      transform: translatex(-27px) translatez(-4px) rotateX(-90deg) rotateY(360deg) rotateZ(0deg);
    }
  }

  .rewind .tape-spool{
    animation: spool-rewind 0.25s linear infinite;
  }
  @keyframes spool-rewind {
    0% {
      transform: translatex(-27px) translatez(-4px) rotateX(-90deg) rotateY(360deg) rotateZ(0deg);
    }
    100% {
      transform: translatex(-27px) translatez(-4px) rotateX(-90deg) rotateY(0deg) rotateZ(0deg);
    }
  }

  .forward .tape-spool{
    animation: spool-forward 0.25s linear infinite;
  }
  @keyframes spool-forward {
    0% {
      transform: translatex(-27px) translatez(-4px) rotateX(-90deg) rotateY(0deg) rotateZ(0deg);
    }
    100% {
      transform: translatex(-27px) translatez(-4px) rotateX(-90deg) rotateY(360deg) rotateZ(0deg);
    }
  }

/* Controls
------------------------ */
  .controls{position: absolute;height: 100%;width: 100%;transform: translate3d(0px,-80px,0px);}

/* control-base-1 
------------------------ */
  .control-base-1 {top: 0px;width: 45px;height: 183px;position: absolute;z-index: 6;right: 20px;}
  .control-base-1:before {height: 56px;background: #bbc4cd;}
  .control-base-1:after{background: linear-gradient(-205deg, rgb(187, 196, 207) 0%,rgb(232, 236, 242) 100%);box-shadow: inset -4px 0px 0px rgba(255, 255, 255, 0.18);width: 46px;}
  .control-base-1 > .sides-x {background: #9ba2b1;}
  .control-base-1 > .sides-z {}
  .control-base-1 > .sides-x:before {width: 56px;background: #9ba2b1;}
  .control-base-1 > .sides-x:after {width: 56px;z-index: 1;background: linear-gradient(45deg, rgb(176, 185, 198) 0%,rgb(246, 249, 255) 100%);box-shadow: inset -4px 0px 0px rgba(255, 255, 255, 0.18),inset 0px 3px 0px rgba(255, 255, 255, 0.8);}
  .control-base-1 > .sides-z:before {transform: translateZ(76px);background: #9ba2b1;z-index: 1;}
  .control-base-1 > .sides-z:after {height: 56px;background: #9ba2b1;}

  .play{transform: rotatey(90deg) translate3d(-28px, -9px, 24px );position: absolute;width: 43px;height: 73px;background: linear-gradient(0deg, rgb(138, 150, 169) 0%,rgb(168, 179, 193) 7%,rgb(158, 167, 179) 95%,rgb(107, 116, 131) 100%);border-radius: 4px;box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.41),inset 1px 0px 0px rgba(0, 0, 0, 0.04);bottom: -3px;}
  .play:before{content:' ';display:block;position: absolute;width: 39px;height: 70px;background: #686f7a;border-radius: 2px;box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.41),inset 1px 0px 0px rgba(0, 0, 0, 0.04);bottom: 1px;left: 2px;    }
  .play-button {top: 4px;width: 34px;height: 64px;position: absolute;z-index: 6;right: 4px;transform: translateZ(-14px);cursor: pointer;}
  .play-button.pressed{transform: translateZ(-31px);}
  .play-button:before {height: 34px;background: #7b8494;}
  .play-button:after{background: rgb(177, 185, 195);}
  .play-button > .sides-x {background: #9ba2b1;}
  .play-button > .sides-z {}
  .play-button > .sides-x:before {width: 34px;background: linear-gradient(45deg, rgb(132, 144, 162) 0%,rgb(178, 185, 197) 100%);}
  .play-button > .sides-x:after {width: 34px;z-index: 1;background: linear-gradient(45deg, rgb(132, 140, 154) 0%,rgb(153, 158, 167) 100%);}
  .play-button > .sides-z:before {transform: translateZ(34px);background: linear-gradient(45deg, rgb(168, 176, 187) 0%,rgb(215, 221, 230) 100%);box-shadow: inset 0px 16px 7px -10px rgba(255, 255, 255, 0.98);}
  .play-button > .sides-z:after {height: 34px;background: #9ba2b1;z-index: 0;}
  .play-button .face{position: absolute;left: 0;transform: translate3d(0px,0px,34px);background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/21555/button_texture.svg);background-repeat: repeat;background-size: 4px auto !important;box-shadow: inset 0px 4px 0px 0px rgb(229, 235, 247), inset 0px 0px 0px 2px rgb(176, 185, 197);background-position: 0px -2px;}

  .controls .rewind{transform: rotatey(90deg) translate3d(-28px, -64px, 24px );position: absolute;width: 43px;height: 32px;background: linear-gradient(0deg, rgb(138, 150, 169) 0%,rgb(168, 179, 193) 7%,rgb(158, 167, 179) 95%,rgb(107, 116, 131) 100%);border-radius: 4px;box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.41),inset 1px 0px 0px rgba(0, 0, 0, 0.04);bottom: 34px;}
  .controls .rewind:before{content:' ';display:block;position: absolute;width: 39px;height: 30px;background: #686f7a;border-radius: 2px;box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.41),inset 1px 0px 0px rgba(0, 0, 0, 0.04);bottom: 1px;left: 2px;}
  .rewind-button {top: 4px;width: 34px;height: 26px;position: absolute;z-index: 6;right: 4px;transform: translateZ(-14px);cursor: pointer;}
  .rewind-button.pressed{transform: translateZ(-31px);}
  .rewind-button:before {height: 34px;background: #7b8494;}
  .rewind-button:after{background: rgb(177, 185, 195);}
  .rewind-button > .sides-x {background: #9ba2b1;}
  .rewind-button > .sides-z {}
  .rewind-button > .sides-x:before {width: 34px;background: linear-gradient(45deg, rgb(132, 144, 162) 0%,rgb(178, 185, 197) 100%);}
  .rewind-button > .sides-x:after {width: 34px;z-index: 1;background: linear-gradient(45deg, rgb(132, 140, 154) 0%,rgb(153, 158, 167) 100%);}
  .rewind-button > .sides-z:before {transform: translateZ(34px);background: linear-gradient(45deg, rgb(168, 176, 187) 0%,rgb(215, 221, 230) 100%);box-shadow: inset 0px 16px 7px -10px rgba(255, 255, 255, 0.98);}
  .rewind-button > .sides-z:after {height: 34px;background: #9ba2b1;z-index: 0;}
  .rewind-button .face{position: absolute;left: 0;transform: translate3d(0px,0px,34px);background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/21555/button_texture.svg);background-repeat: repeat;background-size: 4px auto !important;box-shadow: inset 0px 4px 0px 0px rgb(229, 235, 247), inset 0px 0px 0px 2px rgb(176, 185, 197);background-position: 0px -2px;}

  .controls .forward{transform: rotatey(90deg) translate3d(-28px, -64px, 24px );position: absolute;width: 43px;height: 32px;background: linear-gradient(0deg, rgb(138, 150, 169) 0%,rgb(168, 179, 193) 7%,rgb(158, 167, 179) 95%,rgb(107, 116, 131) 100%);border-radius: 4px;box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.41),inset 1px 0px 0px rgba(0, 0, 0, 0.04);bottom: 79px;}
  .controls .forward:before{content:' ';display:block;position: absolute;width: 39px;height: 30px;background: #686f7a;border-radius: 2px;box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.41),inset 1px 0px 0px rgba(0, 0, 0, 0.04);bottom: 1px;left: 2px;}
  .forward-button {top: 4px;width: 34px;height: 26px;position: absolute;z-index: 6;right: 4px;transform: translateZ(-14px);cursor: pointer;}
  .forward-button.pressed{transform: translateZ(-31px);}
  .forward-button:before {height: 34px;background: #7b8494;}
  .forward-button:after{background: rgb(177, 185, 195);}
  .forward-button > .sides-x {background: #9ba2b1;}
  .forward-button > .sides-z {}
  .forward-button > .sides-x:before {width: 34px;background: linear-gradient(45deg, rgb(132, 144, 162) 0%,rgb(178, 185, 197) 100%);}
  .forward-button > .sides-x:after {width: 34px;z-index: 1;background: linear-gradient(45deg, rgb(132, 140, 154) 0%,rgb(153, 158, 167) 100%);}
  .forward-button > .sides-z:before {transform: translateZ(34px);background: linear-gradient(45deg, rgb(168, 176, 187) 0%,rgb(215, 221, 230) 100%);box-shadow: inset 0px 16px 7px -10px rgba(255, 255, 255, 0.98);}
  .forward-button > .sides-z:after {height: 34px;background: #9ba2b1;z-index: 0;}
  .forward-button .face{position: absolute;left: 0;transform: translate3d(0px,0px,34px);background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/21555/button_texture.svg);background-repeat: repeat;background-size: 4px auto !important;box-shadow: inset 0px 4px 0px 0px rgb(229, 235, 247), inset 0px 0px 0px 2px rgb(176, 185, 197);background-position: 0px -2px;}



/* control-base-2 
------------------------ */
  .control-base-2 {bottom: 0;width: 65px;height: 337px;position: absolute;z-index: 6;right: 0px;}
  .control-base-2:before {height: 65px;background: #4b5563;}
  .control-base-2:after{background: linear-gradient(-205deg, rgb(80, 91, 108) 0%,rgb(195, 204, 217) 100%);box-shadow: inset -4px 0px 0px rgba(255, 255, 255, 0.19);width: 65px;}
  .control-base-2 > .sides-x {background: #9ba2b1;}
  .control-base-2 > .sides-z {}
  .control-base-2 > .sides-x:before {width: 56px;background: #9ba2b1;}
  .control-base-2 > .sides-x:after {width: 57px;z-index: 1;background: linear-gradient(45deg, rgb(98, 109, 125) 0%,rgb(215, 221, 230) 100%);box-shadow: inset -4px 0px 0px rgba(255, 255, 255, 0.07),inset 0px 3px 0px rgba(255, 255, 255, 0.12);}
  .control-base-2 > .sides-z:before {transform: translateZ(56px);background: #9ba2b1;z-index: 1;}
  .control-base-2 > .sides-z:after {height: 56px;background: #9ba2b1;}


/* control-base-3 
------------------------ */
  .control-base-3 {top: 0px;width: 58px;height: 520px;position: absolute;z-index: 6;right: 7px;transform: translateZ(56px);}
  .control-base-3:before {height: 56px;background: #4c5563;}
  .control-base-3:after{background: rgb(177, 185, 195);}
  .control-base-3 > .sides-x {background: #9ba2b1;}
  .control-base-3 > .sides-z {}
  .control-base-3 > .sides-x:before {width: 56px;background: #79808e;}
  .control-base-3 > .sides-x:after {width: 56px;z-index: 1;background: linear-gradient(45deg, rgb(98, 109, 125) 0%,rgb(215, 221, 230) 100%);box-shadow: inset 4px 0px 0px rgba(255, 255, 255, 0.29),inset 0px 3px 0px rgba(255, 255, 255, 0.3);}
  .control-base-3 > .sides-z:before {transform: translateZ(56px);background: linear-gradient(45deg, rgb(103, 116, 136) 0%,rgb(215, 221, 230) 100%);box-shadow: inset 0px 16px 7px -10px rgba(255, 255, 255, 0.98);}
  .control-base-3 > .sides-z:after {height: 56px;background: #9ba2b1;z-index: 0;}

  .mic{width: 36px;height: 35px;background: linear-gradient(-5deg, rgb(189, 195, 204) 0%,rgb(243, 248, 255) 100%);transform: rotatey(90deg) translate3d(-32px, 6px, 41px );list-style: none;border-radius: 5px;box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.15),1px 0px 0px rgba(0, 0, 0, 0), 0px -1px 0px rgb(255, 255, 255);position: relative;}
  .mic:before{content: 'Mic';font-family: "Idlewild A";font-weight: 600;position: absolute;letter-spacing: 0.2em;color: rgb(104, 110, 117);transform: scale(0.35);left: -12px;top: 31px;line-height: 23px;pointer-events: none;}
  .mic > ul{width: 280px;padding: 0;margin: 0;transform: scale(0.124);position: absolute;top: -286%;left: -329%;}
  .mic li{display: block;float: left;width: 24px;height: 24px;background: #aeb6c0;border-radius: 100px;margin: 0px 24px 24px 0px;box-shadow: inset 0px 7px 0px rgba(0, 0, 0, 0.18),0px 2px 0px rgb(255, 255, 255);}
  .mic li:nth-child(7),.mic li:nth-child(8),.mic li:nth-child(9),.mic li:nth-child(12),.mic li:nth-child(13),.mic li:nth-child(14),.mic li:nth-child(17),.mic li:nth-child(18),.mic li:nth-child(19){background: #383e48;box-shadow: none;}

  .stop-eject{transform: rotatey(90deg) translate3d(-26px, 23px, 42px );position: absolute;width: 32px;height: 108px;background: linear-gradient(0deg, rgb(138, 150, 169) 0%,rgb(168, 179, 193) 7%,rgb(158, 167, 179) 95%,rgb(107, 116, 131) 100%);border-radius: 4px 0px 0px 4px;box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.41),inset 1px 0px 0px rgba(0, 0, 0, 0.04);}
  .stop-eject span{font-family: "Idlewild A";font-weight: 600;position: absolute;letter-spacing: 0.06em;color: rgb(104, 110, 117);transform: scale(0.35);left: -34px;top: 101px;line-height: 23px;pointer-events: none;text-align: center;line-height: 20px;}
  .stop-eject:before{content:' ';display:block;width: 19px;height: 98px;background: #68707b;border-radius: 3px 0px 0px 3px;right: 0px;position: absolute;top: 5px;}
  .stop-eject:before{}
  .stop-eject-button {top: 7px;width: 15px;height: 93px;position: absolute;z-index: 6;right: 2px;transform: translateZ(-21px);cursor: pointer;}
  .stop-eject-button.pressed{transform: translateZ(-31px);}
  .stop-eject-button:before {height: 34px;background: #7b8494;}
  .stop-eject-button:after{background: rgb(177, 185, 195);}
  .stop-eject-button > .sides-x {background: #9ba2b1;}
  .stop-eject-button > .sides-z {}
  .stop-eject-button > .sides-x:before {width: 34px;background: linear-gradient(45deg, rgb(132, 144, 162) 0%,rgb(178, 185, 197) 100%);}
  .stop-eject-button > .sides-x:after {width: 34px;z-index: 1;background: linear-gradient(45deg, rgb(132, 140, 154) 0%,rgb(153, 158, 167) 100%);}
  .stop-eject-button > .sides-z:before {transform: translateZ(34px);background: linear-gradient(45deg, rgb(168, 176, 187) 0%,rgb(215, 221, 230) 100%);box-shadow: inset 0px 16px 7px -10px rgba(255, 255, 255, 0.98);}
  .stop-eject-button > .sides-z:after {height: 34px;background: #9ba2b1;z-index: 0;}
  .stop-eject-button .face{transform: translate3d(-15px,0px,34px);}
  .stop-eject-button .face ul{position: absolute;top: 0;bottom: 0;left: 0;right: 0;}
  .stop-eject-button .face ul:after{content:' ';display:block;width: 10px;height: 10px;background: #d2d7e0;position: absolute;left: 3px;top: 40px;box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.14), inset 0px 1px 0px rgba(255, 255, 255, 0.4);}
  .stop-eject-button .face ul li{display: block;width: 3px;border-left: 1px solid #a6b0bd;height: 100%;float: left;}

  .mini-sony{transform: rotatey(90deg) translate3d(-32px, 4px, -13px ) scale(0.22);background: rgba(0, 0, 0, 0) url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/21555/mini_sony.svg);display: block;position: absolute;width: 147px;height: 26px;bottom: 0px;background-repeat: no-repeat;}

/* control-base-4 
------------------------ */
  .control-base-4 {top: 0px;width: 58px;height: 520px;position: absolute;z-index: 6;right: 0px;transform: translateZ(55px);}
  .control-base-4:before {height: 11px;background: #4c5563;}
  .control-base-4:after{background: linear-gradient(-195deg, rgb(83, 94, 111) 0%,rgb(194, 202, 214) 100%);}
  .control-base-4 > .sides-x {background: #9ba2b1;}
  .control-base-4 > .sides-z {}
  .control-base-4 > .sides-x:before {width: 11px;background: #79808e;}
  .control-base-4 > .sides-x:after {width: 11px;z-index: 1;background: linear-gradient(45deg, rgb(98, 109, 125) 0%,rgb(215, 221, 230) 78%);box-shadow: inset 2px 0px 0px rgba(255, 255, 255, 0.2), inset 0px 2px 0px rgba(255, 255, 255, 0.3);}
  .control-base-4 > .sides-z:before {transform: translateZ(11px);background: linear-gradient(45deg, rgb(103, 114, 132) 0%,rgb(229, 236, 247) 100%);box-shadow: inset 0px 16px 7px -10px rgba(255, 255, 255, 0.98);}
  .control-base-4 > .sides-z:after {height: 11px;background: #9ba2b1;z-index: 0;}

  .control-base-4 > .decals{transform: rotatey(90deg) translate3d(-6px,0px,53px);width: 11px;height: 190px;background: rgba(255, 0, 0, 0);position: absolute;}
  .control-base-4 > .decals span{display: block;transform: scale(0.15) translatex(0px) translatex(-11px);position: absolute;left: -12px;}
  .control-base-4 > .decals span:before{content:' ';display:block;border-bottom: 30px solid #414750;border-left: 20px solid transparent;border-right: 20px solid transparent;width: 40px;}
  .control-base-4 > .decals span:after{content:' ';display:block;border-bottom: 30px solid #414750;border-left: 20px solid transparent;border-right: 20px solid transparent;width: 40px;}
  .control-base-4 .decal-play{bottom: 20px;}
  .control-base-4 .decal-play:after{opacity:0;}
  .control-base-4 .decal-rewind{top: 40px;}
  .control-base-4 > .decals span.decal-rewind:before,.control-base-4 > .decals span.decal-rewind:after{border-bottom: 0px;border-top: 30px solid #414750;}
  .control-base-4 .decal-forward{top: -5px;}

/* Tape */

  .tape-only .walkman-top, .tape-only .walkman-base, .tape-only .walkman-bay, .tape-only .walkman-cover,.tape-only .walkman-foot,.tape-only .controls{display:none;}

  .tape{width: 268px;height: 420px;/* display: none; */position: absolute;background-position: 0px -8px;transform: translate3d(2px,9px,79px) rotatey(0deg);cursor: pointer;will-change: transform;backface-visibility: visible;}
  .right-view .tape{pointer-events:none;opacity:0.2;}
  .tape-in.right-view .tape{pointer-events:all;opacity:1;}
  .eject .tape{transform: translate3d(2px,9px,95px) rotatey(-6deg);}
  .tape.ejected{transform: translate3d(341px,20px,220px) rotatey(-35deg) rotatex(0deg) scale(0.8);}
  .tape:before,.tape:after,.tape *,.tape *:before,.tape *:after{backface-visibility:visible;}
  .tape:before{height:26px;background-color: rgb(66, 65, 76);}
  .tape:after{-webkit-mask-image:url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/21555/tape-mask.svg);background-color: rgb(39, 37, 49);}
  .tape .sides-x {background: transparent;}
  .tape .sides-z {}
  .tape .sides-x:before {width: 26px;background-color: rgb(66, 65, 76);backface-visibility: visible;}
  .tape .sides-x:after {width: 26px;background-color: rgba(255, 0, 0, 0);}
  .tape .sides-z:before {-webkit-mask-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/21555/tape-mask.svg);background-color: rgb(56, 55, 64);transform: translateZ(26px);}
  .tape .sides-z:after {height: 26px;background-color: rgb(66, 65, 76);}

  .reel-1{transform: translate3d(95px,92px,24px);position: relative;width: 74px;height: 74px;position: absolute;top: -9px;left: -9px;backface-visibility: visible;will-change: transform;}
  .reel-2{transform: translate3d(95px,92px,24px);position: relative;width: 74px;height: 74px;position: absolute;top: 171px;left: -9px;backface-visibility: visible;will-change: transform;}
  .reel-top{}
  .reel.reel-bottom{transform: translate3d(0px,0px,-22px);}
  .reel{width: 74px;height: 74px;background: rgba(255, 255, 255, 0);list-style: none;border: 16px solid white;border-radius: 100px;transform: translate3d(0px,0px,0px);position: absolute;top: 0;backface-visibility: visible;}
  .reel li{display: block;width: 5px;height: 9px;background: #fffbfb;position: absolute;}
  .reel li:nth-child(1){transform: translate3d(0px,0px,0px) rotatez(0deg);position: absolute;top: -6px;left: 18px;}
  .reel li:nth-child(2){transform: translate3d(34px,1px,0px) rotatez(45deg);}
  .reel li:nth-child(3){transform: translate3d(40px,16px,0px) rotatez(90deg);}
  .reel li:nth-child(4){transform: translate3d(35px,31px,0px) rotatez(135deg);}
  .reel li:nth-child(5){transform: translate3d(19px,38px,0px) rotatez(180deg);}
  .reel li:nth-child(6){transform: translate3d(3px,32px,0px) rotatez(225deg);}
  .reel li:nth-child(7){transform: translate3d(-3px,16px,0px) rotatez(270deg);}
  .reel li:nth-child(8){transform: translate3d(3px,1px,0px) rotatez(315deg);}

  .reel-mid{width: 160px;background: #533939;height: 160px;border-radius: 1000px;transform: translate3d(-50%,-50%,-1px);position: absolute;top: 50%;left: 50%;-webkit-mask-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/21555/reel-mask.svg);-webkit-mask-size: 290px;-webkit-mask-position: center;-webkit-mask-repeat: no-repeat;}
  .reel-mid:before{content: ' ';width: 160px;background: #2b2b2b;height: 160px;border-radius: 1000px;transform: translate3d(-50%,-50%,-19px);position: absolute;top: 50%;left: 50%;}

  .tape-bottom{transform: translate3d(24px,0px,25px) rotatey(90deg);width: 25px;background: rgba(255, 0, 0, 0);height: 100%;position: absolute;right: 0px;top: 0px;transform-origin: 0;}
  .tape-bottom:before{content:' ';display: block;background: #2f2d39;width: 100%;height: 77px;position: absolute;z-index: 1;}
  .tape-bottom:after{content: ' ';display: block;background: #2f2d39;width: 100%;height: 77px;position: absolute;bottom: 0;}
  .tape-bottom .tape-film{display: block;background: #4e3333;height: 100%;width: 12px;position: absolute;left: 5px;top: 0px;}
  .tape-bottom div{position: absolute;background: rgba(0, 0, 0, 0);width: 100%;height: 61px;border-top: 20px solid #2f2d39;border-bottom: 20px solid #2f2d39;}
  .tape-bottom div:first-of-type{top: 121px;}
  .tape-bottom div:last-of-type{top: 238px;}
  
  /* Anim- Tape playing */
  .tape-in.playing .reel-1, .tape-in.playing .reel-2{
    animation: reel-playing 2.5s linear infinite;
  }
  @keyframes reel-playing {
    0% {
      transform: translate3d(95px,92px,24px) rotateX(0deg) rotateY(0deg) rotateZ(360deg);
    }
    100% {
      transform: translate3d(95px,92px,24px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
  }
  /* Anim- Tape rewinding */
  .tape-in.rewind .reel-1,.tape-in.rewind .reel-2{
    animation: reel-playing 0.25s linear infinite;
  }
  @keyframes reel-playing {
    0% {
      transform: translate3d(95px,92px,24px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
    100% {
      transform: translate3d(95px,92px,24px) rotateX(0deg) rotateY(0deg) rotateZ(360deg);
    }
  }
  /* Anim- Tape forward */
  .tape-in.forward .reel-1,.tape-in.forward .reel-2{
    animation: reel-playing 0.25s linear infinite;
  }
  @keyframes reel-playing {
    0% {
      transform: translate3d(95px,92px,24px) rotateX(0deg) rotateY(0deg) rotateZ(360deg);
    }
    100% {
      transform: translate3d(95px,92px,24px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
  }
/* Anim- Tape Denied */
.tape-denied.tape{
    animation: denied 1s ease ;
  }
  @keyframes denied {
    0%, 100% {
      transform: translate3d(341px,20px,220px) rotatey(-35deg) rotatex(0deg) scale(0.8);
    }
    
    50% {
          transform: translate3d(151px,20px,160px) rotatey(-25deg) rotatex(0deg) scale(0.9);
    }
  }


  </style>
</head>
<body>

	<div class="walkman closed swivel tape-in">

	<!--  Top -->		
		<div class="cube walkman-top">
			<div class="sides-x"></div>
			<div class="sides-z"></div>
			<div class="cube hot-line transition-03">
				<div class="sides-x"></div>
				<div class="sides-z"></div>
			</div><!-- .walkman-top -->	
			<div class="headphone-inputs">
				<span><span></span></span>
				<span><span></span></span>
			</div><!-- .headphone-inputs -->
			<div class="operation transition-03"></div><!-- .operation -->
		</div><!-- .walkman-top -->

	<!--  Base -->
		<div class="cube walkman-base">
			<div class="sides-x"></div>
			<div class="sides-z"></div>
			<div class="swing-arm"></div>
			<div class="base-decals">
				<p>STEREO</p>
			</div>
		</div><!-- .walkman-base -->

	<!--  Foot -->
		<div class="cube walkman-foot">
			<div class="sides-x"></div>
			<div class="sides-z"></div>
			<div class="foot-decals">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<span class="screws">
					<span class="screw sc-1"></span>
					<span class="screw sc-2"></span>
					<span class="screw sc-3"></span>			
				</span>	
				<div class="tone">
					<div class="tone-switch">
						<ul>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
						</ul>
					</div>
					<span>High<br/>Low</span>
				</div>
			</div>
			<span class="hover-helpers transition-05"></span>
		</div><!-- .walkman-foot -->

		
	<!--  Bay -->
		<div class="walkman-bay">
			<div class="guides-heads">
				<div class="guide"></div>
				<div class="guide"></div>
				<div class="guide"></div>
				<div class="guide"></div>
			</div><!-- .guides-heads -->
			<div class="spooler-plates">
				<div class="plate"></div>
				<div class="spooler-plate"></div>
				<div class="spooler-plate"></div>
			</div><!-- .tape-spoolers -->

			<div class="shape cylinder guide-spool guide1">
			  <div class="face bm">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.0666667);"></div>
			  </div>
			  <div class="face tp">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.0666667);"></div>
			  </div>
			  <div class="face side s0">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.14902);"></div>
			  </div>
			  <div class="face side s1">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.337255);"></div>
			  </div>
			  <div class="face side s2">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.513726);"></div>
			  </div>
			  <div class="face side s3">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.584314);"></div>
			  </div>
			  <div class="face side s4">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.45098);"></div>
			  </div>
			  <div class="face side s5">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.262745);"></div>
			  </div>
			  <div class="face side s6">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.0823529);"></div>
			  </div>
			  <div class="face side s7">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.0117647);"></div>
			  </div>
			</div>
			<div class="shape cylinder guide-spool guide2">
			  <div class="face bm">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.0666667);"></div>
			  </div>
			  <div class="face tp">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.0666667);"></div>
			  </div>
			  <div class="face side s0">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.14902);"></div>
			  </div>
			  <div class="face side s1">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.337255);"></div>
			  </div>
			  <div class="face side s2">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.513726);"></div>
			  </div>
			  <div class="face side s3">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.584314);"></div>
			  </div>
			  <div class="face side s4">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.45098);"></div>
			  </div>
			  <div class="face side s5">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.262745);"></div>
			  </div>
			  <div class="face side s6">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.0823529);"></div>
			  </div>
			  <div class="face side s7">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.0117647);"></div>
			  </div>
			</div>
			<div class="shape cylinder guide-spool guide3">
			  <div class="face bm">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.0666667);"></div>
			  </div>
			  <div class="face tp">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.0666667);"></div>
			  </div>
			  <div class="face side s0">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.14902);"></div>
			  </div>
			  <div class="face side s1">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.337255);"></div>
			  </div>
			  <div class="face side s2">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.513726);"></div>
			  </div>
			  <div class="face side s3">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.584314);"></div>
			  </div>
			  <div class="face side s4">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.45098);"></div>
			  </div>
			  <div class="face side s5">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.262745);"></div>
			  </div>
			  <div class="face side s6">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.0823529);"></div>
			  </div>
			  <div class="face side s7">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.0117647);"></div>
			  </div>
			</div>
			<div class="shape cylinder guide-spool guide4">
			  <div class="face bm">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.0666667);"></div>
			  </div>
			  <div class="face tp">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.0666667);"></div>
			  </div>
			  <div class="face side s0">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.14902);"></div>
			  </div>
			  <div class="face side s1">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.337255);"></div>
			  </div>
			  <div class="face side s2">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.513726);"></div>
			  </div>
			  <div class="face side s3">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.584314);"></div>
			  </div>
			  <div class="face side s4">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.45098);"></div>
			  </div>
			  <div class="face side s5">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.262745);"></div>
			  </div>
			  <div class="face side s6">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.0823529);"></div>
			  </div>
			  <div class="face side s7">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.0117647);"></div>
			  </div>
			</div>
			<div class="shape cylinder tape-spool tape-spool-1">
			  <div class="face bm">
			    <div class="shader" style="background-color: rgba(255, 255, 255, 0.0666667);"></div>
			  </div>
			  <div class="face tp">
			    <div class="shader" style="background-color: rgba(255, 255, 255, 0.0666667);"></div>
			    <div class="direction-decal">
			    	<span></span><span></span><span></span>
			    </div><!-- .direction-decal -->
			  </div>
			  <div class="face side s0">
			    <div class="shader" style="background-color: rgba(255, 255, 255, 0.14902);"></div>
			  </div>
			  <div class="face side s1">
			    <div class="shader" style="background-color: rgba(255, 255, 255, 0.337255);"></div>
			  </div>
			  <div class="face side s2">
			    <div class="shader" style="background-color: rgba(255, 255, 255, 0.513726);"></div>
			  </div>
			  <div class="face side s3">
			    <div class="shader" style="background-color: rgba(255, 255, 255, 0.584314);"></div>
			  </div>
			  <div class="face side s4">
			    <div class="shader" style="background-color: rgba(255, 255, 255, 0.45098);"></div>
			  </div>
			  <div class="face side s5">
			    <div class="shader" style="background-color: rgba(255, 255, 255, 0.262745);"></div>
			  </div>
			  <div class="face side s6">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.0823529);"></div>
			  </div>
			  <div class="face side s7">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.0117647);"></div>
			  </div>
			</div>
			<div class="shape cylinder tape-spool tape-spool-2">
			  <div class="face bm">
			    <div class="shader" style="background-color: rgba(255, 255, 255, 0.0666667);"></div>
			  </div>
			  <div class="face tp">
			    <div class="shader" style="background-color: rgba(255, 255, 255, 0.0666667);"></div>
			    <div class="direction-decal">
			    	<span></span><span></span><span></span>
			    </div><!-- .direction-decal -->
			  </div>
			  <div class="face side s0">
			    <div class="shader" style="background-color: rgba(255, 255, 255, 0.14902);"></div>
			  </div>
			  <div class="face side s1">
			    <div class="shader" style="background-color: rgba(255, 255, 255, 0.337255);"></div>
			  </div>
			  <div class="face side s2">
			    <div class="shader" style="background-color: rgba(255, 255, 255, 0.513726);"></div>
			  </div>
			  <div class="face side s3">
			    <div class="shader" style="background-color: rgba(255, 255, 255, 0.584314);"></div>
			  </div>
			  <div class="face side s4">
			    <div class="shader" style="background-color: rgba(255, 255, 255, 0.45098);"></div>
			  </div>
			  <div class="face side s5">
			    <div class="shader" style="background-color: rgba(255, 255, 255, 0.262745);"></div>
			  </div>
			  <div class="face side s6">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.0823529);"></div>
			  </div>
			  <div class="face side s7">
			    <div class="shader" style="background-color: rgba(0, 0, 0, 0.0117647);"></div>
			  </div>
			</div>


		</div><!-- .walkman-bay -->

		

	<!--  Cover -->
		<div class="cube transition-05 walkman-cover closed">
			<div class="sides-x">
				<span></span>
			</div>
			<div class="sides-z"></div>
			<div class="window"></div>
		</div><!-- .walkman-cover -->



	<!--  Side Controls -->	
		<div class="controls">
			<div class="cube control-base-1">
				<div class="sides-x"></div>
				<div class="sides-z"></div>

				<div class="play">
					<div class="cube play-button transition-03">
						<div class="sides-x"></div>
						<div class="sides-z"></div>
						<div class="face"></div>
					</div><!-- .play-button -->
				</div>

				<div class="rewind">
					<div class="cube rewind-button transition-03">
						<div class="sides-x"></div>
						<div class="sides-z"></div>
						<div class="face"></div>
					</div><!-- .play-button -->
				</div>

				<div class="forward">
					<div class="cube forward-button transition-03">
						<div class="sides-x"></div>
						<div class="sides-z"></div>
						<div class="face"></div>
					</div><!-- .play-button -->
				</div>

			</div><!-- .control-base-1 -->

			<div class="cube control-base-2">
				<div class="sides-x"></div>
				<div class="sides-z"></div>
			</div><!-- .control-base-2 -->

			<div class="cube control-base-3">
				<div class="sides-x"></div>
				<div class="sides-z"></div>
				<div class="mic">
					<ul>
						<li></li><li></li><li></li><li></li><li></li>
						<li></li><li></li><li></li><li></li><li></li>
						<li></li><li></li><li></li><li></li><li></li>
						<li></li><li></li><li></li><li></li><li></li>
						<li></li><li></li><li></li><li></li><li></li>
					</ul>
				</div><!-- .mic -->
				<div class="stop-eject">
					<div class="cube stop-eject-button transition-03">
						<div class="sides-x"></div>
						<div class="sides-z"></div>
						<div class="face">
							<ul>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
							</ul>
						</div><!-- .face -->
					</div><!-- .stop-eject-button -->	
					<span>Stop<br>Eject</span>
				</div><!-- .stop-eject -->
				<span class="mini-sony"></span>

			</div><!-- .control-base-3 -->

			<div class="cube control-base-4">
				<div class="sides-x"></div>
				<div class="sides-z"></div>
				<div class="decals">
					<span class="decal-play"></span>
					<span class="decal-rewind"></span>
					<span class="decal-forward"></span>
				</div>
			</div><!-- .control-base-4 -->
		</div>

	<!--  Tape -->	
		<div class="tape cube transition-05 ">
			<div class="sides-x"></div>
			<div class="sides-z"></div>

			<div class="reel-1">
				<ul class="reel reel-top">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
				<div class="reel-mid"></div>
				<ul class="reel reel-bottom">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div><!-- .reel-1 -->

			<div class="reel-2">
				<ul class="reel reel-top">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
				<div class="reel-mid"></div>
				<ul class="reel reel-bottom">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div><!-- .reel-1 -->

			<div class="tape-bottom">
				<span class="tape-film"></span>
				<div></div>
				<div></div>
			</div><!-- .tape-bottom -->

		</div><!-- .tape -->




	</div><!-- .walkman -->

	<div class="noise"></div>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
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
  </script>
  <script>
// Jquery used only for changing classes and playing sound effects. It is pure noob and will give you eye cancer. You have been warned. ^-^

/* Drag functionality */
    let isDragging = false;
    let startX, startY, initialX, initialY;
    let currentX = 0, currentY = 0;
    
    const walkman = $('.walkman');
    const walkmanContainer = $('body');
    
    walkman.on('mousedown touchstart', function(e) {
      // Don't drag if clicking on interactive elements
      if ($(e.target).closest('.play-button, .rewind-button, .forward-button, .stop-eject-button, .hot-line, .tone-switch, .walkman-cover, .tape, .play, .rewind, .forward, .stop-eject').length) {
        return;
      }
      
      isDragging = true;
      e.preventDefault();
      e.stopPropagation();
      
      const touch = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
      startX = touch.clientX;
      startY = touch.clientY;
      
      // Get current position from computed style
      const rect = walkman[0].getBoundingClientRect();
      initialX = currentX;
      initialY = currentY;
      
      walkman.css('transition', 'none');
      walkman.addClass('dragging');
    });
    
    $(document).on('mousemove touchmove', function(e) {
      if (!isDragging) return;
      e.preventDefault();
      
      const touch = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      
      currentX = initialX + deltaX;
      currentY = initialY + deltaY;
      
      // Apply translation by modifying the existing transform
      walkman.css('transform', function(i, val) {
        // Remove any existing translate() with px values and add our new one
        const cleaned = val.replace(/translate\([^)]*px[^)]*\)/g, '').trim();
        return cleaned + ' translate(' + currentX + 'px, ' + currentY + 'px)';
      });
    });
    
    $(document).on('mouseup touchend', function() {
      if (isDragging) {
        isDragging = false;
        walkman.css('transition', 'all 1s');
        walkman.removeClass('dragging');
      }
    });

/* hover viewing angles */
  $('.walkman-top').hover(
    function(){ $('.walkman').addClass('top-view') },
    function(){ $('.walkman').removeClass('top-view') }
  ) 
  $('.controls').hover(
    function(){ $('.walkman').addClass('right-view') },
    function(){ $('.walkman').removeClass('right-view') }
  )
  $('.walkman-foot').hover(
    function(){ $('.walkman').addClass('left-view') },
    function(){ $('.walkman').removeClass('left-view') }
  ) 




/* Walkman functions */

    $('body').append('<audio id="audio-click"><source src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21555/tape_deck.mp3" type="audio/mpeg"></audio>');
    $('body').append('<audio id="audio-switch"><source src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21555/jukebox.mp3" type="audio/mpeg"></audio>');
    $('body').append('<audio id="audio-open-close"><source src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21555/tape_deck2.mp3" type="audio/mpeg"></audio>');

    //Hotline
    $('.hot-line').click(function(){
      $('.walkman').toggleClass('hotline-active');
      $("#audio-click").trigger('play');
    });
   
    //Tone switch
    $('.tone-switch').click(function(){
      $('.walkman').toggleClass('tone-switch-active');
      $("#audio-switch").trigger('play');
    });


    // Play
    $('.play-button').click(function(){
      if($(this).hasClass('pressed')){

      }
      else{
        $('.walkman').removeClass('stop eject rewind forward');
        $('.rewind-button').removeClass('pressed');
        $('.forward-button').removeClass('pressed');
        $('.walkman').toggleClass('playing');
        $("#audio-click").trigger('play');
        $(this).addClass('pressed');
      }
      
    }); 

    // Rewind
    $('.rewind-button').click(function(){
      if($(this).hasClass('pressed')){

      }
      else{
        $('.walkman').removeClass('stop eject playing forward');
        $('.play-button').removeClass('pressed');
        $('.forward-button').removeClass('pressed');
        $('.walkman').toggleClass('rewind');
        $("#audio-click").trigger('play');
        $(this).addClass('pressed');
      }
      
    });    

    // FFoward
    $('.forward-button').click(function(){
      if($(this).hasClass('pressed')){

      }
      else{
        $('.walkman').removeClass('stop eject playing rewind');
        $('.play-button').removeClass('pressed');
        $('.rewind-button').removeClass('pressed');        
        $('.walkman').toggleClass('forward');
        $("#audio-click").trigger('play');
        $(this).addClass('pressed');
      }
      
    });    


    // Stop / eject
    $('.stop-eject-button').click(function(){
      if($('.walkman').hasClass('eject')) {
        $('.walkman').removeClass('eject');
        $("#audio-click").trigger('play');
        $('.stop-eject-button').addClass('pressed');
        setTimeout(function () { 
            $('.stop-eject-button').removeClass('pressed');
        }, 250);
      }
      else if($('.walkman').hasClass('stop')) {
       $('.walkman').removeClass('stop'); 
        $('.walkman').addClass('eject');
        $("#audio-click").trigger('play');
        $('.stop-eject-button').addClass('pressed');
        setTimeout(function () { 
            $('.stop-eject-button').removeClass('pressed');
        }, 250);
      } 
      else if($('.walkman').hasClass('playing')) {
        $('.walkman').removeClass('eject playing rewind forward');
        $('.walkman').addClass('stop');
        $('.play-button').removeClass('pressed')
        $("#audio-click").trigger('play');
        $('.stop-eject-button').addClass('pressed');
        setTimeout(function () { 
            $('.stop-eject-button').removeClass('pressed');
        }, 250);
      }
      else if($('.walkman').hasClass('rewind')) {
        $('.walkman').removeClass('eject playing rewind forward');
        $('.walkman').addClass('stop');
        $('.rewind-button').removeClass('pressed')
        $("#audio-click").trigger('play');
        $('.stop-eject-button').addClass('pressed');
        setTimeout(function () { 
            $('.stop-eject-button').removeClass('pressed');
        }, 250);
      } 
      else if($('.walkman').hasClass('forward')) {
        $('.walkman').removeClass('eject playing rewind forward');
        $('.walkman').addClass('stop');
        $('.forward-button').removeClass('pressed')
        $("#audio-click").trigger('play');
        $('.stop-eject-button').addClass('pressed');
        setTimeout(function () { 
            $('.stop-eject-button').removeClass('pressed');
        }, 250);
      } 
      else if($('.walkman').not('.stop, .playing')) {
        $('.walkman').addClass('eject');
        $("#audio-click").trigger('play');
        $('.stop-eject-button').addClass('pressed');
        setTimeout(function () { 
            $('.stop-eject-button').removeClass('pressed');
        }, 250);
      } 
      else {
      }
      
    });

    
    
    // Open Cassette bay
      $('.walkman-cover').click(function(){
        $('.walkman-cover').toggleClass('closed');
        $('.walkman').removeClass('eject');
        $('.walkman').toggleClass('closed');
        $('.walkman').toggleClass('cover-open');
        $("#audio-open-close").trigger('play');
      });

    // Click tape
      $('.tape').not('.playing .tape').click(function(){
         if($('.walkman').hasClass('closed')) {
            $(this).addClass('tape-denied');
            setTimeout(function () { 
                $('.tape').removeClass('tape-denied');
            }, 2000);
         }
         else{
            $('.walkman').toggleClass('tape-in');
            $(this).toggleClass('ejected');  
         }
        
      });
  </script>
</body>
</html>
`;
};

export default getWalkmanHTML();
