export default class ScenePersonajeUno extends Phaser.Scene {
    constructor() {
        super({ key: "ScenePersonajeUno" });
    }

    create() {
        this.fondo = this.add.image(640, 360, 'personajes');

        this.personaje = this.sys.game.globalsPersonaje.personaje;
        this.personaje.jugadorUno = null;

        this.seleccionadoUno = null;
        this.nombreUno = null;

        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0).setInteractive();
        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0).setInteractive();
        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0).setInteractive();
        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0).setInteractive();

        this.bDinosaurio.on('pointerover', function () {
            this.bDinosaurio.setScale(1.15);
            this.nombreUno = this.add.image(100, 145, 'nombreDinosaurio');
            this.nombreUno.setOrigin(0);
            this.seleccionadoUno = this.add.image(290, 350, 'dinosaurio');
            this.seleccionadoUno.setScale(-0.17, 0.17);
        }.bind(this));

        this.bDinosaurio.on('pointerout', function () {
            this.bDinosaurio.setScale(1);
            this.nombreUno.destroy();
            this.seleccionadoUno.destroy();
        }.bind(this));

        this.bDinosaurio.on('pointerdown', function () {
            this.personaje.jugadorUno = 'd';
            this.scene.start("ScenePersonajeDos");
        }.bind(this));

        this.bZombie.on('pointerover', function () {
            this.bZombie.setScale(1.15);
            this.nombreUno = this.add.image(100, 145, 'nombreZombie');
            this.nombreUno.setOrigin(0);
            this.seleccionadoUno = this.add.image(310, 350, 'zombie');
            this.seleccionadoUno.setScale(-0.17, 0.17);
        }.bind(this));

        this.bZombie.on('pointerout', function () {
            this.bZombie.setScale(1);
            this.nombreUno.destroy();
            this.seleccionadoUno.destroy();
        }.bind(this));

        this.bZombie.on('pointerdown', function () {
            this.personaje.jugadorUno = 'z';
            this.scene.start("ScenePersonajeDos");
        }.bind(this));

        this.bCiego.on('pointerover', function () {
            this.bCiego.setScale(1.15);
            this.nombreUno = this.add.image(100, 145, 'nombreCiego');
            this.nombreUno.setOrigin(0);
            this.seleccionadoUno = this.add.image(290, 356, 'ciego');
            this.seleccionadoUno.setScale(-0.17, 0.17);
        }.bind(this));

        this.bCiego.on('pointerout', function () {
            this.bCiego.setScale(1);
            this.nombreUno.destroy();
            this.seleccionadoUno.destroy();
        }.bind(this));

        this.bCiego.on('pointerdown', function () {
            this.personaje.jugadorUno = 'c';
            this.scene.start("ScenePersonajeDos");
        }.bind(this));

        this.bNinja.on('pointerover', function () {
            this.bNinja.setScale(1.15);
            this.nombreUno = this.add.image(100, 145, 'nombreNinja');
            this.nombreUno.setOrigin(0);
            this.seleccionadoUno = this.add.image(330, 350, 'ninja');
            this.seleccionadoUno.setScale(-0.17, 0.17);
        }.bind(this));

        this.bNinja.on('pointerout', function () {
            this.bNinja.setScale(1);
            this.nombreUno.destroy();
            this.seleccionadoUno.destroy();
        }.bind(this));

        this.bNinja.on('pointerdown', function () {
            this.personaje.jugadorUno = 'n';
            this.scene.start("ScenePersonajeDos");
        }.bind(this));

        this.sonido = this.sys.game.globalsSonido.sonido;

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
            this.scene.start("SceneMenu");
        }
    }
}