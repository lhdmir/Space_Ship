import Phaser from "phaser";
// Background_Image 라는 이름으로 로드하기 위해서는 import해줘야함
// import Background_Image from "../Asset/background/Space.png";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: "TitleScene" });
    this.bg = null;
  }

  preload() {
    // 필요한 자원들을 로드합니다. 예: 배경 이미지, 버튼 이미지 등
    // dist/Asset/Space.png 파일을 배경으로 로드.
    this.load.image("Background_Image", "./Asset/Space.png");
    // 이런식으로도 로드 할 수 있다
    // this.load.image("Background_Image", Background_Image);
  }

  create() {
    // 대기 화면 구성 요소를 추가합니다. 예: 타이틀 텍스트, 시작 버튼 등
    this.bg = this.add.tileSprite(
      // tileSprite의 x, y 위치. 여기서는 게임 화면의 왼쪽 상단 모서리를 기준.
      0,
      0,
      this.game.config.width,
      this.game.config.height * 2,
      "Background_Image"
    );
    // 기본적으로 Phaser의 대부분의 게임 오브젝트의 원점은 중앙에 설정되어 있다.
    // 즉, (0.5, 0.5). 따라서 오브젝트를 회전하거나 크기를 조절할 때 중앙을 기준으로 변환이 이루어진다.
    // 그러나 setOrigin(0, 0)을 사용하면 원점이 오브젝트의 왼쪽 상단 모서리가된다.
    // 이렇게 설정하면 오브젝트의 위치를 지정할 때 왼쪽 상단 모서리를 기준으로 위치가 결정된다.
    this.bg.setOrigin(0, 0);

    // Title text: Space Ship 표시
    // this.add
    //   .text(400, 200, "Space Ship", { fontSize: "100px", color: "#fff" })
    //   .setOrigin(0.5);
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

    // Start 텍스트 생성
    // (400,400) 위치에 배치, setOrigin(0.5)로 중앙에 정렬
    let playButton = this.add
      .text(400, 450, "Start", { fontSize: "28px", color: "#fff" })
      .setOrigin(0.5);

    // Start Text 깜빡이는 효과
    let blinkingTween = this.tweens.create({
      targets: playButton,
      alpha: { from: 1, to: 0 },
      duration: 100,
      ease: "Linear",
      repeat: 2, // 총 2번 실행(기본 1 + 추가 1)
      yoyo: true,
      onComplete: () => {
        // 트윈이 완료되면 호출될 콜백 함수
        this.scene.start("PlayScene");
      },
    });

    // 해당 객체를 상호작용 가능하게 설정. 클릭할 때 이벤트를 처리가능
    playButton.setInteractive();

    // on() 메서드는 객체에 이벤트 핸들러를 등록하는데 사용. 두 개의 인자를 전달 받음.
    // 첫번째 인자는 이벤트 이름: pointerup
    // 두번째 인자는 이벤트가 발생했을 때 실행할 함수를 정의: () => {this.scene.start("PlayScene");}
    // pointerup 이벤트(마우스 클릭 또는 터치 해제) 를 감지할 때 실행할 함수 설정.

    // () => {...}; 이건 화살표 함수
    // 이렇게 함수를 호출하면 this에 "playButton"이 바인딩 되지 않고
    // TitleScene의 현재 인스턴스를 참조하여 해당 인스턴스의 "scene" 속성의 start() 메소드를 호출함
    playButton.on("pointerdown", () => {
      // 깜빡이는 효과 시작
      blinkingTween.restart();
    });

    // pointerdown 버튼이 눌러질때, pointerup 버튼에서 떼이질때
    playButton.on("pointerup", () => {
      // 플레이 버튼 클릭 시 플레이 화면으로 전환
      // this.scene.start("PlayScene");
    });
  }

  update() {
    this.bg.tilePositionY -= 2; // 숫자 2는 스크롤 속도를 조절.
  }
}
