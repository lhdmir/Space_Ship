import Phaser from "phaser";
import Base_Enemy_Bullet from "./Base_Enemy_Bullet";

// 회전 총알
export default class Boss_Bullet3 extends Base_Enemy_Bullet {
  constructor(scene, x, y, damage, LR) {
    super(scene, x, y + 30, 0, 0, damage, 11, 14, 0.6, 0.6, "Boss_Bullet");
    this.scene = scene;

    // 지연 후 타겟 방향으로 발사
    this.shootTimer = setTimeout(() => {
      this.shootAtTarget(LR);
    }, 100);
  }

  // 타겟을 향해 발사하는 함수
  shootAtTarget(LR) {
    // 타겟 좌표 계산
    const offset = LR === 1 ? -100 : 100;
    // player x 부터 offset까지중 랜덤값
    const targetX = Phaser.Math.Between(
      this.scene.player.x + offset,
      this.scene.player.x
    );
    const targetY = this.scene.player.y;

    // 발사 각도 계산
    const angle = Phaser.Math.Angle.Between(this.x, this.y, targetX, targetY);

    // 발사체의 속도 설정
    this.scene.physics.velocityFromAngle(
      Phaser.Math.RadToDeg(angle),
      200,
      this.body.velocity
    );
  }

  destroy() {
    if (this.shootAtTarget) {
      clearTimeout(this.shootTimer);
    }
  }
}
