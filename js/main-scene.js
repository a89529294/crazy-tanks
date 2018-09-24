let cursors;
let tank;
let keys;
let bullet;
export default class MainScene extends Phaser.Scene {
  preload() {
    this.load.image('tank', './assets/tank.png');
    this.load.image('bullet', './assets/bullet.png');

    // Load tileset and tilesmap
    this.load.image("cottage", "./assets/tilesets/cottage.png");
    this.load.tilemapTiledJSON("level1", "./assets/tilemaps/level1.json");
  }

  create() {

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const map = this.make.tilemap({
      key: "level1"
    });
    const tileset = map.addTilesetImage("cottage");

    //Parameters: layer name (or index) from Tiled, tileset, x, y
    map.createDynamicLayer("Background", tileset, 0, 0);
    const walls = map.createStaticLayer("Foreground", tileset, 0, 0);

    tank = this.add.sprite(400, 300, 'tank').setScale(0.1, 0.1);

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
      var radianAngle = Math.PI * tank.angle / 180;
      bullet.x += Math.cos(radianAngle);
      bullet.y += Math.sin(radianAngle);
    }
  }

}