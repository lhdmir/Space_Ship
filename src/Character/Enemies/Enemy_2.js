// import Phaser from "phaser";

// export default class Enemy1 extends Phaser.Physics.Arcade.Sprite {
//   constructor(scene, x, y) {
//     super(scene, x, y, "Enemies");

//     scene.add.existing(this);
//     scene.physics.add.existing(this);

//     this.setScale(3);
//     this.setAlpha(1);
//     this.setCollideWorldBounds(true);
//     this.createEnemy1Animations();

//     this.play("Idle");
//   }

//   createEnemy1Animations() {
//     this.anims.create({
//       key: "Idle",
//       frames: this.anims.generateFrameNumbers("Enemies", { start: 0, end: 0 }),
//       frameRate: 10,
//       repeat: -1,
//     });

//     this.anims.create({
//       key: "Move",
//       frames: this.anims.generateFrameNumbers("Enemies", { start: 1, end: 3 }),
//       frameRate: 10,
//       repeat: -1,
//     });
//   }
// }
