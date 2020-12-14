export default class ScenePreparatoria extends Phaser.Scene {
    constructor() {
        super({ key: "ScenePreparatoria" });
    }

    create() {
        this.cameras.main.fadeIn(250);

        this.mapa = this.sys.game.globalsMapa.mapa;

        this.unoListo = false;
        this.dosListo = false;
        this.cargado = false;

        this.anims.create({
            key: 'tiempo',
            frames: this.anims.generateFrameNumbers('cuentaAtras'),
            frameRate: 1,
            repeat: 0
        });

        if (this.mapa.escenario == 't') {
            this.fondo = this.add.image(640, 360, 'temploBlur');
        } else if (this.mapa.escenario == 'v') {
            this.fondo = this.add.image(640, 360, 'volcanBlur');
        } else if (this.mapa.escenario == 'c') {
            this.fondo = this.add.image(640, 360, 'ciudadBlur');
        }

        this.preparatoria = this.add.image(640, 360, 'preparatoria');

        // this.cameras.main.shake(500);
        // this.fondo.blendMode = Phaser.BlendModes.LUMINOSITY;

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

        this.cursor_I = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
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
        if (this.cursor_I.isDown && !this.unoListo) {
            this.unoListo = true;
            this.listo = this.add.image(1120, 400, 'listo');
        } else if (this.cursor_W.isDown && !this.dosListo) {
            this.dosListo = true;
            this.listo = this.add.image(172, 400, 'listo');
        }

        if (this.unoListo && this.dosListo && !this.cargado) {
            this.cuentaAtras = this.add.sprite(640, 500, 'cuentaAtras').play('tiempo');
            this.cargado = true;

            this.cuentaAtras.on('animationcomplete', function () {
                this.scene.start("SceneJuego");
            }.bind(this));
        }
    }
}