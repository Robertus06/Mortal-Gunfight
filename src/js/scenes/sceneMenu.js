export default class SceneMenu extends Phaser.Scene {
    constructor() {
        super({ key: "SceneMenu" });
    }

    create() {
        this.pulsadoControles = false;
        this.pulsadoJugar = false;
        this.pulsadoCreditos = false;
        this.cameras.main.fadeIn(250);
        
        this.fondo = this.add.image(640, 360, 'fondoMenu');

        this.sonidoBoton = this.sound.add('sonidoBoton');

        this.transicion = this.sys.game.globalsTransicion.transicion;

        // Para que la música no pare si clicamos fuera de la pantalla de google
        this.sound.pauseOnBlur = false;

        this.sonido = this.sys.game.globalsSonido.sonido;
        if (this.sonido.musicOn === true && this.sonido.bgMusicPlaying === false) {
            this.music = this.sound.add('musica', { loop: true });
            this.music.play()
            this.music.setVolume(0.2);
            this.sonido.bgMusicPlaying = true;
            this.sys.game.globalsSonido.music = this.music;
        }

        // Intento de que inicie por si solo
        // this.input.on('pointerdown', callback, context);

        this.bSonido = this.add.sprite(1240, 30, 'botonMusic', 0).setInteractive();

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

        this.bJugar = this.add.sprite(640, 475, 'botonJugar').setInteractive();
        this.bControles = this.add.sprite(640, 640, 'botonControles').setInteractive();
        this.bCreditos = this.add.sprite(100, 40, 'botonCreditos').setInteractive();

        this.bCreditos.on('pointerover', function () {
            this.sonidoBoton.play();
            this.bCreditos.setScale(1.15);
        }.bind(this));

        this.bCreditos.on('pointerout', function () {
            this.bCreditos.setScale(1);
        }.bind(this));

        this.bCreditos.on('pointerdown', function () {
            this.bCreditos.destroy();
            this.bCreditos = this.add.sprite(100, 40, 'botonCreditos');
            this.bControles.destroy();
            this.bControles = this.add.sprite(640, 640, 'botonControles');
            this.bJugar.destroy();
            this.bJugar = this.add.sprite(640, 475, 'botonJugar');
            this.cameras.main.fadeOut(250);
            this.pulsadoCreditos = true;
        }.bind(this));

        this.bControles.on('pointerover', function () {
            this.sonidoBoton.play();
            this.bControles.setScale(1.15);
        }.bind(this));

        this.bControles.on('pointerout', function () {
            this.bControles.setScale(1);
        }.bind(this));

        this.bControles.on('pointerdown', function () {
            this.bCreditos.destroy();
            this.bCreditos = this.add.sprite(100, 40, 'botonCreditos');
            this.bControles.destroy();
            this.bControles = this.add.sprite(640, 640, 'botonControles');
            this.bJugar.destroy();
            this.bJugar = this.add.sprite(640, 475, 'botonJugar');
            this.cameras.main.fadeOut(250);
            this.pulsadoControles = true;
        }.bind(this));

        this.bJugar.on('pointerover', function () {
            this.sonidoBoton.play();
            this.bJugar.setScale(1.15);
        }.bind(this));

        this.bJugar.on('pointerout', function () {
            this.bJugar.setScale(1);
        }.bind(this));

        this.bJugar.on('pointerdown', function () {
            this.bCreditos.destroy();
            this.bCreditos = this.add.sprite(100, 40, 'botonCreditos');
            this.bControles.destroy();
            this.bControles = this.add.sprite(640, 640, 'botonControles');
            this.bJugar.destroy();
            this.bJugar = this.add.sprite(640, 475, 'botonJugar');
            this.cameras.main.fadeOut(250);
            this.pulsadoJugar = true;
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
        this.cameras.main.once('camerafadeoutcomplete', function () {
            if (this.pulsadoControles) {
                this.scene.start("SceneControles");
            } else if (this.pulsadoJugar) {
                this.scene.start("ScenePersonajeUno");
                this.transicion.cancelarSeleccion = false;
            } else if (this.pulsadoCreditos) {
                this.scene.start("SceneCreditos");
            }
        }.bind(this));
    }
}