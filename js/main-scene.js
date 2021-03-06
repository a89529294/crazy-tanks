import Enemy from "./enemy.js";
let cursors;
let keys;
let bullet;
const tankSpeed = 100;
let initTankAngle = 0;
const tankFiringSpeed = 1000;
let initFireTime;
let bullets;
let enemies;
const maxNumOfBullets = 5;
const maxHealth = 3;

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');

  }
  preload() {
    this.isGameOver = false;
    this.numOfBullets = maxNumOfBullets;
    this.health = maxHealth;
  }

  create() {

    this.rechargePacks = this.physics.add.group({
      key: 'recharge',
      repeat: 2,
      setXY: {
        x: 50,
        y: 50,
        stepX: 200 + Math.random() * 130,
        stepY: 100 + Math.random() * 50
      }
    });
    this.rechargePacks.getChildren().forEach((pack) => {
      pack.setScale(32 / 512, 32 / 512).depth = 1;
    })
    //this.rechargePack = this.physics.add.image(400, 400, 'recharge');
    //this.rechargePack.setScale(32 / 512, 32 / 512).depth = 1;

    //num of bullets text
    this.numOfBulletsText = this.make.text({
      x: 450,
      y: 16,
      text: 'Bullets left: ' + maxNumOfBullets,
      style: {
        fontSize: '32px',
        fill: '#ffffff'
      }
    });

    this.numOfBulletsText.depth = 1;
    //health text
    this.healthText = this.add.text(16, 16, 'Health: ' + maxHealth, {
      fontSize: '32px',
      fill: '#ffffff'
    });
    this.healthText.depth = 1;

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const map = this.make.tilemap({
      //key: "level1"
      key: "level2"
    });
    // tileset = map.addTilesetImage("cottage");
    this.tileset_background = map.addTilesetImage("Outside_A2");
    this.tileset_foreground = map.addTilesetImage("Outside_A2");
    this.tileset_foreground2 = map.addTilesetImage("Outside_A2");

    //Parameters: layer name (or index) from Tiled, tileset, x, y
    this.walls = map.createStaticLayer("Background", this.tileset_background, 0, 0);
    this.foreground_walls = map.createStaticLayer("Foreground", this.tileset_foreground, 0, 0);
    this.foreground_lakes = map.createStaticLayer("Foreground2", this.tileset_foreground2, 0, 0);

    // DO NOT DELETE
    // walls.setCollisionByProperty({
    //   "collides": true
    // });

    this.walls.setCollision(370);
    this.walls.setCollision(371);
    this.walls.setCollision(372);
    this.walls.setCollision(394);
    this.walls.setCollision(396);
    this.walls.setCollisionBetween(418, 420);
    this.foreground_walls.setCollisionBetween(379, 381);
    this.foreground_walls.setCollisionBetween(403, 405);
    this.foreground_walls.setCollisionBetween(427, 429);

    this.foreground_lakes.setCollisionBetween(382, 384);
    this.foreground_lakes.setCollisionBetween(406, 408);
    this.foreground_lakes.setCollisionBetween(430, 432);

    // DO NOT DELETE
    // The following code is used for debugging.  Will be needed in the future to refactor collision.
    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // walls.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });

    // Set the tank at the center of the 800 x 576 screen and scale tank down to the size of one tile.
    this.tank = this.physics.add.sprite(800 / 2, 576 / 2, 'tank').setScale(32 / 512, 32 / 512);
    this.physics.add.collider(this.tank, this.walls);
    this.physics.add.collider(this.tank, this.foreground_walls);
    this.physics.add.collider(this.tank, this.foreground_lakes);

    //create an empty bullets group
    bullets = this.physics.add.group();
    this.physics.add.collider(bullets, this.walls, this.handleBulletWallCollision, null, this);
    this.physics.add.collider(bullets, this.foreground_walls, this.handleBulletWallCollision, null, this);

    this.physics.add.overlap(this.rechargePacks, this.tank, this.handleRechargeTankInteraction, null, this);
    // Create an enemy
    //this.enemy = new Enemy(this, 100, 100);
    enemies = [new Enemy(this, 100, 100), new Enemy(this, 700, 100)]

    for (var i = 0; i < enemies.length; i++) {
      this.physics.add.collider(enemies[i].bullets, this.tank, this.handleTankBulletCollision, null, this);
      this.physics.add.collider(bullets, enemies[i].sprite, this.handleEnemyTankBulletCollision, null, this);
    }


    //console.log(this.anims)

    let explosionAnimationExist = false;
    for (let x in this.anims.anims.entries) {
      if (x === 'explosionAnimation') explosionAnimationExist = true
    }
    //explosion animation add only if it doesn't exist
    if (!explosionAnimationExist) {
      this.anims.create({
        key: 'explosionAnimation',
        frames: this.anims.generateFrameNumbers('kaboom', {
          start: 0,
          end: 23,
          first: 23
        }),
        frameRate: 20,
      });
    }

    cursors = this.input.keyboard.createCursorKeys();
    //keys.space.isDown
    // keys = this.input.keyboard.addKeys({
    //   'space': Phaser.Input.Keyboard.KeyCodes.SPACE
    // });

    // TODO: Update the trigger of gameover trigger.
    //this.input.keyboard.on('keydown', this.handleGameOver, this);

  }

  // TODO: Update the trigger of gameover trigger.
  handleGameOver(e) {
    //if (e.keyCode === 13) {
    this.isGameOver = true;
    this.tank.destroy();
    bullets.getChildren().forEach((bullet) => {
      bullet.destroy();
    })
    //bullets.destroy(true);
    for (var i = 0; i < enemies.length; i++) {
      enemies[i].destroy();
      enemies[i].bullets.getChildren().forEach((bullet) => {
        bullet.destroy();
      })
    }
    this.scene.start('GameOverScene');
    //}
  }

  handleVictory() {
    this.isGameOver = true;
    this.tank.destroy();
    bullets.getChildren().forEach((bullet) => {
      bullet.destroy();
    })
    //bullets.destroy(true);
    for (var i = 0; i < enemies.length; i++) {
      enemies[i].destroy();
      enemies[i].bullets.getChildren().forEach((bullet) => {
        bullet.destroy();
      })
    }
    this.scene.start('VictoryScene');
  }

  handleBulletWallCollision(bullet) {
    bullet.disableBody(true, true);
    // bullets.getChildren()[bullets.getChildren().length - bullets.countActive(true)].disableBody(true, true);
  }

  handleTankBulletCollision(tank, bullet) {
    bullet.disableBody(true, true);
    this.health--;
    this.healthText.setText("Health: " + String(this.health));

    if (this.health <= 0) {
      tank.disableBody(true, true);
      //explosion animation
      this.explosion = this.physics.add.sprite(tank.x, tank.y, 'kaboom');
      this.explosion.anims.play('explosionAnimation');
      this.explosion.on('animationcomplete', this.handleGameOver, this);
    }
  }

  handleEnemyTankBulletCollision(tank, bullet) {
    bullet.disableBody(true, true);
    tank.disableBody(true, true);
    tank.destroy();
    tank.destroyed = true;
    //explosion animation
    this.explosion = this.physics.add.sprite(tank.x, tank.y, 'kaboom');
    this.explosion.anims.play('explosionAnimation');
    enemies.length--;
    var allDestroyed = true;
    for (var i = 0; i < enemies.length; i++) {
      allDestroyed = allDestroyed && enemies[i].destroyed;
    }
    if (allDestroyed) {
      this.explosion.on('animationcomplete', this.handleVictory, this)
    }
  }
  handleRechargeTankInteraction(tank, rechargePack) {
    rechargePack.destroy();
    this.numOfBullets = maxNumOfBullets;
    this.numOfBulletsText.setText('Bullets left: ' + this.numOfBullets);
  }

  update() {
    if (!this.isGameOver) {
      let radianAngle = Math.PI * this.tank.angle / 180;
      this.tank.body.setVelocity(0);

      if (cursors.space.isDown) {


        if ((this.numOfBullets > 0) && (isNaN(initFireTime) || Date.now() - initFireTime > tankFiringSpeed)) {
          //bullet = this.physics.add.sprite(tank.x, tank.y, 'bullet');
          this.numOfBullets--;
          this.numOfBulletsText.setText('Bullets left: ' + this.numOfBullets);

          bullet = bullets.create(this.tank.x, this.tank.y, 'bullet');

          initTankAngle = this.tank.angle;
          bullet.angle = initTankAngle;
          initFireTime = Date.now();

        }
      }
      if (cursors.left.isDown) {
        this.tank.angle--;
      }
      if (cursors.right.isDown) {
        this.tank.angle++;
      }
      if (cursors.down.isDown) {

        this.tank.body.setVelocityX(-Math.cos(radianAngle) * tankSpeed);
        this.tank.body.setVelocityY(-Math.sin(radianAngle) * tankSpeed);
      }
      if (cursors.up.isDown) {
        this.tank.body.setVelocityX(Math.cos(radianAngle) * tankSpeed);
        this.tank.body.setVelocityY(Math.sin(radianAngle) * tankSpeed);
      }


      if (bullet && bullet.body) {
        bullet.body.setVelocityX(Math.cos(Math.PI * initTankAngle / 180) * 100);
        bullet.body.setVelocityY(Math.sin(Math.PI * initTankAngle / 180) * 100);
      }
    }


  }

}