export default class SceneEspera extends Phaser.Scene {
    constructor() {
        super({ key: "SceneEspera" });
    }

    create() {
        this.connection = new WebSocket('ws://localhost:8080/servidor');
        this.connection.onopen = function () {
            this.connection.send('Comunicación con el servidor establecida con éxito');
        }.bind(this)
        this.connection.onerror = function (e) {
            console.log("WS error: " + e);
        }
        this.connection.onmessage = function(msg) {
            console.log("WS message: " + msg.data);
        }

        this.cameras.main.fadeIn(250);

        this.fondo = this.add.image(640, 360, 'inicio');

        this.cameras.main.once('camerafadeincomplete', function () { 
            this.buscandoText = this.add.text(640, 290, 'BUSCANDO', { align: 'center', fontFamily: 'luckiestGuy', fontSize: 125, shadowStroke: true, shadowBlur: 1, strokeThickness: 4, stroke: '#000000' });
            this.consejoText = this.add.text(640, 680, 'LA PARTIDA COMENZARÁ CUANDO SE ENCUENTRE UN OPONENTE', { align: 'center', fontFamily: 'luckiestGuy', fontSize: 30, shadowStroke: true, shadowBlur: 1, strokeThickness: 4, stroke: '#000000' });
            this.buscandoText.setOrigin(0.5);
            this.consejoText.setOrigin(0.5);
        }.bind(this));

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

        this.transicion = this.sys.game.globalsTransicion.transicion;

        this.jugadores = this.sys.game.globalsJugadores.jugadores;
        this.jugadores.jugYo = null;
        this.jugadores.jugEnemi = null;

        this.enemigoEncontrado = false;
        this.siguiente = false;
        this.pulsado = false;
        this.entrado = false;
        this.tiempoFinal = false;
        this.cd = 0;

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
        //cuando encuentre enemigo (reciba mensaje del servidor) entonces this.enemigoEncontrado = true;
        if (this.enemigoEncontrado && !this.entrado) {
            this.textoBusca.destroy();
            this.buscandoText.setText('PREPARATE');
            this.encontradoText = this.add.text(640, 420, 'OPONENTE ENCONTRADO', { align: 'center', fontFamily: 'luckiestGuy', fontSize: 45, shadowStroke: true, shadowBlur: 1, strokeThickness: 4, stroke: '#000000' });
            this.encontradoText.setOrigin(0.5);
            this.consejoText.destroy();

            this.entrado = true;
            this.pulsado = true;

            //cuando haga la llamada, nos dice si somos el uno o el dos, y por tanto al enemigo se le asigna el numero contrario

            if (this.jugadores.jugYo != null && this.jugadores.jugEnemi != null) {
                this.tiempoFinal = true;
                this.cd = time + 2000;
            }
        }

        if (this.cursor_ESC.isDown && !this.pulsado) {
            this.pulsado = true;
            this.sonidoAtras.play();
            this.connection.close();
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
}