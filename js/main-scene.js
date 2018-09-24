
let cursors;
let tank;
export default class MainScene extends Phaser.Scene {
  preload() {
   this.load.image('tank','./assets/tank.png')

  }

  create() {
    tank = this.add.sprite(50,50,'tank').setScale(0.1,0.1)
    tank.flipY=true;

    cursors = this.input.keyboard.createCursorKeys();
  }

  update(){
    if (cursors.left.isDown ) {
      tank.angle--;
  }
  else if (cursors.right.isDown ) {
    tank.angle++;
<<<<<<< HEAD
=======
  }
  else if (cursors.up.isDown) {
    var radianAngle = Math.PI*tank.angle/180;
    tank.x += Math.sin(radianAngle);
    tank.y += -Math.cos(radianAngle);
>>>>>>> 65f917fd0e51a22c5801c5921149dbb2569168bf
  }
  }

}
