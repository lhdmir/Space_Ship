// background 생성 함수
export function createBackground(scene) {
  scene.bg = scene.add.tileSprite(
    // tileSprite의 x, y 위치. 여기서는 게임 화면의 왼쪽 상단 모서리를 기준.
    0,
    0,
    scene.game.config.width,
    scene.game.config.height * 2,
    "Background_Image"
  );
  // 기본적으로 Phaser의 대부분의 게임 오브젝트의 원점은 중앙에 설정되어 있다.
  // 즉, (0.5, 0.5). 따라서 오브젝트를 회전하거나 크기를 조절할 때 중앙을 기준으로 변환이 이루어진다.
  // 그러나 setOrigin(0, 0)을 사용하면 원점이 오브젝트의 왼쪽 상단 모서리가된다.
  // 이렇게 설정하면 오브젝트의 위치를 지정할 때 왼쪽 상단 모서리를 기준으로 위치가 결정된다.
  scene.bg.setOrigin(0, 0);
}
