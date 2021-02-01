export default class SceneEspera extends Phaser.Scene {
    constructor() {
        super({ key: "SceneEspera" });
    }
    preload(){
        this.transicion = this.sys.game.globalsTransicion.transicion;
    
        this.jugadores = this.sys.game.globalsJugadores.jugadores;
    
        this.enemigoEncontrado;
        this.siguiente = false;
        this.pulsado = false;
        this.entrado = false;
        this.noVolver = false;
        this.pintado = false;
        this.tiempoFinal = false;
        this.cd = 0;
    }

    create() {
        this.cameras.main.fadeIn(250);

        this.fondo = this.add.image(640, 360, 'inicio');

        this.buscandoText = this.add.image(640, 360, 'buscandoText');

        this.anims.create({
            key: 'puntos',
            frames: this.anims.generateFrameNumbers('buscando'),
            frameRate: 4,
            repeat: -1
        });

        this.textoBusca = this.add.sprite(640, 420, 'buscando').play('puntos');
        this.textoBusca.setOrigin(0.5);

        this.sonidoBoton = this.sound.add('sonidoBoton');
        this.sonidoAtras = this.sound.add('sonidoAtras');


        this.sonido = this.sys.game.globalsSonido.sonido;

        this.bSonido = this.add.sprite(1240, 30, 'botonMusic').setInteractive();
        
        this.bSonido.on('pointerover', function () {
            this.sonidoBoton.play();
            this.bSonido.setScale(1.15);
        }.bind(this));

        this.bSonido.on('pointerout', function () {
            this.bSonido.setScale(1);
        }.bind(this));

        this.bSonido.on('pointerdown', function () {
            this.sonido.musicOn = !this.sonido.musicOn;
            this.updateAudio();
        }.bind(this));

        this.updateAudio();

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

        if (this.enemigoEncontrado && !this.entrado) {
            this.textoBusca.destroy();
            this.buscandoText.destroy();
            this.encontradoText = this.add.image(640, 360, 'encontradoText');

            this.entrado = true;

            if (this.jugadores.jugYo != null && this.jugadores.jugEnemi != null) {
                this.tiempoFinal = true;
                this.cd = time + 2000;
            }
        }

        if (this.cursor_ESC.isDown && !this.enemigoEncontrado) {
            this.pulsadoEsc = true;
        }
        
        if (this.cursor_ESC.isDown && !this.noVolver && !this.enemigoEncontrado) {
            this.scene.start("SceneMenu");
            this.noVolver = true;
        }
        
        if (this.pulsadoEsc) {
            this.sys.game.connection.send(JSON.stringify({id: -1, nombre: this.sys.game.globalsConsulta.consulta.nombre}));
        }

        if (this.pulsado) {
            this.pulsado = false;
            this.sonidoAtras.play();
            this.siguiente = false;
            this.cameras.main.fadeOut(250);
        }

        if ( this.cd < time && this.tiempoFinal) {
            this.siguiente = true;
            this.cameras.main.fadeOut(250);
            this.tiempoFinal = false;
        }

        this.cameras.main.once('camerafadeoutcomplete', function () {
            if (this.siguiente) {
                this.scene.start("ScenePersonajeOnline");
                this.transicion.cancelarSeleccion = false;
            } else if (!this.siguiente) {
                this.scene.start("SceneMenu");
            }
        }.bind(this));
    }

    setPlayer(jugador, enemigo){
        this.sys.game.globalsJugadores.jugadores.jugYo = jugador;
        this.enemigoEncontrado = enemigo;
        if (this.enemigoEncontrado == true ) {
            if (this.sys.game.globalsJugadores.jugadores.jugYo == 1) {
                this.sys.game.globalsJugadores.jugadores.jugEnemi = 2;
            } else if (this.sys.game.globalsJugadores.jugadores.jugYo == 2) {
                this.sys.game.globalsJugadores.jugadores.jugEnemi = 1;
            }
        }
    }

    fullMessage(){
        this.textoBusca.destroy();
            this.buscandoText.destroy();
            if (!this.pintado) {
                this.enCurso = this.add.image(640, 360, 'enCurso');
                this.pintado = true;
            }
    }
}