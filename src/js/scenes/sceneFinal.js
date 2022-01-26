export default class SceneFinal extends Phaser.Scene {
    constructor() {
        super({ key: "SceneFinal" });
    }

    create() {
        this.cameras.main.fadeIn(250);

        this.pulsadoSalir = false;
        this.pulsadoCambiar = false;
        this.pulsadoMismos = false;

        this.transicion = this.sys.game.globalsTransicion.transicion;

        this.points = this.sys.game.globalsPuntos.puntos;

        this.fondo = this.add.image(640, 360, 'final');

        this.p1Text = this.add.text(180, 250,'0',{ fontFamily: 'Luckiest Guy', fontSize: 70, shadowStroke: true, shadowBlur: 1, strokeThickness: 4, stroke: '#000000' });
        this.p1Text.setOrigin(0.5);
        this.p1Text.setText(this.points.puntosJugadorUno);
        
        this.p2Text = this.add.text(1117, 250,'0',{ fontFamily: 'Luckiest Guy', fontSize: 70, shadowStroke: true, shadowBlur: 1, strokeThickness: 4, stroke: '#000000' });
        this.p2Text.setOrigin(0.5);
        this.p2Text.setText(this.points.puntosJugadorDos);

        this.sonidoBoton = this.sound.add('sonidoBoton');

        this.personaje = this.sys.game.globalsPersonaje.personaje;

        if (this.personaje.jugadorUno == 'd') {
            this.nombreUno = this.add.image(50, 422, 'nombreDinosaurio');
            this.nombreUno.setOrigin(0);
            this.nombreUno.setScale(0.65);
            this.seleccionadoUno = this.add.image(165, 554, 'dinosaurio');
            this.seleccionadoUno.setScale(-0.1, 0.1);
        } else if (this.personaje.jugadorUno == 'c') {
            this.nombreUno = this.add.image(50, 422, 'nombreCiego');
            this.nombreUno.setOrigin(0);
            this.nombreUno.setScale(0.65);
            this.seleccionadoUno = this.add.image(165, 559, 'ciego');
            this.seleccionadoUno.setScale(-0.1, 0.1);
        } else if (this.personaje.jugadorUno == 'n') {
            this.nombreUno = this.add.image(50, 422, 'nombreNinja');
            this.nombreUno.setOrigin(0);
            this.nombreUno.setScale(0.65);
            this.seleccionadoUno = this.add.image(188, 554, 'ninja');
            this.seleccionadoUno.setScale(-0.1, 0.1);
        } else if (this.personaje.jugadorUno == 'z') {
            this.nombreUno = this.add.image(50, 422, 'nombreZombie');
            this.nombreUno.setOrigin(0);
            this.nombreUno.setScale(0.65);
            this.seleccionadoUno = this.add.image(176, 554, 'zombie');
            this.seleccionadoUno.setScale(-0.1, 0.1);
        }

        if (this.personaje.jugadorDos == 'd') {
            this.nombreDos = this.add.image(987, 422, 'nombreDinosaurio');
            this.nombreDos.setOrigin(0);
            this.nombreDos.setScale(0.65);
            this.seleccionadoDos = this.add.image(1105, 555, 'dinosaurio');
            this.seleccionadoDos.setScale(0.1);
        } else if (this.personaje.jugadorDos == 'c') {
            this.nombreDos = this.add.image(987, 422, 'nombreCiego');
            this.nombreDos.setOrigin(0);
            this.nombreDos.setScale(0.65);
            this.seleccionadoDos = this.add.image(1105, 559, 'ciego');
            this.seleccionadoDos.setScale(0.1);
        } else if (this.personaje.jugadorDos == 'n') {
            this.nombreDos = this.add.image(987, 422, 'nombreNinja');
            this.nombreDos.setOrigin(0);
            this.nombreDos.setScale(0.65);
            this.seleccionadoDos = this.add.image(1085, 556, 'ninja');
            this.seleccionadoDos.setScale(0.1);
        } else if (this.personaje.jugadorDos == 'z') {
            this.nombreDos = this.add.image(987, 422, 'nombreZombie');
            this.nombreDos.setOrigin(0);
            this.nombreDos.setScale(0.65);
            this.seleccionadoDos = this.add.image(1100, 556, 'zombie');
            this.seleccionadoDos.setScale(0.1);
        }

        if (this.personaje.ganador == 1) {
            this.victoria = this.add.image(40, 310, 'victoria');
            this.victoria.setOrigin(0);
            this.derrota = this.add.image(977, 310, 'derrota');
            this.derrota.setOrigin(0);
        } else if (this.personaje.ganador == 2) {
            this.victoria = this.add.image(977, 310, 'victoria');
            this.victoria.setOrigin(0);
            this.derrota = this.add.image(40, 310, 'derrota');
            this.derrota.setOrigin(0);
        }

        this.bCambiar = this.add.sprite(640, 318, 'cambiarPersonajes').setInteractive();
        this.bMismos = this.add.sprite(640, 475, 'mismosPersonajes').setInteractive();
        this.bSalir = this.add.sprite(640, 610, 'salirMenu').setInteractive();

        this.bMismos.setScale(0.85);
        this.bCambiar.setScale(0.85);
        this.bSalir.setScale(0.85);

        this.bMismos.on('pointerover', function () {
            this.sonidoBoton.play();
            this.bMismos.setScale(1);
        }.bind(this));

        this.bMismos.on('pointerout', function () {
            this.bMismos.setScale(0.85);
        }.bind(this));

        this.bMismos.on('pointerdown', function () {
            this.bMismos.destroy();
            this.bMismos = this.add.sprite(640, 475, 'mismosPersonajes');
            this.bCambiar.destroy();
            this.bCambiar = this.add.sprite(640, 318, 'cambiarPersonajes');
            this.bSalir.destroy();
            this.bSalir = this.add.sprite(640, 610, 'salirMenu');
            this.bMismos.setScale(0.85);
            this.bCambiar.setScale(0.85);
            this.bSalir.setScale(0.85);
            this.cameras.main.fadeOut(250);
            this.pulsadoMismos = true;
        }.bind(this));

        this.bCambiar.on('pointerover', function () {
            this.sonidoBoton.play();
            this.bCambiar.setScale(1);
        }.bind(this));

        this.bCambiar.on('pointerout', function () {
            this.bCambiar.setScale(0.85);
        }.bind(this));

        this.bCambiar.on('pointerdown', function () {
            this.bMismos.destroy();
            this.bMismos = this.add.sprite(640, 475, 'mismosPersonajes');
            this.bCambiar.destroy();
            this.bCambiar = this.add.sprite(640, 318, 'cambiarPersonajes');
            this.bSalir.destroy();
            this.bSalir = this.add.sprite(640, 610, 'salirMenu');
            this.bMismos.setScale(0.85);
            this.bCambiar.setScale(0.85);
            this.bSalir.setScale(0.85);
            this.cameras.main.fadeOut(250);
            this.pulsadoCambiar = true;
        }.bind(this));

        this.bSalir.on('pointerover', function () {
            this.sonidoBoton.play();
            this.bSalir.setScale(1);
        }.bind(this));

        this.bSalir.on('pointerout', function () {
            this.bSalir.setScale(0.85);
        }.bind(this));

        this.bSalir.on('pointerdown', function () {
            this.bMismos.destroy();
            this.bMismos = this.add.sprite(640, 475, 'mismosPersonajes');
            this.bCambiar.destroy();
            this.bCambiar = this.add.sprite(640, 318, 'cambiarPersonajes');
            this.bSalir.destroy();
            this.bSalir = this.add.sprite(640, 610, 'salirMenu');
            this.bMismos.setScale(0.85);
            this.bCambiar.setScale(0.85);
            this.bSalir.setScale(0.85);
            this.cameras.main.fadeOut(250);
            this.pulsadoSalir = true;
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

    update() {
        this.cameras.main.once('camerafadeoutcomplete', function () {
            if (this.pulsadoMismos) {
                this.scene.start("ScenePreparatoria");
            } else if (this.pulsadoCambiar) {
                this.scene.start("ScenePersonajeUno");
                this.transicion.cancelarSeleccion = false;
            } else if (this.pulsadoSalir) {
                this.scene.start("SceneMenu");
            }
        }.bind(this));
    }
}