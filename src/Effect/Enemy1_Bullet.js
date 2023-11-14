import Phaser from "phaser";

export default class Enemy1_Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, player, damage) {
    const x = player.x;
    const y = player.y + 30;
    super(scene, x, y, "Enemies");

    // 현재 씬에 총알 추가
    scene.add.existing(this);
    scene.physics.world.enableBody(this);

    // Bullet 애니메이션 생성
    this.createEnemy1BulletAnimation();

    // 총알 초기 설정
    this.damage = damage;
    this.play("Enemy1Bullet");
    this.setScale(3);
    this.setActive(true);
    this.setVisible(true);

    // 물리 충돌 사이즈 조정
    this.setSize(this.width * 0.2, this.height * 0.2, true);

    // Enemy 그룹에 오브젝트 추가
    scene.enemy_bullet.add(this);
  }

  update() {
    // 총알이 화면 밖으로 나가면 제거
    if (this.y > 700) {
      this.destroy();
    }
  }

  // Bullet 애니메이션 생성
  createEnemy1BulletAnimation() {
    this.anims.create({
      key: "Enemy1Bullet",
      frames: this.anims.generateFrameNumbers("Enemies", {
        start: 6,
        end: 9,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
