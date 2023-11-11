import Phaser from "phaser";
import TitleScene from "./Scene/titleScene.js";
import Stage1 from "./Scene/stage1.js";
import Stage2 from "./Scene/stage2.js";
import gameOverScene from "./Scene/gameOverScene.js";

// Webpack에서 이미지를 참조할 수 있게 import 해준다.
import Background_Image from "../Asset/background/Space.png";
import Player_Image from "../Asset/Player/Ship.png";
import Bullet_Image from "../Asset/Player/Bullet.png";
import Enemies_Image from "../Asset/Enemy/Enemies.png";
import Enemies_Explosion_Image from "../Asset/Enemy/Enemy_Explosion.png";
import Boss_1_Image from "../Asset/Enemy/Boss_1.png";
import Boss_2_Image from "../Asset/Enemy/Boss_2.png";
import Boss_Explosions_Image from "../Asset/Enemy/Boss_Explosions.png";

const config = {
  type: Phaser.AUTO, // WebGL if available, otherwise Canvas
  width: 800,
  height: 700,
  scene: [TitleScene, gameOverScene, Stage1, Stage2], // 여기에 Scene 배열을 추가
  autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY,
  pixelArt: true,
  // rendererConfig: {
  //   antialias: false,
  // },
  physics: {
    default: "arcade", // arcade라는 물리 엔진을 사용할 것임
  },
  fps: {
    target: 60, // 여기서 원하는 최대 프레임 수를 설정하세요
    forceSetTimeOut: true,
  },
};

const game = new Phaser.Game(config);
