import Phaser from "phaser";

export default class Enemy3 extends Phaser.Physics.Arcade.Sprite {
  static ENEMY_MAX_HP = 40;
  static ENEMY_ATTACK_POWER = 40;

  constructor(scene, x, y) {
    super(scene, x, -50, "Enemies");

    this.scene = scene;

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.currentHp = Enemy3.ENEMY_MAX_HP;
    this.attackPower = Enemy3.ENEMY_ATTACK_POWER;

    this.isMoveable = false;
    this.isAttacking = false;

    this.setScale(3);
    this.setAlpha(1);

    this.setSize(this.width * 0.5, this.height * 0.45, true);

    this.scene.spawnEnemy(this, x, y);

    this.createEnemy3Animations();
    this.play("Move");

    this.scene.rushEnemies.add(this);

    this.attackTimer = setTimeout(() => {
      this.isAttacking = true;
      this.setVelocityY(300);
      this.play("Attack");
    }, 5000);
  }

  createEnemy3Animations() {
    this.anims.create({
      key: "Move",
      frames: this.anims.generateFrameNumbers("Enemies", {
        start: 30,
        end: 33,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "Attack",
      frames: this.anims.generateFrameNumbers("Enemies", {
        start: 36,
        end: 37,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "Explosion",
      frames: this.anims.generateFrameNumbers("Enemy_Explosion", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: 0,
    });
  }

  hit(damage) {
    this.currentHp -= damage;

    // Death
    if (this.currentHp <= 0) {
      this.death();
      // hit() 으로 인한 사망이면
      // 플레이어의 콤보와 스코어를 증가
      // ScoreUp() 이라는 함수로 재정의 해서 분리
      this.scene.player.comboCount += 1;
      this.scene.score += 10;
      this.scene.scoreText.setText("Score: " + this.scene.score);
    }
  }

  death() {
    if (this.attackTimer) {
      clearTimeout(this.attackTimer);
    }
    this.isAttacking = false;

    this.body.enable = false; // 물리적 몸체를 비활성화하여 더 이상 충돌하지 않도록 설정.

    // 애니메이션을 재생하고, 애니메이션이 완료되면 'animationcomplete' 이벤트가 발생.
    this.play("Explosion").on(
      "animationcomplete",
      () => {
        this.destroy();
      },
      this
    ); // 'this'는 콜백 내에서 Enemy1 인스턴스를 참조하기 위해 전달된다.
  }
}
