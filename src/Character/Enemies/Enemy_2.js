import Phaser from "phaser";

import { spawnEnemy } from "../../base/base";

export default class Enemy2 extends Phaser.Physics.Arcade.Sprite {
  // 클래스 변수(프로퍼티), 모든 인스턴스가 해당 변수를 공유할 수 있다
  static ENEMY_SPEED = 100;
  static ENEMY_MOVE_DISTANCE = 1;
  static ENEMY_MAX_HP = 100;
  static ENEMY_ATTACK_POWER = 10;
  static ENEMY_ATTACK_SPEED = 1000;

  constructor(scene, x, y) {
    super(scene, x, -50, "Enemies");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // 인스턴스 변수(프로퍼티), 각 인스턴스 별로 관리함
    this.currentHp = Enemy2.ENEMY_MAX_HP;
    this.attackPower = Enemy2.ENEMY_ATTACK_POWER;

    // 이동가능 플래그
    this.isMoveable = false;

    this.setScale(3);
    this.setAlpha(1);

    // 물리 충돌 사이즈 조정
    this.setSize(this.width * 0.65, this.height * 0.45, true);

    this.createEnemy1Animations();

    spawnEnemy(scene, this, x, y);

    this.play("Move");

    // 0.1초에 한번씩 움직이는 이벤트 추가
    this.moveEvent = scene.time.addEvent({
      delay: Enemy2.ENEMY_SPEED,
      callback: () => {
        this.move();
      },
      loop: true,
    });

    // 1초에 한번씩 공격하는 이벤트 추가
    this.shootEvent = scene.time.addEvent({
      delay: Enemy2.ENEMY_ATTACK_SPEED,
      callback: () => {
        this.shotBullet(this.attackPower);
      },
      loop: true,
    });
  }

  createEnemy1Animations() {
    this.anims.create({
      key: "Idle",
      frames: this.anims.generateFrameNumbers("Enemies", { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1,
    });

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

  move() {
    if (this.isMoveable) {
      // // 플레이어와 적의 좌표차이
      // let x = this.scene.player.x - this.x;

      // // player와 x 좌표가 30이상 차이나지 않는다면
      // // x좌표는 고정하고 y좌표만 이동
      // if (Math.abs(x) < 30) {
      //   this.y += 30;
      // } else if (x < 0) {
      //   this.x -= Enemy2.ENEMY_SPEED;
      //   this.y += 30;
      // } else if (x > 0) {
      //   this.x += Enemy2.ENEMY_SPEED;
      //   this.y += 30;
      // }
      this.y += Enemy2.ENEMY_MOVE_DISTANCE;
    }
  }

  shotBullet(damage) {
    if (this.isMoveable) {
      let bullet = new Enemy1_Bullet(this.scene, this, damage);
      bullet.body.velocity.y = +300;
    }
  }

  hit(damage, scene) {
    this.currentHp -= damage;

    // Death
    if (this.currentHp <= 0) {
      this.death();
      // hit() 으로 인한 사망이면
      // 플레이어의 콤보와 스코어를 증가
      scene.player.comboCount += 1;
      scene.score += 10;
      scene.scoreText.setText("Score: " + scene.score);
    }
  }

  death() {
    // 인스턴스를 파괴하기 전 타이머 이벤트들을 제거
    if (this.moveEvent) {
      this.moveEvent.remove();
    }
    if (this.shootEvent) {
      this.shootEvent.remove();
    }

    this.body.enable = false; // 물리적 몸체를 비활성화하여 더 이상 충돌하지 않도록 설정.

    // 애니메이션을 재생하고, 애니메이션이 완료되면 'animationcomplete' 이벤트가 발생.
    this.play("Explosion").on(
      "animationcomplete",
      () => {
        this.destroy();
      },
      this
    ); // 'this'는 콜백 내에서 Enemy2 인스턴스를 참조하기 위해 전달된다.
  }
}
