// Base Stage import
import BaseStage from "./baseStage";

// Enemy Class import
import Enemy1 from "../Character/Enemy/Enemy_1.js";
import Enemy2 from "../Character/Enemy/Enemy_2.js";
import Enemy3 from "../Character/Enemy/Enemy_3.js";
import Enemy4 from "../Character/Enemy/Enemy_4.js";

// Boss Class import
import BossEnemy from "../Character/Boss.js";

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
    new Enemy1(this, 100, 50);
    new Enemy3(this, 250, 100);
    new Enemy2(this, 400, 50);
    new Enemy3(this, 550, 100);
    new Enemy1(this, 700, 50);
  }

  update() {
    if (this.enemies.getChildren().length === 0 && this.player.isMoveable) {
      this.clearStage("Stage2");
    }

    super.update();
  }
}
