import Base_Enemy_Bullet from "./Base_Enemy_Bullet";

export default class Boss_Bullet2_2 extends Base_Enemy_Bullet {
  constructor(scene, firstBullet, direction, damage) {
    super(
      scene,
      firstBullet.x,
      firstBullet.y,
      200 * direction,
      0,
      damage,
      6,
      7,
      0.2,
      0.2,
      "Boss_Bullet"
    );

    // 총알 방향 설정
    if (direction == -1) this.toggleFlipX();
  }

  update() {
    // 총알이 화면 밖으로 나가면 제거
    if (this.x < 0 || 800 < this.x) {
      this.destroy();
    }
  }
}
