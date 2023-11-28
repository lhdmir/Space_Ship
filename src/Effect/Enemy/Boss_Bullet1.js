import Base_Enemy_Bullet from "./Base_Enemy_Bullet";

// 기본 총알
export default class Boss_Bullet1 extends Base_Enemy_Bullet {
  constructor(scene, x, y, damage, LR) {
    super(scene, x, y + 30, 0, 300, damage, 0, 3, 0.2, 0.2, "Boss_Bullet");
  }
}
