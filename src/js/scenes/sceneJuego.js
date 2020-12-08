export default class SceneJuego extends Phaser.Scene {
    constructor() {
        super({ key: "SceneJuego" });
    }

    create() {
        this.fondo = this.add.image(640, 360, 'inicio');

        this.personaje = this.sys.game.globalsPersonaje.personaje;
        this.mapa = this.sys.game.globalsMapa.mapa;
        this.sonido = this.sys.game.globalsSonido.sonido;

        console.log("jugadorUno: ", this.personaje.jugadorUno, " jugadorDos: ", this.personaje.jugadorDos);
        console.log("mapa: ", this.mapa.escenario);

        this.bSonido = this.add.sprite(1240, 30, 'botonMusic').setInteractive();

        this.bSonido.on('pointerdown', function () {
            this.sonido.musicOn = !this.sonido.musicOn;
            this.updateAudio();
        }.bind(this));

        this.updateAudio();

        this.bSonido.on('pointerover', function () {
            this.bSonido.setScale(1.15);
        }.bind(this));
        this.bSonido.on('pointerout', function () {
            this.bSonido.setScale(1);
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
        if (this.cursor_ESC.isDown) {
            this.scene.start("SceneMapa");
        }
    }
}