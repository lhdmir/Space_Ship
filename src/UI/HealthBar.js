import Player from "../Character/Player";

export default class HealthBar extends Phaser.GameObjects.Graphics {
  static WIDTH = 80;
  static HEIGHT = 16;
  static BORDER = 2;

  constructor(scene, player) {
    super(scene);

    this.maxHp = Player.PLAYER_MAX_HP;
    this.currentHp = player.currentHp;

    this.setPosition(player.x - 40, player.y + 60);

    // 체력바를 그려줄 비율
    this.maxHpRatio = (HealthBar.WIDTH - 2 * HealthBar.BORDER) / this.maxHp;

    this.draw();

    this.scene.add.existing(this); // 씬에 객체 추가
  }

  decrease(amount) {
    this.currentHp -= amount;
    if (this.currentHp < 0) {
      this.currentHp = 0;
    }
    this.draw();
  }

  draw() {
    this.clear();

    // 테두리(실버)
    this.fillStyle(0xa9a9a9);
    this.fillRect(0, 0, HealthBar.WIDTH, HealthBar.HEIGHT); // 좌표는 0, 0부터 시작

    // 백그라운드(블랙)
    this.fillStyle(0x000000);
    this.fillRect(
      HealthBar.BORDER,
      HealthBar.BORDER,
      HealthBar.WIDTH - 2 * HealthBar.BORDER,
      HealthBar.HEIGHT - 2 * HealthBar.BORDER
    );

    // 체력바 색 결정
    if (this.currentHp <= 30) {
      this.fillStyle(0xff0000);
    } else if (this.currentHp <= 60) {
      this.fillStyle(0xff8c00);
    } else {
      this.fillStyle(0x00ff00);
    }

    // 체력바
    var displayHp = Math.floor(this.maxHpRatio * this.currentHp);
    this.fillRect(
      HealthBar.BORDER,
      HealthBar.BORDER,
      displayHp,
      HealthBar.HEIGHT - 2 * HealthBar.BORDER
    ); // 좌표는 0, 0부터 시작
  }

  positionUpdate(player) {
    // 플레이어의 위치에 따라 체력바의 위치를 업데이트
    this.setPosition(player.x - 40, player.y + 60);
  }
}
