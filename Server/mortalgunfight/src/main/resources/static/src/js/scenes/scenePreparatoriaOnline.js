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
        this.transicion = this.sys.game.globalsTransicion.transicion;

        this.tiempo = this.sys.game.globalsTiempo.tiempo;
        this.tiempo.tiempoJuego = 120000;

        this.cursorEnemi = false;

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
        if (this.sys.game.mensaje.id == 3) {
            this.cursorEnemi = this.sys.game.mensaje.cursor;
        }

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

        if (this.sys.game.mensaje.id == -1) {
            this.bAleatorio.destroy();
            this.bAleatorio = this.add.image(100, 648, 'botonAleatorio');
            this.bTemplo.destroy();
            this.bTemplo = this.add.image(850, 648, 'botonTemplo');
            this.bCiudad.destroy();
            this.bCiudad = this.add.image(635, 648, 'botonCiudad');
            this.bVolcan.destroy();
            this.bVolcan = this.add.image(425, 648, 'botonVolcan');
            this.sonidoAtras.play();
            this.transicion.cancelarSeleccion = true;
            this.scene.start("SceneMenu");
        } else {
            this.sys.game.connection.send(JSON.stringify({id: 3, nombre: this.sys.game.globalsConsulta.consulta.nombre, cursor: this.yoListo}));
        }


        if (this.unoListo && this.dosListo && !this.cargado) {
            this.cuentaAtras = this.add.sprite(640, 430, 'cuentaAtras').play('tiempo');
            this.cargado = true;

            this.cuentaAtras.on('animationcomplete', function () {
                this.scene.start("SceneJuegoOnline");
            }.bind(this));
        }
    }
}