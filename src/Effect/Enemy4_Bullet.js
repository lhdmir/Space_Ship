import Base_Enemy_Bullet from "./Base_Enemy_Bullet";

export default class Enemy4_Bullet extends Base_Enemy_Bullet {
  constructor(scene, enemy, damage) {
    super(scene, enemy.x, enemy.y + 30, damage, 54, 57, 0.1, 0.2);
  }
}
