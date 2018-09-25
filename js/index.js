import MainScene from "./main-scene.js";
import LoadingScene from "./loading-scene.js";
import StartingScene from './starting-scene.js'
import GameOverScene from './gameover-scene.js';
import VictoryScene from './victory-scene.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 576,

  backgroundColor: "#8B4513",
  parent: "game-container",
  scene: [StartingScene, LoadingScene, MainScene, GameOverScene, VictoryScene],
  // pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0
      } // Top down game, so no gravity
    }
  },

};

const game = new Phaser.Game(config);