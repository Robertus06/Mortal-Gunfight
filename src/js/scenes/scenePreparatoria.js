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
        
        this.cameras.main.once('camerafadeincomplete', function () {        
            this.boton30 = this.add.sprite(440, 680, 'botones', 1).setInteractive();
            this.boton2 = this.add.sprite(640, 680, 'botones', 0).setInteractive();
            this.boton5 = this.add.sprite(840, 680, 'botones', 1).setInteractive();

            this.timeText = this.add.text(640, 610, 'Seleccione el tiempo de juego: (Por defecto 02:00)', { fontFamily: 'luckiestGuy', fontSize: 25, shadowStroke: true, shadowBlur: 1, strokeThickness: 4, stroke: '#000000' });
            this.timeText.setOrigin(0.5);

            this.timeText30 = this.add.text(440, 680, '00:30', { fontFamily: 'luckiestGuy', fontSize: 30, shadowStroke: true, shadowBlur: 1, strokeThickness: 4, stroke: '#000000' });
            this.timeText30.setOrigin(0.5);
            this.timeText2 = this.add.text(640, 680, '02:00', { fontFamily: 'luckiestGuy', fontSize: 30, shadowStroke: true, shadowBlur: 1, strokeThickness: 4, stroke: '#000000' });
            this.timeText2.setOrigin(0.5);
            this.timeText5 = this.add.text(840, 680, '05:00', { fontFamily: 'luckiestGuy', fontSize: 30, shadowStroke: true, shadowBlur: 1, strokeThickness: 4, stroke: '#000000' });
            this.timeText5.setOrigin(0.5);
        }.bind(this));

        this.sonidoBoton = this.sound.add('sonidoBoton');

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
            this.sonidoBoton.play();
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
            this.sonidoBoton.play();
            this.unoListo = true;
            this.listo = this.add.image(1120, 400, 'listo');
        } else if (this.cursor_W.isDown && !this.dosListo) {
            this.sonidoBoton.play();
            this.dosListo = true;
            this.listo = this.add.image(172, 400, 'listo');
        }

        if (this.unoListo && this.dosListo && !this.cargado) {
            this.cuentaAtras = this.add.sprite(640, 430, 'cuentaAtras').play('tiempo');
            this.cargado = true;

            this.cuentaAtras.on('animationcomplete', function () {
                this.scene.start("SceneJuego");
            }.bind(this));
        }
    }
}