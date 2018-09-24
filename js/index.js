import MainScene from "./main-scene.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "red",
  parent: "game-container",
  scene: MainScene,
  pixelArt: true,
  physics: { default: "matter" },
 
};

const game = new Phaser.Game(config);
