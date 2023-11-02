import Phaser from "phaser";

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, player) {
    const x = player.x;
    const y = player.y + 30;
    super(scene, x, y, "Enemies");

    // 현재 씬에 총알 추가
    scene.add.existing(this);
    scene.physics.world.enableBody(this);

    // Bullet 애니메이션 생성
    this.createEnemy1BulletAnimation();

    // 총알 초기 설정
    this.play("Enemy1Bullet");
    this.setScale(3);
    this.setActive(true);
    this.setVisible(true);

    // Enemy 그룹에 오브젝트 추가
    scene.enemy_attack.add(this);
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
