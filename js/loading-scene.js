const loadingTime = 100

export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super('LoadingScene');
    }
    preload() {
        this.load.image('recharge', '../assets/recharge.png')
        this.load.image('tank', '../assets/tank.png');
        this.load.image('bullet', '../assets/bullet.png');
        this.load.spritesheet('kaboom', '../assets/explosions.png', {
            frameWidth: 64,
            frameHeight: 64,
            endFrame: 23
        });

        // Load tileset and tilesmap
        this.load.image("Outside_A2", "../assets/tilesets/Outside_A2.png");
        this.load.image("Outside_B", "../assets/tilesets/Outside_B.png");
        this.load.image("cottage", "../assets/tilesets/cottage.png");
        for (let i = 0; i < loadingTime; i++) {
            this.load.image("cottage" + i, "../assets/tilesets/cottage.png");
        }
        this.load.tilemapTiledJSON("level1", "../assets/tilemaps/level1.json");
        this.load.tilemapTiledJSON("level2", "../assets/tilemaps/level2.json");

        this.load.on('progress', function (value) {
            //console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });

        this.load.on('fileprogress', function (file) {
            // console.log(file.src);
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function () {
            // console.log('complete');
            // progressBar.destroy();
            // progressBox.destroy();
            loadingText.destroy();
            // percentText.destroy();
            assetText.setText('Press any key to proceed');
            // assetText.destroy();
        });

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 + 8,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);


    }

    create() {
        console.log("game is booting...");
        this.input.keyboard.on('keydown', this.handleGameStart, this);

    }

    handleGameStart(e) {
        this.scene.start("MainScene");
    }
}