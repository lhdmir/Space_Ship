// Base Stage import
import BaseStage from "./baseStage";

// Enemy Class import
import Enemy1 from "../Character/Enemies/Enemy_1.js";
import Enemy2 from "../Character/Enemies/Enemy_2";
import Enemy3 from "../Character/Enemies/Enemy_3";
import Enemy4 from "../Character/Enemies/Enemy_4.js";

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
    // new Enemy1(this, 100, 100);
    // new Enemy2(this, 400, 100);
    // new Enemy3(this, 700, 100);
    // new Enemy4(this, 100, 100);
    // new Enemy4(this, 200, 100);
    // new Enemy4(this, 300, 100);
    // new Enemy4(this, 400, 100);
    // new Enemy4(this, 500, 100);
    // new Enemy4(this, 600, 100);
    new Enemy4(this, 700, 100);
  }

  update() {
    if (this.enemies.getChildren().length === 0 && this.player.isMoveable) {
      this.clearStage("Stage2");
    }

    super.update();
  }
}
