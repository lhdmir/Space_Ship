import Phaser from "phaser";

export default class Base_Enemy_Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene,
    x,
    y,
    damage,
    animStartFrame,
    animEndFrame,
    collisionWidthFactor,
    collisionHeightFactor
  ) {
    // 좌표를 토대로 생성
    super(scene, x, y);

    // 생성할 때 받은 scene의 정보 저장
    this.scene = scene;
    // 현재 씬에 총알 추가
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);

    // Bullet 애니메이션 생성
    this.createBulletAnimation(animStartFrame, animEndFrame);

    // 총알 초기 설정
    this.damage = damage;
    this.play("Bullet");
    this.setScale(3);

    // 물리 충돌 사이즈 조정
    this.setSize(
      this.width * collisionWidthFactor,
      this.height * collisionHeightFactor,
      true
    );

    // Enemy 그룹에 오브젝트 추가
    this.scene.enemy_bullet.add(this);
  }

  update() {
    // 총알이 화면 밖으로 나가면 제거
    if (this.y > 700) {
      this.destroy();
    }
  }

  createBulletAnimation(startFrame, endFrame) {
    this.anims.create({
      key: "Bullet",
      frames: this.anims.generateFrameNumbers("Enemies", {
        start: startFrame,
        end: endFrame,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
