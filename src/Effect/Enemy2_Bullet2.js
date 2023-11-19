import Phaser from "phaser";

export default class Enemy2_Bullet2 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, firstBullet, direction, damage) {
    const x = firstBullet.x;
    const y = firstBullet.y;
    super(scene, x, y, "Enemies");

    this.scene = scene;

    // 현재 씬에 총알 추가
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);

    // Bullet 애니메이션 생성
    this.createEnemy2_BulletAnimation2();

    // 총알 초기 설정
    this.damage = damage;
    this.play("Enemy2_Bullet2");
    this.setScale(3);
    this.setActive(true);
    this.setVisible(true);

    if (direction == 1) {
      this.scaleX = 1;
    } else if (direction == -1) {
      this.scaleX = -1;
    }

    // 물리 충돌 사이즈 조정
    this.setSize(this.width * 0.2, this.height * 0.2, true);

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
  createEnemy2_BulletAnimation2() {
    this.anims.create({
      key: "Enemy2_Bullet2",
      frames: this.anims.generateFrameNumbers("Enemies", {
        start: 28,
        end: 29,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
