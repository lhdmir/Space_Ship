import baseEnemy from "../baseEnemy";

import Enemy1_Bullet from "../../Effect/Enemy1_Bullet";

export default class Enemy1 extends baseEnemy {
  // 클래스 변수(프로퍼티), 모든 인스턴스가 해당 변수를 공유할 수 있다

  // 최대 체력
  static MAX_HP = 50;
  // 공격력
  static ATTACK_POWER = 10;
  // 이동속도
  static SPEED = 10;
  // 공격속도
  static ATTACK_SPEED = 1000;

  constructor(scene, x, y) {
    super(scene, x, y);

    // 물리 충돌 사이즈 조정
    this.setSize(this.width * 0.65, this.height * 0.45, true);

    // 인스턴스 변수(프로퍼티), 각 인스턴스 별로 관리함
    this.currentHp = Enemy1.MAX_HP;
    this.attackPower = Enemy1.ATTACK_POWER;

    // 애니메이션 생성
    this.createEnemy1Animations();
    // 처음 애니메이션 재생
    this.play("Move");

    // 이동 타이머 추가
    this.startMovTimer();

    // 공격 이벤트 추가
    this.startShootEvent();
  }

  startShootEvent() {
    // 1초에 한번씩 공격하는 이벤트 추가
    this.shootEvent = this.scene.time.addEvent({
      delay: Enemy1.ATTACK_SPEED,
      callback: () => {
        this.shootBullet(this.attackPower);
      },
      loop: true,
    });
  }

  startMovTimer() {
    // 1초후 이동 시작 타이머
    this.moveTimer = setTimeout(() => {
      this.setVelocityY(Enemy1.SPEED);
    }, 1000);
  }

  createEnemy1Animations() {
    this.anims.create({
      key: "Move",
      frames: this.anims.generateFrameNumbers("Enemies", { start: 0, end: 3 }),
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

  shootBullet(damage) {
    // 이동이 가능할때만 실행
    if (this.isMoveable) {
      // 새로운 bullet 객체를 생성
      let bullet = new Enemy1_Bullet(this.scene, this, damage);
      // 이동속도 조정
      bullet.body.velocity.y = +300;
    }
  }

  death() {
    // 인스턴스를 파괴하기 전 타이머, 이벤트들을 제거
    if (this.moveTimer) {
      clearTimeout(this.moveTimer);
    }
    if (this.shootEvent) {
      this.shootEvent.remove();
    }

    super.death();
  }
}
