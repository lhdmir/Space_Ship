import Base_Enemy_Bullet from "./Base_Enemy_Bullet";

export default class Enemy1_Bullet extends Base_Enemy_Bullet {
  constructor(scene, enemy, damage) {
    super(scene, enemy.x, enemy.y + 30, damage, 6, 9, 0.2, 0.2);
  }
}
