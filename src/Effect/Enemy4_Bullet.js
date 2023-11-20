import Phaser from "phaser";

export default class Enemy4_Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, enemy, damage) {
    // 총알의 x좌표를 enemy의 x좌표로 설정
    const x = enemy.x;
    // 총알의 y좌표를 enemy의 y좌표 + 30 으로 설정
    const y = enemy.y + 30;

    // 좌표를 토대로 생성
    super(scene, x, y);

    // 생성할 때 받은 scene의 정보 저장
    this.scene = scene;

    // 현재 씬에 총알 추가
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);

    // Bullet 애니메이션 생성
    this.createEnemy4BulletAnimation();

    // 총알 초기 설정
    this.damage = damage;
    this.play("Enemy4Bullet");
    this.setScale(3);

    // 물리 충돌 사이즈 조정
    this.setSize(this.width * 0.1, this.height * 0.2, true);

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
  createEnemy4BulletAnimation() {
    this.anims.create({
      key: "Enemy4Bullet",
      frames: this.anims.generateFrameNumbers("Enemies", {
        start: 54,
        end: 57,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
