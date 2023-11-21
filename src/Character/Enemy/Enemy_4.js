import baseEnemy from "./baseEnemy";

import Enemy4_Bullet from "../../Effect/Enemy/Enemy4_Bullet";

export default class Enemy4 extends baseEnemy {
  // 클래스 변수(프로퍼티), 모든 인스턴스가 해당 변수를 공유할 수 있다

  // 최대 체력
  static MAX_HP = 40;
  // 공격력
  static ATTACK_POWER = 10;
  // 공격속도
  static ATTACK_SPEED = 1000;
  // 이동속도
  static SPEED = 100;
  // 이동거리
  static MOVE_DISTANCE = 50;

  constructor(scene, x, y) {
    super(scene, x, y);

    // 물리 충돌 사이즈 조정
    this.setSize(this.width * 0.55, this.height * 0.45, true);

    // 인스턴스 변수(프로퍼티), 각 인스턴스 별로 관리함
    this.currentHp = Enemy4.MAX_HP;
    this.attackPower = Enemy4.ATTACK_POWER;

    // 애니메이션 생성
    this.createEnemy4Animations();
    // 처음 애니메이션 재생
    this.play("Move");

    // 이동 타이머 추가
    this.startMoveTimer();

    // 공격 이벤트 추가
    this.startShootEvent();
  }

  startShootEvent() {
    this.shootEvent = this.scene.time.addEvent({
      delay: Enemy4.ATTACK_SPEED,
      callback: () => {
        this.shootBullet(this.attackPower);
      },
      loop: true,
    });
  }

  shootBullet(damage) {
    // 이동이 가능할때만 실행
    if (this.isMoveable) {
      // 새로운 bullet 객체를 생성
      new Enemy4_Bullet(this.scene, this, damage);
    }
  }

  startMoveTimer() {
    // 1초후 이동 시작
    this.moveTimer = setTimeout(() => {
      this.move();
    }, 1500);
  }

  move() {
    const { targetX, targetY } = this.calculateTargetPosition();
    // 거리 계산
    const distance = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      targetX,
      targetY
    );
    // 이동 시간 계산
    // T(시간) = S(거리) / V(속도)
    const duration = distance / Enemy4.SPEED;

    // 오브젝트 위치 업데이트
    this.scene.tweens.add({
      targets: this,
      x: targetX,
      y: targetY,
      ease: "Linear",
      duration: duration * 1000, // ms단위로 변환 1초는 1000ms
      yoyo: false,
      removeOnComplete: true,
      onComplete: () => {
        this.move();
      },
    });
  }

  calculateTargetPosition() {
    // 목적지 계산

    // 화면의 절반 계산
    const HALF_WIDTH = this.scene.sys.game.config.width / 2;
    // 적 기준 화면 왼쪽 끝은 (화면 - 50)
    const TARGET_X_LEFT = this.scene.sys.game.config.width - 50;
    // 적 기준 화면 오른쪽 끝은 (화면 + 50)
    const TARGET_X_RIGHT = 50;

    // 현재 x의 위치가 화면의 절반보다 크다면
    // 목적지 x좌표는 RIGHT
    // 아니면 목적지 x좌표는 LEFT
    let targetX = this.x >= HALF_WIDTH ? TARGET_X_RIGHT : TARGET_X_LEFT;
    // 목적지에 맞는 애니메이션 재생
    if (targetX == TARGET_X_RIGHT) {
      this.play("Right");
    } else if (targetX == TARGET_X_LEFT) {
      this.play("Left");
    }
    // 목적지 y 좌표를 현재 y좌표 + MOVE_DISTANCE 값만큼 설정
    let targetY = this.y + Enemy4.MOVE_DISTANCE;

    return { targetX, targetY };
  }

  createEnemy4Animations() {
    this.anims.create({
      key: "Move",
      frames: this.anims.generateFrameNumbers("Enemies", {
        start: 42,
        end: 45,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "Right",
      frames: this.anims.generateFrameNumbers("Enemies", {
        start: 51,
        end: 53,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "Left",
      frames: this.anims.generateFrameNumbers("Enemies", {
        start: 48,
        end: 50,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "Explosion",
      frames: this.anims.generateFrameNumbers("Enemy_Explosion", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: 0,
    });
  }

  death() {
    // 인스턴스를 파괴하기 전 타이머, 이벤트, tweens 들을 제거
    this.scene.tweens.killTweensOf(this);
    if (this.moveTimer) {
      clearTimeout(this.moveTimer);
    }
    if (this.shootEvent) {
      this.shootEvent.remove();
    }

    super.death();
  }
}
