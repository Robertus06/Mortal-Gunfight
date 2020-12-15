export default class ScenePersonajeUno extends Phaser.Scene {
    constructor() {
        super({ key: "ScenePersonajeUno" });
    }

    create() {
        this.transicion = this.sys.game.globalsTransicion.transicion;

        this.pulsado = false;
        
        if (!this.transicion.cancelarSeleccion) {
            this.cameras.main.fadeIn(250);
        }

        this.fondo = this.add.image(640, 360, 'personajes');

        this.fraseCiego = this.sound.add('fraseCiego');
        this.fraseDinosaurio = this.sound.add('fraseDinosaurio');
        this.fraseNinja = this.sound.add('fraseNinja');
        this.fraseZombie = this.sound.add('fraseZombie');

        this.sonidoBoton = this.sound.add('sonidoBoton');
        this.sonidoAtras = this.sound.add('sonidoAtras');

        this.personaje = this.sys.game.globalsPersonaje.personaje;
        this.personaje.jugadorUno = null;

        this.seleccionadoUno = null;
        this.resplandorUno = null;
        this.nombreUno = null;

        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0).setInteractive();
        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0).setInteractive();
        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0).setInteractive();
        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0).setInteractive();
        
        this.bDinosaurio.on('pointerover', function () {
            this.sonidoBoton.play();
            this.bDinosaurio.setScale(1.15);
            this.bDinosaurio.setDepth(2);
            this.nombreUno = this.add.image(100, 145, 'nombreDinosaurio');
            this.nombreUno.setOrigin(0);
            this.seleccionadoUno = this.add.image(290, 350, 'dinosaurio');
            this.seleccionadoUno.setScale(-0.17, 0.17);
            this.resplandorUno = this.add.image(837, 649, 'botonJugadorUno');
            this.resplandorUno.setDepth(1);
            this.resplandorUno.setScale(1.15);
        }.bind(this));

        this.bDinosaurio.on('pointerout', function () {
            this.bDinosaurio.setScale(1);
            this.nombreUno.destroy();
            this.resplandorUno.destroy();
            this.seleccionadoUno.destroy();
        }.bind(this));

        this.bZombie.on('pointerover', function () {
            this.sonidoBoton.play();
            this.bZombie.setScale(1.15);
            this.bZombie.setDepth(2);
            this.nombreUno = this.add.image(100, 145, 'nombreZombie');
            this.nombreUno.setOrigin(0);
            this.seleccionadoUno = this.add.image(310, 350, 'zombie');
            this.seleccionadoUno.setScale(-0.17, 0.17);
            this.resplandorUno = this.add.image(690, 649, 'botonJugadorUno');
            this.resplandorUno.setDepth(1);
            this.resplandorUno.setScale(1.15);
        }.bind(this));

        this.bZombie.on('pointerout', function () {
            this.bZombie.setScale(1);
            this.nombreUno.destroy();
            this.resplandorUno.destroy();
            this.seleccionadoUno.destroy();
        }.bind(this));

        this.bCiego.on('pointerover', function () {
            this.sonidoBoton.play();
            this.bCiego.setScale(1.15);
            this.bCiego.setDepth(2);
            this.nombreUno = this.add.image(100, 145, 'nombreCiego');
            this.nombreUno.setOrigin(0);
            this.seleccionadoUno = this.add.image(290, 356, 'ciego');
            this.seleccionadoUno.setScale(-0.17, 0.17);
            this.resplandorUno = this.add.image(400, 649, 'botonJugadorUno');
            this.resplandorUno.setDepth(1);
            this.resplandorUno.setScale(1.15);
        }.bind(this));

        this.bCiego.on('pointerout', function () {
            this.bCiego.setScale(1);
            this.nombreUno.destroy();
            this.resplandorUno.destroy();
            this.seleccionadoUno.destroy();
        }.bind(this));

        this.bNinja.on('pointerover', function () {
            this.sonidoBoton.play();
            this.bNinja.setScale(1.15);
            this.bNinja.setDepth(2);
            this.nombreUno = this.add.image(100, 145, 'nombreNinja');
            this.nombreUno.setOrigin(0);
            this.seleccionadoUno = this.add.image(330, 350, 'ninja');
            this.seleccionadoUno.setScale(-0.17, 0.17);
            this.resplandorUno = this.add.image(545, 649, 'botonJugadorUno');
            this.resplandorUno.setDepth(1);
            this.resplandorUno.setScale(1.15);
        }.bind(this));

        this.bNinja.on('pointerout', function () {
            this.bNinja.setScale(1);
            this.nombreUno.destroy();
            this.resplandorUno.destroy();
            this.seleccionadoUno.destroy();
        }.bind(this));

        this.sonido = this.sys.game.globalsSonido.sonido;

        this.bSonido = this.add.sprite(1240, 30, 'botonMusic').setInteractive();

        this.bSonido.on('pointerdown', function () {
            this.sonido.musicOn = !this.sonido.musicOn;
            this.updateAudio();
        }.bind(this));

        this.updateAudio();

        this.bSonido.on('pointerover', function () {
            this.sonidoBoton.play();
            this.bSonido.setScale(1.15);
        }.bind(this));
        this.bSonido.on('pointerout', function () {
            this.bSonido.setScale(1);
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
        this.bDinosaurio.on('pointerdown', function () {
            this.personaje.jugadorUno = 'd';
            this.resplandorUno.setScale(1);
            this.bDinosaurio.destroy();
            this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
            this.bDinosaurio.setDepth(2);
            this.bZombie.destroy();
            this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
            this.bCiego.destroy();
            this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
            this.bNinja.destroy();
            this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
            this.pulsado = true;
            this.fraseDinosaurio.play();
            this.fraseDinosaurio.on('complete', function () {
                this.scene.start("ScenePersonajeDos");
            }.bind(this));
        }.bind(this));

        this.bZombie.on('pointerdown', function () {
            this.personaje.jugadorUno = 'z';
            this.resplandorUno.setScale(1);
            this.bZombie.destroy();
            this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
            this.bZombie.setDepth(2);
            this.bDinosaurio.destroy();
            this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
            this.bCiego.destroy();
            this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
            this.bNinja.destroy();
            this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
            this.pulsado = true;
            this.fraseZombie.play();
            this.fraseZombie.on('complete', function () {
                this.scene.start("ScenePersonajeDos");
            }.bind(this));
        }.bind(this));

        this.bCiego.on('pointerdown', function () {
            this.personaje.jugadorUno = 'c';
            this.resplandorUno.setScale(1);
            this.bCiego.destroy();
            this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
            this.bCiego.setDepth(2);
            this.bZombie.destroy();
            this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
            this.bDinosaurio.destroy();
            this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
            this.bNinja.destroy();
            this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
            this.pulsado = true;
            this.fraseCiego.play();
            this.fraseCiego.setVolume(2);
            this.fraseCiego.on('complete', function () {
                this.scene.start("ScenePersonajeDos");
            }.bind(this));
        }.bind(this));

        this.bNinja.on('pointerdown', function () {
            this.personaje.jugadorUno = 'n';
            this.resplandorUno.setScale(1);
            this.bNinja.destroy();
            this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
            this.bNinja.setDepth(2);
            this.bZombie.destroy();
            this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
            this.bCiego.destroy();
            this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
            this.bDinosaurio.destroy();
            this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
            this.pulsado = true;
            this.fraseNinja.play();
            this.fraseNinja.on('complete', function () {
                this.scene.start("ScenePersonajeDos");
            }.bind(this));
        }.bind(this));

        if (this.cursor_ESC.isDown && !this.pulsado) {
            this.pulsado = true;
            this.sonidoAtras.play();
            this.cameras.main.fadeOut(250);
        }
    }
}