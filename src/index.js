import Phaser from "phaser";
import TitleScene from "./Scene/titleScene.js";
import Stage1 from "./Stage/stage1.js";
import Stage2 from "./Stage/stage2.js";
import Stage3 from "./Stage/stage3.js";
import gameOverScene from "./Scene/gameOverScene.js";
import gameClearScene from "./Scene/gameClearScene.js";

// Webpack에서 이미지를 참조할 수 있게 import 해준다.
// Font
import Default_Font_woff2 from "../Asset/font/neodgm.woff2";

// Background Image
import Background_Image from "../Asset/background/Space.png";
// Player Image
import Player_Image from "../Asset/Player/Ship.png";
import Bullet_Image from "../Asset/Player/Bullet.png";
// Enemies Image
import Enemies_Image from "../Asset/Enemy/Enemies.png";
import Enemies_Explosion_Image from "../Asset/Enemy/Enemy_Explosion.png";
// Boss Image
import Boss_Image from "../Asset/Enemy/Boss_2.png";
import Boss_Bullet_Image from "../Asset/Enemy/Boss_Bullet.png";
import Boss_Explosion_Image from "../Asset/Enemy/Boss_Explosion.png";

const config = {
  type: Phaser.AUTO, // WebGL if available, otherwise Canvas
  width: 800,
  height: 750,
  scene: [TitleScene, gameOverScene, gameClearScene, Stage1, Stage2, Stage3], // 여기에 Scene 배열을 추가
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
