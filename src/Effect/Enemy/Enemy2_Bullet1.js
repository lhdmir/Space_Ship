import Base_Enemy_Bullet from "./Base_Enemy_Bullet";

import Enemy2_Bullet2 from "./Enemy2_Bullet2";

export default class Enemy2_Bullet1 extends Base_Enemy_Bullet {
  constructor(scene, enemy, damage) {
    super(scene, enemy.x, enemy.y + 30, 0, 200, damage, 24, 27, 0.2, 0.2);

    // Bullet 분리
    this.bulletSplit();
  }

  bulletSplit() {
    // 1초에서 3초 사이에 랜덤하게 분리됨
    let splitTimeLimit = Math.floor(Math.random() * (3000 - 1000) + 1000);
    setTimeout(() => {
      // 해당 객체가 active 상태일때만 실행
      if (this.active) {
        // 분리된 bullet의 왼쪽 부분 생성, 1은 왼쪽 방향
        new Enemy2_Bullet2(this.scene, this, 1, this.damage);
        // 분리된 bullet의 오른쪽 부분 생성, -1은 오른쪽 방향
        new Enemy2_Bullet2(this.scene, this, -1, this.damage);
        // 분리가 끝나면 해당 오브젝트는 삭제
        this.destroy();
      }
    }, splitTimeLimit);
  }
}
