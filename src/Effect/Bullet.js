import Phaser from "phaser";

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, player) {
    const x = player.x;
    const y = player.y - 40;
    super(scene, x, y, "Bullets");

    // 현재 씬에 총알 추가
    scene.add.existing(this);
    scene.physics.world.enableBody(this);

    // Bullet 애니메이션 생성
    this.createBulletAnimation();

    // 총알 초기 설정
    this.play("Bullet_Level_1");
    this.setScale(3);
    this.setActive(true);
    this.setVisible(true);

    // Bullets 그룹에 오브젝트 추가
    scene.bullets.add(this);
  }

  // Bullet 애니메이션 생성
  createBulletAnimation() {
    this.anims.create({
      key: "Bullet_Level_1",
      frames: this.anims.generateFrameNumbers("Bullets", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "Bullet_Level_2",
      frames: this.anims.generateFrameNumbers("Bullets", {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "Bullet_Level_3",
      frames: this.anims.generateFrameNumbers("Bullets", {
        start: 10,
        end: 13,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "Bullet_Level_4",
      frames: this.anims.generateFrameNumbers("Bullets", {
        start: 15,
        end: 18,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "Bullet_Level_5",
      frames: this.anims.generateFrameNumbers("Bullets", {
        start: 20,
        end: 23,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
