export default class VictoryScene extends Phaser.Scene {
    constructor() {
        super('VictoryScene');
    }
    preload() {

        this.load.image('victoryScreen', '../assets/victoryScene.png');
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var titleText = this.make.text({
            x: width / 2,
            y: height / 2 - 200,
            text: 'Victory',
            style: {
                font: '60px monospace',
                fill: '#3bc5f1'
            }
        });
        var enterText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Press Enter To restart',
            style: {
                font: '30px monospace',
                fill: '#ffffff'
            }
        });
        enterText.setOrigin(0.5, 0.5).depth = 1;
        titleText.setOrigin(0.5, 0.5).depth = 1;
        this.input.keyboard.on('keydown', this.handleEnter, this);
    }

    create() {
        this.add.image(0, 0, 'victoryScreen').setOrigin(0, 0);

    }

    handleEnter(e) {
        //13 === enter key
        if (e.keyCode === 13) {
            this.scene.start('MainScene');
        }
    }
}