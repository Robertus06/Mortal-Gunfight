export default class ScenePersonajeOnline extends Phaser.Scene {
    constructor() {
        super({ key: "ScenePersonajeOnline" });
    }

    create() {
        this.transicion = this.sys.game.globalsTransicion.transicion;

        this.abandonado = this.sys.game.globalsAbandonado.abandonado;
        
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

        this.transicion = this.sys.game.globalsTransicion.transicion;

        this.personaje = this.sys.game.globalsPersonaje.personaje;
        this.personaje.jugadorUno = null;
        this.personaje.jugadorDos = null;

        this.jugadores = this.sys.game.globalsJugadores.jugadores;

        this.seleccionadoUno = null;
        this.resplandorUno = null;
        this.nombreUno = null;

        this.seleccionar = Phaser.Math.Between(1, 4);
        this.seleccionarConEnemi = Phaser.Math.Between(1, 3);

        this.entrado = false;
        this.tiempoFinal = false;
        this.cd = 0;

        this.personajeJugYo = null;
        this.personajeJugEnemi = null;
        this.elegido = false;
        this.fraseTerminada = false;
        this.fraseEnemigo = false;

        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0).setInteractive();
        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0).setInteractive();
        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0).setInteractive();
        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0).setInteractive();
        this.bAleatorio = this.add.image(100, 649, 'botonAleatorio').setInteractive();
        
        this.bDinosaurio.on('pointerover', function () {
            this.sonidoBoton.play();
            this.bDinosaurio.setScale(1.15);
            this.bDinosaurio.setDepth(2);
            if (this.jugadores.jugYo == 1) {
                this.nombreUno = this.add.image(100, 145, 'nombreDinosaurio');
                this.nombreUno.setOrigin(0);
                this.seleccionadoUno = this.add.image(290, 350, 'dinosaurio');
                this.seleccionadoUno.setScale(-0.17, 0.17);
                this.resplandorUno = this.add.image(837, 649, 'botonJugadorUno');
            } else if (this.jugadores.jugYo == 2) {
                this.nombreUno = this.add.image(788, 145, 'nombreDinosaurio');
                this.nombreUno.setOrigin(0);
                this.seleccionadoUno = this.add.image(990, 350, 'dinosaurio');
                this.seleccionadoUno.setScale(0.17, 0.17);
                this.resplandorUno = this.add.image(837, 649, 'botonJugadorDos');
            }
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
            if (this.jugadores.jugYo == 1) {
                this.nombreUno = this.add.image(100, 145, 'nombreZombie');
                this.nombreUno.setOrigin(0);
                this.seleccionadoUno = this.add.image(310, 350, 'zombie');
                this.seleccionadoUno.setScale(-0.17, 0.17);
                this.resplandorUno = this.add.image(690, 649, 'botonJugadorUno');
            } else if (this.jugadores.jugYo == 2) {
                this.nombreUno = this.add.image(788, 145, 'nombreZombie');
                this.nombreUno.setOrigin(0);
                this.seleccionadoUno = this.add.image(970, 350, 'zombie');
                this.seleccionadoUno.setScale(0.17, 0.17);
                this.resplandorUno = this.add.image(690, 649, 'botonJugadorDos');
            }
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
            if (this.jugadores.jugYo == 1) {
                this.nombreUno = this.add.image(100, 145, 'nombreCiego');
                this.nombreUno.setOrigin(0);
                this.seleccionadoUno = this.add.image(290, 356, 'ciego');
                this.seleccionadoUno.setScale(-0.17, 0.17);
                this.resplandorUno = this.add.image(400, 649, 'botonJugadorUno');
            } else if (this.jugadores.jugYo == 2) {
                this.nombreUno = this.add.image(788, 145, 'nombreCiego');
                this.nombreUno.setOrigin(0);
                this.seleccionadoUno = this.add.image(975, 356, 'ciego');
                this.seleccionadoUno.setScale(0.17, 0.17);
                this.resplandorUno = this.add.image(400, 649, 'botonJugadorDos');
            }
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
            if (this.jugadores.jugYo == 1) {
                this.nombreUno = this.add.image(100, 145, 'nombreNinja');
                this.nombreUno.setOrigin(0);
                this.seleccionadoUno = this.add.image(330, 350, 'ninja');
                this.seleccionadoUno.setScale(-0.17, 0.17);
                this.resplandorUno = this.add.image(545, 649, 'botonJugadorUno');
            } else if (this.jugadores.jugYo == 2) {
                this.nombreUno = this.add.image(788, 145, 'nombreNinja');
                this.nombreUno.setOrigin(0);
                this.seleccionadoUno = this.add.image(940, 350, 'ninja');
                this.seleccionadoUno.setScale(0.17, 0.17);
                this.resplandorUno = this.add.image(545, 649, 'botonJugadorDos');
            }
            this.resplandorUno.setDepth(1);
            this.resplandorUno.setScale(1.15);
        }.bind(this));

        this.bNinja.on('pointerout', function () {
            this.bNinja.setScale(1);
            this.nombreUno.destroy();
            this.resplandorUno.destroy();
            this.seleccionadoUno.destroy();
        }.bind(this));

        this.bAleatorio.on('pointerover', function () {
            this.sonidoBoton.play();
            this.bAleatorio.setScale(1.15);
            this.bAleatorio.setDepth(2);
            if (this.jugadores.jugYo == 1) {
                this.nombreUno = this.add.image(100, 145, 'nombreAleatorio');
                this.nombreUno.setOrigin(0);
                this.seleccionadoUno = this.add.image(295, 335, 'aleatorio');
                this.resplandorUno = this.add.image(100, 649, 'botonJugadorUno');
            } else if (this.jugadores.jugYo == 2) {
                this.nombreUno = this.add.image(788, 145, 'nombreAleatorio');
                this.nombreUno.setOrigin(0);
                this.seleccionadoUno = this.add.image(984, 335, 'aleatorio');
                this.resplandorUno = this.add.image(100, 649, 'botonJugadorDos');
            }
            this.resplandorUno.setDepth(1);
            this.resplandorUno.setScale(1.25);
        }.bind(this));

        this.bAleatorio.on('pointerout', function () {
            this.bAleatorio.setScale(1);
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
        if (this.sys.game.mensaje.id == 1) {
            this.personajeJugEnemi = this.sys.game.mensaje.personaje;
            this.fraseEnemigo = this.sys.game.mensaje.ready;
        }
        
        if (this.personajeJugEnemi != null && !this.entrado) {
            if (this.personajeJugEnemi == 'd') {
                if (this.jugadores.jugEnemi == 1) {
                    this.nombreDos = this.add.image(100, 145, 'nombreDinosaurio');
                    this.nombreDos.setOrigin(0);
                    this.seleccionadoDos = this.add.image(290, 350, 'dinosaurio');
                    this.seleccionadoDos.setScale(-0.17, 0.17);
                } else if (this.jugadores.jugEnemi == 2) {
                    this.nombreDos = this.add.image(788, 145, 'nombreDinosaurio');
                    this.nombreDos.setOrigin(0);
                    this.seleccionadoDos = this.add.image(990, 350, 'dinosaurio');
                    this.seleccionadoDos.setScale(0.17, 0.17);
                }
                this.bDinosaurio.destroy();
                this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                this.bDinosaurio.setDepth(2);
                if (this.jugadores.jugEnemi == 1) {
                    this.resplandorDos = this.add.image(837, 649, 'botonJugadorUno');
                } else if (this.jugadores.jugEnemi == 2) {
                    this.resplandorDos = this.add.image(837, 649, 'botonJugadorDos');
                }
                this.resplandorDos.setDepth(1);
                this.resplandorDos.setScale(1);
            } else if (this.personajeJugEnemi == 'z') {
                if (this.jugadores.jugEnemi == 1) {
                    this.nombreDos = this.add.image(100, 145, 'nombreZombie');
                    this.nombreDos.setOrigin(0);
                    this.seleccionadoDos = this.add.image(310, 350, 'zombie');
                    this.seleccionadoDos.setScale(-0.17, 0.17);
                } else if (this.jugadores.jugEnemi == 2) {
                    this.nombreDos = this.add.image(788, 145, 'nombreZombie');
                    this.nombreDos.setOrigin(0);
                    this.seleccionadoDos = this.add.image(970, 350, 'zombie');
                    this.seleccionadoDos.setScale(0.17, 0.17);
                }
                this.bZombie.destroy();
                this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                this.bZombie.setDepth(2);
                if (this.jugadores.jugEnemi == 1) {
                    this.resplandorDos = this.add.image(690, 649, 'botonJugadorUno');
                } else if (this.jugadores.jugEnemi == 2) {
                    this.resplandorDos = this.add.image(690, 649, 'botonJugadorDos');
                }
                this.resplandorDos.setDepth(1);
                this.resplandorDos.setScale(1);
            } else if (this.personajeJugEnemi == 'n') {
                if (this.jugadores.jugEnemi == 1) {
                    this.nombreDos = this.add.image(100, 145, 'nombreNinja');
                    this.nombreDos.setOrigin(0);
                    this.seleccionadoDos = this.add.image(330, 350, 'ninja');
                    this.seleccionadoDos.setScale(-0.17, 0.17);
                } else if (this.jugadores.jugEnemi == 2) {
                    this.nombreDos = this.add.image(788, 145, 'nombreNinja');
                    this.nombreDos.setOrigin(0);
                    this.seleccionadoDos = this.add.image(940, 350, 'ninja');
                    this.seleccionadoDos.setScale(0.17, 0.17);
                }
                this.bNinja.destroy();
                this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                this.bNinja.setDepth(2);
                if (this.jugadores.jugEnemi == 1) {
                    this.resplandorDos = this.add.image(545, 649, 'botonJugadorUno');
                } else if (this.jugadores.jugEnemi == 2) {
                    this.resplandorDos = this.add.image(545, 649, 'botonJugadorDos');
                }
                this.resplandorDos.setDepth(1);
                this.resplandorDos.setScale(1);
            } else if (this.personajeJugEnemi == 'c') {
                if (this.jugadores.jugEnemi == 1) {
                    this.nombreDos = this.add.image(100, 145, 'nombreCiego');
                    this.nombreDos.setOrigin(0);
                    this.seleccionadoDos = this.add.image(290, 356, 'ciego');
                    this.seleccionadoDos.setScale(-0.17, 0.17);
                } else if (this.jugadores.jugEnemi == 2) {
                    this.nombreDos = this.add.image(788, 145, 'nombreCiego');
                    this.nombreDos.setOrigin(0);
                    this.seleccionadoDos = this.add.image(975, 356, 'ciego');
                    this.seleccionadoDos.setScale(0.17, 0.17);
                }
                this.bCiego.destroy();
                this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                this.bCiego.setDepth(2);
                if (this.jugadores.jugEnemi == 1) {
                    this.resplandorDos = this.add.image(400, 649, 'botonJugadorUno');
                } else if (this.jugadores.jugEnemi == 2) {
                    this.resplandorDos = this.add.image(400, 649, 'botonJugadorDos');
                }
                this.resplandorDos.setDepth(1);
                this.resplandorDos.setScale(1);
            }
            this.entrado = true;
        }

        this.bAleatorio.on('pointerdown', function () {
            if (this.personajeJugEnemi == null) {
                if (this.seleccionar == 1) {
                    this.personajeJugYo = 'c';
                    this.nombreUno.destroy();
                    this.seleccionadoUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.nombreUno = this.add.image(100, 145, 'nombreCiego');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(290, 356, 'ciego');
                        this.seleccionadoUno.setScale(-0.17, 0.17);
                    } else if (this.jugadores.jugYo == 2) {
                        this.nombreUno = this.add.image(788, 145, 'nombreCiego');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(975, 356, 'ciego');
                        this.seleccionadoUno.setScale(0.17, 0.17);
                    }
                    this.resplandorUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.resplandorUno = this.add.image(400, 649, 'botonJugadorUno');
                    } else if (this.jugadores.jugYo == 2) {
                        this.resplandorUno = this.add.image(400, 649, 'botonJugadorDos');
                    }
                    this.resplandorUno.setDepth(1);
                    this.resplandorUno.setScale(1);
                    this.bCiego.destroy();
                    this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                    this.bCiego.setDepth(2);
                    this.bZombie.destroy();
                    if (this.personajeJugEnemi == 'z') {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                    } else {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
                    }
                    this.bZombie.setDepth(2);
                    this.bDinosaurio.destroy();
                    if (this.personajeJugEnemi == 'd') {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                    } else {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
                    }
                    this.bDinosaurio.setDepth(2);
                    this.bNinja.destroy();
                    if (this.personajeJugEnemi == 'n') {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                    } else {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
                    }
                    this.bNinja.setDepth(2);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.fraseCiego.play();
                    this.fraseCiego.setVolume(2);
                    this.fraseCiego.on('complete', function () {
                        this.fraseTerminada = true;
                    }.bind(this));
                } else if (this.seleccionar == 2) {
                    this.personajeJugYo = 'n';
                    this.nombreUno.destroy();
                    this.seleccionadoUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.nombreUno = this.add.image(100, 145, 'nombreNinja');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(330, 350, 'ninja');
                        this.seleccionadoUno.setScale(-0.17, 0.17);
                    } else if (this.jugadores.jugYo == 2) {
                        this.nombreUno = this.add.image(788, 145, 'nombreNinja');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(940, 350, 'ninja');
                        this.seleccionadoUno.setScale(0.17, 0.17);
                    }
                    this.resplandorUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.resplandorUno = this.add.image(545, 649, 'botonJugadorUno');
                    } else if (this.jugadores.jugYo == 2) {
                        this.resplandorUno = this.add.image(545, 649, 'botonJugadorDos');
                    }
                    this.resplandorUno.setDepth(1);
                    this.resplandorUno.setScale(1);
                    this.bNinja.destroy();
                    this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                    this.bNinja.setDepth(2);
                    this.bZombie.destroy();
                    if (this.personajeJugEnemi == 'z') {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                    } else {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
                    }
                    this.bZombie.setDepth(2);
                    this.bCiego.destroy();
                    if (this.personajeJugEnemi == 'c') {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                    } else {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
                    }
                    this.bCiego.setDepth(2);
                    this.bDinosaurio.destroy();
                    if (this.personajeJugEnemi == 'd') {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                    } else {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
                    }
                    this.bDinosaurio.setDepth(2);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.fraseNinja.play();
                    this.fraseNinja.on('complete', function () {
                        this.fraseTerminada = true;
                    }.bind(this));
                } else if (this.seleccionar == 3) {
                    this.personajeJugYo = 'z';
                    this.nombreUno.destroy();
                    this.seleccionadoUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.nombreUno = this.add.image(100, 145, 'nombreZombie');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(310, 350, 'zombie');
                        this.seleccionadoUno.setScale(-0.17, 0.17);
                    } else if (this.jugadores.jugYo == 2) {
                        this.nombreUno = this.add.image(788, 145, 'nombreZombie');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(970, 350, 'zombie');
                        this.seleccionadoUno.setScale(0.17, 0.17);
                    }
                    this.resplandorUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.resplandorUno = this.add.image(690, 649, 'botonJugadorUno');
                    } else if (this.jugadores.jugYo == 2) {
                        this.resplandorUno = this.add.image(690, 649, 'botonJugadorDos');
                    }
                    this.resplandorUno.setDepth(1);
                    this.resplandorUno.setScale(1);
                    this.bZombie.destroy();
                    this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                    this.bZombie.setDepth(2);
                    this.bDinosaurio.destroy();
                    if (this.personajeJugEnemi == 'd') {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                    } else {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
                    }
                    this.bDinosaurio.setDepth(2);
                    this.bCiego.destroy();
                    if (this.personajeJugEnemi == 'c') {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                    } else {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
                    }
                    this.bCiego.setDepth(2);
                    this.bNinja.destroy();
                    if (this.personajeJugEnemi == 'n') {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                    } else {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
                    }
                    this.bNinja.setDepth(2);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.fraseZombie.play();
                    this.fraseZombie.on('complete', function () {
                        this.fraseTerminada = true;
                    }.bind(this));
                } else if (this.seleccionar == 4) {
                    this.personajeJugYo = 'd';
                    this.nombreUno.destroy();
                    this.seleccionadoUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.nombreUno = this.add.image(100, 145, 'nombreDinosaurio');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(290, 350, 'dinosaurio');
                        this.seleccionadoUno.setScale(-0.17, 0.17);
                    } else if (this.jugadores.jugYo == 2) {
                        this.nombreUno = this.add.image(788, 145, 'nombreDinosaurio');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(990, 350, 'dinosaurio');
                        this.seleccionadoUno.setScale(0.17, 0.17);
                    }
                    this.resplandorUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.resplandorUno = this.add.image(837, 649, 'botonJugadorUno');
                    } else if (this.jugadores.jugYo == 2) {
                        this.resplandorUno = this.add.image(837, 649, 'botonJugadorDos');
                    }
                    this.resplandorUno.setDepth(1);
                    this.resplandorUno.setScale(1);
                    this.bDinosaurio.destroy();
                    this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                    this.bDinosaurio.setDepth(2);
                    this.bZombie.destroy();
                    if (this.personajeJugEnemi == 'z') {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                    } else {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
                    }
                    this.bZombie.setDepth(2);
                    this.bCiego.destroy();
                    if (this.personajeJugEnemi == 'c') {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                    } else {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
                    }
                    this.bCiego.setDepth(2);
                    this.bNinja.destroy();
                    if (this.personajeJugEnemi == 'n') {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                    } else {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
                    }
                    this.bNinja.setDepth(2);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.fraseDinosaurio.play();
                    this.fraseDinosaurio.on('complete', function () {
                        this.fraseTerminada = true;
                    }.bind(this));
                }
            } else if (this.personajeJugEnemi == 'd') {
                if (this.seleccionarConEnemi == 1) {
                    this.personajeJugYo = 'c';
                    this.nombreUno.destroy();
                    this.seleccionadoUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.nombreUno = this.add.image(100, 145, 'nombreCiego');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(290, 356, 'ciego');
                        this.seleccionadoUno.setScale(-0.17, 0.17);
                    } else if (this.jugadores.jugYo == 2) {
                        this.nombreUno = this.add.image(788, 145, 'nombreCiego');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(975, 356, 'ciego');
                        this.seleccionadoUno.setScale(0.17, 0.17);
                    }
                    this.resplandorUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.resplandorUno = this.add.image(400, 649, 'botonJugadorUno');
                    } else if (this.jugadores.jugYo == 2) {
                        this.resplandorUno = this.add.image(400, 649, 'botonJugadorDos');
                    }
                    this.resplandorUno.setDepth(1);
                    this.resplandorUno.setScale(1);
                    this.bCiego.destroy();
                    this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                    this.bCiego.setDepth(2);
                    this.bZombie.destroy();
                    if (this.personajeJugEnemi == 'z') {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                    } else {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
                    }
                    this.bZombie.setDepth(2);
                    this.bDinosaurio.destroy();
                    if (this.personajeJugEnemi == 'd') {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                    } else {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
                    }
                    this.bDinosaurio.setDepth(2);
                    this.bNinja.destroy();
                    if (this.personajeJugEnemi == 'n') {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                    } else {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
                    }
                    this.bNinja.setDepth(2);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.fraseCiego.play();
                    this.fraseCiego.setVolume(2);
                    this.fraseCiego.on('complete', function () {
                        this.fraseTerminada = true;
                    }.bind(this));
                } else if (this.seleccionarConEnemi == 2) {
                    this.personajeJugYo = 'n';
                    this.nombreUno.destroy();
                    this.seleccionadoUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.nombreUno = this.add.image(100, 145, 'nombreNinja');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(330, 350, 'ninja');
                        this.seleccionadoUno.setScale(-0.17, 0.17);
                    } else if (this.jugadores.jugYo == 2) {
                        this.nombreUno = this.add.image(788, 145, 'nombreNinja');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(940, 350, 'ninja');
                        this.seleccionadoUno.setScale(0.17, 0.17);
                    }
                    this.resplandorUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.resplandorUno = this.add.image(545, 649, 'botonJugadorUno');
                    } else if (this.jugadores.jugYo == 2) {
                        this.resplandorUno = this.add.image(545, 649, 'botonJugadorDos');
                    }
                    this.resplandorUno.setDepth(1);
                    this.resplandorUno.setScale(1);
                    this.bNinja.destroy();
                    this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                    this.bNinja.setDepth(2);
                    this.bZombie.destroy();
                    if (this.personajeJugEnemi == 'z') {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                    } else {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
                    }
                    this.bZombie.setDepth(2);
                    this.bCiego.destroy();
                    if (this.personajeJugEnemi == 'c') {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                    } else {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
                    }
                    this.bCiego.setDepth(2);
                    this.bDinosaurio.destroy();
                    if (this.personajeJugEnemi == 'd') {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                    } else {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
                    }
                    this.bDinosaurio.setDepth(2);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.fraseNinja.play();
                    this.fraseNinja.on('complete', function () {
                        this.fraseTerminada = true;
                    }.bind(this));
                } else if (this.seleccionarConEnemi == 3) {
                    this.personajeJugYo = 'z';
                    this.nombreUno.destroy();
                    this.seleccionadoUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.nombreUno = this.add.image(100, 145, 'nombreZombie');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(310, 350, 'zombie');
                        this.seleccionadoUno.setScale(-0.17, 0.17);
                    } else if (this.jugadores.jugYo == 2) {
                        this.nombreUno = this.add.image(788, 145, 'nombreZombie');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(970, 350, 'zombie');
                        this.seleccionadoUno.setScale(0.17, 0.17);
                    }
                    this.resplandorUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.resplandorUno = this.add.image(690, 649, 'botonJugadorUno');
                    } else if (this.jugadores.jugYo == 2) {
                        this.resplandorUno = this.add.image(690, 649, 'botonJugadorDos');
                    }
                    this.resplandorUno.setDepth(1);
                    this.resplandorUno.setScale(1);
                    this.bZombie.destroy();
                    this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                    this.bZombie.setDepth(2);
                    this.bDinosaurio.destroy();
                    if (this.personajeJugEnemi == 'd') {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                    } else {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
                    }
                    this.bDinosaurio.setDepth(2);
                    this.bCiego.destroy();
                    if (this.personajeJugEnemi == 'c') {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                    } else {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
                    }
                    this.bCiego.setDepth(2);
                    this.bNinja.destroy();
                    if (this.personajeJugEnemi == 'n') {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                    } else {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
                    }
                    this.bNinja.setDepth(2);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.fraseZombie.play();
                    this.fraseZombie.on('complete', function () {
                        this.fraseTerminada = true;
                    }.bind(this));
                } 
            } else if (this.personajeJugEnemi == 'z') {
                if (this.seleccionarConEnemi == 1) {
                    this.personajeJugYo = 'c';
                    this.nombreUno.destroy();
                    this.seleccionadoUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.nombreUno = this.add.image(100, 145, 'nombreCiego');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(290, 356, 'ciego');
                        this.seleccionadoUno.setScale(-0.17, 0.17);
                    } else if (this.jugadores.jugYo == 2) {
                        this.nombreUno = this.add.image(788, 145, 'nombreCiego');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(975, 356, 'ciego');
                        this.seleccionadoUno.setScale(0.17, 0.17);
                    }
                    this.resplandorUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.resplandorUno = this.add.image(400, 649, 'botonJugadorUno');
                    } else if (this.jugadores.jugYo == 2) {
                        this.resplandorUno = this.add.image(400, 649, 'botonJugadorDos');
                    }
                    this.resplandorUno.setDepth(1);
                    this.resplandorUno.setScale(1);
                    this.bCiego.destroy();
                    this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                    this.bCiego.setDepth(2);
                    this.bZombie.destroy();
                    if (this.personajeJugEnemi == 'z') {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                    } else {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
                    }
                    this.bZombie.setDepth(2);
                    this.bDinosaurio.destroy();
                    if (this.personajeJugEnemi == 'd') {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                    } else {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
                    }
                    this.bDinosaurio.setDepth(2);
                    this.bNinja.destroy();
                    if (this.personajeJugEnemi == 'n') {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                    } else {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
                    }
                    this.bNinja.setDepth(2);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.fraseCiego.play();
                    this.fraseCiego.setVolume(2);
                    this.fraseCiego.on('complete', function () {
                        this.fraseTerminada = true;
                    }.bind(this));
                } else if (this.seleccionarConEnemi == 2) {
                    this.personajeJugYo = 'n';
                    this.nombreUno.destroy();
                    this.seleccionadoUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.nombreUno = this.add.image(100, 145, 'nombreNinja');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(330, 350, 'ninja');
                        this.seleccionadoUno.setScale(-0.17, 0.17);
                    } else if (this.jugadores.jugYo == 2) {
                        this.nombreUno = this.add.image(788, 145, 'nombreNinja');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(940, 350, 'ninja');
                        this.seleccionadoUno.setScale(0.17, 0.17);
                    }
                    this.resplandorUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.resplandorUno = this.add.image(545, 649, 'botonJugadorUno');
                    } else if (this.jugadores.jugYo == 2) {
                        this.resplandorUno = this.add.image(545, 649, 'botonJugadorDos');
                    }
                    this.resplandorUno.setDepth(1);
                    this.resplandorUno.setScale(1);
                    this.bNinja.destroy();
                    this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                    this.bNinja.setDepth(2);
                    this.bZombie.destroy();
                    if (this.personajeJugEnemi == 'z') {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                    } else {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
                    }
                    this.bZombie.setDepth(2);
                    this.bCiego.destroy();
                    if (this.personajeJugEnemi == 'c') {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                    } else {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
                    }
                    this.bCiego.setDepth(2);
                    this.bDinosaurio.destroy();
                    if (this.personajeJugEnemi == 'd') {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                    } else {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
                    }
                    this.bDinosaurio.setDepth(2);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.fraseNinja.play();
                    this.fraseNinja.on('complete', function () {
                        this.fraseTerminada = true;
                    }.bind(this));
                } else if (this.seleccionarConEnemi == 3) {
                    this.personajeJugYo = 'd';
                    this.nombreUno.destroy();
                    this.seleccionadoUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.nombreUno = this.add.image(100, 145, 'nombreDinosaurio');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(290, 350, 'dinosaurio');
                        this.seleccionadoUno.setScale(-0.17, 0.17);
                    } else if (this.jugadores.jugYo == 2) {
                        this.nombreUno = this.add.image(788, 145, 'nombreDinosaurio');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(990, 350, 'dinosaurio');
                        this.seleccionadoUno.setScale(0.17, 0.17);
                    }
                    this.resplandorUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.resplandorUno = this.add.image(837, 649, 'botonJugadorUno');
                    } else if (this.jugadores.jugYo == 2) {
                        this.resplandorUno = this.add.image(837, 649, 'botonJugadorDos');
                    }
                    this.resplandorUno.setDepth(1);
                    this.resplandorUno.setScale(1);
                    this.bDinosaurio.destroy();
                    this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                    this.bDinosaurio.setDepth(2);
                    this.bZombie.destroy();
                    if (this.personajeJugEnemi == 'z') {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                    } else {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
                    }
                    this.bZombie.setDepth(2);
                    this.bCiego.destroy();
                    if (this.personajeJugEnemi == 'c') {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                    } else {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
                    }
                    this.bCiego.setDepth(2);
                    this.bNinja.destroy();
                    if (this.personajeJugEnemi == 'n') {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                    } else {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
                    }
                    this.bNinja.setDepth(2);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.fraseDinosaurio.play();
                    this.fraseDinosaurio.on('complete', function () {
                        this.fraseTerminada = true;
                    }.bind(this));
                }
            } else if (this.personajeJugEnemi == 'c') {
                if (this.seleccionarConEnemi == 2) {
                    this.personajeJugYo = 'n';
                    this.nombreUno.destroy();
                    this.seleccionadoUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.nombreUno = this.add.image(100, 145, 'nombreNinja');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(330, 350, 'ninja');
                        this.seleccionadoUno.setScale(-0.17, 0.17);
                    } else if (this.jugadores.jugYo == 2) {
                        this.nombreUno = this.add.image(788, 145, 'nombreNinja');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(940, 350, 'ninja');
                        this.seleccionadoUno.setScale(0.17, 0.17);
                    }
                    this.resplandorUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.resplandorUno = this.add.image(545, 649, 'botonJugadorUno');
                    } else if (this.jugadores.jugYo == 2) {
                        this.resplandorUno = this.add.image(545, 649, 'botonJugadorDos');
                    }
                    this.resplandorUno.setDepth(1);
                    this.resplandorUno.setScale(1);
                    this.bNinja.destroy();
                    this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                    this.bNinja.setDepth(2);
                    this.bZombie.destroy();
                    if (this.personajeJugEnemi == 'z') {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                    } else {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
                    }
                    this.bZombie.setDepth(2);
                    this.bCiego.destroy();
                    if (this.personajeJugEnemi == 'c') {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                    } else {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
                    }
                    this.bCiego.setDepth(2);
                    this.bDinosaurio.destroy();
                    if (this.personajeJugEnemi == 'd') {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                    } else {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
                    }
                    this.bDinosaurio.setDepth(2);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.fraseNinja.play();
                    this.fraseNinja.on('complete', function () {
                        this.fraseTerminada = true;
                    }.bind(this));
                } else if (this.seleccionarConEnemi == 3) {
                    this.personajeJugYo = 'z';
                    this.nombreUno.destroy();
                    this.seleccionadoUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.nombreUno = this.add.image(100, 145, 'nombreZombie');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(310, 350, 'zombie');
                        this.seleccionadoUno.setScale(-0.17, 0.17);
                    } else if (this.jugadores.jugYo == 2) {
                        this.nombreUno = this.add.image(788, 145, 'nombreZombie');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(970, 350, 'zombie');
                        this.seleccionadoUno.setScale(0.17, 0.17);
                    }
                    this.resplandorUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.resplandorUno = this.add.image(690, 649, 'botonJugadorUno');
                    } else if (this.jugadores.jugYo == 2) {
                        this.resplandorUno = this.add.image(690, 649, 'botonJugadorDos');
                    }
                    this.resplandorUno.setDepth(1);
                    this.resplandorUno.setScale(1);
                    this.bZombie.destroy();
                    this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                    this.bZombie.setDepth(2);
                    this.bDinosaurio.destroy();
                    if (this.personajeJugEnemi == 'd') {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                    } else {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
                    }
                    this.bDinosaurio.setDepth(2);
                    this.bCiego.destroy();
                    if (this.personajeJugEnemi == 'c') {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                    } else {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
                    }
                    this.bCiego.setDepth(2);
                    this.bNinja.destroy();
                    if (this.personajeJugEnemi == 'n') {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                    } else {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
                    }
                    this.bNinja.setDepth(2);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.fraseZombie.play();
                    this.fraseZombie.on('complete', function () {
                        this.fraseTerminada = true;
                    }.bind(this));
                } else if (this.seleccionarConEnemi == 1) {
                    this.personajeJugYo = 'd';
                    this.nombreUno.destroy();
                    this.seleccionadoUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.nombreUno = this.add.image(100, 145, 'nombreDinosaurio');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(290, 350, 'dinosaurio');
                        this.seleccionadoUno.setScale(-0.17, 0.17);
                    } else if (this.jugadores.jugYo == 2) {
                        this.nombreUno = this.add.image(788, 145, 'nombreDinosaurio');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(990, 350, 'dinosaurio');
                        this.seleccionadoUno.setScale(0.17, 0.17);
                    }
                    this.resplandorUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.resplandorUno = this.add.image(837, 649, 'botonJugadorUno');
                    } else if (this.jugadores.jugYo == 2) {
                        this.resplandorUno = this.add.image(837, 649, 'botonJugadorDos');
                    }
                    this.resplandorUno.setDepth(1);
                    this.resplandorUno.setScale(1);
                    this.bDinosaurio.destroy();
                    this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                    this.bDinosaurio.setDepth(2);
                    this.bZombie.destroy();
                    if (this.personajeJugEnemi == 'z') {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                    } else {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
                    }
                    this.bZombie.setDepth(2);
                    this.bCiego.destroy();
                    if (this.personajeJugEnemi == 'c') {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                    } else {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
                    }
                    this.bCiego.setDepth(2);
                    this.bNinja.destroy();
                    if (this.personajeJugEnemi == 'n') {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                    } else {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
                    }
                    this.bNinja.setDepth(2);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.fraseDinosaurio.play();
                    this.fraseDinosaurio.on('complete', function () {
                        this.fraseTerminada = true;
                    }.bind(this));
                }
            } else if (this.personajeJugEnemi == 'n') {
                if (this.seleccionarConEnemi == 1) {
                    this.personajeJugYo = 'c';
                    this.nombreUno.destroy();
                    this.seleccionadoUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.nombreUno = this.add.image(100, 145, 'nombreCiego');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(290, 356, 'ciego');
                        this.seleccionadoUno.setScale(-0.17, 0.17);
                    } else if (this.jugadores.jugYo == 2) {
                        this.nombreUno = this.add.image(788, 145, 'nombreCiego');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(975, 356, 'ciego');
                        this.seleccionadoUno.setScale(0.17, 0.17);
                    }
                    this.resplandorUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.resplandorUno = this.add.image(400, 649, 'botonJugadorUno');
                    } else if (this.jugadores.jugYo == 2) {
                        this.resplandorUno = this.add.image(400, 649, 'botonJugadorDos');
                    }
                    this.resplandorUno.setDepth(1);
                    this.resplandorUno.setScale(1);
                    this.bCiego.destroy();
                    this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                    this.bCiego.setDepth(2);
                    this.bZombie.destroy();
                    if (this.personajeJugEnemi == 'z') {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                    } else {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
                    }
                    this.bZombie.setDepth(2);
                    this.bDinosaurio.destroy();
                    if (this.personajeJugEnemi == 'd') {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                    } else {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
                    }
                    this.bDinosaurio.setDepth(2);
                    this.bNinja.destroy();
                    if (this.personajeJugEnemi == 'n') {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                    } else {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
                    }
                    this.bNinja.setDepth(2);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.fraseCiego.play();
                    this.fraseCiego.setVolume(2);
                    this.fraseCiego.on('complete', function () {
                        this.fraseTerminada = true;
                    }.bind(this));
                } else if (this.seleccionarConEnemi == 3) {
                    this.personajeJugYo = 'z';
                    this.nombreUno.destroy();
                    this.seleccionadoUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.nombreUno = this.add.image(100, 145, 'nombreZombie');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(310, 350, 'zombie');
                        this.seleccionadoUno.setScale(-0.17, 0.17);
                    } else if (this.jugadores.jugYo == 2) {
                        this.nombreUno = this.add.image(788, 145, 'nombreZombie');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(970, 350, 'zombie');
                        this.seleccionadoUno.setScale(0.17, 0.17);
                    }
                    this.resplandorUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.resplandorUno = this.add.image(690, 649, 'botonJugadorUno');
                    } else if (this.jugadores.jugYo == 2) {
                        this.resplandorUno = this.add.image(690, 649, 'botonJugadorDos');
                    }
                    this.resplandorUno.setDepth(1);
                    this.resplandorUno.setScale(1);
                    this.bZombie.destroy();
                    this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                    this.bZombie.setDepth(2);
                    this.bDinosaurio.destroy();
                    if (this.personajeJugEnemi == 'd') {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                    } else {
                        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
                    }
                    this.bDinosaurio.setDepth(2);
                    this.bCiego.destroy();
                    if (this.personajeJugEnemi == 'c') {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                    } else {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
                    }
                    this.bCiego.setDepth(2);
                    this.bNinja.destroy();
                    if (this.personajeJugEnemi == 'n') {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                    } else {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
                    }
                    this.bNinja.setDepth(2);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.fraseZombie.play();
                    this.fraseZombie.on('complete', function () {
                        this.fraseTerminada = true;
                    }.bind(this));
                } else if (this.seleccionarConEnemi == 2) {
                    this.personajeJugYo = 'd';
                    this.nombreUno.destroy();
                    this.seleccionadoUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.nombreUno = this.add.image(100, 145, 'nombreDinosaurio');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(290, 350, 'dinosaurio');
                        this.seleccionadoUno.setScale(-0.17, 0.17);
                    } else if (this.jugadores.jugYo == 2) {
                        this.nombreUno = this.add.image(788, 145, 'nombreDinosaurio');
                        this.nombreUno.setOrigin(0);
                        this.seleccionadoUno = this.add.image(990, 350, 'dinosaurio');
                        this.seleccionadoUno.setScale(0.17, 0.17);
                    }
                    this.resplandorUno.destroy();
                    if (this.jugadores.jugYo == 1) {
                        this.resplandorUno = this.add.image(837, 649, 'botonJugadorUno');
                    } else if (this.jugadores.jugYo == 2) {
                        this.resplandorUno = this.add.image(837, 649, 'botonJugadorDos');
                    }
                    this.resplandorUno.setDepth(1);
                    this.resplandorUno.setScale(1);
                    this.bDinosaurio.destroy();
                    this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                    this.bDinosaurio.setDepth(2);
                    this.bZombie.destroy();
                    if (this.personajeJugEnemi == 'z') {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                    } else {
                        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
                    }
                    this.bZombie.setDepth(2);
                    this.bCiego.destroy();
                    if (this.personajeJugEnemi == 'c') {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                    } else {
                        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
                    }
                    this.bCiego.setDepth(2);
                    this.bNinja.destroy();
                    if (this.personajeJugEnemi == 'n') {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                    } else {
                        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
                    }
                    this.bNinja.setDepth(2);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.fraseDinosaurio.play();
                    this.fraseDinosaurio.on('complete', function () {
                        this.fraseTerminada = true;
                    }.bind(this));
                }
            }
        }.bind(this));

        this.bDinosaurio.on('pointerdown', function () {
            this.personajeJugYo = 'd';
            this.resplandorUno.setScale(1);
            this.bDinosaurio.destroy();
            this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
            this.bDinosaurio.setDepth(2);
            this.bZombie.destroy();
            if (this.personajeJugEnemi == 'z') {
                this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
            } else {
                this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
            }
            this.bZombie.setDepth(2);
            this.bCiego.destroy();
            if (this.personajeJugEnemi == 'c') {
                this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
            } else {
                this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
            }
            this.bCiego.setDepth(2);
            this.bNinja.destroy();
            if (this.personajeJugEnemi == 'n') {
                this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
            } else {
                this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
            }
            this.bNinja.setDepth(2);
            this.bAleatorio.destroy();
            this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
            this.fraseDinosaurio.play();
            this.fraseDinosaurio.on('complete', function () {
                this.fraseTerminada = true;
            }.bind(this));
        }.bind(this));

        this.bZombie.on('pointerdown', function () {
            this.personajeJugYo = 'z';
            this.resplandorUno.setScale(1);
            this.bZombie.destroy();
            this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
            this.bZombie.setDepth(2);
            this.bDinosaurio.destroy();
            if (this.personajeJugEnemi == 'd') {
                this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
            } else {
                this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
            }
            this.bDinosaurio.setDepth(2);
            this.bCiego.destroy();
            if (this.personajeJugEnemi == 'c') {
                this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
            } else {
                this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
            }
            this.bCiego.setDepth(2);
            this.bNinja.destroy();
            if (this.personajeJugEnemi == 'n') {
                this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
            } else {
                this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
            }
            this.bNinja.setDepth(2);
            this.bAleatorio.destroy();
            this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
            this.fraseZombie.play();
            this.fraseZombie.on('complete', function () {
                this.fraseTerminada = true;
            }.bind(this));
        }.bind(this));

        this.bCiego.on('pointerdown', function () {
            this.personajeJugYo = 'c';
            this.resplandorUno.setScale(1);
            this.bCiego.destroy();
            this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
            this.bCiego.setDepth(2);
            this.bZombie.destroy();
            if (this.personajeJugEnemi == 'z') {
                this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
            } else {
                this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
            }
            this.bZombie.setDepth(2);
            this.bDinosaurio.destroy();
            if (this.personajeJugEnemi == 'd') {
                this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
            } else {
                this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
            }
            this.bDinosaurio.setDepth(2);
            this.bNinja.destroy();
            if (this.personajeJugEnemi == 'n') {
                this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
            } else {
                this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
            }
            this.bNinja.setDepth(2);
            this.bAleatorio.destroy();
            this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
            this.fraseCiego.play();
            this.fraseCiego.setVolume(2);
            this.fraseCiego.on('complete', function () {
                this.fraseTerminada = true;
            }.bind(this));
        }.bind(this));

        this.bNinja.on('pointerdown', function () {
            this.personajeJugYo = 'n';
            this.resplandorUno.setScale(1);
            this.bNinja.destroy();
            this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
            this.bNinja.setDepth(2);
            this.bZombie.destroy();
            if (this.personajeJugEnemi == 'z') {
                this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
            } else {
                this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
            }
            this.bZombie.setDepth(2);
            this.bCiego.destroy();
            if (this.personajeJugEnemi == 'c') {
                this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
            } else {
                this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
            }
            this.bCiego.setDepth(2);
            this.bDinosaurio.destroy();
            if (this.personajeJugEnemi == 'd') {
                this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
            } else {
                this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
            }
            this.bDinosaurio.setDepth(2);
            this.bAleatorio.destroy();
            this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
            this.fraseNinja.play();
            this.fraseNinja.on('complete', function () {
                this.fraseTerminada = true;
            }.bind(this));
        }.bind(this));

        if (this.sys.game.mensaje.id == -1) {
            this.bNinja.destroy();
            this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
            this.bZombie.destroy();
            this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
            this.bCiego.destroy();
            this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
            this.bDinosaurio.destroy();
            this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
            this.bAleatorio.destroy();
            this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
            this.sonidoAtras.play();
            this.abandonado.haAbandonado = true;
            this.transicion.cancelarSeleccion = true;
            this.scene.start("SceneMenu");
        } else {
            this.sys.game.connection.send(JSON.stringify({id: 1, nombre: this.sys.game.globalsConsulta.consulta.nombre, personaje: this.personajeJugYo, ready: this.fraseTerminada}));
        }

        if (this.personajeJugYo != null && this.personajeJugEnemi != null && !this.elegido && this.fraseTerminada && this.fraseEnemigo) {
            if (this.jugadores.jugYo == 1) {
                this.personaje.jugadorUno = this.personajeJugYo;
                this.personaje.jugadorDos = this.personajeJugEnemi;
            } else if (this.jugadores.jugYo == 2) {
                this.personaje.jugadorDos = this.personajeJugYo;
                this.personaje.jugadorUno = this.personajeJugEnemi;
            }

            this.tiempoFinal = true;
            this.cd = time + 2000;
            this.elegido = true;
        }
        
        if ( this.cd < time && this.tiempoFinal) {
            this.cameras.main.fadeOut(250);
            this.tiempoFinal = false;
        }

        this.cameras.main.once('camerafadeoutcomplete', function () {
            this.scene.start("SceneMapaOnline");
        }.bind(this));
    }
}