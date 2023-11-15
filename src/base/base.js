import Phaser from "phaser";

// 플레이어 클래스 import
import Player from "../Character/Player";
import Player_Bullet from "../Effect/Player_Bullet";

// Enemy 클래스 import
import Enemy1_Bullet from "../Effect/Enemy1_Bullet";

// 각 씬에서 공통적으로 필요한 모듈들
export function loadAsset(scene) {
  // 배경 로드
  scene.load.image("Background_Image", "./Asset/Space.png");

  // 플레이어 스프라이트시트를 Player 라는 이름으로 로드, 각 장당 32*32 사이즈로 자름
  scene.load.spritesheet("Player", "./Asset/Ship.png", {
    frameWidth: 32,
    frameHeight: 32,
  });

  // Bullet 스프라이트시트를 Bullets 라는 이름으로 로드
  scene.load.spritesheet("Bullets", "./Asset/Bullet.png", {
    frameWidth: 32,
    frameHeight: 32,
  });

  // Enemy 스프라이트시트를 Enemies 라는 이름으로 로드
  scene.load.spritesheet("Enemies", "./Asset/Enemies.png", {
    frameWidth: 32,
    frameHeight: 32,
  });

  // Enemy Explosion 스프라이트시트 로드
  scene.load.spritesheet("Enemy_Explosion", "./Asset/Enemy_Explosion.png", {
    frameWidth: 32,
    frameHeight: 32,
  });
}

export function createBackground(scene) {
  // background 생성 함수
  // export 키워드로 다른 파일에서 import 해서 사용할 수 있도록 함.
  // 씬을 매개변수로 받음

  // 매개변수로 받은 씬 내부에 bg 변수를 생성하여 타일 스프라이트를 저장
  scene.bg = scene.add.tileSprite(
    // tileSprite의 x, y 위치. 여기서는 게임 화면의 왼쪽 상단 모서리를 기준.
    // x 좌표
    0,
    // y 좌표
    0,
    // width 사이즈, 여기서는 게임화면의 가로길이
    scene.game.config.width,
    // height 사이즈, 여기서는 게임화면의 세로길이의 2배
    scene.game.config.height * 2,
    // 타일스프라이트로 사용할 이미지의 키 이름
    "Background_Image"
  );
  // 기본적으로 Phaser의 대부분의 게임 오브젝트의 원점은 중앙에 설정되어 있다.
  // 즉, (0.5, 0.5). 따라서 오브젝트를 회전하거나 크기를 조절할 때 중앙을 기준으로 변환이 이루어진다.
  // 그러나 setOrigin(0, 0)을 사용하면 원점이 오브젝트의 왼쪽 상단 모서리가된다.
  // 이렇게 설정하면 오브젝트의 위치를 지정할 때 왼쪽 상단 모서리를 기준으로 위치가 결정된다.
  scene.bg.setOrigin(0, 0);
}

export const Direction = Object.freeze({
  // 방향을 정의하는 Direction 객체 정의
  // Object.freeze(): 객체를 동결하여 객체를 변경할 수 없게함.
  // 방향을 개발자가 잘 알아보기위해서 정의함.
  Up: "Up",
  Down: "Down",
  Left: "Left",
  Right: "Right",
});

export function hitBlink(scene, sprite) {
  // hit 했을때 깜빡거리는 효과

  scene.tweens.add({
    targets: sprite,
    alpha: { from: 1, to: 0.2 },
    duration: 100,
    ease: "Linear",
    repeat: 1,
    yoyo: true,
  });
}

export function assignKeys(scene) {
  // 사용할 키를 변수에 할당
  scene.keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  scene.keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  scene.keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  scene.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  scene.keySpace = scene.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.SPACE
  );

  scene.keyJ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
  scene.keyK = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
}

export function collisionEvent(scene) {
  // 플레이어의 총알 그룹에 있는 객체와 적 개체가 충돌(overlap)
  // 되었을때 실행할 물리이벤트 등록
  scene.physics.add.overlap(
    scene.player_bullet,
    scene.enemies,
    (bullet, enemy) => {
      bullet.destroy(); // 총알 제거
      enemy.hit(bullet.damage, scene); // 적에게 피해를 줌 (예: 10의 피해)
      hitBlink(scene, enemy); //피격 이펙트
    }
  );

  // Enemy의 총알 그룹에 있는 객체와 플레이어가 충돌시
  // 실행할 물리이벤트 등록
  scene.physics.add.overlap(
    scene.enemy_bullet,
    scene.playerGroup,
    (bullet, player) => {
      bullet.destroy(); // 총알 제거
      player.hit(bullet.damage, scene); // 플레이어 10 피해
      hitBlink(scene, player); //피격 이펙트
    }
  );

  // Bullet끼리 충돌시 상쇄
  scene.physics.add.overlap(
    scene.player_bullet,
    scene.enemy_bullet,
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
}

export function createPlayer(scene, attackPower, comboCount) {
  // 플레이어 생성
  scene.playerGroup = scene.physics.add.group({
    runChildUpdate: true,
  });
  scene.player = new Player(scene, attackPower, comboCount);
  scene.playerGroup.add(scene.player);
  scene.player.setCollideWorldBounds(true);

  // 플레이어 생성 후 Spawn 재생
  // Spawn 재생이 끝나면 Idle을 재생하고 spawn플래그를 false로 변경
  scene.player.play("Spawn").on(
    "animationcomplete",
    () => {
      scene.player.play("Idle");
      scene.player.isMoveable = true; // Spawn 애니메이션이 끝났음을 나타냄
    },
    scene
  );

  // Player Bullets 그룹 생성
  scene.player_bullet = scene.physics.add.group({
    classType: Player_Bullet, // 해당 그룹의 타입은 Player_Bullet 클래스만
    runChildUpdate: true, // 각 총알의 update() 메소드를 자동으로 호출
  });
}

export function createEnemyGroup(scene) {
  // Enemy Bullets 그룸 생성
  scene.enemy_bullet = scene.physics.add.group({
    classType: Enemy1_Bullet,
    runChildUpdate: true,
  });

  // Enemy 그룹 생성
  scene.enemies = scene.physics.add.group();
}

export function createDeadZone(scene) {
  scene.deadZone = scene.add.zone(400, 720, 800, 10);
  scene.physics.world.enable(scene.deadZone);

  scene.physics.add.overlap(
    scene.deadZone,
    scene.enemies,
    (deadZone, enemy) => {
      enemy.death();
      scene.player.hit(enemy.attackPower);
      hitBlink(scene, scene.player); //피격 이펙트
    }
  );
}

export function clearStage(scene, stage) {
  // 플레이어 데이터 저장
  let playerData = {
    attackPower: scene.player.attackPower,
    comboCount: scene.player.comboCount,
  };
  scene.game.registry.set("playerData", playerData);

  scene.game.registry.set("score", scene.score);

  scene.player.isMoveable = false;
  setTimeout(() => {
    scene.player.play("Clear").on("animationcomplete", () => {
      scene.player.setActive(false);
      scene.player.setAlpha(0);
      setTimeout(() => {
        scene.scene.start(stage);
      }, 1000);
    });
  }, 1000);
}

export function createScoreText(scene) {
  scene.scoreText = scene.add.text(16, 650, "Score: " + scene.score, {
    fontFamily: "NeoDunggeunmo Code",
    fontSize: "24px",
    fill: "#fff",
  });
}
