import Phaser from "phaser";

import Enemy2_Bullet2 from "./Enemy2_Bullet2";

export default class Enemy2_Bullet1 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, enemy, damage) {
    const x = enemy.x;
    const y = enemy.y + 30;
    super(scene, x, y, "Enemies");

    this.scene = scene;

    // 현재 씬에 총알 추가
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);

    // Bullet 애니메이션 생성
    this.createEnemy2_BulletAnimation1();

    // 총알 초기 설정
    this.damage = damage;
    this.play("Enemy2_Bullet1");
    this.setScale(3);
    this.setActive(true);
    this.setVisible(true);

    // 물리 충돌 사이즈 조정
    this.setSize(this.width * 0.2, this.height * 0.2, true);

    // Bullet 분리
    let splitTimeLimit = Math.floor(Math.random() * (2000 - 1000) + 1000);
    setTimeout(() => {
      if (this.active) {
        let bulletRight = new Enemy2_Bullet2(this.scene, this, 1, this.damage);
        bulletRight.body.velocity.x = +200;
        let bulletLeft = new Enemy2_Bullet2(this.scene, this, -1, this.damage);
        bulletLeft.body.velocity.x = -200;
        this.destroy();
      }
    }, splitTimeLimit);

    // Enemy 그룹에 오브젝트 추가
    this.scene.enemy_bullet.add(this);
  }

  update() {
    // 총알이 화면 밖으로 나가면 제거
    if (this.y > 700) {
      this.destroy();
    }
  }

  // Bullet 애니메이션 생성
  createEnemy2_BulletAnimation1() {
    this.anims.create({
      key: "Enemy2_Bullet1",
      frames: this.anims.generateFrameNumbers("Enemies", {
        start: 24,
        end: 27,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
