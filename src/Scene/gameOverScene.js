import Phaser from "phaser";

import { createBackground } from "../base/baseModule";

import {
  createGameMainText,
  createRestartText,
  createScoreText,
} from "../base/text";

export default class gameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "gameOverScene" });
  }

  preload() {
    this.load.image("Background_Image", "./Asset/Space.png");
  }

  create() {
    this.score = this.game.registry.get("score");

    this.keyEnter = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    createBackground(this);

    createGameMainText(this, "Game Over", "#990000");
    createRestartText(this);
    createScoreText(this);
  }

  update() {
    this.bg.tilePositionY -= 2; // 숫자 2는 스크롤 속도를 조절.

    if (this.keyEnter.isDown) {
      this.blinkingTween.restart();
    }
  }
}
