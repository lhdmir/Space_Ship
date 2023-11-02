import Phaser from "phaser";
import TitleScene from "./Scene/titleScene.js";
import PlayScene from "./Scene/stage1.js";

// Webpack에서 이미지를 참조할 수 있게 import 해준다.
import Background_Image from "../Asset/background/Space.png";
import Player_Image from "../Asset/Player/Ship.png";
import Bullet_Image from "../Asset/Player/Bullet.png";
import Enemies_Image from "../Asset/Enemy/Enemies.png";
import Enemies_Explosion_Image from "../Asset/Enemy/Enemy_Explosion.png";
import Boss_1_Image from "../Asset/Enemy/Boss_1.png";
import Boss_2_Image from "../Asset/Enemy/Boss_2.png";
import Boss_Explosions_Image from "../Asset/Enemy/Boss_Explosions.png";
import Stage1 from "./Scene/stage1.js";

const config = {
  type: Phaser.AUTO, // WebGL if available, otherwise Canvas
  width: 800,
  height: 700,
  scene: [TitleScene, Stage1], // 여기에 Scene 배열을 추가
  autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY,
  pixelArt: true,
  // rendererConfig: {
  //   antialias: false,
  // },
  physics: {
    default: "arcade", // arcade라는 물리 엔진을 사용할 것임
  },
};

const game = new Phaser.Game(config);
