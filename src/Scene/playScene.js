import Phaser from "phaser";
import { createBackground } from "../base/base";
import Player from "../Character/Player";
import { Direction } from "../Character/Player";

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: "PlayScene" });
  }

  preload() {
    // 배경 로드
    this.load.image("Background_Image", "./Asset/Space.png");

    // 플레이어 스프라이트시트 로드, 각 장당 32*32 사이즈로 자름
    this.load.spritesheet("Player", "./Asset/Ship.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    // background 생성
    createBackground(this);

    // 키 할당
    this.assignKeys();

    // 캐릭터 생성
    this.player = new Player(this);
  }

  update() {
    this.bg.tilePositionY -= 2; // 숫자 2는 스크롤 속도를 조절.

    // 애니메이션 관리
    // this.handlePlayerAnimations();

    // 움직임 관린
    this.handlePlayerMove();
  }

  assignKeys() {
    // 사용할 키를 변수에 할당
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    this.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
  }

  handlePlayerAnimations() {
    // 키 입력 로직
    if (this.keyW.isDown) {
      console.log("Key W");
    } else if (this.keyS.isDown) {
      console.log("Key S");
    } else if (
      this.keyA.isDown &&
      this.player.anims.currentAnim.key !== "Left"
    ) {
      this.player.play("Left");
    } else if (
      this.keyD.isDown &&
      this.player.anims.currentAnim.key !== "Right"
    ) {
      this.player.play("Right");
    } else if (
      !this.keyA.isDown &&
      !this.keyD.isDown &&
      !this.keyJ.isDown &&
      !this.keyK.isDown &&
      this.player.anims.currentAnim.key !== "Idle"
    ) {
      this.player.play("Idle");
    }

    if (this.keyJ.isDown && this.player.anims.currentAnim.key !== "Die") {
      this.player.play("Die");
    } else if (
      this.keyK.isDown &&
      this.player.anims.currentAnim.key !== "Clear"
    ) {
      this.player.play("Clear");
    }
  }

  handlePlayerMove() {
    if (this.keyA.isDown) {
      this.player.move(Direction.Left);
    } else if (this.keyD.isDown) {
      this.player.move(Direction.Right);
    }

    if (this.keyW.isDown) {
      this.player.move(Direction.Up);
    } else if (this.keyS.isDown) {
      this.player.move(Direction.Down);
    }
  }
}
