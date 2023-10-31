import Phaser from "phaser";

// base 의 createBackground 함수 import
import { createBackground } from "../base/base";

// 플레이어 클래스 import
import Player from "../Character/Player";

// 방향정의 오브젝트 import
import { Direction } from "../base/base";

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: "PlayScene" });
  }

  preload() {
    // 배경 로드
    this.load.image("Background_Image", "./Asset/Space.png");

    // 플레이어 스프라이트시트를 Player 라는 이름으로 로드, 각 장당 32*32 사이즈로 자름
    this.load.spritesheet("Player", "./Asset/Ship.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    // Bullet 스프라이트시트를 Bullets 라는 이름으로 로드
    this.load.spritesheet("Bullets", "./Asset/Bullet.png", {
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

    // Bullets 그룹 생성
    this.bullets = this.physics.add.group();
  }

  update() {
    this.bg.tilePositionY -= 2; // 숫자 2는 스크롤 속도를 조절.

    // 움직임 관리
    this.handlePlayerMove();

    // 애니메이션 관리
    this.handlePlayerAnimations();
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
    // 애니메이션 재생 관리

    // A가 눌러져있고, D는 눌러져있지 않은 상태에서 현재 재생중인 애니메이션이 Left가 아니라면
    // Left를 재생
    if (
      this.keyA.isDown &&
      !this.keyD.isDown &&
      this.player.anims.currentAnim.key !== "Left"
    ) {
      this.player.play("Left");
    }
    // D가 눌러져있고, A는 눌러져있지 않은 상태에서 현재 재생중인 애니메이션이 Right가 아니라면
    // Right를 재생
    else if (
      !this.keyA.isDown &&
      this.keyD.isDown &&
      this.player.anims.currentAnim.key !== "Right"
    ) {
      this.player.play("Right");
    }
    // 좌,우 이동이 입력되지 않았을 때 또는 좌,우 이동이 모두 입력되었을 때
    else if (
      (!this.keyA.isDown && !this.keyD.isDown) ||
      (this.keyA.isDown && this.keyD.isDown)
    ) {
      // 현재 재생중인 애니메이션이 Idle이 아니라면 Idle 재생
      if (this.player.anims.currentAnim.key !== "Idle") {
        this.player.play("Idle");
      }
    }

    // this.player.anims.currentAnim.key !== 해당 조건이 없다면
    // 키를 계속 입력받을때마다 애니메이션을 재생해서 애니메이션의 첫화면만 계속 재생된다.
    // 결국 애니메이션이 재생되지 않고 멈춘것으로 보이기때문에
    // 현재 재생중인 애니메이션과 재생할려는 애니메이션이 똑같다면 굳이 새로 애니메이션을 재생하지 않고
    // 현재 무한 재생중인 애니메이션을 계속 재생하는것이 효율적이다.
    // 이것은 애니메이션이 무한재생일때 가능한 조건이다.

    // Die, Clear 애니메이션
    // if (this.keyJ.isDown && this.player.anims.currentAnim.key !== "Die") {
    //   this.player.play("Die");
    // } else if (
    //   this.keyK.isDown &&
    //   this.player.anims.currentAnim.key !== "Clear"
    // ) {
    //   this.player.play("Clear");
    // }
  }

  handlePlayerMove() {
    // W,A,S,D 키가 눌렀다면 move함수에 해당 방향을 매개변수로 호출
    if (this.keyA.isDown) {
      this.player.move(Direction.Left);
    }
    if (this.keyD.isDown) {
      this.player.move(Direction.Right);
    }
    if (this.keyW.isDown) {
      this.player.move(Direction.Up);
    }
    if (this.keyS.isDown) {
      this.player.move(Direction.Down);
    }
  }
}
