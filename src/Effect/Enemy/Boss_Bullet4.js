import Base_Enemy_Bullet from "./Base_Enemy_Bullet";

// 지뢰형 총알
export default class Boss_Bullet4 extends Base_Enemy_Bullet {
  constructor(scene, x, y, damage, LR) {
    super(scene, x, y + 30, 0, 200, damage, 8, 8, 0.5, 0.5, "Boss_Bullet");

    this.createStopTimer();
    this.createDestroyTimer();
  }

  createStopTimer() {
    // 일정시간 경과후 이동을 정지
    let timeLimit = Math.floor(Math.random() * (3000 - 1000) + 1000);
    this.stopTimer = setTimeout(() => {
      this.setVelocityY(0);
    }, timeLimit);
  }

  createDestroyTimer() {
    // 생성된지 5초후 삭제
    this.destroyTimer = setTimeout(() => {
      this.destroy();
    }, 5000);
  }

  destroy() {
    if (this.stopTimer) {
      clearTimeout(this.stopTimer);
    }
    if (this.destroyTimer) {
      clearTimeout(this.destroyTimer);
    }

    super.destroy();
  }
}
