export default class StartingScene extends Phaser.Scene {
    constructor() {
        super('StartingScene');
    }
    preload() {
        this.load.image('startScreen', '../assets/startScreen.png');
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Press Enter To Start',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        this.input.keyboard.on('keydown', this.handleEnter, this);
    }

    create() {
        this.add.image(0, 0, 'startScreen').setOrigin(0, 0);

    }

    handleEnter(e) {
        //13 === enter key
        if (e.keyCode === 13) {
            this.scene.start('LoadingScene');
        }
    }
}