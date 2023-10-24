import Phaser from "phaser";
import TitleScene from "./title.js";
import PlayScene from "./play.js";

// Webpack에서 이미지를 참조할 수 있게 import 해준다.
import Background_Image from "../Asset/background/Space.png";

const config = {
  type: Phaser.AUTO, // WebGL if available, otherwise Canvas
  width: 800,
  height: 700,
  scene: TitleScene, // 여기에 Scene 배열을 추가
  autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY,
};

const game = new Phaser.Game(config);
