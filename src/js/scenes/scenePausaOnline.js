export default class ScenePausaOnline extends Phaser.Scene {
    constructor() {
        super({ key: "ScenePausaOnline" });
    }

    create() {
        this.mapa = this.sys.game.globalsMapa.mapa;

        this.unoListo = false;
        this.dosListo = false;
        this.cargado = false;

        this.botonEnemi = null;

        this.pulsado = false;

        this.anims.create({
            key: 'tiempo',
            frames: this.anims.generateFrameNumbers('cuentaAtras'),
            frameRate: 1,
            repeat: 0
        });

        if (this.mapa.escenario == 't') {
            this.fondo = this.add.image(640, 360, 'temploBlur');
            this.fondo.setAlpha(0.7);
        } else if (this.mapa.escenario == 'v') {
            this.fondo = this.add.image(640, 360, 'volcanBlur');
            this.fondo.setAlpha(0.7);
        } else if (this.mapa.escenario == 'c') {
            this.fondo = this.add.image(640, 360, 'ciudadBlur');
            this.fondo.setAlpha(0.7);
        }

        this.sonidoBoton = this.sound.add('sonidoBoton');
        this.sonidoAtras = this.sound.add('sonidoAtras');

        this.bContinuar = this.add.image(640, 260, 'continuarPartida').setInteractive();
        this.bSalir = this.add.image(640, 410, 'salirMenu').setInteractive();

        this.bContinuar.on('pointerdown', function () {
            this.bContinuar.destroy();
            this.bSalir.destroy();
            this.cuentaAtras = this.add.sprite(640, 360, 'cuentaAtras').play('tiempo');
            this.cuentaAtras.setScale(1.3);

            this.cuentaAtras.on('animationcomplete', function () {
                this.scene.wake("SceneJuegoOnline");
                this.scene.stop();
            }.bind(this));
        }.bind(this));

        this.bContinuar.on('pointerover', function () {
            this.sonidoBoton.play();
            this.bContinuar.setScale(1.15);
        }.bind(this));

        this.bContinuar.on('pointerout', function () {
            this.bContinuar.setScale(1);
        }.bind(this));

        this.bSalir.on('pointerdown', function () {
            this.bContinuar.destroy();
            this.bContinuar = this.add.image(640, 260, 'continuarPartida');
            this.bSalir.destroy();
            this.bSalir = this.add.image(640, 410, 'salirMenu');
            this.cameras.main.fadeOut(250);
        }.bind(this));

        this.bSalir.on('pointerover', function () {
            this.sonidoBoton.play();
            this.bSalir.setScale(1.15);
        }.bind(this));

        this.bSalir.on('pointerout', function () {
            this.bSalir.setScale(1);
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
            this.scene.stop("SceneJuegoOnline");
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

    update () {
        //recogemos en una peticion a WS lo que ha hecho el enemigo, y lo almacenamos en la variable this.botonEnemi
        if ((this.botonEnemi == 'esc' || this.botonEnemi == 'c') && !this.pulsado) {
            this.sonidoAtras.play();
            this.bContinuar.destroy();
            this.bSalir.destroy();
            this.cuentaAtras = this.add.sprite(640, 360, 'cuentaAtras').play('tiempo');
            this.cuentaAtras.setScale(1.3);

            this.cuentaAtras.on('animationcomplete', function () {
                this.scene.wake("SceneJuegoOnline");
                this.scene.stop();
            }.bind(this));

            this.pulsado = true;
        } else if (this.botonEnemi == 's') {
            this.sonidoAtras.play();
            this.bContinuar.destroy();
            this.bContinuar = this.add.image(640, 260, 'continuarPartida');
            this.bSalir.destroy();
            this.bSalir = this.add.image(640, 410, 'salirMenu');
            this.cameras.main.fadeOut(250);
        }

        if (this.cursor_ESC.isDown && !this.pulsado) {
            this.sonidoAtras.play();
            this.pulsado = true;
            this.bContinuar.destroy();
            this.bSalir.destroy();
            this.cuentaAtras = this.add.sprite(640, 360, 'cuentaAtras').play('tiempo');
            this.cuentaAtras.setScale(1.3);

            this.cuentaAtras.on('animationcomplete', function () {
                this.scene.wake("SceneJuegoOnline");
                this.scene.stop();
            }.bind(this));
        }
    }
}