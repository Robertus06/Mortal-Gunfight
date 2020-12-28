export default class SceneCreditos extends Phaser.Scene {
    constructor() {
        super({ key: "SceneCreditos" });
    }

    create() {
        this.cameras.main.fadeIn(250);

        this.pulsado = false;

        this.fondo = this.add.image(640, 360, 'inicio');
        //this.creditos = this.physics.add.image(640, 360, 'creditos');
        this.creditos = this.add.image(640, 360, 'creditos');

        /**
        this.creditos.setVelocity(25, 15);
        this.creditos.setBounce(1, 1);
        this.creditos.setCollideWorldBounds(true);
        this.creditos.setAccelerationY(-1000);
        /**/

        this.sonidoBoton = this.sound.add('sonidoBoton');
        this.sonidoAtras = this.sound.add('sonidoAtras');

        this.sonido = this.sys.game.globalsSonido.sonido;

        this.bSonido = this.add.sprite(1240, 30, 'botonMusic').setInteractive();
        
        this.bSonido.on('pointerover', function () {
            this.sonidoBoton.play();
            this.bSonido.setScale(1.15);
        }.bind(this));

        this.bSonido.on('pointerout', function () {
            this.bSonido.setScale(1);
        }.bind(this));

        this.bSonido.on('pointerdown', function () {
            this.sonido.musicOn = !this.sonido.musicOn;
            this.updateAudio();
        }.bind(this));

        this.updateAudio();

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
            this.sonidoAtras.play();
            this.cameras.main.fadeOut(250);
        }
    }
}