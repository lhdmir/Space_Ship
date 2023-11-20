import Base_Enemy_Bullet from "./Base_Enemy_Bullet";

export default class Enemy2_Bullet2 extends Base_Enemy_Bullet {
  constructor(scene, firstBullet, direction, damage) {
    super(scene, firstBullet.x, firstBullet.y, damage, 28, 29, 0.2, 0.2);

    // 총알 방향 설정
    this.scaleX = direction;
  }

  update() {
    // 총알이 화면 밖으로 나가면 제거
    if (this.x < 0 || 800 < this.x) {
      this.destroy();
    }
  }
}
