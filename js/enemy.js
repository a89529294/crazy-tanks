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
        this.sprite.body.setVelocityX(Math.random() * 100 - 50)
        this.sprite.body.setVelocityY(Math.random() * 100 - 50)
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