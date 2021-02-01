export default class ScenePreparatoriaOnline extends Phaser.Scene {
    constructor() {
        super({ key: "ScenePreparatoriaOnline" });
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

        this.jugadores = this.sys.game.globalsJugadores.jugadores;

        this.tiempo = this.sys.game.globalsTiempo.tiempo;
        this.tiempo.tiempoJuego = 120000;
        this.tiempoComun = 120000;

        this.cursorEnemi = false;
        
        this.boton30 = this.add.sprite(440, 680, 'botones', 1).setInteractive();
        this.boton2 = this.add.sprite(640, 680, 'botones', 0).setInteractive();
        this.boton5 = this.add.sprite(840, 680, 'botones', 1).setInteractive();
        
        this.cameras.main.once('camerafadeincomplete', function () {        
            this.timeText = this.add.text(640, 610, 'Seleccione el tiempo de juego:\n(Por defecto 02:00)', { align: 'center', fontFamily: 'luckiestGuy', fontSize: 25, shadowStroke: true, shadowBlur: 1, strokeThickness: 4, stroke: '#000000' });
            this.timeText.setOrigin(0.5);

            this.timeText30 = this.add.text(440, 680, '00:30', { fontFamily: 'luckiestGuy', fontSize: 30, shadowStroke: true, shadowBlur: 1, strokeThickness: 4, stroke: '#000000' });
            this.timeText30.setOrigin(0.5);
            this.timeText2 = this.add.text(640, 680, '02:00', { fontFamily: 'luckiestGuy', fontSize: 30, shadowStroke: true, shadowBlur: 1, strokeThickness: 4, stroke: '#000000' });
            this.timeText2.setOrigin(0.5);
            this.timeText5 = this.add.text(840, 680, '05:00', { fontFamily: 'luckiestGuy', fontSize: 30, shadowStroke: true, shadowBlur: 1, strokeThickness: 4, stroke: '#000000' });
            this.timeText5.setOrigin(0.5);
        }.bind(this));

        this.boton30.on('pointerover', function () {
            this.sonidoBoton.play();
            this.boton30.setScale(1.15);
            this.timeText30.setScale(1.15);
        }.bind(this));

        this.boton30.on('pointerout', function () {
            this.boton30.setScale(1);
            this.timeText30.setScale(1);
        }.bind(this));

        this.boton2.on('pointerover', function () {
            this.sonidoBoton.play();
            this.boton2.setScale(1.15);
            this.timeText2.setScale(1.15);
        }.bind(this));

        this.boton2.on('pointerout', function () {
            this.boton2.setScale(1);
            this.timeText2.setScale(1);
        }.bind(this));

        this.boton5.on('pointerover', function () {
            this.sonidoBoton.play();
            this.boton5.setScale(1.15);
            this.timeText5.setScale(1.15);
        }.bind(this));

        this.boton5.on('pointerout', function () {
            this.boton5.setScale(1);
            this.timeText5.setScale(1);
        }.bind(this));

        this.sonidoBoton = this.sound.add('sonidoBoton');

        this.preparatoria = this.add.image(640, 360, 'preparatoriaOnline');

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
        //Recibimos desde el servidor si el enemigo ha pulsado algun boton de cambiar tiempo y lo almacenamos en
        //this.tiempoComun para usarlo en los ifs.

        if(this.tiempoComun == 30000) {
            this.boton30.setFrame(0);
            this.boton2.setFrame(1);
            this.boton5.setFrame(1);

            this.boton2.on('pointerdown', function () {
                this.boton30.setFrame(1);
                this.boton2.setFrame(0);
                this.boton5.setFrame(1);
                this.tiempoComun = 120000;
            }.bind(this));

            this.boton5.on('pointerdown', function () {
                this.boton30.setFrame(1);
                this.boton2.setFrame(1);
                this.boton5.setFrame(0);
                this.tiempoComun = 300000;
            }.bind(this));

        } else if (this.tiempoComun == 120000) {
            this.boton30.setFrame(1);
            this.boton2.setFrame(0);
            this.boton5.setFrame(1);

            this.boton30.on('pointerdown', function () {
                this.boton30.setFrame(0);
                this.boton2.setFrame(1);
                this.boton5.setFrame(1);
                this.tiempoComun = 30000;
            }.bind(this));

            this.boton5.on('pointerdown', function () {
                this.boton30.setFrame(1);
                this.boton2.setFrame(1);
                this.boton5.setFrame(0);
                this.tiempoComun = 300000;
            }.bind(this));

        } else if (this.tiempoComun == 300000) {
            this.boton30.setFrame(1);
            this.boton2.setFrame(1);
            this.boton5.setFrame(0);

            this.boton30.on('pointerdown', function () {
                this.boton30.setFrame(0);
                this.boton2.setFrame(1);
                this.boton5.setFrame(1);
                this.tiempoComun = 30000;
            }.bind(this));

            this.boton2.on('pointerdown', function () {
                this.boton30.setFrame(1);
                this.boton2.setFrame(0);
                this.boton5.setFrame(1);
                this.tiempoComun = 120000;
            }.bind(this));
        }

        //en una consulta al WS saber si el enemigo ha pulsado ya la W y entonces almacenarlo en this.cursorEnemi
        if (this.jugadores.jugYo == 1) {
            if (this.cursorEnemi && !this.enemiListo) {
                this.sonidoBoton.play();
                this.enemiListo = true;
                this.dosListo = true;
                this.listo = this.add.image(1120, 400, 'listo');
            } else if (this.cursor_W.isDown && !this.yoListo) {
                this.sonidoBoton.play();
                this.yoListo = true;
                this.unoListo = true;
                this.listo = this.add.image(172, 400, 'listo');
            }
        } else if (this.jugadores.jugYo == 2) {
            if (this.cursorEnemi && !this.enemiListo) {
                this.sonidoBoton.play();
                this.enemiListo = true;
                this.unoListo = true;
                this.listo = this.add.image(172, 400, 'listo');
            } else if (this.cursor_W.isDown && !this.yoListo) {
                this.sonidoBoton.play();
                this.yoListo = true;
                this.dosListo = true;
                this.listo = this.add.image(1120, 400, 'listo');
            }
        }

        if (this.unoListo && this.dosListo && !this.cargado) {
            this.cuentaAtras = this.add.sprite(640, 430, 'cuentaAtras').play('tiempo');
            this.cargado = true;

            this.cuentaAtras.on('animationcomplete', function () {
                this.tiempo.tiempoJuego = this.tiempoComun;
                this.scene.start("SceneJuegoOnline");
            }.bind(this));
        }
    }
}