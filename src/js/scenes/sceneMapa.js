export default class SceneMapa extends Phaser.Scene {
    constructor() {
        super({ key: "SceneMapa" });
    }

    create() {
        this.cameras.main.fadeIn(250);

        this.pulsado = false;

        this.fondo = this.add.image(640, 360, 'mapa');

        this.transicion = this.sys.game.globalsTransicion.transicion;
        this.siguiente = false;

        this.mapa = this.sys.game.globalsMapa.mapa;
        this.mapa.escenario = null;

        this.bTemplo = this.add.image(850, 648, 'botonTemplo').setInteractive();
        this.bCiudad = this.add.image(635, 648, 'botonCiudad').setInteractive();
        this.bVolcan = this.add.image(425, 648, 'botonVolcan').setInteractive();

        this.seleccionadoMapa = null;
        this.resplandorMapa = null;

        this.bTemplo.on('pointerover', function () {
            this.bTemplo.setScale(1.15);
            this.bTemplo.setDepth(2);
            this.nombreMapa = this.add.image(293, 130, 'nombreTemplo');
            this.nombreMapa.setOrigin(0);
            this.seleccionadoMapa = this.add.image(640, 342, 'templo');
            this.seleccionadoMapa.setScale(0.505, 0.5);
            this.resplandorMapa = this.add.image(850, 648, 'botonMapa');
            this.resplandorMapa.setDepth(1);
            this.resplandorMapa.setScale(1.15);
        }.bind(this));

        this.bTemplo.on('pointerout', function () {
            this.bTemplo.setScale(1);
            this.nombreMapa.destroy();
            this.resplandorMapa.destroy();
            this.seleccionadoMapa.destroy();
        }.bind(this));

        this.bTemplo.on('pointerdown', function () {
            this.mapa.escenario = 't';
            this.resplandorMapa.setScale(1);
            this.bTemplo.destroy();
            this.bTemplo = this.add.image(850, 648, 'botonTemplo');
            this.bTemplo.setDepth(2);
            this.bCiudad.destroy();
            this.bCiudad = this.add.image(635, 648, 'botonCiudad');
            this.bVolcan.destroy();
            this.bVolcan = this.add.image(425, 648, 'botonVolcan');
            this.siguiente = true;
            this.cameras.main.fadeOut(250);
        }.bind(this));

        this.bCiudad.on('pointerover', function () {
            this.bCiudad.setScale(1.15);
            this.bCiudad.setDepth(2);
            this.nombreMapa = this.add.image(293, 130, 'nombreCiudad');
            this.nombreMapa.setOrigin(0);
            this.seleccionadoMapa = this.add.image(640, 342, 'ciudad');
            this.seleccionadoMapa.setScale(0.505, 0.5);
            this.resplandorMapa = this.add.image(635, 648, 'botonMapa');
            this.resplandorMapa.setDepth(1);
            this.resplandorMapa.setScale(1.15);
        }.bind(this));

        this.bCiudad.on('pointerout', function () {
            this.bCiudad.setScale(1);
            this.nombreMapa.destroy();
            this.resplandorMapa.destroy();
            this.seleccionadoMapa.destroy();
        }.bind(this));

        /**
        this.bCiudad.on('pointerdown', function () {
            this.mapa.escenario = 'c';
            this.resplandorMapa.setScale(1);
            this.bTemplo.destroy();
            this.bTemplo = this.add.image(850, 648, 'botonTemplo');
            this.bCiudad.destroy();
            this.bCiudad = this.add.image(635, 648, 'botonCiudad');
            this.bCiudad.setDepth(2);
            this.bVolcan.destroy();
            this.bVolcan = this.add.image(425, 648, 'botonVolcan');
            this.siguiente = true;
            this.cameras.main.fadeOut(250);
        }.bind(this));
        /**/

        this.bVolcan.on('pointerover', function () {
            this.bVolcan.setScale(1.15);
            this.bVolcan.setDepth(2);
            this.nombreMapa = this.add.image(293, 125, 'nombreVolcan');
            this.nombreMapa.setOrigin(0);
            this.seleccionadoMapa = this.add.image(640, 342, 'volcan');
            this.seleccionadoMapa.setScale(0.505, 0.5);
            this.resplandorMapa = this.add.image(425, 648, 'botonMapa');
            this.resplandorMapa.setDepth(1);
            this.resplandorMapa.setScale(1.15);
        }.bind(this));

        this.bVolcan.on('pointerout', function () {
            this.bVolcan.setScale(1);
            this.nombreMapa.destroy();
            this.resplandorMapa.destroy();
            this.seleccionadoMapa.destroy();
        }.bind(this));

        /**
        this.bVolcan.on('pointerdown', function () {
            this.mapa.escenario = 'v';
            this.resplandorMapa.setScale(1);
            this.bTemplo.destroy();
            this.bTemplo = this.add.image(850, 648, 'botonTemplo');
            this.bCiudad.destroy();
            this.bCiudad = this.add.image(635, 648, 'botonCiudad');
            this.bVolcan.destroy();
            this.bVolcan = this.add.image(425, 648, 'botonVolcan');
            this.bVolcan.setDepth(2);
            this.siguiente = true;
            this.cameras.main.fadeOut(250);
        }.bind(this));
        /**/

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
        if (this.cursor_ESC.isDown && !this.pulsado) {
            this.pulsado = true;
            this.cameras.main.fadeOut(250);
            this.siguiente = false;
        }

        this.cameras.main.once('camerafadeoutcomplete', function () {
            if (this.siguiente) {
                this.scene.start("ScenePreparatoria");
            } else if (!this.siguiente) {
                this.scene.start("ScenePersonajeUno");
                this.transicion.cancelarSeleccion = false;
            }
        }.bind(this));
    }
}