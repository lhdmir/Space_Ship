import Phaser from "phaser";

export default class Player_Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, player) {
    const x = player.x;
    const y = player.y - 40;
    super(scene, x, y, "Bullets");

    // 현재 씬에 총알 추가
    scene.add.existing(this);
    scene.physics.world.enableBody(this);

    // Bullet 애니메이션 생성
    this.createPlayerBulletAnimation();

    // 총알 초기 설정
    this.play("Bullet_Level_1");
    this.setScale(3);
    this.setActive(true);
    this.setVisible(true);
    // 물리 충돌 사이즈 조정
    this.setSize(this.width * 0.2, this.height * 0.2, true);

    // Bullets 그룹에 오브젝트 추가
    scene.player_bullet.add(this);
  }

  update() {
    // 총알이 화면 밖으로 나가면 제거
    if (this.y < 20) {
      this.destroy();
    }
  }

  // Bullet 애니메이션 생성
  createPlayerBulletAnimation() {
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
