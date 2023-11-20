import Phaser from "phaser";

// baseEnemy 정의
export default class baseEnemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    // 자식 클래스의 인스턴트가 생성될때 x,y 좌표를 받아서
    // 생성자를 실행
    super(scene, x, -50);

    // 매개변수로 받은 씬의 정보를 저장
    this.scene = scene;

    // 객체를 해당 씬에 추가
    this.scene.add.existing(this);
    // 객체를 물리엔진에 추가
    this.scene.physics.add.existing(this);

    // 움직임 상태 플레그
    this.isMoveable = false;

    // 크기조정
    this.setScale(3);
    // alpha값 조정(0~1 사이의 값)  1: 불투명, 0: 투명
    this.setAlpha(1);

    // 스폰 효과
    // 효과를 적용할 객체, 이동할 x좌표, 이동할 y좌표
    this.spawnEnemy(this, x, y);

    // enemies 그룹에 추가
    this.scene.enemies.add(this);
  }

  hit(damage) {
    // hit 했을때 현재 체력 감소
    this.currentHp -= damage;

    // Death
    if (this.currentHp <= 0) {
      // 체력이 0 이하로 떨어지면 사망.
      this.death();

      // hit() 으로 인한 사망이면
      // scene의 scoreUpEvent 오브젝트에 ScoreUp 이벤트 전송
      this.scene.scoreUpEvent.emit("ScoreUp");
      // player의 comboCountUpEvent 오브젝트에 ComboCountUp 이벤트 전송
      this.scene.player.comboCountUpEvent.emit("ComboCountUp");
    }
  }

  death() {
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
    ); // 'this'는 콜백 내에서 인스턴스를 참조하기 위해 전달된다.
  }

  spawnEnemy(enemy, x, y) {
    // 스폰 효과
    // 해당 좌표까지 객체를 이동
    this.scene.tweens.add({
      targets: enemy,
      x: x,
      y: y,
      ease: "Power1", // 움직임의 속도 곡선
      duration: 2000, // 2000 밀리초 동안 진행
      repeat: 0, // 반복 횟수 (0은 반복하지 않음)
      yoyo: false, // 원래 위치로 돌아갈지 여부
      onComplete: () => {
        enemy.isMoveable = true;
      },
    });
  }
}
