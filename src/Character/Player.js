export const Direction = Object.freeze({
  Up: "Up",
  Down: "Down",
  Left: "Left",
  Right: "Right",
});

export default class Player extends Phaser.Physics.Arcade.Sprite {
  static PLAYER_SPEED = 5;

  constructor(scene) {
    super(scene, 400, 600, "Player");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // 사이즈 원본 2.5
    this.scale = 2.5;
    this.alpha = 1;

    // 애니메이션 생성
    this.createAnimations();

    // 최초 재생 애니메이션 Idle 설정
    this.play("Idle");
  }

  createAnimations() {
    // 애니메이션 생성
    this.anims.create({
      // 애니메이션 이름
      key: "Idle",
      // Player라는 스프라이트를 가지고와서 0번째부터 3번째까지 재생
      frames: this.anims.generateFrameNumbers("Player", { start: 0, end: 3 }),
      // 초당 프레임 재생수
      frameRate: 10,
      // 무한반복
      repeat: -1,
    });
    this.anims.create({
      key: "Right",
      frames: this.anims.generateFrameNumbers("Player", { start: 12, end: 14 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "Left",
      frames: this.anims.generateFrameNumbers("Player", { start: 24, end: 26 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "Die",
      frames: this.anims.generateFrameNumbers("Player", { start: 36, end: 44 }),
      frameRate: 10,
      repeat: 0, //repeat 삭제
    });
    this.anims.create({
      key: "Clear",
      frames: this.anims.generateFrameNumbers("Player", { start: 48, end: 59 }),
      frameRate: 10,
      repeat: 0, //repeat 삭제
    });
  }

  move(direction) {
    switch (direction) {
      case Direction.Up:
        this.y -= Player.PLAYER_SPEED;
        break;

      case Direction.Down:
        this.y += Player.PLAYER_SPEED;
        break;

      case Direction.Left:
        this.x -= Player.PLAYER_SPEED;
        this.flipX = true;
        break;

      case Direction.Right:
        this.x += Player.PLAYER_SPEED;
        this.flipX = false;
        break;
    }
  }
}
