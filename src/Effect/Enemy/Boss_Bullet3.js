import Base_Enemy_Bullet from "./Base_Enemy_Bullet";

export default class Boss_Bullet3 extends Base_Enemy_Bullet {
  constructor(scene, x, y, damage) {
    super(scene, x, y + 30, 0, 200, damage, 11, 14, 0.6, 0.6, "Boss_Bullet");
  }
}
