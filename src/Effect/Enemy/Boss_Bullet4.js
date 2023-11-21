import Base_Enemy_Bullet from "./Base_Enemy_Bullet";

export default class Boss_Bullet4 extends Base_Enemy_Bullet {
  constructor(scene, x, y, damage) {
    super(scene, x, y + 30, 0, 200, damage, 8, 8, 0.5, 0.5, "Boss_Bullet");
  }
}
