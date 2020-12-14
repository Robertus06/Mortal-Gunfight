export default class SceneJuego extends Phaser.Scene {
    constructor() {
        super({ key: "SceneJuego" });
    }

    create() {
        this.minutos = 0;
        this.currentTime = 0;
        this.cargado = false;
        this.final = false;
        this.entrado = false;

        this.victoria = null;

        this.pulsado = false;
        this.pausado = false;

        this.anims.create({
            key: 'animacion1',
            frames: this.anims.generateFrameNumbers('victoriaUno'),
            frameRate: 9,
            repeat: 0
        });

        this.anims.create({
            key: 'animacion2',
            frames: this.anims.generateFrameNumbers('victoriaDos'),
            frameRate: 9,
            repeat: 0
        });
        
        this.mapa = this.sys.game.globalsMapa.mapa;
        
        if (this.mapa.escenario == 't') {
            this.fondo = this.add.image(640, 360, 'templo');
        } else if (this.mapa.escenario == 'v') {
            this.fondo = this.add.image(640, 360, 'volcan');
        } else if (this.mapa.escenario == 'c') {
            this.fondo = this.add.image(640, 360, 'ciudad');
        }
        
        this.personaje = this.sys.game.globalsPersonaje.personaje;

        this.personaje.ganador = null;

        this.vidaUno = this.add.graphics();
        this.vidaDos = this.add.graphics();
        this.vidaUnoBar = this.add.graphics();
        this.vidaDosBar = this.add.graphics();
        this.vidaUnoBox = this.add.graphics();
        this.vidaDosBox = this.add.graphics();

        this.vidaUnoBox.fillStyle(0x000000, 1);
        this.vidaUnoBox.fillRect(20, 50, 400, 30);
        this.vidaUnoBox.setDepth(1);

        this.vidaDosBox.fillStyle(0x000000, 1);
        this.vidaDosBox.fillRect(860, 50, 400, 30);
        this.vidaDosBox.setDepth(1);

        this.vidaUnoBar.setDepth(2);
        this.vidaUnoBar.fillStyle(0xffffff, 0.5);
        this.vidaUnoBar.fillRect(23, 53, 394, 24);

        this.vidaDosBar.setDepth(2);
        this.vidaDosBar.fillStyle(0xffffff, 0.5);
        this.vidaDosBar.fillRect(863, 53, 394, 24);

        // this.vidaUno.clear();
        this.vidaUno.setDepth(3);
        this.vidaUno.fillStyle(0x4d99ff, 1);
        this.vidaUno.fillRect(23, 53, 310, 24);

        // this.vidaDosBar.clear();
        this.vidaDos.setDepth(3);
        this.vidaDos.fillStyle(0xff4d4d, 1);
        this.vidaDos.fillRect(863, 53, 310, 24);

        this.versus = this.add.image(640, 60, 'vs');
        
        if (this.personaje.jugadorUno == 'd') {
            this.nombreUno = this.add.image(40, 20, 'nombreDinosaurio');
            this.nombreUno.setOrigin(0);
            this.nombreUno.setScale(0.65);
        } else if (this.personaje.jugadorUno == 'c') {
            this.nombreUno = this.add.image(40, 20, 'nombreCiego');
            this.nombreUno.setOrigin(0);
            this.nombreUno.setScale(0.65);
        } else if (this.personaje.jugadorUno == 'n') {
            this.nombreUno = this.add.image(40, 20, 'nombreNinja');
            this.nombreUno.setOrigin(0);
            this.nombreUno.setScale(0.65);
        } else if (this.personaje.jugadorUno == 'z') {
            this.nombreUno = this.add.image(40, 20, 'nombreZombie');
            this.nombreUno.setOrigin(0);
            this.nombreUno.setScale(0.65);
        }

        if (this.personaje.jugadorDos == 'd') {
            this.nombreDos = this.add.image(1240, 20, 'nombreDinosaurio');
            this.nombreDos.setOrigin(1, 0);
            this.nombreDos.setScale(0.65);
        } else if (this.personaje.jugadorDos == 'c') {
            this.nombreDos = this.add.image(1240, 20, 'nombreCiego');
            this.nombreDos.setOrigin(1, 0);
            this.nombreDos.setScale(0.65);
        } else if (this.personaje.jugadorDos == 'n') {
            this.nombreDos = this.add.image(1240, 20, 'nombreNinja');
            this.nombreDos.setOrigin(1, 0);
            this.nombreDos.setScale(0.65);
        } else if (this.personaje.jugadorDos == 'z') {
            this.nombreDos = this.add.image(1240, 20, 'nombreZombie');
            this.nombreDos.setOrigin(1, 0);
            this.nombreDos.setScale(0.65);
        }

        /**/
        this.personaje3 = this.add.image(640, 640,'spritePerro');
        this.personaje3.setScale(0.23);
        this.personaje3.setOrigin(0.72, 0.53);
        this.arma3 = this.add.image(640, 640,'sniper');
        this.arma3.setScale(0.23);
        this.arma3.setOrigin(0.78, 0.28);
        this.brazo3 = this.add.image(640, 640,'brazoPerro');
        this.brazo3.setScale(0.23);
        this.brazo3.setOrigin(0.61, 0.33);

        this.personaje = this.add.image(840, 640,'spriteNinja');
        this.personaje.setScale(0.23);
        this.personaje.setOrigin(0.72, 0.53);
        this.arma = this.add.image(840, 640,'lanzacohetes');
        this.arma.setScale(0.23);
        this.arma.setOrigin(0.78, 0.28);
        this.brazo = this.add.image(840, 640,'brazoNinja');
        this.brazo.setScale(0.23);
        this.brazo.setOrigin(0.61, 0.33);

        this.personaje2 = this.add.image(400, 640,'spriteZombie');
        this.personaje2.setScale(-0.23, 0.23);
        this.personaje2.setOrigin(0.72, 0.53);
        this.arma2 = this.add.image(400, 640,'minigun');
        this.arma2.setScale(-0.23, 0.23);
        this.arma2.setOrigin(0.78, 0.28);
        this.brazo2 = this.add.image(400, 640,'brazoZombie');
        this.brazo2.setScale(-0.23, 0.23);
        this.brazo2.setOrigin(0.61, 0.33);

        this.personaje4 = this.add.image(240, 640,'spriteDinosaurio');
        this.personaje4.setScale(-0.23, 0.23);
        this.personaje4.setOrigin(0.72, 0.53);
        this.arma4 = this.add.image(240, 640,'pistola');
        this.arma4.setScale(-0.23, 0.23);
        this.arma4.setOrigin(0.78, 0.28);
        this.brazo4 = this.add.image(240, 640,'brazoDinosaurio');
        this.brazo4.setScale(-0.23, 0.23);
        this.brazo4.setOrigin(0.61, 0.33);
        /**/
        
        this.timeText = this.add.text(645, 120);
        this.timeText.setOrigin(0.5);
        this.timeText.setScale(2.5);

        // https://stackoverflow.com/questions/51217147/how-to-use-a-local-font-in-phaser-3
        // https://github.com/photonstorm/phaser3-examples/tree/master/public/src/game%20objects/text
        // https://www.youtube.com/watch?v=PPT-pvrWzp0&list=PLlultXOnQ04Qj5vm4Cf8l2zlFg7_4A7i8&index=3

        this.cursor_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.cameras.main.once('camerafadeoutcomplete', function () {
            this.scene.start("SceneFinal");
        }.bind(this));
    }

    updateGanador (value) {
        this.sys.game.globalsPersonaje.personaje.ganador = value;
    }

    update(time) {
        this.brazo.angle += 1;
        this.arma.angle += 1;

        this.brazo2.angle -= 1;
        this.arma2.angle -= 1;

        this.brazo4.angle -= 1;
        this.arma4.angle -= 1;

        this.brazo3.angle += 1;
        this.arma3.angle += 1;

        if (!this.cargado){
            // this.currentTime = time + 120000;
            this.currentTime = time + 10000;
            this.cargado = true;
        } else if (this.pausado) {
            this.currentTime = time + this.timeRestante;
            this.pausado = false;
            //this.pulsado = false;
        }

        this.segundos = Math.trunc(((this.currentTime-time)/1000)%60);
        this.minutos = Math.trunc(((this.currentTime-time)/1000)/60);

        if (this.segundos < 10){
            this.timeText.setText('0' + this.minutos + ':0' + this.segundos);
        } else {
            this.timeText.setText('0' + this.minutos + ':' + this.segundos);
        }

        if (this.cursor_ESC.isDown && !this.pulsado) {
            this.pulsado = true;
        }

        if (this.cursor_ESC.isUp && this.pulsado) {
            this.pulsado = false;
            this.timeRestante = this.currentTime - time;
            this.pausado = true;
            this.scene.pause();
            this.scene.launch("ScenePausa");
        }

        if (this.minutos == 0 && this.segundos <= 0 && !this.entrado) {
            this.entrado = true;
            this.timeText.setText('00:00');
            this.updateGanador(2);
            if (this.sys.game.globalsPersonaje.personaje.ganador == 1) {
                this.victoria = this.add.sprite(640, 360, 'victoriaUno').play('animacion1');
            } else if (this.sys.game.globalsPersonaje.personaje.ganador == 2) {
                this.victoria = this.add.sprite(640, 360, 'victoriaDos').play('animacion2');
            }
        }

        if (this.minutos == 0 && this.segundos == -1 && !this.final) {
            this.final = true;
            this.cameras.main.fadeOut(250);
        }
    }
}