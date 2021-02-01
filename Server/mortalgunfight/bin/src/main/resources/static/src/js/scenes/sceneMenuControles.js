export default class SceneMenuControles extends Phaser.Scene {
    constructor() {
        super({ key: "SceneMenuControles" });
    }

    create() {
        this.cameras.main.fadeIn(250);

        this.pulsado = false;
        this.pulsadoAtras = false;
        this.pulsadoControlesLinea = false;
        this.pulsadoControlesLocal = false;

        this.fondo = this.add.image(640, 360, 'fondoControles');

        this.bControlesLinea = this.add.sprite(640, 350, 'botonControlesLinea').setInteractive();
        this.bControlesLocal = this.add.sprite(640, 550, 'botonControlesLocal').setInteractive();

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

        this.bControlesLinea.on('pointerover', function() {
            this.sonidoBoton.play();
            this.bControlesLinea.setScale(1.15);
        }.bind(this));

        this.bControlesLinea.on('pointerout', function() {
            this.bControlesLinea.setScale(1);
        }.bind(this));

        this.bControlesLinea.on('pointerdown', function() {
            this.bControlesLinea.destroy();
            this.bControlesLinea = this.add.sprite(640, 350, 'botonControlesLinea');
            this.bControlesLocal.destroy();
            this.bControlesLocal = this.add.sprite(640, 550, 'botonControlesLocal');
            this.pulsado = true;
            this.cameras.main.fadeOut(250);
            this.pulsadoControlesLinea = true;
        }.bind(this));

        this.bControlesLocal.on('pointerover', function() {
            this.sonidoBoton.play();
            this.bControlesLocal.setScale(1.15);
        }.bind(this));

        this.bControlesLocal.on('pointerout', function() {
            this.bControlesLocal.setScale(1);
        }.bind(this));

        this.bControlesLocal.on('pointerdown', function() {
            this.bControlesLinea.destroy();
            this.bControlesLinea = this.add.sprite(640, 350, 'botonControlesLinea');
            this.bControlesLocal.destroy();
            this.bControlesLocal = this.add.sprite(640, 550, 'botonControlesLocal');
            this.pulsado = true;
            this.cameras.main.fadeOut(250);
            this.pulsadoControlesLocal = true;
        }.bind(this));

        this.cursor_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
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
            this.bControlesLinea.destroy();
            this.bControlesLinea = this.add.sprite(640, 350, 'botonControlesLinea');
            this.bControlesLocal.destroy();
            this.bControlesLocal = this.add.sprite(640, 550, 'botonControlesLocal');
            this.pulsado = true;
            this.sonidoAtras.play();
            this.pulsadoAtras = true;
            this.cameras.main.fadeOut(250);
        }

        this.cameras.main.once('camerafadeoutcomplete', function () {
            if (this.pulsadoControlesLocal) {
                this.scene.start("SceneControles");
            } else if (this.pulsadoControlesLinea) {
                this.scene.start("SceneControlesLinea");
            } else if (this.pulsadoAtras) {
                this.scene.start("SceneMenu");
            }
        }.bind(this));
    }
}