export default class SceneControles extends Phaser.Scene {
    constructor() {
        super({ key: "SceneControles" });
    }

    create() {
        this.cameras.main.fadeIn(250);

        this.pulsado = false;

        this.controles = this.add.image(640, 360, 'controles');

        this.sonido = this.sys.game.globalsSonido.sonido;

        this.bSonido = this.add.sprite(1240, 30, 'botonMusic').setInteractive();

        this.bSonido.on('pointerdown', function () {
            this.sonido.musicOn = !this.sonido.musicOn;
            this.updateAudio();
        }.bind(this));

        this.updateAudio();

        this.input.on('pointerover', function (event, gameObjects) {
            gameObjects[0].setScale(1.15);
        }.bind(this));
        this.input.on('pointerout', function (event, gameObjects) {
            gameObjects[0].setScale(1);
        }.bind(this));

        this.cursor_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.cameras.main.once('camerafadeoutcomplete', function () {
            this.scene.start("SceneMenu");
        }.bind(this));
    }

    updateAudio() {
        if (this.sonido.musicOn === false) {
            this.bSonido.setFrame(1);
            this.sys.game.globalsSonido.music.pause();
        } else {
            this.bSonido.setFrame(0);
            this.sys.game.globalsSonido.music.resume();
        }
    }

    update() {
        if (this.cursor_ESC.isDown && !this.pulsado) {
            this.pulsado = true;
            this.cameras.main.fadeOut(250);
        }
    }
}