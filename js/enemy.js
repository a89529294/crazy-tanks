export default class Enemy {

    constructor(scene, x, y) {
        this.scene = scene;


        // Create the physics-based sprite that we will move around and animate
        this.sprite = scene.physics.add.sprite(x, y, "tank").setScale(32 / 512, 32 / 512);
        this.lastFireTime = 0;
        this.fireRate = 1000;

        this.sprite.tint = "0xff0000";

        this.bullets = this.scene.physics.add.group();

        // TODO: Fix destroy bullet timing.
        this.scene.physics.add.collider(this.bullets, this.scene.walls, this.onCollideTrigger);

        this.destroyed = false;
        this.scene.events.on("update", this.update, this);
        this.scene.events.once("shutdown", this.destroy, this);
        this.scene.events.once("destroy", this.destroy, this);
    }

    onCollideTrigger(bullet) {
        bullet.disableBody(true, true);
        //bullets.getChildren()[bullets.getChildren().length - bullets.countActive(true)].disableBody(true, true);
    }

    update() {
        if (this.destroyed) return;
        this.movement();
        this.fireBullets();
    }

    movement() {
        // TODO: To be further modified for improving the movement algorithm.
        this.sprite.body.angularVelocity = 50;
        this.sprite.body.setVelocityX(50 * Math.cos(this.sprite.body.rotation / 180 * Math.PI));
        this.sprite.body.setVelocityY(50 * Math.sin(this.sprite.body.rotation / 180 * Math.PI));
    }

    fireBullets() {
        // TODO: To be further modified for improving the firing algorithm.
        if (isNaN(this.lastFireTime) || Date.now() - this.lastFireTime > this.fireRate) {
            this.bullet = this.bullets.create(this.sprite.body.x, this.sprite.body.y, 'bullet');
            this.bullet.angle = this.sprite.body.rotation;
            this.bullet.body.setVelocityX(50 * Math.cos(this.bullet.angle / 180 * Math.PI));
            this.bullet.body.setVelocityY(50 * Math.sin(this.bullet.angle / 180 * Math.PI));
            this.lastFireTime = Date.now();
        }
    }

    destroy() {
        // Clean up any listeners that might trigger events after the player is officially destroyed
        this.scene.events.off("update", this.update, this);
        this.scene.events.off("shutdown", this.destroy, this);
        this.scene.events.off("destroy", this.destroy, this);
        this.destroyed = true;
        this.sprite.destroy();
    }
}