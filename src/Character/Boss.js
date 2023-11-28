import baseEnemy from "./Enemy/baseEnemy";

import Boss_Bullet1 from "../Effect/Enemy/Boss_Bullet1";
import Boss_Bullet2_1 from "../Effect/Enemy/Boss_Bullet2_1";
import Boss_Bullet3 from "../Effect/Enemy/Boss_Bullet3";
import Boss_Bullet4 from "../Effect/Enemy/Boss_Bullet4";

export default class BossEnemy extends baseEnemy {
  // 최대 체력
  static MAX_HP = 1000;
  // 공격력
  static ATTACK_POWER = 30;
  // 공격속도
  static ATTACK_SPEED = 1000;
  // 공격 offset
  static ATTACK_OFFSET = 30;
  // 다음 이동을 정하는 시간(단위:ms)
  static SET_DELAY = 5000;
  // 이동거리
  static MOVE_DISTANCE = 300;

  constructor(scene, x, y) {
    // 생성자를 실행
    super(scene, x, y);

    // 물리 충돌 사이즈 조정
    this.setSize(this.width * 2, this.height, true);
    this.setOffset(0, 16);

    // 기본 체력과 공격력 설정
    this.currentHp = BossEnemy.MAX_HP;
    this.attackPower = BossEnemy.ATTACK_POWER;

    // 보스 애니메이션 생성
    this.createBossAnimations();
    this.play("Move");

    // 이동 결정 이벤트 추가
    this.createSetMoveEvent();

    // interval ID 저장 배열
    this.intervals = [];
  }

  // Shoot Bullet
  shootBullet(bulletClass, damage, shootCount, delay) {
    let count = 0;
    const interval = setInterval(() => {
      this.createBullet(bulletClass, damage);
      count++;

      if (count >= shootCount) clearInterval(interval);
    }, delay);
    this.intervals.push(interval);
  }

  // 각각의 특정 총알 유형을 위한 메소드
  // Common Bullet
  shootCommonBullet(damage) {
    this.shootBullet(Boss_Bullet1, damage, 5, 500);
  }

  // Split Bullet
  shootSplitBullet(damage) {
    this.shootBullet(Boss_Bullet2_1, damage, 5, 1000);
  }

  // Spin Bullet
  shootSpinBullet(damage) {
    this.shootBullet(Boss_Bullet3, damage, 3, 1000);
  }

  // Mine Bullet
  shootMineBullet(damage) {
    this.shootBullet(Boss_Bullet4, damage, 3, 1000);
  }

  // Bullet 생성
  createBullet(bulletClass, damage) {
    if (this.isMoveable) {
      // Right
      new bulletClass(
        this.scene,
        this.x - BossEnemy.ATTACK_OFFSET,
        this.y,
        damage,
        1
      );
      // Left
      new bulletClass(
        this.scene,
        this.x + BossEnemy.ATTACK_OFFSET,
        this.y,
        damage,
        -1
      );
    }
  }

  createSetMoveEvent() {
    this.setMoveEvent = this.scene.time.addEvent({
      delay: BossEnemy.SET_DELAY,
      callback: () => {
        this.setMove();
      },
      loop: true,
    });
  }

  setMove() {
    // 50% 확률로 회피, 추격 둘중 하나를 선택
    if (Math.random() < 0.5) {
      this.setBullet(this.shootCommonBullet, this.shootSpinBullet);
      this.chase();
    } else {
      this.setBullet(this.shootSplitBullet, this.shootMineBullet);
      this.evasion();
    }
  }

  setBullet(firstBullet, secondBullet) {
    // 50프로 확률로 bullet을 결정
    if (Math.random() < 0.5) {
      firstBullet.bind(this)(this.attackPower);
    } else {
      secondBullet.bind(this)(this.attackPower);
    }
  }

  evasion() {
    // 회피 실행 함수
    const HALF_WIDTH = this.scene.sys.game.config.width / 2;
    let playerX = this.scene.player.x;

    // 이동 가능 상태일때 실행 가능
    if (this.isMoveable) {
      // 플레이어가 중앙을 넘어서 있으면 플레이어의 반대편으로 이동
      let targetX =
        playerX > HALF_WIDTH
          ? this.x - BossEnemy.MOVE_DISTANCE
          : this.x + BossEnemy.MOVE_DISTANCE;

      // 플레이어에게서 도망
      this.scene.tweens.add({
        targets: this,
        x: targetX,
        ease: "Power1",
        duration: 2000,
        repeat: 0,
        yoyo: false,
        removeOnComplete: true,
      });
    }
  }

  chase() {
    // 추격 실행 함수
    // 이동 가능 상태일때 실행 가능
    if (this.isMoveable) {
      // targetX : 플레이어 x축
      let targetX = this.scene.player.x;

      // 플레이어와 x축을 맞춤
      this.scene.tweens.add({
        targets: this,
        x: targetX,
        ease: "Power1",
        duration: 2000,
        repeat: 0,
        yoyo: false,
        removeOnComplete: true,
      });
    }
  }

  createBossAnimations() {
    this.anims.create({
      key: "Move",
      frames: this.anims.generateFrameNumbers("Boss", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "Attack",
      frames: this.anims.generateFrameNumbers("Boss", {
        start: 8,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // this.anims.create({
    //   key: "LightDamage",
    //   frames: this.anims.generateFrameNumbers("Boss", {
    //     start: 16,
    //     end: 23,
    //   }),
    //   frameRate: 10,
    //   repeat: -1,
    // });

    // this.anims.create({
    //   key: "HeavyDamage",
    //   frames: this.anims.generateFrameNumbers("Boss", {
    //     start: 24,
    //     end: 31,
    //   }),
    //   frameRate: 10,
    //   repeat: -1,
    // });

    this.anims.create({
      key: "Explosion",
      frames: this.anims.generateFrameNumbers("Boss_Explosion", {
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
    if (this.setMoveEvent) {
      this.setMoveEvent.remove();
    }
    this.intervals.forEach(clearInterval);

    super.death();
  }
}
