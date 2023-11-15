import Phaser from "phaser";

// base 의 createBackground 함수 import
import {
  createBackground,
  assignKeys,
  collisionEvent,
  createPlayer,
  createEnemyGroup,
  loadAsset,
  createDeadZone,
  clearStage,
  createScoreText,
} from "../base/base";

// 방향정의 오브젝트 import
import { Direction } from "../base/base";

// Enemy 클래스 import
import Enemy1 from "../Character/Enemies/Enemy_1";

export default class Stage3 extends Phaser.Scene {
  constructor() {
    super({ key: "Stage3" });
  }

  preload() {
    loadAsset(this);
  }

  create() {
    // this.physics.world.createDebugGraphic();

    // 데이터 로드
    let playerData = this.game.registry.get("playerData");
    this.score = this.game.registry.get("score");

    // background 생성
    createBackground(this);

    // 키 할당
    assignKeys(this);

    // 플레이어 생성
    createPlayer(this, playerData.attackPower, playerData.comboCount);

    // 적 생성
    createEnemyGroup(this);

    // 충돌 이벤트 생성
    collisionEvent(this);

    // dead zone 생성
    createDeadZone(this);

    createScoreText(this);

    // test enemy 생성
    // 아래와 같이 Enemy를 생성할 수 있음
    // this.enemy1 = new Enemy1(this, 700, 50);
    // this.enemies.add(this.enemy1);
    this.enemies.add(new Enemy1(this, 100, 50));
    this.enemies.add(new Enemy1(this, 400, 50));
    this.enemies.add(new Enemy1(this, 700, 50));
    this.enemies.add(new Enemy1(this, 250, 100));
    this.enemies.add(new Enemy1(this, 550, 100));
  }

  update() {
    this.bg.tilePositionY -= 2; // 숫자 2는 스크롤 속도를 조절.

    if (this.enemies.getChildren().length === 0 && this.player.isMoveable) {
      clearStage(this, "gameClearScene");
    }

    // 스폰이 완료되면 실행
    if (this.player.isMoveable) {
      // 움직임 관리
      this.handlePlayerMove();

      // 애니메이션 관리
      this.handlePlayerAnimations();
    }
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
