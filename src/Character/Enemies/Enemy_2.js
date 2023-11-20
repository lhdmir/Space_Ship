import baseEnemy from "../baseEnemy";

import Enemy2_Bullet1 from "../../Effect/Enemy2_Bullet1";

export default class Enemy2 extends baseEnemy {
  // 클래스 변수(프로퍼티), 모든 인스턴스가 해당 변수를 공유할 수 있다

  // 최대 체력
  static MAX_HP = 50;
  // 공격력
  static ATTACK_POWER = 20;
  // 다음 이동까지 딜레이 시간(단위: ms)
  static MOVE_DELAY = 3000;
  // 이동 거리
  static MOVE_DISTANCE = 30;

  constructor(scene, x, y) {
    super(scene, x, y);

    // 물리 충돌 사이즈 조정
    this.setSize(this.width * 0.5, this.height * 0.45, true);

    // 인스턴스 변수(프로퍼티), 각 인스턴스 별로 관리함
    this.currentHp = Enemy2.MAX_HP;
    this.attackPower = Enemy2.ATTACK_POWER;

    // 애니메이션 생성
    this.createEnemy2Animations();
    // 처음 애니메이션 재생
    this.play("Move");

    // 움직이는 이벤트 추가
    this.startMoveEvent();
  }

  startMoveEvent() {
    // MOVE_DELAY 에 한번씩 실행할 움직임 이벤트 등록
    this.moveEvent = this.scene.time.addEvent({
      delay: Enemy2.MOVE_DELAY,
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
    // 이동 실행 함수

    // 이동 가능 상태일때 실행 가능
    if (this.isMoveable) {
      // 현재 오브젝트의 x좌표 와 플레이어의 x좌표의 차
      let { targetX, targetY } = this.calculateTargetPosition();

      // 이후에 targetX와 targetY를 사용하여 객체 위치 업데이트
      this.scene.tweens.add({
        targets: this,
        x: targetX,
        y: targetY,
        ease: "Power1",
        duration: 2000,
        repeat: 0,
        yoyo: false,
        removeOnComplete: true,
        onComplete: () => {
          // 이동이 완료되면 애니메이션을 Move로 변경후
          // 공격실행
          this.play("Move");
          this.shootBullet(this.attackPower);
        },
      });
    }
  }

  calculateTargetPosition() {
    let deltaX = this.scene.player.x - this.x;

    // 목표 좌표 설정
    // xTarget를 현재 x 좌표로 초기화
    let targetX = this.x;
    // yTarget를 현재 y 좌표에 적대적 이동 거리를 더해 초기화
    let targetY = this.y + Enemy2.MOVE_DISTANCE;

    // x축으로 이동할 거리를 20~40 사이로 설정
    let distanceX = Math.floor(Math.random() * (40 - 20) + 20);

    // 좌상단(0,0)    우상단(800,0)
    // 좌하단(0,750)  우하단(800,750)
    // player와 x 좌표가 30이상 차이나면 x 좌표를 조정
    if (Math.abs(deltaX) >= 30) {
      // 플레이어를 마주보는 것이 기준일때
      // x가 0보다 작다는것은 현재 위치보다 플레이어가 오른쪽에 있다는것.
      // 고로 x축 이동 거리를 -조정
      if (deltaX < 0) {
        targetX -= distanceX;
        this.play("Right");
      }

      // 반대도 마찬가지
      else {
        targetX += distanceX;
        this.play("Left");
      }
    }
    return { targetX, targetY };
  }

  shootBullet(damage) {
    // 이동이 가능할때만 실행
    if (this.isMoveable) {
      // 새로운 bullet 객체를 생성
      let bullet = new Enemy2_Bullet1(this.scene, this, damage);
      // 이동속도 조정
      bullet.body.velocity.y = +200;
    }
  }

  death() {
    // 인스턴스를 파괴하기 전 이벤트들을 제거
    if (this.moveEvent) {
      this.moveEvent.remove();
    }

    // 현재 객체에 연결된 모든 tweens를 취소하고 제거
    this.scene.tweens.killTweensOf(this);

    super.death();
  }
}
