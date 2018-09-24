let cursors;
let tank;
let keys;
let bullet;
let tankSpeed = 100;

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

    // DO NOT DELETE
    // walls.setCollisionByProperty({
    //   "collides": true
    // });

    walls.setCollision(22);

    // DO NOT DELETE
    // The following code is used for debugging.  Will be needed in the future to refactor collision.
    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // walls.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });

    // Set the tank at the center of the 800 x 576 screen and scale tank down to the size of one tile.
    tank = this.physics.add.sprite(100 / 2, 576 / 2, 'tank').setScale(32 / 512, 32 / 512);
    this.physics.add.collider(tank, walls);

    cursors = this.input.keyboard.createCursorKeys();
    keys = this.input.keyboard.addKeys({
      'space': Phaser.Input.Keyboard.KeyCodes.SPACE
    });


  }

  update() {

    let radianAngle = Math.PI * tank.angle / 180;
    tank.body.setVelocity(0);

    if (cursors.left.isDown) {
      tank.angle--;
    }
    if (cursors.right.isDown) {
      tank.angle++;
    }
    if (cursors.down.isDown) {

      tank.body.setVelocityX(-Math.cos(radianAngle) * tankSpeed);
      tank.body.setVelocityY(-Math.sin(radianAngle) * tankSpeed);
    }
    if (cursors.up.isDown) {
      tank.body.setVelocityX(Math.cos(radianAngle) * tankSpeed);
      tank.body.setVelocityY(Math.sin(radianAngle) * tankSpeed);
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