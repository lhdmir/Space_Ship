import Phaser from "phaser";

export default class Player_Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, player, damage) {
    // 총알의 x좌표를 player의 x좌표로 설정
    const x = player.x;
    // 총알의 y좌표를 player의 y - 40좌표로 설정
    const y = player.y - 40;

    // 좌표를 토대로 생성
    super(scene, x, y);

    // 생성할 때 받은 scene의 정보 저장
    this.scene = scene;

    // 현재 씬에 총알 추가
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);

    // Bullet 애니메이션 생성
    this.createPlayerBulletAnimation();

    // 총알 초기 설정
    this.initBullet(damage);
    this.setScale(3);

    // Bullets 그룹에 오브젝트 추가
    this.scene.player_bullet.add(this);

    // Bullet 속도 설정
    setTimeout(() => {
      if (this.active) this.setVelocityY(-300);
    }, 50);
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

  initBullet(damage) {
    // damage에 따라서 총알 분류
    switch (damage) {
      case 10:
        this.damage = damage;
        this.play("Bullet_Level_1");
        // 물리 충돌 사이즈 조정
        this.setSize(this.width * 0.2, this.height * 0.2, true);
        break;
      case 20:
        this.damage = damage;
        this.play("Bullet_Level_2");
        // 물리 충돌 사이즈 조정
        this.setSize(this.width * 0.25, this.height * 0.2, true);
        break;
      case 30:
        this.damage = damage;
        this.play("Bullet_Level_3");
        // 물리 충돌 사이즈 조정
        this.setSize(this.width * 0.3, this.height * 0.2, true);
        break;
      case 40:
        this.damage = damage;
        this.play("Bullet_Level_4");
        // 물리 충돌 사이즈 조정
        this.setSize(this.width * 0.4, this.height * 0.2, true);
        break;
      case 50:
        this.damage = damage;
        this.play("Bullet_Level_5");
        // 물리 충돌 사이즈 조정
        this.setSize(this.width * 0.5, this.height * 0.2, true);
        break;
    }
  }
}
