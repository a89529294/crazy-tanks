export default class Enemy {
    constructor(scene, x, y) {
        this.scene = scene;

        // Create the physics-based sprite that we will move around and animate
        this.sprite = scene.physics.add.sprite(x, y, "tank").setScale(32 / 512, 32 / 512);

        // scene.matterCollision.addOnCollideStart({
        //   objectA: [this.sensors.bottom, this.sensors.left, this.sensors.right],
        //   callback: this.onSensorCollide,
        //   context: this
        // });
        // scene.matterCollision.addOnCollideActive({
        //   objectA: [this.sensors.bottom, this.sensors.left, this.sensors.right],
        //   callback: this.onSensorCollide,
        //   context: this
        // });
        this.sprite.tint = "0xff0000";

        this.destroyed = false;
        this.scene.events.on("update", this.update, this);
        this.scene.events.once("shutdown", this.destroy, this);
        this.scene.events.once("destroy", this.destroy, this);
    }

    update() {
        if (this.destroyed) return;

        // this.scene.time.addEvent({
        //     delay: 250,
        //     callback: () => (this.canJump = true)
        // });

        this.movement();
    }

    movement() {
        // TODO: To be further modified for improving the movement algorithm.
        // TODO: To be further modified for improving the movement algorithm.
        this.sprite.body.angularVelocity = 50;
        this.sprite.body.setVelocityX(50 * Math.cos(this.sprite.body.rotation / 180 * Math.PI));
        this.sprite.body.setVelocityY(50 * Math.sin(this.sprite.body.rotation / 180 * Math.PI));
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