export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }
    preload() {
        this.load.image('gameoverScreen', '../assets/gameoverScreen.png');
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var titleText = this.make.text({
            x: width / 2,
            y: height / 2 - 100,
            text: 'Game Over',
            style: {
                font: '60px monospace',
                fill: '#3bc5f1'
            }
        });
        var enterText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: 'Press Enter To Restart',
            style: {
                font: '50px monospace',
                fill: '#ff0000'
            }
        });
        enterText.setOrigin(0.5, 0.5).depth = 1;
        titleText.setOrigin(0.5, 0.5).depth = 1;
        this.input.keyboard.on('keydown', this.handleEnter, this);
    }

    create() {
        this.add.image(0, 0, 'gameoverScreen').setOrigin(0, 0);
    }

    handleEnter(e) {
        //13 === enter key
        if (e.keyCode === 13) {
            this.scene.start('MainScene');
        }
    }
}