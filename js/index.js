import MainScene from "./main-scene.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#8B4513",
  parent: "game-container",
  scene: MainScene,
  pixelArt: true,
  physics: { default: "matter" },
 
};

const game = new Phaser.Game(config);
