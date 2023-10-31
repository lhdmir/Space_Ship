import Phaser from "phaser";

// 방향정의 오브젝트 import
import { Direction } from "../base/base";

// Bullet 클래스 import
import Bullet from "../Effect/Bullet";

// 플레이어 클래스 생성
export default class Player extends Phaser.Physics.Arcade.Sprite {
  // 플레이어의 속도 설정
  static PLAYER_SPEED = 5;

  constructor(scene) {
    super(scene, 400, 600, "Player");

    //scene.add.existing 함수는 해당 scene에 오브젝트를 추가하는 함수.
    //scene.physics.add.existing 함수는 해당 scene에 추가한 오브젝트를
    //물리 엔진에 적용시키는 함수.
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // 사이즈 설정
    this.setScale(3);
    // alpha 값 설정. 1은 불투명
    this.setAlpha(1);

    // 화면 밖으로 나가지 않도록 설정
    this.setCollideWorldBounds(true);

    // 애니메이션 생성
    this.createPlayerAnimations();

    // 최초 재생 애니메이션 Idle 설정
    this.play("Idle");

    // 공격 이벤트
    // 300ms 한번씩 shotBullet()을 호출하는 이벤트를 추가
    scene.time.addEvent({
      delay: 300,
      callback: () => {
        this.shotBullet();
      },
      loop: true,
    });
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

  move(direction) {
    // direction을 매개변수로 받음
    // 매개변수의 값에따라 player의 좌표를 player_speed 만큼 변경

    switch (direction) {
      case Direction.Up:
        this.y -= Player.PLAYER_SPEED;
        break;

      case Direction.Down:
        this.y += Player.PLAYER_SPEED;
        break;

      case Direction.Left:
        this.x -= Player.PLAYER_SPEED;
        break;

      case Direction.Right:
        this.x += Player.PLAYER_SPEED;
        break;
    }
  }

  shotBullet() {
    // bullet 인스턴스 생성
    let bullet = new Bullet(this.scene, this);
    // bullet 이동속도 설정
    bullet.body.velocity.y = -300;
  }
}
