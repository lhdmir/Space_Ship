export default class HpBar extends Phaser.GameObjects.Graphics {
  constructor(scene, player, health) {
    // super(scene, this.x, this.y);
    super(scene, x, y);
    this.x = player.x;
    this.y = player.y + 30;
    const x = player.x;
    const y = player.y + 50;

    this.health = health;
    this.maxHealth = health;
    this.scene = scene;
    this.draw();
    scene.add.existing(this);
  }

  draw() {
    this.clear();
    // HP 바 배경
    this.fillStyle(0x000000);
    this.fillRect(this.x, this.y, 80, 16);
    // HP 바 전경
    const healthWidth = Math.floor((this.health / this.maxHealth) * 80);
    this.fillStyle(0xffffff);
    this.fillRect(this.x, this.y, healthWidth, 16);
  }

  updateHealth(newHealth) {
    this.health = newHealth;
    this.draw();
  }
}
