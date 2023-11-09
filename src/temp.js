// handlePlayerMove() {
//   let isMoving = false;

//   if (this.keyA.isDown) {
//     this.player.move(Direction.Left);
//     if (this.player.anims.currentAnim.key !== "Left") {
//       this.player.play("Left");
//     }
//     isMoving = true;
//   }
//   if (this.keyD.isDown) {
//     this.player.move(Direction.Right);
//     if (this.player.anims.currentAnim.key !== "Right") {
//       this.player.play("Right");
//     }
//     isMoving = true;
//   }
//   if (this.keyW.isDown) {
//     this.player.move(Direction.Up);
//     isMoving = true;
//   }
//   if (this.keyS.isDown) {
//     this.player.move(Direction.Down);
//     isMoving = true;
//   }

//   // If the player isn't moving, play the idle animation
//   if (!isMoving && this.player.anims.currentAnim.key !== "Idle") {
//     this.player.play("Idle");
//   }
// }
