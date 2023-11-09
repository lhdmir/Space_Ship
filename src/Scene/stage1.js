import Phaser from "phaser";

// base 의 createBackground 함수 import
import { createBackground, hitBlink } from "../base/base";

// 플레이어 클래스 import
import Player from "../Character/Player";
import Player_Bullet from "../Effect/Player_Bullet";

// 방향정의 오브젝트 import
import { Direction } from "../base/base";

// Enemy 클래스 import
import Enemy1 from "../Character/Enemies/Enemy_1";
import Enemy1_Bullet from "../Effect/Enemy1_Bullet";

// width: 800,
// height: 700,
export default class Stage1 extends Phaser.Scene {
  constructor() {
    super({ key: "Stage1" });
  }

  preload() {
    // 배경 로드
    this.load.image("Background_Image", "./Asset/Space.png");

    // 플레이어 스프라이트시트를 Player 라는 이름으로 로드, 각 장당 32*32 사이즈로 자름
    this.load.spritesheet("Player", "./Asset/Ship.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    // Bullet 스프라이트시트를 Bullets 라는 이름으로 로드
    this.load.spritesheet("Bullets", "./Asset/Bullet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    // Enemy 스프라이트시트를 Enemies 라는 이름으로 로드
    this.load.spritesheet("Enemies", "./Asset/Enemies.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    // Enemy Explosion 스프라이트시트 로드
    this.load.spritesheet("Enemy_Explosion", "./Asset/Enemy_Explosion.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.physics.world.createDebugGraphic();

    // background 생성
    createBackground(this);

    // 키 할당
    this.assignKeys();

    // 플레이어 생성
    this.playerGroup = this.physics.add.group();
    this.player = new Player(this);
    this.playerGroup.add(this.player);
    this.player.setCollideWorldBounds(true);

    // 플레이어 생성 후 Spawn 재생
    // Spawn 재생이 끝나면 Idle을 재생하고 spawn플래그를 false로 변경
    this.player.play("Spawn").on(
      "animationcomplete",
      () => {
        this.player.play("Idle");
        this.player.isMoveable = true; // Spawn 애니메이션이 끝났음을 나타냄
      },
      this
    );

    // Player Bullets 그룹 생성
    this.player_bullet = this.physics.add.group({
      classType: Player_Bullet, // 해당 그룹의 타입은 Player_Bullet 클래스만
      runChildUpdate: true, // 각 총알의 update() 메소드를 자동으로 호출
    });

    // Enemy Bullets 그룸 생성
    this.enemy_bullet = this.physics.add.group({
      classType: Enemy1_Bullet,
      runChildUpdate: true,
    });

    // Enemy 그룹 생성
    this.enemies = this.physics.add.group();

    // test enemy 생성
    // 아래와 같이 Enemy를 생성할 수 있음
    // this.enemy1 = new Enemy1(this, 700, 50);
    // this.enemies.add(this.enemy1);
    this.enemies.add(new Enemy1(this, 100, 50));
    this.enemies.add(new Enemy1(this, 400, 50));
    this.enemies.add(new Enemy1(this, 700, 50));

    // 플레이어의 총알 그룹에 있는 객체와 적 개체가 충돌(overlap)
    // 되었을때 실행할 물리이벤트 등록
    this.physics.add.overlap(
      this.player_bullet,
      this.enemies,
      (bullet, enemy) => {
        bullet.destroy(); // 총알 제거
        enemy.hit(10); // 적에게 피해를 줌 (예: 10의 피해)
        hitBlink(this, enemy); //피격 이펙트
      }
    );

    // Enemy의 총알 그룹에 있는 객체와 플레이어가 충돌시
    // 실행할 물리이벤트 등록
    this.physics.add.overlap(
      this.enemy_bullet,
      this.playerGroup,
      (bullet, player) => {
        bullet.destroy(); // 총알 제거
        player.hit(10); // 플레이어 10 피해
        hitBlink(this, player); //피격 이펙트
      }
    );

    // Bullet끼리 충돌시 상쇄
    this.physics.add.overlap(
      this.player_bullet,
      this.enemy_bullet,
      (pBullet, eBullet) => {
        pBullet.destroy();
        eBullet.destroy();
      }
    );
  }

  update() {
    this.bg.tilePositionY -= 2; // 숫자 2는 스크롤 속도를 조절.

    // 스폰이 완료되면 실행
    if (this.player.isAlive) {
      if (this.player.isMoveable) {
        // 움직임 관리
        this.handlePlayerMove();

        // 애니메이션 관리
        this.handlePlayerAnimations();
      }
    }
  }

  assignKeys() {
    // 사용할 키를 변수에 할당
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    this.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
  }

  handlePlayerAnimations() {
    // 애니메이션 재생 관리

    // A가 눌러져있고, D는 눌러져있지 않은 상태에서 현재 재생중인 애니메이션이 Left가 아니라면
    // Left를 재생
    if (
      this.keyA.isDown &&
      !this.keyD.isDown &&
      this.player.anims.currentAnim.key !== "Left"
    ) {
      this.player.play("Left");
    }
    // D가 눌러져있고, A는 눌러져있지 않은 상태에서 현재 재생중인 애니메이션이 Right가 아니라면
    // Right를 재생
    else if (
      !this.keyA.isDown &&
      this.keyD.isDown &&
      this.player.anims.currentAnim.key !== "Right"
    ) {
      this.player.play("Right");
    }
    // 좌,우 이동이 입력되지 않았을 때 또는 좌,우 이동이 모두 입력되었을 때
    else if (
      (!this.keyA.isDown && !this.keyD.isDown) ||
      (this.keyA.isDown && this.keyD.isDown)
    ) {
      // 현재 재생중인 애니메이션이 Idle이 아니라면 Idle 재생
      if (this.player.anims.currentAnim.key !== "Idle") {
        this.player.play("Idle");
      }
    }

    // this.player.anims.currentAnim.key !== 해당 조건이 없다면
    // 키를 계속 입력받을때마다 애니메이션을 재생해서 애니메이션의 첫화면만 계속 재생된다.
    // 결국 애니메이션이 재생되지 않고 멈춘것으로 보이기때문에
    // 현재 재생중인 애니메이션과 재생할려는 애니메이션이 똑같다면 굳이 새로 애니메이션을 재생하지 않고
    // 현재 무한 재생중인 애니메이션을 계속 재생하는것이 효율적이다.
    // 이것은 애니메이션이 무한재생일때 가능한 조건이다.
  }

  handlePlayerMove() {
    // W,A,S,D 키가 눌렀다면 move함수에 해당 방향을 매개변수로 호출
    if (this.keyA.isDown) {
      this.player.move(Direction.Left);
    }
    if (this.keyD.isDown) {
      this.player.move(Direction.Right);
    }
    if (this.keyW.isDown) {
      this.player.move(Direction.Up);
    }
    if (this.keyS.isDown) {
      this.player.move(Direction.Down);
    }
  }
}
