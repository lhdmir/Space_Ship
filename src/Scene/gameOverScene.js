import Phaser from "phaser";

import { createBackground } from "../base/base";

export default class gameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "gameOverScene" });
  }

  preload() {
    this.load.image("Background_Image", "./Asset/Space.png");
  }

  create() {
    this.score = this.game.registry.get("score");

    createBackground(this);

    this.createGameOverText();
    this.createRestartText();
    this.createScoreText();

    this.keyEnter = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
  }

  update() {
    this.bg.tilePositionY -= 2; // 숫자 2는 스크롤 속도를 조절.

    if (this.keyEnter.isDown) {
      this.blinkingTween.restart();
    }
  }

  createGameOverText() {
    let gameOverText = this.add
      .text(400, 250, "Game Over", {
        fontFamily: "NeoDunggeunmo Code",
        fontSize: "120px",
        color: "#990000",
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: gameOverText, // 애니메이션을 적용할 대상
      alpha: { start: 0, to: 1 }, // 시작과 끝의 투명도 값. 1은 완전 불투명, 0은 완전 투명
      duration: 5000, // 애니메이션의 지속 시간 (밀리초)
      ease: "Linear", // 가속도 함수. 여기서는 일정한 속도로 변환
      repeat: 0, // 무한히 반복. 0을 설정하면 반복하지 않음
    });
  }

  createRestartText() {
    let restartText = this.add
      .text(400, 500, "Press the Enter key to Title", {
        fontFamily: "NeoDunggeunmo Code",
        fontSize: "28px",
        color: "#fff",
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: restartText, // 애니메이션을 적용할 대상
      alpha: { start: 0, to: 1 }, // 시작과 끝의 투명도 값. 1은 완전 불투명, 0은 완전 투명
      duration: 5000, // 애니메이션의 지속 시간 (밀리초)
      ease: "Linear", // 가속도 함수. 여기서는 일정한 속도로 변환
      repeat: -1, // 무한히 반복. 0을 설정하면 반복하지 않음
      yoyo: true,
    });

    this.blinkingTween = this.tweens.create({
      targets: restartText,
      alpha: { from: 1, to: 0 },
      duration: 100,
      ease: "Linear",
      repeat: 2, // 총 2번 실행(기본 1 + 추가 1)
      yoyo: true,
      onComplete: () => {
        this.scene.start("TitleScene");
      },
    });
  }

  createScoreText() {
    let scoreText = this.add
      .text(400, 400, "Score : " + this.score, {
        fontFamily: "NeoDunggeunmo Code",
        fontSize: "28px",
        color: "#fff",
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: scoreText, // 애니메이션을 적용할 대상
      alpha: { start: 0, to: 1 }, // 시작과 끝의 투명도 값. 1은 완전 불투명, 0은 완전 투명
      duration: 5000, // 애니메이션의 지속 시간 (밀리초)
      ease: "Linear", // 가속도 함수. 여기서는 일정한 속도로 변환
      repeat: -1, // 무한히 반복. 0을 설정하면 반복하지 않음
      yoyo: true,
    });
  }
}
