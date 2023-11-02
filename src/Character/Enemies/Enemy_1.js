import Phaser from "phaser";

import Enemy1_Bullet from "../../Effect/Enemy1_Bullet";

export default class Enemy1 extends Phaser.Physics.Arcade.Sprite {
  static ENEMY_SPEED = 30;

  constructor(scene, x, y) {
    super(scene, x, y, "Enemies");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(3);
    this.setAlpha(1);
    this.setCollideWorldBounds(true);

    this.createEnemy1Animations();

    this.play("Move");

    // 1.5초에 한번씩 움직이는 이벤트 추가
    scene.time.addEvent({
      delay: 1500,
      callback: () => {
        this.move();
      },
      loop: true,
    });

    // 1초에 한번씩 공격하는 이벤트 추가
    scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.shotBullet();
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
    // 플레이어와 적의 좌표차이
    let x = this.scene.player.x - this.x;

    // player와 x 좌표가 30이상 차이나지 않는다면
    // x좌표는 고정하고 y좌표만 이동
    if (Math.abs(x) < 30) {
      this.y += 30;
    } else if (x < 0) {
      this.x -= Enemy1.ENEMY_SPEED;
      this.y += 30;
    } else if (x > 0) {
      this.x += Enemy1.ENEMY_SPEED;
      this.y += 30;
    }
  }

  shotBullet() {
    let bullet = new Enemy1_Bullet(this.scene, this);
    bullet.body.velocity.y = +300;
  }
}
