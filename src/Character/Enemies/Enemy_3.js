import baseEnemy from "../baseEnemy";

export default class Enemy3 extends baseEnemy {
  // 클래스 변수(프로퍼티), 모든 인스턴스가 해당 변수를 공유할 수 있다

  // 최대 체력
  static MAX_HP = 40;
  // 공격력
  static ATTACK_POWER = 40;
  // 이동속도
  static SPEED = 300;

  constructor(scene, x, y) {
    // 부모 클래스의 constructor 호출
    super(scene, x, y);

    // 물리 충돌 사이즈 조정
    this.setSize(this.width * 0.5, this.height * 0.45, true);

    // HP와 공격력 설정
    this.currentHp = Enemy3.MAX_HP;
    this.attackPower = Enemy3.ATTACK_POWER;

    // 공격 상태 플래그
    this.isAttacking = false;

    // 애니메이션 생성
    this.createEnemy3Animations();
    // 처음 애니메이션 재생
    this.play("Move");

    // 일반 개체와 다르기때문에 물리 이벤트를 위해서
    // 다른 rushEnemies 그룹에도 추가
    this.scene.rushEnemies.add(this);

    // AttackTimer 시작
    this.startAttackTimer();
  }

  startAttackTimer() {
    // 어택타이머 설정
    this.attackTimer = setTimeout(() => {
      this.isAttacking = true;
      this.setVelocityY(Enemy3.SPEED);
      this.play("Attack");
    }, 5000);
  }

  createEnemy3Animations() {
    this.anims.create({
      key: "Move",
      frames: this.anims.generateFrameNumbers("Enemies", {
        start: 30,
        end: 33,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "Attack",
      frames: this.anims.generateFrameNumbers("Enemies", {
        start: 36,
        end: 37,
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
    // 삭제되기전에 타이머가 있다면 타이머를 삭제
    if (this.attackTimer) {
      clearTimeout(this.attackTimer);
    }
    // 공격상태를 false로 전환
    this.isAttacking = false;

    super.death();
  }
}
