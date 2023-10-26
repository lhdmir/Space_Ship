import Phaser from "phaser";
import { createBackground } from "./base";

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
    // Player 애니메이션 생성
    this.createPlayerAnimations();
    // 캐릭터 생성
    this.spawnPlayer();
  }

  update() {
    this.bg.tilePositionY -= 2; // 숫자 2는 스크롤 속도를 조절.
    // 키 입력 로직
    this.inputKey();
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
  createPlayerAnimations() {
    // 애니메이션 생성
    this.anims.create({
      // 애니메이션 이름
      key: "Idle",
      // Player라는 스프라이트를 가지고와서 0번째부터 3번째까지 재생
      frames: this.anims.generateFrameNumbers("Player", { start: 0, end: 3 }),
      // 초당 프레임 재생수
      frameRate: 10,
      // 무한반복
      repeat: -1,
    });
    this.anims.create({
      key: "Right",
      frames: this.anims.generateFrameNumbers("Player", { start: 12, end: 14 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "Left",
      frames: this.anims.generateFrameNumbers("Player", { start: 24, end: 26 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "Die",
      frames: this.anims.generateFrameNumbers("Player", { start: 36, end: 44 }),
      frameRate: 10,
      repeat: 0, //repeat 삭제
    });
    this.anims.create({
      key: "Clear",
      frames: this.anims.generateFrameNumbers("Player", { start: 48, end: 59 }),
      frameRate: 10,
      repeat: 0, //repeat 삭제
    });
  }
  spawnPlayer() {
    // 플레이어 개체 생성
    this.player = this.add.sprite(400, 600, "Player");
    // 사이즈를 원본의 2.5배
    this.player.setScale(2.5);
    // 처음 재생할 애니메이션 설정
    this.player.play("Idle");
  }
  inputKey() {
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
}
