export default class ScenePersonajeDos extends Phaser.Scene {
    constructor() {
        super({ key: "ScenePersonajeDos" });
    }

    create() {
        this.transicion = this.sys.game.globalsTransicion.transicion;

        this.pulsado = false;

        this.fondo = this.add.image(640, 360, 'personajes');

        this.fraseCiego = this.sound.add('fraseCiego');
        this.fraseDinosaurio = this.sound.add('fraseDinosaurio');
        this.fraseNinja = this.sound.add('fraseNinja');
        this.fraseZombie = this.sound.add('fraseZombie');

        this.sonidoBoton = this.sound.add('sonidoBoton');
        this.sonidoAtras = this.sound.add('sonidoAtras');

        this.personaje = this.sys.game.globalsPersonaje.personaje;
        this.personaje.jugadorDos = null;
        
        this.seleccionadoDos = null;
        this.nombreDos = null;
        this.resplandorDos = null;

        this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0).setInteractive();
        this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0).setInteractive();
        this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0).setInteractive();
        this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0).setInteractive();
        this.bAleatorio = this.add.image(100, 649, 'botonAleatorio').setInteractive();

        if (this.personaje.jugadorUno == 'd') {
            this.bDinosaurio.setFrame(1);
            this.bDinosaurio.setDepth(2);
            this.nombreUno = this.add.image(100, 145, 'nombreDinosaurio');
            this.nombreUno.setOrigin(0);
            this.seleccionadoUno = this.add.image(290, 350, 'dinosaurio');
            this.seleccionadoUno.setScale(-0.17, 0.17);
            this.resplandorUno = this.add.image(837, 649, 'botonJugadorUno');
            this.resplandorUno.setDepth(1);
        } else {
            this.bDinosaurio.on('pointerover', function () {
                this.sonidoBoton.play();
                this.bDinosaurio.setScale(1.15);
                this.bDinosaurio.setDepth(2);
                this.nombreDos = this.add.image(788, 145, 'nombreDinosaurio');
                this.nombreDos.setOrigin(0);
                this.seleccionadoDos = this.add.image(990, 350, 'dinosaurio');
                this.seleccionadoDos.setScale(0.17, 0.17);
                this.resplandorDos = this.add.image(837, 649, 'botonJugadorDos');
                this.resplandorDos.setDepth(1);
                this.resplandorDos.setScale(1.15);
            }.bind(this));
    
            this.bDinosaurio.on('pointerout', function () {
                this.bDinosaurio.setScale(1);
                this.nombreDos.destroy();
                this.resplandorDos.destroy();
                this.seleccionadoDos.destroy();
            }.bind(this));
        }

        if (this.personaje.jugadorUno == 'z') {
            this.bZombie.setFrame(1);
            this.bZombie.setDepth(2);
            this.nombreUno = this.add.image(100, 145, 'nombreZombie');
            this.nombreUno.setOrigin(0);
            this.seleccionadoUno = this.add.image(310, 350, 'zombie');
            this.seleccionadoUno.setScale(-0.17, 0.17);
            this.resplandorUno = this.add.image(690, 649, 'botonJugadorUno');
            this.resplandorUno.setDepth(1);
        } else {
            this.bZombie.on('pointerover', function () {
                this.sonidoBoton.play();
                this.bZombie.setScale(1.15);
                this.bZombie.setDepth(2);
                this.nombreDos = this.add.image(788, 145, 'nombreZombie');
                this.nombreDos.setOrigin(0);
                this.seleccionadoDos = this.add.image(970, 350, 'zombie');
                this.seleccionadoDos.setScale(0.17, 0.17);
                this.resplandorDos = this.add.image(690, 649, 'botonJugadorDos');
                this.resplandorDos.setDepth(1);
                this.resplandorDos.setScale(1.15);
            }.bind(this));
    
            this.bZombie.on('pointerout', function () {
                this.bZombie.setScale(1);
                this.nombreDos.destroy();
                this.resplandorDos.destroy();
                this.seleccionadoDos.destroy();
            }.bind(this));
        }

        if (this.personaje.jugadorUno == 'c') {
            this.bCiego.setFrame(1);
            this.bCiego.setDepth(2);
            this.nombreUno = this.add.image(100, 145, 'nombreCiego');
            this.nombreUno.setOrigin(0);
            this.seleccionadoUno = this.add.image(290, 356, 'ciego');
            this.seleccionadoUno.setScale(-0.17, 0.17);
            this.resplandorUno = this.add.image(400, 649, 'botonJugadorUno');
            this.resplandorUno.setDepth(1);
        } else {
            this.bCiego.on('pointerover', function () {
                this.sonidoBoton.play();
                this.bCiego.setScale(1.15);
                this.bCiego.setDepth(2);
                this.nombreDos = this.add.image(788, 145, 'nombreCiego');
                this.nombreDos.setOrigin(0);
                this.seleccionadoDos = this.add.image(975, 356, 'ciego');
                this.seleccionadoDos.setScale(0.17, 0.17);
                this.resplandorDos = this.add.image(400, 649, 'botonJugadorDos');
                this.resplandorDos.setDepth(1);
                this.resplandorDos.setScale(1.15);
            }.bind(this));
    
            this.bCiego.on('pointerout', function () {
                this.bCiego.setScale(1);
                this.nombreDos.destroy();
                this.resplandorDos.destroy();
                this.seleccionadoDos.destroy();
            }.bind(this));
        }

        if (this.personaje.jugadorUno == 'n') {
            this.bNinja.setFrame(1);
            this.bNinja.setDepth(2);
            this.nombreUno = this.add.image(100, 145, 'nombreNinja');
            this.nombreUno.setOrigin(0);
            this.seleccionadoUno = this.add.image(330, 350, 'ninja');
            this.seleccionadoUno.setScale(-0.17, 0.17);
            this.resplandorUno = this.add.image(545, 649, 'botonJugadorUno');
            this.resplandorUno.setDepth(1);
        } else {
            this.bNinja.on('pointerover', function () {
                this.sonidoBoton.play();
                this.bNinja.setScale(1.15);
                this.bNinja.setDepth(2);
                this.nombreDos = this.add.image(788, 145, 'nombreNinja');
                this.nombreDos.setOrigin(0);
                this.seleccionadoDos = this.add.image(940, 350, 'ninja');
                this.seleccionadoDos.setScale(0.17, 0.17);
                this.resplandorDos = this.add.image(545, 649, 'botonJugadorDos');
                this.resplandorDos.setDepth(1);
                this.resplandorDos.setScale(1.15);
            }.bind(this));
    
            this.bNinja.on('pointerout', function () {
                this.bNinja.setScale(1);
                this.nombreDos.destroy();
                this.resplandorDos.destroy();
                this.seleccionadoDos.destroy();
            }.bind(this));
        }

        this.bAleatorio.on('pointerover', function () {
            this.sonidoBoton.play();
            this.bAleatorio.setScale(1.15);
            this.bAleatorio.setDepth(2);
            this.nombreDos = this.add.image(788, 145, 'nombreAleatorio');
            this.nombreDos.setOrigin(0);
            this.seleccionadoDos = this.add.image(984, 335, 'aleatorio');
            this.resplandorDos = this.add.image(100, 651, 'botonJugadorDos');
            this.resplandorDos.setDepth(1);
            this.resplandorDos.setScale(1.25);
        }.bind(this));

        this.bAleatorio.on('pointerout', function () {
            this.bAleatorio.setScale(1);
            this.nombreDos.destroy();
            this.resplandorDos.destroy();
            this.seleccionadoDos.destroy();
        }.bind(this));

        this.bAleatorio.on('pointerdown', function () {
            if (this.personaje.jugadorUno == 'c') {
                do {
                    this.seleccionar = Phaser.Math.Between(1, 4);
                } while (this.seleccionar == 1);

                if (this.seleccionar == 2) {
                    this.personaje.jugadorDos = 'n';
                    this.nombreDos.destroy();
                    this.nombreDos = this.add.image(788, 145, 'nombreNinja');
                    this.nombreDos.setOrigin(0);
                    this.seleccionadoDos.destroy();
                    this.seleccionadoDos = this.add.image(940, 350, 'ninja');
                    this.seleccionadoDos.setScale(0.17, 0.17);
                    this.resplandorDos.destroy();
                    this.resplandorDos = this.add.image(545, 649, 'botonJugadorDos');
                    this.resplandorDos.setDepth(1);
                    this.resplandorDos.setScale(1);
                    this.bNinja.destroy();
                    this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                    this.bNinja.setDepth(2);
                    this.bZombie.destroy();
                    this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
                    this.bDinosaurio.destroy();
                    this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.pulsado = true;
                    this.fraseNinja.play();
                    this.fraseNinja.on('complete', function () {
                        this.cameras.main.fadeOut(250);
                    }.bind(this));
                } else if (this.seleccionar == 3) {
                    this.personaje.jugadorDos = 'z';
                    this.nombreDos.destroy();
                    this.nombreDos = this.add.image(788, 145, 'nombreZombie');
                    this.nombreDos.setOrigin(0);
                    this.seleccionadoDos.destroy();
                    this.seleccionadoDos = this.add.image(970, 350, 'zombie');
                    this.seleccionadoDos.setScale(0.17, 0.17);
                    this.resplandorDos.destroy();
                    this.resplandorDos = this.add.image(690, 649, 'botonJugadorDos');
                    this.resplandorDos.setDepth(1);
                    this.resplandorDos.setScale(1);
                    this.bZombie.destroy();
                    this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                    this.bZombie.setDepth(2);
                    this.bDinosaurio.destroy();
                    this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
                    this.bNinja.destroy();
                    this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.pulsado = true;
                    this.fraseZombie.play();
                    this.fraseZombie.on('complete', function () {
                        this.cameras.main.fadeOut(250);
                    }.bind(this));
                } else if (this.seleccionar == 4) {
                    this.personaje.jugadorDos = 'd';
                    this.nombreDos.destroy();
                    this.nombreDos = this.add.image(788, 145, 'nombreDinosaurio');
                    this.nombreDos.setOrigin(0);
                    this.seleccionadoDos.destroy();
                    this.seleccionadoDos = this.add.image(990, 350, 'dinosaurio');
                    this.seleccionadoDos.setScale(0.17, 0.17);
                    this.resplandorDos.destroy();
                    this.resplandorDos = this.add.image(837, 649, 'botonJugadorDos');
                    this.resplandorDos.setDepth(1);
                    this.resplandorDos.setScale(1);
                    this.bDinosaurio.destroy();
                    this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                    this.bDinosaurio.setDepth(2);
                    this.bZombie.destroy();
                    this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
                    this.bNinja.destroy();
                    this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.pulsado = true;
                    this.fraseDinosaurio.play();
                    this.fraseDinosaurio.on('complete', function () {
                        this.cameras.main.fadeOut(250);
                    }.bind(this));
                }
            } else if (this.personaje.jugadorUno == 'n') {
                do {
                    this.seleccionar = Phaser.Math.Between(1, 4);
                } while (this.seleccionar == 2);

                if (this.seleccionar == 1) {
                    this.personaje.jugadorDos = 'c';
                    this.nombreDos.destroy();
                    this.nombreDos = this.add.image(788, 145, 'nombreCiego');
                    this.nombreDos.setOrigin(0);
                    this.seleccionadoDos.destroy();
                    this.seleccionadoDos = this.add.image(975, 356, 'ciego');
                    this.seleccionadoDos.setScale(0.17, 0.17);
                    this.resplandorDos.destroy();
                    this.resplandorDos = this.add.image(400, 649, 'botonJugadorDos');
                    this.resplandorDos.setDepth(1);
                    this.resplandorDos.setScale(1);
                    this.bCiego.destroy();
                    this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                    this.bCiego.setDepth(2);
                    this.bZombie.destroy();
                    this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
                    this.bDinosaurio.destroy();
                    this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.pulsado = true;
                    this.fraseCiego.play();
                    this.fraseCiego.on('complete', function () {
                        this.cameras.main.fadeOut(250);
                    }.bind(this));
                } else if (this.seleccionar == 3) {
                    this.personaje.jugadorDos = 'z';
                    this.nombreDos.destroy();
                    this.nombreDos = this.add.image(788, 145, 'nombreZombie');
                    this.nombreDos.setOrigin(0);
                    this.seleccionadoDos.destroy();
                    this.seleccionadoDos = this.add.image(970, 350, 'zombie');
                    this.seleccionadoDos.setScale(0.17, 0.17);
                    this.resplandorDos.destroy();
                    this.resplandorDos = this.add.image(690, 649, 'botonJugadorDos');
                    this.resplandorDos.setDepth(1);
                    this.resplandorDos.setScale(1);
                    this.bZombie.destroy();
                    this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                    this.bZombie.setDepth(2);
                    this.bDinosaurio.destroy();
                    this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
                    this.bCiego.destroy();
                    this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.pulsado = true;
                    this.fraseZombie.play();
                    this.fraseZombie.on('complete', function () {
                        this.cameras.main.fadeOut(250);
                    }.bind(this));
                } else if (this.seleccionar == 4) {
                    this.personaje.jugadorDos = 'd';
                    this.nombreDos.destroy();
                    this.nombreDos = this.add.image(788, 145, 'nombreDinosaurio');
                    this.nombreDos.setOrigin(0);
                    this.seleccionadoDos.destroy();
                    this.seleccionadoDos = this.add.image(990, 350, 'dinosaurio');
                    this.seleccionadoDos.setScale(0.17, 0.17);
                    this.resplandorDos.destroy();
                    this.resplandorDos = this.add.image(837, 649, 'botonJugadorDos');
                    this.resplandorDos.setDepth(1);
                    this.resplandorDos.setScale(1);
                    this.bDinosaurio.destroy();
                    this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                    this.bDinosaurio.setDepth(2);
                    this.bZombie.destroy();
                    this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
                    this.bCiego.destroy();
                    this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.pulsado = true;
                    this.fraseDinosaurio.play();
                    this.fraseDinosaurio.on('complete', function () {
                        this.cameras.main.fadeOut(250);
                    }.bind(this));
                }
            } else if (this.personaje.jugadorUno == 'z') {
                do {
                    this.seleccionar = Phaser.Math.Between(1, 4);
                } while (this.seleccionar == 3);

                if (this.seleccionar == 1) {
                    this.personaje.jugadorDos = 'c';
                    this.nombreDos.destroy();
                    this.nombreDos = this.add.image(788, 145, 'nombreCiego');
                    this.nombreDos.setOrigin(0);
                    this.seleccionadoDos.destroy();
                    this.seleccionadoDos = this.add.image(975, 356, 'ciego');
                    this.seleccionadoDos.setScale(0.17, 0.17);
                    this.resplandorDos.destroy();
                    this.resplandorDos = this.add.image(400, 649, 'botonJugadorDos');
                    this.resplandorDos.setDepth(1);
                    this.resplandorDos.setScale(1);
                    this.bCiego.destroy();
                    this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                    this.bCiego.setDepth(2);
                    this.bNinja.destroy();
                    this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
                    this.bDinosaurio.destroy();
                    this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.pulsado = true;
                    this.fraseCiego.play();
                    this.fraseCiego.on('complete', function () {
                        this.cameras.main.fadeOut(250);
                    }.bind(this));
                } else if (this.seleccionar == 2) {
                    this.personaje.jugadorDos = 'n';
                    this.nombreDos.destroy();
                    this.nombreDos = this.add.image(788, 145, 'nombreNinja');
                    this.nombreDos.setOrigin(0);
                    this.seleccionadoDos.destroy();
                    this.seleccionadoDos = this.add.image(940, 350, 'ninja');
                    this.seleccionadoDos.setScale(0.17, 0.17);
                    this.resplandorDos.destroy();
                    this.resplandorDos = this.add.image(545, 649, 'botonJugadorDos');
                    this.resplandorDos.setDepth(1);
                    this.resplandorDos.setScale(1);
                    this.bNinja.destroy();
                    this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                    this.bNinja.setDepth(2);
                    this.bCiego.destroy();
                    this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
                    this.bDinosaurio.destroy();
                    this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.pulsado = true;
                    this.fraseNinja.play();
                    this.fraseNinja.on('complete', function () {
                        this.cameras.main.fadeOut(250);
                    }.bind(this));
                } else if (this.seleccionar == 4) {
                    this.personaje.jugadorDos = 'd';
                    this.nombreDos.destroy();
                    this.nombreDos = this.add.image(788, 145, 'nombreDinosaurio');
                    this.nombreDos.setOrigin(0);
                    this.seleccionadoDos.destroy();
                    this.seleccionadoDos = this.add.image(990, 350, 'dinosaurio');
                    this.seleccionadoDos.setScale(0.17, 0.17);
                    this.resplandorDos.destroy();
                    this.resplandorDos = this.add.image(837, 649, 'botonJugadorDos');
                    this.resplandorDos.setDepth(1);
                    this.resplandorDos.setScale(1);
                    this.bDinosaurio.destroy();
                    this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                    this.bDinosaurio.setDepth(2);
                    this.bCiego.destroy();
                    this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
                    this.bNinja.destroy();
                    this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.pulsado = true;
                    this.fraseDinosaurio.play();
                    this.fraseDinosaurio.on('complete', function () {
                        this.cameras.main.fadeOut(250);
                    }.bind(this));
                }
            } else if (this.personaje.jugadorUno == 'd') {
                do {
                    this.seleccionar = Phaser.Math.Between(1, 4);
                } while (this.seleccionar == 4);

                if (this.seleccionar == 1) {
                    this.personaje.jugadorDos = 'c';
                    this.nombreDos.destroy();
                    this.nombreDos = this.add.image(788, 145, 'nombreCiego');
                    this.nombreDos.setOrigin(0);
                    this.seleccionadoDos.destroy();
                    this.seleccionadoDos = this.add.image(975, 356, 'ciego');
                    this.seleccionadoDos.setScale(0.17, 0.17);
                    this.resplandorDos.destroy();
                    this.resplandorDos = this.add.image(400, 649, 'botonJugadorDos');
                    this.resplandorDos.setDepth(1);
                    this.resplandorDos.setScale(1);
                    this.bCiego.destroy();
                    this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                    this.bCiego.setDepth(2);
                    this.bZombie.destroy();
                    this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
                    this.bNinja.destroy();
                    this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.pulsado = true;
                    this.fraseCiego.play();
                    this.fraseCiego.on('complete', function () {
                        this.cameras.main.fadeOut(250);
                    }.bind(this));
                } else if (this.seleccionar == 2) {
                    this.personaje.jugadorDos = 'n';
                    this.nombreDos.destroy();
                    this.nombreDos = this.add.image(788, 145, 'nombreNinja');
                    this.nombreDos.setOrigin(0);
                    this.seleccionadoDos.destroy();
                    this.seleccionadoDos = this.add.image(940, 350, 'ninja');
                    this.seleccionadoDos.setScale(0.17, 0.17);
                    this.resplandorDos.destroy();
                    this.resplandorDos = this.add.image(545, 649, 'botonJugadorDos');
                    this.resplandorDos.setDepth(1);
                    this.resplandorDos.setScale(1);
                    this.bNinja.destroy();
                    this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                    this.bNinja.setDepth(2);
                    this.bZombie.destroy();
                    this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
                    this.bCiego.destroy();
                    this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.pulsado = true;
                    this.fraseNinja.play();
                    this.fraseNinja.on('complete', function () {
                        this.cameras.main.fadeOut(250);
                    }.bind(this));
                } else if (this.seleccionar == 3) {
                    this.personaje.jugadorDos = 'z';
                    this.nombreDos.destroy();
                    this.nombreDos = this.add.image(788, 145, 'nombreZombie');
                    this.nombreDos.setOrigin(0);
                    this.seleccionadoDos.destroy();
                    this.seleccionadoDos = this.add.image(970, 350, 'zombie');
                    this.seleccionadoDos.setScale(0.17, 0.17);
                    this.resplandorDos.destroy();
                    this.resplandorDos = this.add.image(690, 649, 'botonJugadorDos');
                    this.resplandorDos.setDepth(1);
                    this.resplandorDos.setScale(1);
                    this.bZombie.destroy();
                    this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                    this.bZombie.setDepth(2);
                    this.bCiego.destroy();
                    this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
                    this.bNinja.destroy();
                    this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
                    this.bAleatorio.destroy();
                    this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                    this.pulsado = true;
                    this.fraseZombie.play();
                    this.fraseZombie.on('complete', function () {
                        this.cameras.main.fadeOut(250);
                    }.bind(this));
                }
            }
        }.bind(this));
        
        this.cameras.main.once('camerafadeoutcomplete', function () {
            this.scene.start("SceneMapa");
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

    update() {
        if (this.personaje.jugadorUno != 'd') {
            this.bDinosaurio.on('pointerdown', function () {
                this.personaje.jugadorDos = 'd';
                this.resplandorDos.setScale(1);
                this.bDinosaurio.destroy();
                this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                this.bDinosaurio.setDepth(2);
                this.bAleatorio.destroy();
                this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                if (this.personaje.jugadorUno == 'z') {
                    this.bZombie.destroy();
                    this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                    this.bZombie.setDepth(2);
                } else {
                    this.bZombie.destroy();
                    this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
                }
                if (this.personaje.jugadorUno == 'c') {
                    this.bCiego.destroy();
                    this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                    this.bCiego.setDepth(2);
                } else {
                    this.bCiego.destroy();
                    this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
                }
                if (this.personaje.jugadorUno == 'n') {
                    this.bNinja.destroy();
                    this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                    this.bNinja.setDepth(2);
                } else {
                    this.bNinja.destroy();
                    this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
                }
                this.pulsado = true;
                this.fraseDinosaurio.play();
                this.fraseDinosaurio.on('complete', function () {
                    this.cameras.main.fadeOut(250);
                }.bind(this));
            }.bind(this));
        }

        if (this.personaje.jugadorUno != 'z') {
            this.bZombie.on('pointerdown', function () {
                this.personaje.jugadorDos = 'z';
                this.resplandorDos.setScale(1);
                this.bZombie.destroy();
                this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                this.bZombie.setDepth(2);
                this.bAleatorio.destroy();
                this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                if (this.personaje.jugadorUno == 'd') {
                    this.bDinosaurio.destroy();
                    this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                    this.bDinosaurio.setDepth(2);
                } else {
                    this.bDinosaurio.destroy();
                    this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
                }
                if (this.personaje.jugadorUno == 'c') {
                    this.bCiego.destroy();
                    this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                    this.bCiego.setDepth(2);
                } else {
                    this.bCiego.destroy();
                    this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
                }
                if (this.personaje.jugadorUno == 'n') {
                    this.bNinja.destroy();
                    this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                    this.bNinja.setDepth(2);
                } else {
                    this.bNinja.destroy();
                    this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
                }
                this.pulsado = true;
                this.fraseZombie.play();
                this.fraseZombie.on('complete', function () {
                    this.cameras.main.fadeOut(250);
                }.bind(this));
            }.bind(this));
        }

        if (this.personaje.jugadorUno != 'c') {
            this.bCiego.on('pointerdown', function () {
                this.personaje.jugadorDos = 'c';
                this.resplandorDos.setScale(1);
                this.bCiego.destroy();
                this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                this.bCiego.setDepth(2);
                this.bAleatorio.destroy();
                this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                if (this.personaje.jugadorUno == 'z') {
                    this.bZombie.destroy();
                    this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                    this.bZombie.setDepth(2);
                } else {
                    this.bZombie.destroy();
                    this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
                }
                if (this.personaje.jugadorUno == 'd') {
                    this.bDinosaurio.destroy();
                    this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                    this.bDinosaurio.setDepth(2);
                } else {
                    this.bDinosaurio.destroy();
                    this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
                }
                if (this.personaje.jugadorUno == 'n') {
                    this.bNinja.destroy();
                    this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                    this.bNinja.setDepth(2);
                } else {
                    this.bNinja.destroy();
                    this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 0);
                }
                this.pulsado = true;
                this.fraseCiego.play();
                this.fraseCiego.setVolume(2);
                this.fraseCiego.on('complete', function () {
                    this.cameras.main.fadeOut(250);
                }.bind(this));
            }.bind(this));
        }

        if (this.personaje.jugadorUno != 'n') {
            this.bNinja.on('pointerdown', function () {
                this.personaje.jugadorDos = 'n';
                this.resplandorDos.setScale(1);
                this.bNinja.destroy();
                this.bNinja = this.add.sprite(545, 649, 'botonesNinja', 1);
                this.bNinja.setDepth(2);
                this.bAleatorio.destroy();
                this.bAleatorio = this.add.image(100, 649, 'botonAleatorio');
                if (this.personaje.jugadorUno == 'z') {
                    this.bZombie.destroy();
                    this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 1);
                    this.bZombie.setDepth(2);
                } else {
                    this.bZombie.destroy();
                    this.bZombie = this.add.sprite(690, 649, 'botonesZombie', 0);
                }
                if (this.personaje.jugadorUno == 'c') {
                    this.bCiego.destroy();
                    this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 1);
                    this.bCiego.setDepth(2);
                } else {
                    this.bCiego.destroy();
                    this.bCiego = this.add.sprite(400, 649, 'botonesCiego', 0);
                }
                if (this.personaje.jugadorUno == 'd') {
                    this.bDinosaurio.destroy();
                    this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 1);
                    this.bDinosaurio.setDepth(2);
                } else {
                    this.bDinosaurio.destroy();
                    this.bDinosaurio = this.add.sprite(837, 649, 'botonesDinosaurio', 0);
                }
                this.pulsado = true;
                this.fraseNinja.play();
                this.fraseNinja.setVolume(2);
                this.fraseNinja.on('complete', function () {
                    this.cameras.main.fadeOut(250);
                }.bind(this));
            }.bind(this));
        }

        if (this.cursor_ESC.isDown && !this.pulsado) {
            this.pulsado = true;
            this.sonidoAtras.play();
            this.transicion.cancelarSeleccion = true;
            this.scene.start("ScenePersonajeUno");
        }
    }
}