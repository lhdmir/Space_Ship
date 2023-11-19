// Base Stage import
import BaseStage from "../base/baseStage";

// Enemy Class import
import Enemy1 from "../Character/Enemies/Enemy_1";
import Enemy2 from "../Character/Enemies/Enemy_2";
import Enemy3 from "../Character/Enemies/Enemy_3";

// Player Class import
import Player from "../Character/Player";

export default class Stage1 extends BaseStage {
  constructor() {
    super({ key: "Stage1" });
  }

  preload() {
    super.preload();
  }

  create() {
    this.playerData = {
      currentHp: Player.PLAYER_MAX_HP,
      attackPower: Player.PLAYER_ATTACK_POWER,
      comboCount: 0,
    };
    this.score = 0;

    super.create();

    // test enemy 생성
    // this.enemies.add(new Enemy1(this, 250, 100));
    // this.enemies.add(new Enemy1(this, 550, 100));
    // this.enemies.add(new Enemy2(this, 250, 100));
    this.enemies.add(new Enemy3(this, 550, 100));
  }

  update() {
    if (this.enemies.getChildren().length === 0 && this.player.isMoveable) {
      this.clearStage("Stage2");
    }

    super.update();
  }
}
