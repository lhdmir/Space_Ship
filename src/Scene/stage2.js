// Base Stage import
import BaseStage from "../base/baseStage";

// Enemy Class import
import Enemy1 from "../Character/Enemies/Enemy_1";

export default class Stage2 extends BaseStage {
  constructor() {
    super({ key: "Stage2" });
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
    this.enemies.add(new Enemy1(this, 400, 50));
    this.enemies.add(new Enemy1(this, 700, 50));
  }

  update() {
    if (this.enemies.getChildren().length === 0 && this.player.isMoveable) {
      this.clearStage("Stage3");
    }

    super.update();
  }
}
