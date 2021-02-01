export default class SceneMapaOnline extends Phaser.Scene {
    constructor() {
        super({ key: "SceneMapaOnline" });
    }

    create() {
        this.cameras.main.fadeIn(250);

        this.pulsado = false;

        this.fondo = this.add.image(640, 360, 'mapa');

        this.sonidoBoton = this.sound.add('sonidoBoton');
        this.sonidoAtras = this.sound.add('sonidoAtras');

        this.transicion = this.sys.game.globalsTransicion.transicion;
        this.siguiente = false;

        this.mapa = this.sys.game.globalsMapa.mapa;
        this.mapa.escenario = null;

        this.mapaEnemigo = this.add.image(640, 360, 'mapaEnemigo');
        this.bTemplo = this.add.image(850, 648, 'botonTemplo').setInteractive();
        this.bCiudad = this.add.image(635, 648, 'botonCiudad').setInteractive();
        this.bVolcan = this.add.image(425, 648, 'botonVolcan').setInteractive();
        this.bAleatorio = this.add.image(100, 648, 'botonAleatorio').setInteractive();

        this.cameras.main.once('camerafadeincomplete', function () { 
            this.mapaText = this.add.text(640, 275, 'Si los mapas no coinciden\nse elegirá uno al azar\nentre los dos votados', { align: 'center', fontFamily: 'luckiestGuy', fontSize: 40, shadowStroke: true, shadowBlur: 1, strokeThickness: 4, stroke: '#000000' });
            this.mapaText.setOrigin(0.5);
            this.mapaText.setAlpha(0.5);
            this.mapaText.setDepth(1);
        }.bind(this));

        this.seleccionadoMapa = null;
        this.resplandorMapa = null;
        this.entrado = false;
        this.tiempoFinal = false;
        this.cd = 0;

        this.mapaJugYo = null;
        this.mapaJugEnemi = null;
        this.elegido = false;

        this.bTemplo.on('pointerover', function () {
            this.sonidoBoton.play();
            this.bTemplo.setScale(1.15);
            this.bTemplo.setDepth(2);
            this.nombreMapa = this.add.image(293, 130, 'nombreTemplo');
            this.nombreMapa.setOrigin(0);
            this.seleccionadoMapa = this.add.image(640, 342, 'temploSeleccion');
            this.seleccionadoMapa.setScale(0.505, 0.5);
            this.seleccionadoMapa.setDepth(2);
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
            this.resplandorMapa.setScale(1);
            this.bAleatorio.destroy();
            this.bAleatorio = this.add.image(100, 648, 'botonAleatorio');
            this.bTemplo.destroy();
            this.bTemplo = this.add.image(850, 648, 'botonTemplo');
            this.bTemplo.setDepth(2);
            this.bCiudad.destroy();
            this.bCiudad = this.add.image(635, 648, 'botonCiudad');
            this.bVolcan.destroy();
            this.bVolcan = this.add.image(425, 648, 'botonVolcan');
            this.mapaJugYo = 't';
            //decir cual he escogido
        }.bind(this));

        this.bCiudad.on('pointerover', function () {
            this.sonidoBoton.play();
            this.bCiudad.setScale(1.15);
            this.bCiudad.setDepth(2);
            this.nombreMapa = this.add.image(293, 130, 'nombreCiudad');
            this.nombreMapa.setOrigin(0);
            this.seleccionadoMapa = this.add.image(640, 342, 'ciudadSeleccion');
            this.seleccionadoMapa.setScale(0.505, 0.5);
            this.seleccionadoMapa.setDepth(2);
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

        this.bCiudad.on('pointerdown', function () {
            this.resplandorMapa.setScale(1);
            this.bAleatorio.destroy();
            this.bAleatorio = this.add.image(100, 648, 'botonAleatorio');
            this.bTemplo.destroy();
            this.bTemplo = this.add.image(850, 648, 'botonTemplo');
            this.bCiudad.destroy();
            this.bCiudad = this.add.image(635, 648, 'botonCiudad');
            this.bCiudad.setDepth(2);
            this.bVolcan.destroy();
            this.bVolcan = this.add.image(425, 648, 'botonVolcan');
            this.mapaJugYo = 'c';
            //decir cual he escogido
        }.bind(this));

        this.bVolcan.on('pointerover', function () {
            this.sonidoBoton.play();
            this.bVolcan.setScale(1.15);
            this.bVolcan.setDepth(2);
            this.nombreMapa = this.add.image(293, 125, 'nombreVolcan');
            this.nombreMapa.setOrigin(0);
            this.seleccionadoMapa = this.add.image(640, 342, 'volcanSeleccion');
            this.seleccionadoMapa.setScale(0.505, 0.5);
            this.seleccionadoMapa.setDepth(2);
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

        this.bVolcan.on('pointerdown', function () {
            this.resplandorMapa.setScale(1);
            this.bAleatorio.destroy();
            this.bAleatorio = this.add.image(100, 648, 'botonAleatorio');
            this.bTemplo.destroy();
            this.bTemplo = this.add.image(850, 648, 'botonTemplo');
            this.bCiudad.destroy();
            this.bCiudad = this.add.image(635, 648, 'botonCiudad');
            this.bVolcan.destroy();
            this.bVolcan = this.add.image(425, 648, 'botonVolcan');
            this.bVolcan.setDepth(2);
            this.mapaJugYo = 'v';
            //decir cual he escogido
        }.bind(this));

        this.bAleatorio.on('pointerover', function () {
            this.sonidoBoton.play();
            this.bAleatorio.setScale(1.15);
            this.bAleatorio.setDepth(2);
            this.nombreMapa = this.add.image(293, 130, 'nombreAleatorio');
            this.nombreMapa.setOrigin(0);
            this.seleccionadoMapa = this.add.image(640, 342, 'mapaAleatorio');
            this.seleccionadoMapa.setScale(0.505, 0.5);
            this.seleccionadoMapa.setDepth(2);
            this.resplandorMapa = this.add.image(100, 648, 'botonMapaAleatorio');
            this.resplandorMapa.setDepth(1);
            this.resplandorMapa.setScale(1.25);
        }.bind(this));

        this.bAleatorio.on('pointerout', function () {
            this.bAleatorio.setScale(1);
            this.nombreMapa.destroy();
            this.resplandorMapa.destroy();
            this.seleccionadoMapa.destroy();
        }.bind(this));

        this.bAleatorio.on('pointerdown', function () {
                this.seleccionar = Phaser.Math.Between(1, 3);

            if (this.seleccionar == 1) {
                this.resplandorMapa.destroy();
                this.resplandorMapa = this.add.image(425, 648, 'botonMapa');
                this.resplandorMapa.setDepth(1);
                this.resplandorMapa.setScale(1);
                this.nombreMapa.destroy();
                this.nombreMapa = this.add.image(293, 125, 'nombreVolcan');
                this.nombreMapa.setOrigin(0);
                this.seleccionadoMapa.destroy();
                this.seleccionadoMapa = this.add.image(640, 342, 'volcanSeleccion');
                this.seleccionadoMapa.setScale(0.505, 0.5);
                this.seleccionadoMapa.setDepth(2);
                this.bAleatorio.destroy();
                this.bAleatorio = this.add.image(100, 648, 'botonAleatorio');
                this.bTemplo.destroy();
                this.bTemplo = this.add.image(850, 648, 'botonTemplo');
                this.bCiudad.destroy();
                this.bCiudad = this.add.image(635, 648, 'botonCiudad');
                this.bVolcan.destroy();
                this.bVolcan = this.add.image(425, 648, 'botonVolcan');
                this.bVolcan.setDepth(2);
                this.mapaJugYo = 'v';
                //decir cual he escogido
            } else if (this.seleccionar == 2) {
                this.resplandorMapa.destroy();
                this.resplandorMapa = this.add.image(635, 648, 'botonMapa');
                this.resplandorMapa.setDepth(1);
                this.resplandorMapa.setScale(1);
                this.nombreMapa.destroy();
                this.nombreMapa = this.add.image(293, 125, 'nombreCiudad');
                this.nombreMapa.setOrigin(0);
                this.seleccionadoMapa.destroy();
                this.seleccionadoMapa = this.add.image(640, 342, 'ciudadSeleccion');
                this.seleccionadoMapa.setScale(0.505, 0.5);
                this.seleccionadoMapa.setDepth(2);
                this.bAleatorio.destroy();
                this.bAleatorio = this.add.image(100, 648, 'botonAleatorio');
                this.bTemplo.destroy();
                this.bTemplo = this.add.image(850, 648, 'botonTemplo');
                this.bCiudad.destroy();
                this.bCiudad = this.add.image(635, 648, 'botonCiudad');
                this.bCiudad.setDepth(2);
                this.bVolcan.destroy();
                this.bVolcan = this.add.image(425, 648, 'botonVolcan');
                this.mapaJugYo = 'c';
                //decir cual he escogido
            } else if (this.seleccionar == 3) {
                this.resplandorMapa.destroy();
                this.resplandorMapa = this.add.image(850, 648, 'botonMapa');
                this.resplandorMapa.setDepth(1);
                this.resplandorMapa.setScale(1);
                this.nombreMapa.destroy();
                this.nombreMapa = this.add.image(293, 125, 'nombreTemplo');
                this.nombreMapa.setOrigin(0);
                this.seleccionadoMapa.destroy();
                this.seleccionadoMapa = this.add.image(640, 342, 'temploSeleccion');
                this.seleccionadoMapa.setScale(0.505, 0.5);
                this.seleccionadoMapa.setDepth(2);
                this.bAleatorio.destroy();
                this.bAleatorio = this.add.image(100, 648, 'botonAleatorio');
                this.bTemplo.destroy();
                this.bTemplo = this.add.image(850, 648, 'botonTemplo');
                this.bTemplo.setDepth(2);
                this.bCiudad.destroy();
                this.bCiudad = this.add.image(635, 648, 'botonCiudad');
                this.bVolcan.destroy();
                this.bVolcan = this.add.image(425, 648, 'botonVolcan');
                this.mapaJugYo = 't';
                //decir cual he escogido
            }
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

    update(time) {
        // Aqui hacemos la llamada a saber que mapa ha elegido nuestro rival, podemos hacerlo que API REST
        // lo almacenamos en this.mapaJugEnemi y lo mostramos en el recuadro pequeño
        if (this.mapaJugEnemi != null && !this.entrado) {
            if (this.mapaJugEnemi == 't') {
                this.seleccionadoMapa = this.add.image(178, 200, 'temploSeleccion');
                this.seleccionadoMapa.setScale(0.132, 0.131);
            } else if (this.mapaJugEnemi == 'c') {
                this.seleccionadoMapa = this.add.image(178, 200, 'ciudadSeleccion');
                this.seleccionadoMapa.setScale(0.132, 0.131);
            } else if (this.mapaJugEnemi == 'v') {
                this.seleccionadoMapa = this.add.image(178, 200, 'volcanSeleccion');
                this.seleccionadoMapa.setScale(0.132, 0.131);
            }
            this.entrado = true;
        }

        if (this.cursor_ESC.isDown && !this.pulsado) {
            this.resplandorMapa.destroy();
            this.bAleatorio.destroy();
            this.bAleatorio = this.add.image(100, 648, 'botonAleatorio');
            this.bTemplo.destroy();
            this.bTemplo = this.add.image(850, 648, 'botonTemplo');
            this.bCiudad.destroy();
            this.bCiudad = this.add.image(635, 648, 'botonCiudad');
            this.bVolcan.destroy();
            this.bVolcan = this.add.image(425, 648, 'botonVolcan');
            this.sonidoAtras.play();
            this.pulsado = true;
            this.cameras.main.fadeOut(250);
            this.siguiente = false;
            //avisar al enemigo de ESC y pulsarle ESC también a él.
        }

        if (this.mapaJugYo != null && this.mapaJugEnemi != null && !this.elegido) {
            if (this.mapaJugYo == this.mapaJugEnemi) {
                this.mapa.escenario = this.mapaJugYo;
                this.tiempoFinal = true;
            } else {
                //recibir de WS un numero aleatorio entre 1 y 2 y almacenarlo en this.seleccionar1o2;
                this.seleccionar1o2 = 1;

                if (this.seleccionar1o2 == 1) {
                    this.mapa.escenario = this.mapaJugYo;
                    this.tiempoFinal = true;
                } else if (this.seleccionar1o2 == 2) {
                    this.mapa.escenario = this.mapaJugEnemi;
                    this.tiempoFinal = true;
                }
            }
            this.pulsado = true;
            this.cd = time + 2000;
            this.elegido = true;
        }
        
        if ( this.cd < time && this.tiempoFinal) {
            this.siguiente = true;
            this.cameras.main.fadeOut(250);
            this.tiempoFinal = false;
        }

        this.cameras.main.once('camerafadeoutcomplete', function () {
            if (this.siguiente) {
                this.scene.start("ScenePreparatoriaOnline");
            } else if (!this.siguiente) {
                this.scene.start("ScenePersonajeOnline");
                this.transicion.cancelarSeleccion = false;
            }
        }.bind(this));
    }
}