import Base_Enemy_Bullet from "./Base_Enemy_Bullet";

import Boss_Bullet2_2 from "./Boss_Bullet2_2";

export default class Boss_Bullet2_1 extends Base_Enemy_Bullet {
  constructor(scene, x, y, damage) {
    super(scene, x, y + 30, 0, 200, damage, 4, 5, 0.3, 0.3, "Boss_Bullet");

    // Bullet 분리
    this.bulletSplit();
  }

  bulletSplit() {
    // 0.5초에서 2초 사이에 랜덤하게 분리됨
    let splitTimeLimit = Math.floor(Math.random() * (3000 - 500) + 500);
    setTimeout(() => {
      // 해당 객체가 active 상태일때만 실행
      if (this.active) {
        // 분리된 bullet의 왼쪽 부분 생성, 1은 왼쪽 방향
        new Boss_Bullet2_2(this.scene, this, 1, this.damage);
        // 분리된 bullet의 오른쪽 부분 생성, -1은 오른쪽 방향
        new Boss_Bullet2_2(this.scene, this, -1, this.damage);
        // 분리가 끝나면 해당 오브젝트는 삭제
        this.destroy();
      }
    }, splitTimeLimit);
  }
}
