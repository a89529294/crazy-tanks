let cursors;
let tank;
let keys;
let bullet;
const tankSpeed = 100;
let initTankAngle;
const tankFiringSpeed = 1000;
let initFireTime;
let bullets;
let walls;
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
    map.createStaticLayer("Background", tileset, 0, 0);
    walls = map.createStaticLayer("Foreground", tileset, 0, 0);

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
    tank = this.physics.add.sprite(1400 / 2, 576 / 2, 'tank').setScale(32 / 512, 32 / 512);
    this.physics.add.collider(tank, walls);

    //create an empty bullets group
    //bullets = this.physics.add.group();
    //this.physics.add.collider(bullets, walls, this.foo);


    cursors = this.input.keyboard.createCursorKeys();
    keys = this.input.keyboard.addKeys({
      'space': Phaser.Input.Keyboard.KeyCodes.SPACE
    });

  }

  foo() {
    console.log('in foo');
    bullet.disableBody(true, true);
    // bullets.getChildren().forEach((bullet) => {
    //   bullet.disableBody(true, true);
    // })
  }

  update() {
    this.physics.add.collider(walls, bullet, this.foo);
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
      if (isNaN(initFireTime) || Date.now() - initFireTime > tankFiringSpeed) {
        if (bullet) bullet.disableBody(true, true);
        bullet = this.physics.add.sprite(tank.x, tank.y, 'bullet');
        //bullet = bullets.create(tank.x + 100, tank.y + 100, 'bullet');
        //bullet.setCollideWorldBounds(true);
        //console.log("number of bullets", +bullets.getChildren().length)
        initTankAngle = tank.angle;
        bullet.angle = initTankAngle;
        initFireTime = Date.now();
      }

    }

    if (bullet) {
      bullet.x += Math.cos(Math.PI * initTankAngle / 180);
      bullet.y += Math.sin(Math.PI * initTankAngle / 180);
    }

  }

}