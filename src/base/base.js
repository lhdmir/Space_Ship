// 각 씬에서 공통적으로 필요한 모듈들

// background 생성 함수
// export 키워드로 다른 파일에서 import 해서 사용할 수 있도록 함.
// 씬을 매개변수로 받음
export function createBackground(scene) {
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

// 방향을 정의하는 Direction 객체 정의
// Object.freeze(): 객체를 동결하여 객체를 변경할 수 없게함.
// 방향을 개발자가 잘 알아보기위해서 정의함.
export const Direction = Object.freeze({
  Up: "Up",
  Down: "Down",
  Left: "Left",
  Right: "Right",
});
