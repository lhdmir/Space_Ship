import Phaser from "phaser";

// base import
import { createBackground } from "../base/baseModule";

// 방향정의 오브젝트 import
import { Direction } from "../base/baseModule";

// Player Class import
import Player from "../Character/Player";

// Player_Bullet Class import
import Player_Bullet from "../Effect/Player_Bullet";

// Image import

// Background Image
import Background_Image from "../Asset/Background/Space.png";
// Player Image
import Player_Image from "../Asset/Player/Ship.png";
import Bullet_Image from "../Asset/Player/Bullet.png";
// Enemies Image
import Enemies_Image from "../Asset/Enemy/Enemies.png";
import Enemies_Explosion_Image from "../Asset/Enemy/Enemy_Explosion.png";
// Boss Image
import Boss_Image from "../Asset/Enemy/Boss_2.png";
import Boss_Bullet_Image from "../Asset/Enemy/Boss_Bullet.png";
import Boss_Explosion_Image from "../Asset/Enemy/Boss_Explosion.png";

// Default Stage Class
export default class BaseStage extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  preload() {
    this.loadAsset();
  }

  create() {
    this.physics.world.createDebugGraphic();

    // background 생성
    createBackground(this);

    // 키 할당
    this.assignKeys();

    // 플레이어 생성
    this.createPlayer(
      this,
      this.playerData.currentHp,
      this.playerData.attackPower,
      this.playerData.comboCount
    );

    // 적 그룹 생성
    this.createEnemyGroup();

    // 충돌 이벤트 생성
    this.collisionEvent();

    // dead zone 생성
    this.createDeadZone();

    // Score UI 생성
    this.createScoreUI();

    // ScoreUp Event Listener 생성
    this.createScoreUpEventListener();
  }

  update() {
    this.bg.tilePositionY -= 2; // 숫자 2는 스크롤 속도를 조절.

    // 스폰이 완료되면 실행
    if (this.player.isMoveable) {
      // 움직임 관리
      this.handlePlayerMove();

      // 애니메이션 관리
      this.handlePlayerAnimations();
    }
  }

  loadAsset() {
    // 배경 로드
    this.load.image("Background_Image", Background_Image);

    // 플레이어 스프라이트시트를 Player 라는 이름으로 로드, 각 장당 32*32 사이즈로 자름
    this.load.spritesheet("Player", Player_Image, {
      frameWidth: 32,
      frameHeight: 32,
    });

    // Bullet 스프라이트시트를 Bullets 라는 이름으로 로드
    this.load.spritesheet("Bullets", Bullet_Image, {
      frameWidth: 32,
      frameHeight: 32,
    });

    // Enemy 스프라이트시트를 Enemies 라는 이름으로 로드
    this.load.spritesheet("Enemies", Enemies_Image, {
      frameWidth: 32,
      frameHeight: 32,
    });

    // Enemy Explosion 스프라이트시트 로드
    this.load.spritesheet("Enemy_Explosion", Enemies_Explosion_Image, {
      frameWidth: 32,
      frameHeight: 32,
    });

    // 보스 스프라이트는 따로 로드
    // Boss 스프라이트시트 로드
    this.load.spritesheet("Boss", Boss_Image, {
      frameWidth: 64,
      frameHeight: 64,
    });
    // Boss Bullet 로드
    this.load.spritesheet("Boss_Bullet", Boss_Bullet_Image, {
      frameWidth: 16,
      frameHeight: 16,
    });
    // Boss Explosion 로드
    this.load.spritesheet("Boss_Explosion", Boss_Explosion_Image, {
      frameWidth: 64,
      frameHeight: 64,
    });
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

  createPlayer(scene, currentHp, attackPower, comboCount) {
    // 플레이어 생성
    this.player = new Player(scene, currentHp, attackPower, comboCount);

    // 물리 이벤트를 위해서 플레이어를 그룹에 추가
    this.playerGroup = this.physics.add.group({
      runChildUpdate: true,
    });
    this.playerGroup.add(this.player);

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
  }

  createEnemyGroup() {
    // Enemy Bullets 그룸 생성
    this.enemy_bullet = this.physics.add.group({
      runChildUpdate: true,
    });

    // Enemy 그룹 생성
    this.enemies = this.physics.add.group({
      runChildUpdate: true,
    });

    // rush Enemy Group
    this.rushEnemies = this.physics.add.group({
      runChildUpdate: true,
    });
  }

  collisionEvent() {
    // 충돌 이벤트

    // 플레이어의 총알 그룹에 있는 객체와 적 개체가 충돌(overlap)
    // 되었을때 실행할 물리이벤트 등록
    this.physics.add.overlap(
      this.player_bullet,
      this.enemies,
      (bullet, enemy) => {
        bullet.destroy(); // 총알 제거
        enemy.hit(bullet.damage); // 적에게 피해를 줌
        this.hitBlink(enemy); //피격 이펙트
      }
    );

    // Enemy의 총알 그룹에 있는 객체와 플레이어가 충돌시
    // 실행할 물리이벤트 등록
    this.physics.add.overlap(
      this.enemy_bullet,
      this.playerGroup,
      (bullet, player) => {
        bullet.destroy(); // 총알 제거
        player.hit(bullet.damage);
        this.hitBlink(player);
      }
    );

    // Bullet끼리 충돌시 상쇄
    this.physics.add.overlap(
      this.player_bullet,
      this.enemy_bullet,
      (pBullet, eBullet) => {
        // 데미지가 서로 같다면 상쇄
        if (pBullet.damage == eBullet.damage) {
          pBullet.destroy();
          eBullet.destroy();
        }
        // 플레이어가 더 높다면 플레이어의 총알 공격력을 적 데미지만큼 감소시키고
        // 적 총알은 삭제
        else if (pBullet.damage > eBullet.damage) {
          pBullet.damage -= eBullet.damage;
          eBullet.destroy();
        }
        // 반대의 경우
        else if (eBullet.damage > pBullet.damage) {
          eBullet.damage -= pBullet.damage;
          pBullet.destroy();
        }
      }
    );

    // rush Enemy 와 충돌시 이벤트
    this.physics.add.overlap(
      this.rushEnemies,
      this.playerGroup,
      (enemy, player) => {
        if (enemy.isAttacking) {
          enemy.death(); // enemy 사망
          player.hit(enemy.attackPower);
          this.hitBlink(player);
        }
      }
    );
  }

  createDeadZone() {
    // x: 400, y: 700의 위치에 800*10 size의 deadzone을 생성
    this.deadZone = this.add.zone(400, 700, 800, 10);
    this.physics.world.enable(this.deadZone);

    this.physics.add.overlap(this.deadZone, this.enemies, (deadZone, enemy) => {
      enemy.death();
      this.player.hit(enemy.attackPower);
      this.hitBlink(this.player); //피격 이펙트
    });
  }

  createScoreUI() {
    // 인게임에서 사용하는 스코어 UI
    this.scoreText = this.add.text(16, 650, "Score: " + this.score, {
      fontFamily: "NeoDunggeunmo",
      fontSize: "24px",
      fill: "#fff",
    });
  }

  createScoreUpEventListener() {
    this.scoreUpEvent = new Phaser.Events.EventEmitter();
    this.scoreUpEvent.on("ScoreUp", () => {
      this.score += 10;
      this.scoreText.setText("Score: " + this.score);
    });
  }

  hitBlink(sprite) {
    // hit 했을때 깜빡거리는 효과
    this.tweens.add({
      targets: sprite,
      alpha: { from: 1, to: 0.2 },
      duration: 100,
      ease: "Linear",
      repeat: 1,
      yoyo: true,
    });
  }

  clearStage(stage) {
    // 플레이어 데이터 오브젝트 생성
    let playerData = {
      currentHp: this.player.currentHp,
      attackPower: this.player.attackPower,
      comboCount: this.player.comboCount,
    };
    // 플레이어 데이터 저장
    this.game.registry.set("playerData", playerData);

    // 스코어 저장
    this.game.registry.set("score", this.score);

    // 이동 플레그 설정
    this.player.isMoveable = false;

    // 체력바 비활성화
    this.player.healthBar.setAlpha(0);

    // 1초후 clear애니메이션 재생
    // 애니메이션 재생이 끝나면 다음 스테이지 시작
    setTimeout(() => {
      this.player.play("Clear").on("animationcomplete", () => {
        this.player.setActive(false);
        this.player.setAlpha(0);
        setTimeout(() => {
          this.scene.start(stage);
        }, 1000);
      });
    }, 1000);
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
