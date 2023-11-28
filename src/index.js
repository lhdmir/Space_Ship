import Phaser from "phaser";
import TitleScene from "./Scene/titleScene.js";
import Stage1 from "./Stage/stage1.js";
import Stage2 from "./Stage/stage2.js";
import Stage3 from "./Stage/stage3.js";
import Stage4 from "./Stage/stage4.js";
import gameOverScene from "./Scene/gameOverScene.js";
import gameClearScene from "./Scene/gameClearScene.js";

// Font
import Default_Font_woff2 from "./Asset/Font/neodgm.woff2";

const config = {
  type: Phaser.AUTO, // WebGL if available, otherwise Canvas
  width: 800,
  height: 750,
  scene: [
    TitleScene,
    gameOverScene,
    gameClearScene,
    Stage1,
    Stage2,
    Stage3,
    Stage4,
  ], // 여기에 Scene 배열을 추가
  autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY, // 게임화면을 center에 맞춤
  pixelArt: true,
  physics: {
    default: "arcade", // arcade라는 물리 엔진을 사용할 것임
  },
  fps: {
    target: 60, // 여기서 원하는 최대 프레임 수를 설정
    forceSetTimeOut: true,
  },
};

const game = new Phaser.Game(config);
