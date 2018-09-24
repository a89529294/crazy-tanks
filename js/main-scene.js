let cursors;
let tank;
let keys;
let bullet;
export default class MainScene extends Phaser.Scene {
  preload() {
    this.load.image('tank', './assets/tank.png');
    this.load.image('bullet', './assets/bullet.png');

  }

  create() {
    tank = this.add.sprite(50, 50, 'tank').setScale(0.1, 0.1);

    cursors = this.input.keyboard.createCursorKeys();
    keys = this.input.keyboard.addKeys({
      'space': Phaser.Input.Keyboard.KeyCodes.SPACE
    });
  }

  update() {

    if (cursors.left.isDown) {
      tank.angle--;
    }
    if (cursors.right.isDown) {
      tank.angle++;
    }
    if (cursors.down.isDown) {
      var radianAngle = Math.PI * tank.angle / 180;
      tank.x -= Math.cos(radianAngle);
      tank.y -= Math.sin(radianAngle);
    }
    if (cursors.up.isDown) {
      var radianAngle = Math.PI * tank.angle / 180;
      tank.x += Math.cos(radianAngle);
      tank.y += Math.sin(radianAngle);
    }
    if (keys.space.isDown) {
      bullet = this.add.sprite(tank.x, tank.y, 'bullet');
      bullet.angle = tank.angle;
    }

    if (bullet) {
      bullet.x += Math.cos(radianAngle);
      bullet.y += Math.sin(radianAngle);
    }
  }

}