import Phaser from "phaser";

// 방향정의 오브젝트 import
import { Direction } from "../base/baseModule";

// Bullet 클래스 import
import Player_Bullet from "../Effect/Player_Bullet";

// HealthBar 클래스 import
import HealthBar from "../UI/HealthBar";

// 플레이어 클래스 생성
export default class Player extends Phaser.Physics.Arcade.Sprite {
  // 최대 체력
  static MAX_HP = 100;
  // 공격력
  static ATTACK_POWER = 10;
  // 이동속도
  static SPEED = 4;
  // 공격속도
  static ATTACK_SPEED = 300;

  // 생성할때 scene정보, 현재체력, 공격력, 콤보카운트를 입력받음
  // 없으면 최대체력과 기본 공격력으로 설정
  constructor(
    scene,
    currentHp = Player.MAX_HP,
    attackPower = Player.ATTACK_POWER,
    comboCount = 0
  ) {
    super(scene, 400, 600);

    // 입력받은 씬 정보 저장
    this.scene = scene;

    // 플레이어 체력
    this.currentHp = currentHp;

    // HP Bar 생성
    this.healthBar = new HealthBar(scene, this);

    // 플레이어 공격력
    this.attackPower = attackPower;

    // 플레이어 콤보 카운트
    this.comboCount = comboCount;

    // 이동 가능한지 체크하는 플래그 추가
    this.isMoveable = false;

    // 해당 scene에 오브젝트를 추가하는 함수.
    this.scene.add.existing(this);
    // 해당 scene에 추가한 오브젝트를 물리 엔진에 적용시키는 함수.
    this.scene.physics.add.existing(this);

    // 사이즈 설정
    this.setScale(3);
    // alpha 값 설정. 1은 불투명
    this.setAlpha(1);

    // 화면 밖으로 나가지 않도록 설정
    this.setCollideWorldBounds(true);

    // 애니메이션 생성
    this.createPlayerAnimations();

    // 공격 이벤트
    // 300ms 한번씩 shotBullet()을 호출하는 이벤트를 추가
    this.startShootEvent();

    this.createComboCountUpEventListener();
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
    this.anims.create({
      key: "Spawn",
      frames: this.anims.generateFrameNumbers("Player", {
        frames: [59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48],
      }),
      frameRate: 10,
      repeat: 0,
    });
  }

  createComboCountUpEventListener() {
    this.comboCountUpEvent = new Phaser.Events.EventEmitter();
    this.comboCountUpEvent.on("ComboCountUp", () => {
      this.comboCount += 1;

      if (this.comboCount == 3 && this.attackPower != 50) {
        this.comboCount = 0;
        this.attackPower += 10;
      }
    });
  }

  startShootEvent() {
    this.shootEvent = this.scene.time.addEvent({
      delay: Player.ATTACK_SPEED,
      callback: () => {
        this.shootBullet(this.attackPower);
      },
      loop: true,
    });
  }

  shootBullet(damage) {
    // 스폰이 완료되면 Bullet 생성
    if (this.isMoveable) {
      // bullet 인스턴스 생성
      let bullet = new Player_Bullet(this.scene, this, damage);
      // bullet 이동속도 설정
      bullet.body.velocity.y = -300;
    }
  }

  move(direction) {
    // direction을 매개변수로 받음
    // 매개변수의 값에따라 player의 좌표를 player_speed 만큼 변경

    switch (direction) {
      case Direction.Up:
        this.y -= Player.SPEED;
        break;

      case Direction.Down:
        this.y += Player.SPEED;
        break;

      case Direction.Left:
        this.x -= Player.SPEED;
        break;

      case Direction.Right:
        this.x += Player.SPEED;
        break;
    }
    // 이동이 끝나면 healthBar의 위치를 update
    this.healthBar.positionUpdate(this);
  }

  hit(damage) {
    // 현재 체력을 damage 만큼 감소
    this.currentHp -= damage;
    // 콤보와 공격력 초기화
    this.comboCount = 0;
    this.attackPower = Player.ATTACK_POWER;

    //healthBar draw
    this.healthBar.decrease(damage);

    // Death
    if (this.currentHp <= 0) {
      this.isMoveable = false;

      // 인스턴스를 파괴하기 전 타이머 이벤트들을 제거
      if (this.shootEvent) {
        this.shootEvent.remove();
      }

      // 체력바 비활성화
      this.healthBar.setAlpha(0);

      this.body.enable = false; // 물리적 몸체를 비활성화하여 더 이상 충돌하지 않도록 설정.

      // 애니메이션을 재생하고, 애니메이션이 완료되면 'animationcomplete' 이벤트가 발생.
      this.play("Die").on(
        "animationcomplete",
        () => {
          this.setActive(false);
          this.setAlpha(0);
          setTimeout(() => {
            this.scene.game.registry.set("score", this.scene.score);
            this.scene.scene.start("gameOverScene");
          }, 1000);
        },
        this
      ); // 'this'는 콜백 내에서 Player인스턴스를 참조하기 위해 전달된다.
      // 즉, 콜백 내부의 this에는 this(player의 인스턴스)가 전달된다.
    }
  }
}
