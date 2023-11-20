import Phaser from "phaser";

import Enemy2_Bullet2 from "./Enemy2_Bullet2";

export default class Enemy2_Bullet1 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, enemy, damage) {
    // 총알의 x좌표를 enemy의 x좌표로 설정
    const x = enemy.x;
    // 총알의 y좌표를 enemy의 y좌표 + 30 으로 설정
    const y = enemy.y + 30;

    // 좌표를 토대로 생성
    super(scene, x, y);

    // 생성할 때 받은 scene의 정보 저장
    this.scene = scene;

    // 현재 씬에 총알 추가
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);

    // Bullet 애니메이션 생성
    this.createEnemy2_BulletAnimation1();

    // 총알 초기 설정
    this.damage = damage;
    this.play("Enemy2_Bullet1");
    this.setScale(3);

    // 물리 충돌 사이즈 조정
    this.setSize(this.width * 0.2, this.height * 0.2, true);

    // Bullet 분리
    this.bulletSplit();

    // Enemy의 bullet그룹에 오브젝트 추가
    this.scene.enemy_bullet.add(this);
  }

  bulletSplit() {
    // 1초에서 2초 사이에 랜덤하게 분리됨
    let splitTimeLimit = Math.floor(Math.random() * (2000 - 1000) + 1000);
    setTimeout(() => {
      // 해당 객체가 active 상태일때만 실행
      if (this.active) {
        // 분리된 bullet의 왼쪽 부분 생성, 1은 왼쪽 방향
        let bulletLeft = new Enemy2_Bullet2(this.scene, this, 1, this.damage);
        bulletLeft.body.velocity.x = +200;

        // 분리된 bullet의 오른쪽 부분 생성, -1은 오른쪽 방향
        let bulletRight = new Enemy2_Bullet2(this.scene, this, -1, this.damage);
        bulletRight.body.velocity.x = -200;

        // 분리가 끝나면 해당 오브젝트는 삭제
        this.destroy();
      }
    }, splitTimeLimit);
  }

  update() {
    // 총알이 화면 밖으로 나가면 제거
    if (this.y > 700) {
      this.destroy();
    }
  }

  // Bullet 애니메이션 생성
  createEnemy2_BulletAnimation1() {
    this.anims.create({
      key: "Enemy2_Bullet1",
      frames: this.anims.generateFrameNumbers("Enemies", {
        start: 24,
        end: 27,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
