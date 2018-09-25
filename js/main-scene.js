import Enemy from "./enemy.js";
let cursors;
let tank;
let keys;
let bullet;
const tankSpeed = 100;
let initTankAngle = 0;
const tankFiringSpeed = 1000;
let initFireTime;
let bullets;
let enemyBullets;

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }
  preload() {

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
    this.walls = map.createStaticLayer("Foreground", tileset, 0, 0);

    // DO NOT DELETE
    // walls.setCollisionByProperty({
    //   "collides": true
    // });

    this.walls.setCollision(22);

    // DO NOT DELETE
    // The following code is used for debugging.  Will be needed in the future to refactor collision.
    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // walls.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });

    // Set the tank at the center of the 800 x 576 screen and scale tank down to the size of one tile.
    tank = this.physics.add.sprite(800 / 2, 576 / 2, 'tank').setScale(32 / 512, 32 / 512);
    this.physics.add.collider(tank, this.walls);

    //create an empty bullets group
    bullets = this.physics.add.group();
    this.physics.add.collider(bullets, this.walls, this.handleBulletWallCollision);

    // Create an enemy
    this.enemy = new Enemy(this, 300, 300);

    this.physics.add.collider(this.enemy.bullets, tank, this.handleTankBulletCollision);

    cursors = this.input.keyboard.createCursorKeys();
    //keys.space.isDown
    // keys = this.input.keyboard.addKeys({
    //   'space': Phaser.Input.Keyboard.KeyCodes.SPACE
    // });

  }

  handleBulletWallCollision(bullet) {
    bullet.disableBody(true, true);
    // bullets.getChildren()[bullets.getChildren().length - bullets.countActive(true)].disableBody(true, true);
  }

  handleTankBulletCollision(tank, bullet) {
    bullet.disableBody(true, true);
    //tank.disableBody(true, true);
  }

  update() {
    let radianAngle = Math.PI * tank.angle / 180;
    tank.body.setVelocity(0);

    if (cursors.space.isDown) {
      if (isNaN(initFireTime) || Date.now() - initFireTime > tankFiringSpeed) {
        //bullet = this.physics.add.sprite(tank.x, tank.y, 'bullet');
        bullet = bullets.create(tank.x, tank.y, 'bullet');

        initTankAngle = tank.angle;
        bullet.angle = initTankAngle;
        initFireTime = Date.now();

      }
    }
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
    if (bullet) {
      bullet.body.setVelocityX(Math.cos(Math.PI * initTankAngle / 180) * 100);
      bullet.body.setVelocityY(Math.sin(Math.PI * initTankAngle / 180) * 100);
    }

  }

}