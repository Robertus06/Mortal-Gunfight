export default class SceneMenu extends Phaser.Scene {
    constructor() {
        super({ key: "SceneMenu" });
    }

    create() {
        this.pulsadoControles = false;
        this.pulsadoJugar = false;
        this.cameras.main.fadeIn(250);
        
        this.fondo = this.add.image(640, 360, 'fondoMenu');

        this.transicion = this.sys.game.globalsTransicion.transicion;

        // Para que la música no pare si clicamos fuera de la pantalla de google
        this.sound.pauseOnBlur = false;

        this.sonido = this.sys.game.globalsSonido.sonido;
        if (this.sonido.musicOn === true && this.sonido.bgMusicPlaying === false) {
            this.music = this.sound.add('musica', { loop: true });
            this.music.play()
            this.sonido.bgMusicPlaying = true;
            this.sys.game.globalsSonido.music = this.music;
        }

        // Intento de que inicie por si solo
        // this.input.on('pointerdown', callback, context);

        this.bSonido = this.add.sprite(1240, 30, 'botonMusic', 0).setInteractive();

        this.bSonido.on('pointerdown', function () {
            this.sonido.musicOn = !this.sonido.musicOn;
            this.updateAudio();
        }.bind(this));

        this.updateAudio();

        this.bJugar = this.add.sprite(640, 475, 'botonJugar').setInteractive();
        this.bControles = this.add.sprite(640, 640, 'botonControles').setInteractive();

        // Clic botón controles
        this.bControles.on('pointerdown', function () {
            this.bControles.destroy();
            this.bControles = this.add.sprite(640, 640, 'botonControles');
            this.bJugar.destroy();
            this.bJugar = this.add.sprite(640, 475, 'botonJugar');
            this.cameras.main.fadeOut(250);
            this.pulsadoControles = true;
        }.bind(this));

        // Clic botón jugar
        this.bJugar.on('pointerdown', function () {
            this.bControles.destroy();
            this.bControles = this.add.sprite(640, 640, 'botonControles');
            this.bJugar.destroy();
            this.bJugar = this.add.sprite(640, 475, 'botonJugar');
            this.cameras.main.fadeOut(250);
            this.pulsadoJugar = true;
        }.bind(this));

        // Zoom en botones cuando pasas por encima
        this.input.on('pointerover', function (event, gameObjects) {
            gameObjects[0].setScale(1.15);
        }.bind(this));
        this.input.on('pointerout', function (event, gameObjects) {
            gameObjects[0].setScale(1);
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
            }
        }.bind(this));
    }
}