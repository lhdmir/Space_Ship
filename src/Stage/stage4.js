// Base Stage import
import BaseStage from "./baseStage";

// Enemy Class import
import Enemy1 from "../Character/Enemy/Enemy_1";
import Enemy2 from "../Character/Enemy/Enemy_2";
import Enemy3 from "../Character/Enemy/Enemy_3";
import Enemy4 from "../Character/Enemy/Enemy_4";
import BossEnemy from "../Character/Boss";

export default class Stage4 extends BaseStage {
  constructor() {
    super({ key: "Stage4" });
  }

  preload() {
    super.preload();
  }

  create() {
    // 데이터 로드
    this.playerData = this.game.registry.get("playerData");
    this.score = this.game.registry.get("score");

    super.create();

    // test enemy 생성
    new BossEnemy(this, 400, 100);
  }

  update() {
    if (this.enemies.getChildren().length === 0 && this.player.isMoveable) {
      this.clearStage("gameClearScene");
    }

    super.update();
  }
}
