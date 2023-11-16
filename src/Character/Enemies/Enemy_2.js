import Phaser from "phaser";
import Enemy2_Bullet1 from "../../Effect/Enemy2_Bullet1";

export default class Enemy2 extends Phaser.Physics.Arcade.Sprite {
  // 클래스 변수(프로퍼티), 모든 인스턴스가 해당 변수를 공유할 수 있다
  static ENEMY_MOVE_DELAY = 3000;
  static ENEMY_MOVE_DISTANCE = 30;
  static ENEMY_MAX_HP = 50;
  static ENEMY_ATTACK_POWER = 20;
  static ENEMY_ATTACK_SPEED = 1000;

  constructor(scene, x, y) {
    super(scene, x, -50, "Enemies");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scene = scene;

    // 인스턴스 변수(프로퍼티), 각 인스턴스 별로 관리함
    this.currentHp = Enemy2.ENEMY_MAX_HP;
    this.attackPower = Enemy2.ENEMY_ATTACK_POWER;

    // 이동가능 플래그
    this.isMoveable = false;

    this.setScale(3);
    this.setAlpha(1);

    this.createEnemy2Animations();
    this.play("Move");

    // 물리 충돌 사이즈 조정
    this.setSize(this.width * 0.5, this.height * 0.45, true);

    this.scene.spawnEnemy(this, x, y);

    // 움직이는 이벤트 추가
    this.moveEvent = scene.time.addEvent({
      delay: Enemy2.ENEMY_MOVE_DELAY,
      callback: () => {
        this.move();
      },
      loop: true,
    });
  }

  createEnemy2Animations() {
    this.anims.create({
      key: "Move",
      frames: this.anims.generateFrameNumbers("Enemies", {
        start: 12,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "Right",
      frames: this.anims.generateFrameNumbers("Enemies", {
        start: 21,
        end: 23,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "Left",
      frames: this.anims.generateFrameNumbers("Enemies", {
        start: 18,
        end: 20,
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

  move() {
    if (this.isMoveable) {
      let x = this.scene.player.x - this.x;

      let xTarget = this.x; // xDistance를 현재 x 좌표로 초기화
      // yDistance를 현재 y 좌표에 적대적 이동 거리를 더해 초기화
      let yTarget = this.y + Enemy2.ENEMY_MOVE_DISTANCE;

      let xDistance = Math.floor(Math.random() * (40 - 20) + 20);

      // player와 x 좌표가 30이상 차이나면 x 좌표를 조정
      if (Math.abs(x) >= 30) {
        if (x < 0) {
          xTarget -= xDistance;
          this.play("Right");
        } else {
          xTarget += xDistance;
          this.play("Left");
        }
      }
      // 이후에 xDistance와 yDistance를 사용하여 객체 위치 업데이트

      this.scene.tweens.add({
        targets: this,
        x: xTarget,
        y: yTarget,
        ease: "Power1",
        duration: 2000,
        repeat: 0,
        yoyo: false,
        removeOnComplete: true,
        onComplete: () => {
          this.play("Move");
          this.shotBullet(this.attackPower);
        },
      });
    }
  }

  shotBullet(damage) {
    if (this.isMoveable) {
      let bullet = new Enemy2_Bullet1(this.scene, this, damage);
      bullet.body.velocity.y = +200;
    }
  }

  hit(damage) {
    this.currentHp -= damage;

    // Death
    if (this.currentHp <= 0) {
      this.death();
      // hit() 으로 인한 사망이면
      // 플레이어의 콤보와 스코어를 증가
      this.scene.player.comboCount += 1;
      this.scene.score += 10;
      this.scene.scoreText.setText("Score: " + this.scene.score);
    }
  }

  death() {
    // 인스턴스를 파괴하기 전 타이머 이벤트들을 제거
    if (this.moveEvent) {
      this.moveEvent.remove();
    }

    // 현재 객체에 연결된 모든 tweens를 취소하고 제거
    this.scene.tweens.killTweensOf(this);

    this.body.enable = false; // 물리적 몸체를 비활성화하여 더 이상 충돌하지 않도록 설정.

    // 애니메이션을 재생하고, 애니메이션이 완료되면 'animationcomplete' 이벤트가 발생.
    this.play("Explosion").on(
      "animationcomplete",
      () => {
        if (this.active) {
          this.destroy();
        }
      },
      this
    ); // 'this'는 콜백 내에서 Enemy2 인스턴스를 참조하기 위해 전달된다.
  }
}
