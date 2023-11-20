// Base Stage import
import BaseStage from "./baseStage";

// Enemy Class import
import Enemy1 from "../Character/Enemies/Enemy_1";
import Enemy2 from "../Character/Enemies/Enemy_2";
import Enemy3 from "../Character/Enemies/Enemy_3";

export default class Stage3 extends BaseStage {
  constructor() {
    super({ key: "Stage3" });
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
    this.enemies.add(new Enemy1(this, 100, 50));
    this.enemies.add(new Enemy2(this, 250, 100));
    this.enemies.add(new Enemy3(this, 400, 50));
    this.enemies.add(new Enemy2(this, 550, 100));
    this.enemies.add(new Enemy1(this, 700, 50));
  }

  update() {
    if (this.enemies.getChildren().length === 0 && this.player.isMoveable) {
      this.clearStage("gameClearScene");
    }

    super.update();
  }
}
