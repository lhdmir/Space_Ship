// 기타 씬에서 공통적으로 필요한 모듈들

export function createGameMainText(scene, text, color) {
  let gameMainText = scene.add
    .text(400, 250, text, {
      fontFamily: "NeoDunggeunmo",
      fontSize: "120px",
      color: color,
      // color: "#990000",
    })
    .setOrigin(0.5);

  scene.tweens.add({
    targets: gameMainText, // 애니메이션을 적용할 대상
    alpha: { start: 0, to: 1 }, // 시작과 끝의 투명도 값. 1은 완전 불투명, 0은 완전 투명
    duration: 5000, // 애니메이션의 지속 시간 (밀리초)
    ease: "Linear", // 가속도 함수. 여기서는 일정한 속도로 변환
    repeat: 0, // 0을 설정하면 반복하지 않음
  });
}

export function createRestartText(scene) {
  let restartText = scene.add
    .text(400, 500, "Press the Enter key to Title", {
      fontFamily: "NeoDunggeunmo",
      fontSize: "28px",
      color: "#fff",
    })
    .setOrigin(0.5);

  scene.tweens.add({
    targets: restartText,
    alpha: { start: 0, to: 1 },
    duration: 5000,
    ease: "Linear",
    repeat: -1, // 무한히 반복
    yoyo: true,
  });

  scene.blinkingTween = scene.tweens.create({
    targets: restartText,
    alpha: { from: 1, to: 0 },
    duration: 100,
    ease: "Linear",
    repeat: 2, // 총 2번 실행(기본 1 + 추가 1)
    yoyo: true,
    onComplete: () => {
      scene.scene.start("TitleScene");
    },
  });
}

export function createScoreText(scene) {
  let scoreText = scene.add
    .text(400, 400, "Score : " + scene.score, {
      fontFamily: "NeoDunggeunmo",
      fontSize: "28px",
      color: "#fff",
    })
    .setOrigin(0.5);

  scene.tweens.add({
    targets: scoreText,
    alpha: { start: 0, to: 1 },
    duration: 5000,
    ease: "Linear",
    repeat: -1,
    yoyo: true,
  });
}
