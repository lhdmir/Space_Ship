import Player from "../Character/Player";

export default class HealthBar extends Phaser.GameObjects.Graphics {
  // HealthBar의 가로길이
  static WIDTH = 80;
  // HealthBar의 세로길이
  static HEIGHT = 16;
  // HealthBar의 여백
  static BORDER = 2;

  constructor(scene, player) {
    super(scene);

    // 최대 체력 저장
    this.maxHp = Player.MAX_HP;
    // 현재 체력 저장
    this.currentHp = player.currentHp;

    // 초기 위치 설정
    this.setPosition(player.x - 40, player.y + 60);

    // 체력바를 그려줄 비율
    this.maxHpRatio = (HealthBar.WIDTH - 2 * HealthBar.BORDER) / this.maxHp;

    // 체력바 그리기
    this.draw();

    this.scene.add.existing(this); // 씬에 객체 추가
  }

  decrease(amount) {
    // 현재체력을 amount만큼 감소
    this.currentHp -= amount;
    if (this.currentHp < 0) {
      this.currentHp = 0;
    }

    this.draw();
  }

  draw() {
    // 체력바 초기화
    this.clear();

    // 백그라운드(블랙)
    // 색 설정(블랙)
    this.fillStyle(0x000000);
    // 사각형 채우기
    // 좌표는 0, 0부터 시작, HealthBar의 WIDTH,HEIGHT 만큼 채우기
    this.fillRect(0, 0, HealthBar.WIDTH, HealthBar.HEIGHT);

    // 테두리(실버)
    // 두께: HealthBar.BORDER, 색: 실버
    this.lineStyle(HealthBar.BORDER, 0xa9a9a9);
    // 테두리 그리기
    // 좌표는 0, 0부터 시작, HealthBar의 WIDTH,HEIGHT 만큼 그리기
    this.strokeRect(0, 0, HealthBar.WIDTH, HealthBar.HEIGHT);

    // 체력바 색 결정
    if (this.currentHp <= 30) {
      // 30이하일때 color : red
      this.fillStyle(0xff0000);
    } else if (this.currentHp <= 60) {
      // 60이하일때 color : orange
      this.fillStyle(0xff8c00);
    } else {
      // 기본 color : green
      this.fillStyle(0x00ff00);
    }

    // 체력바
    // displayHp는 현재체력 * 체력바비율
    var displayHp = Math.floor(this.maxHpRatio * this.currentHp);
    // 체력바 그리기
    this.fillRect(
      // 시작위치는 BORDER 만큼 띄워서 그림
      HealthBar.BORDER,
      HealthBar.BORDER,
      // 가로길이는 displayHp 만큼
      displayHp,
      // 세로길이는 HEIGHT의 아래, 위를 BORDER 만큼 뺀 값만큼
      HealthBar.HEIGHT - 2 * HealthBar.BORDER
    );
  }

  positionUpdate(player) {
    // 플레이어의 위치에 따라 체력바의 위치를 업데이트
    this.setPosition(player.x - 40, player.y + 60);
  }
}
