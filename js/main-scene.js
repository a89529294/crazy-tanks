
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
  }
  }

}
