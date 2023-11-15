import Phaser from "phaser";
// Background_Image 라는 이름으로 로드하기 위해서는 import해줘야함
// import Background_Image from "../Asset/background/Space.png";

// base 의 createBackground 함수 import
import { createBackground } from "../base/base";

// 타이틀 씬 클래스
export default class TitleScene extends Phaser.Scene {
  constructor() {
    // phaser에서는 씬을 고유한 키로 표현한다.
    // 타이틀 씬의 키를 "TitleScene" 으로 지정했다.
    super({ key: "TitleScene" });
  }

  // 게임에서 필요한 자원들을 미리 로드하는 함수.
  preload() {
    // dist/Asset/Space.png 파일을 배경으로 로드.
    this.load.image("Background_Image", "./Asset/Space.png");
    // 이런식으로도 로드 할 수 있다
    // this.load.image("Background_Image", Background_Image);
  }

  // 게임에서 사용할 객체들을 생성하는 함수.
  create() {
    // background 생성
    createBackground(this);

    // TitleText 생성
    this.createTitleText();

    // StartButton 생성
    this.createStartButton();
  }

  // 매 프레임마다 갱신하는 함수
  update() {
    this.bg.tilePositionY -= 2; // 숫자 2는 스크롤 속도를 조절.
  }

  createTitleText() {
    // Title text: Space Ship 표시
    let titleText = this.add
      .text(400, 250, "Space Ship", { fontSize: "100px", color: "#fff" })
      .setOrigin(0.5);

    // Title Text 깜빡거리는 효과 - 트윈 생성
    this.tweens.add({
      targets: titleText, // 애니메이션을 적용할 대상
      alpha: { start: 1, to: 0 }, // 시작과 끝의 투명도 값. 1은 완전 불투명, 0은 완전 투명
      duration: 2000, // 애니메이션의 지속 시간 (밀리초)
      ease: "Linear", // 가속도 함수. 여기서는 일정한 속도로 변환
      repeat: -1, // 무한히 반복. 0을 설정하면 반복하지 않음
      yoyo: true, // 애니메이션을 반대 방향으로도 재생. 여기서는 불투명 -> 투명 -> 불투명 순으로 재생됨
    });
  }

  createStartButton() {
    // Start 텍스트 생성
    // (400,400) 위치에 배치, setOrigin(0.5)로 중앙에 정렬
    let playButton = this.add
      .text(400, 450, "Start", { fontSize: "28px", color: "#fff" })
      .setOrigin(0.5);

    this.tweens.add({
      targets: playButton, // 애니메이션을 적용할 대상
      alpha: { start: 1, to: 0 }, // 시작과 끝의 투명도 값. 1은 완전 불투명, 0은 완전 투명
      duration: 2000, // 애니메이션의 지속 시간 (밀리초)
      ease: "Linear", // 가속도 함수. 여기서는 일정한 속도로 변환
      repeat: -1, // 무한히 반복. 0을 설정하면 반복하지 않음
      yoyo: true, // 애니메이션을 반대 방향으로도 재생. 여기서는 불투명 -> 투명 -> 불투명 순으로 재생됨
    });

    // Start Text 깜빡이는 효과
    // blinkingTween 오브젝트 생성.
    let blinkingTween = this.tweens.create({
      // 프로퍼티(오브젝트 속성) 설정
      targets: playButton,
      alpha: { from: 1, to: 0 },
      duration: 100,
      ease: "Linear",
      repeat: 2, // 총 2번 실행(기본 1 + 추가 1)
      yoyo: true,
      onComplete: () => {
        // 트윈이 완료되면 호출될 콜백 함수
        this.scene.start("Stage1");
      },
    });

    // 해당 객체를 상호작용 가능하게 설정. 클릭할 때 이벤트를 처리가능
    playButton.setInteractive();

    // on() 메서드는 객체에 이벤트 핸들러를 등록하는데 사용. 두 개의 인자를 전달 받음.
    // 첫번째 인자는 이벤트 이름: pointerdown
    // 두번째 인자는 이벤트가 발생했을 때 실행할 함수를 정의: () => { blinkingTween.restart(); }

    // () => {...}; 이건 화살표 함수
    // 화살표함수를 사용하지 않는다면(아래와 같이 실행하면), blinkingTween.restart()의 this가 playButton이
    // 바인딩되며, blinkingTween.restart()는
    // playButton의 프로퍼티가 아니기 때문에 호출이 실패된다.

    // playButton.on("pointerdown", function() {
    //     blinkingTween.restart();
    // });
    playButton.on("pointerdown", () => {
      // 깜빡이는 효과 시작
      blinkingTween.restart();
    });
    // 요약.
    // pointerdown 이벤트(마우스 클릭) 를 감지할 때
    // 실행할 함수( () => { blinkingTween.restart(); } ) 설정.
    // pointerdown 버튼이 눌러질때, pointerup 버튼에서 떼이질때
  }
}
