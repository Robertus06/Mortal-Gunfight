export default class SceneJuego extends Phaser.Scene {
    constructor() {
        super({ key: "SceneJuego" });
    }

    create() {
        this.Bala = new Phaser.Class({

            Extends: Phaser.Physics.Arcade.Image,
        
            initialize:
        
            function Bala (scene)
            {
                Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, 'bala');        
            
                this.setDepth(1);
                this.setScale(0.23);
                
        
                this.speed = 1200;
                
        
                //this._temp = new Phaser.Math.Vector2();
            },
        
            fire: function (arma)
            {                        
                this.setActive(true);
                this.setVisible(true);
                this.setRotation(arma.rotation);
                this.setPosition(arma.x, arma.y);
        
                this.body.reset(arma.x, arma.y);
        
                this.body.setSize(10, 10, true);
                //this.body.setGravityY(0);
                this.body.setAccelerationY(-1000);
        
                //var angle = Phaser.Math.DegToRad(arma.body.rotation);
        
                this.scene.physics.velocityFromRotation(arma.rotation, this.speed, this.body.velocity);
                if(arma.flipX == false) this.scene.physics.velocityFromRotation(Phaser.Math.Angle.Reverse(arma.rotation), this.speed, this.body.velocity);
        
                this.body.velocity.x *= 2;
                this.body.velocity.y *= 2;
                this.body.gravity.y = 0;
            },
        
            update: function ()
            {
                
        
                if (this.x < 0 || this.x > 1280 || this.y < 0 || this.y > 720)
                {
                    this.kill();
                }
            },
        
            kill: function ()
            {
                this.setActive(false);
                this.setVisible(false);
                this.body.stop();
            }
        
        });

        this.minutos = 0;
        this.currentTime = 0;
        this.cd1 = 0;
        this.cd2 = 0;
        this.cargado = false;
        this.final = false;
        this.entrado = false;
        this.entradoTime = 0;
        this.acabar = false;
        this.girar = false;

        this.victoria = null;

        this.pulsado = false;
        this.pausado = false;

        this.salud1 = 100;
        this.salud2 = 100;
        this.puntos1 = 0;
        this.puntos2 = 0;

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

        this.sonidoAtras = this.sound.add('sonidoAtras');
        
        this.personaje = this.sys.game.globalsPersonaje.personaje;

        this.personaje.ganador = 0;

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
        this.vidaUno.fillRect(23, 53, 394*(this.salud1/100), 24);

        // this.vidaDosBar.clear();
        this.vidaDos.setDepth(3);
        this.vidaDos.fillStyle(0xff4d4d, 1);
        this.vidaDos.fillRect(863, 53, 394*(this.salud2/100), 24);

        

        this.decoracion = this.add.group();
        this.decoracion.create(450, 0, 'cadenas').setOrigin(0.5, 0);
        this.decoracion.create(830, 0, 'cadenas').setOrigin(0.5, 0);
        
        this.versus = this.add.image(640, 60, 'vs');
        this.plataformas = this.physics.add.staticGroup();
        this.plataformas.create(640, 703, 'spriteSuelo');
        this.plataformas.create(640, 720, 'pared').setOrigin(0.5, 1).refreshBody();
        this.plataformas.create(640, 385, 'plataforma').refreshBody();
        this.plataformas.create(56, 310, 'tejas').setScale(-1, 1).refreshBody();
        this.plataformas.create(246, 530, 'tejas').refreshBody().setScale(-1, 1);
        this.plataformas.create(1224, 310, 'tejas').refreshBody();
        this.plataformas.create(1034, 530, 'tejas').refreshBody();
        
        this.decoracion.create(390, 382, 'paloma').setScale(-1, 1).setOrigin(0.5, 1);
        this.decoracion.create(890, 382, 'paloma').setOrigin(0.5, 1);

        this.arma1 = null;
        this.arma2 = null;
        this.armas = this.physics.add.group();
        this.armas.create(230, 20, 'pistola').setScale(0.23).setOrigin(0.22, 0.28).setFlipX(true);
        this.armas.create(1050, 20, 'pistola').setScale(0.23).setOrigin(0.78, 0.28);
        
        this.armas.children.iterate(function(child){
            //child.body.syncBounds = true;
            //child.body.updateBounds();
            child.body.setSize(150,150);
            if(child.flipX === true) child.body.setOffset(200,100);
            else child.body.setOffset(400,100);

        });

        this.balas1 = this.physics.add.group({
            classType: this.Bala,
            maxSize: 30,
            runChildUpdate: true
        });
        this.balas2 = this.physics.add.group({
            classType: this.Bala,
            maxSize: 30,
            runChildUpdate: true
        });
        
        if (this.personaje.jugadorUno == 'd') {
            this.nombreUno = this.add.image(40, 20, 'nombreDinosaurio');
            this.nombreUno.setOrigin(0);
            this.nombreUno.setScale(0.65);
            this.jugador1 = this.add.image(80, 640,'spriteDinosaurio');
            this.jugador1.setScale(0.23).setFlipX(true).setOrigin(0.28, 0.53);    
            this.brazo1 = this.add.image(80, 640,'brazoDinosaurio');
            this.brazo1.setScale(-0.23, 0.23);
            this.brazo1.setOrigin(0.61, 0.33);
        } else if (this.personaje.jugadorUno == 'c') {
            this.nombreUno = this.add.image(40, 20, 'nombreCiego');
            this.nombreUno.setOrigin(0);
            this.nombreUno.setScale(0.65);
            this.jugador1 = this.add.image(80, 640,'spritePerro');            
            this.jugador1.setScale(0.23).setFlipX(true).setOrigin(0.28, 0.53);
            this.brazo1 = this.add.image(80, 640,'brazoPerro');
            this.brazo1.setScale(-0.23, 0.23);
            this.brazo1.setOrigin(0.61, 0.33);
            this.ciego = this.add.image(80,640,'spriteCiegoReverse');
            this.ciego.setScale(0.27);
            this.ciego.setOrigin(1,0.5);
        } else if (this.personaje.jugadorUno == 'n') {
            this.nombreUno = this.add.image(40, 20, 'nombreNinja');
            this.nombreUno.setOrigin(0);
            this.nombreUno.setScale(0.65);
            this.jugador1 = this.add.image(80, 640,'spriteNinja');
            this.jugador1.setScale(0.23).setFlipX(true).setOrigin(0.28, 0.53);
            this.brazo1 = this.add.image(80, 640,'brazoNinja');
            this.brazo1.setScale(-0.23, 0.23);
            this.brazo1.setOrigin(0.61, 0.33);
        } else if (this.personaje.jugadorUno == 'z') {
            this.nombreUno = this.add.image(40, 20, 'nombreZombie');
            this.nombreUno.setOrigin(0);
            this.nombreUno.setScale(0.65);
            this.jugador1 = this.add.image(80, 640,'spriteZombie');
            this.jugador1.setScale(0.23).setFlipX(true).setOrigin(0.28, 0.53);
            this.brazo1 = this.add.image(80, 640,'brazoZombie');
            this.brazo1.setScale(-0.23, 0.23);
            this.brazo1.setOrigin(0.61, 0.33);
        }

        if (this.personaje.jugadorDos == 'd') {
            this.nombreDos = this.add.image(1240, 20, 'nombreDinosaurio');
            this.nombreDos.setOrigin(1, 0);
            this.nombreDos.setScale(0.65);
            this.jugador2 = this.add.image(1200, 640,'spriteDinosaurio');
            this.jugador2.setScale(0.23);
            this.jugador2.setOrigin(0.72, 0.53);
            this.brazo2 = this.add.image(1200, 640,'brazoDinosaurio');
            this.brazo2.setScale(0.23);
            this.brazo2.setOrigin(0.61, 0.33);
        } else if (this.personaje.jugadorDos == 'c') {
            this.nombreDos = this.add.image(1240, 20, 'nombreCiego');
            this.nombreDos.setOrigin(1, 0);
            this.nombreDos.setScale(0.65);
            this.jugador2 = this.add.image(1200, 640,'spritePerro');
            this.jugador2.setScale(0.23);
            this.jugador2.setOrigin(0.72, 0.53);
            this.brazo2 = this.add.image(1200, 640,'brazoPerro');
            this.brazo2.setScale(0.23);
            this.brazo2.setOrigin(0.61, 0.33);
            this.ciego = this.add.image(1200,640,'spriteCiego');
            this.ciego.setScale(0.27);
            this.ciego.setOrigin(0,0.5);
        } else if (this.personaje.jugadorDos == 'n') {
            this.nombreDos = this.add.image(1240, 20, 'nombreNinja');
            this.nombreDos.setOrigin(1, 0);
            this.nombreDos.setScale(0.65);
            this.jugador2 = this.add.image(1200, 640,'spriteNinja');
            this.jugador2.setScale(0.23);
            this.jugador2.setOrigin(0.72, 0.53);
            this.brazo2 = this.add.image(1200, 640,'brazoNinja');
            this.brazo2.setScale(0.23);
            this.brazo2.setOrigin(0.61, 0.33);
        } else if (this.personaje.jugadorDos == 'z') {
            this.nombreDos = this.add.image(1240, 20, 'nombreZombie');
            this.nombreDos.setOrigin(1, 0);
            this.nombreDos.setScale(0.65);
            this.jugador2 = this.add.image(1200, 640,'spriteZombie');
            this.jugador2.setScale(0.23);
            this.jugador2.setOrigin(0.72, 0.53);
            this.brazo2 = this.add.image(1200, 640,'brazoZombie');
            this.brazo2.setScale(0.23);
            this.brazo2.setOrigin(0.61, 0.33);
        }

        this.jugador1.setDepth(1);
        this.brazo1.setDepth(3);
        this.jugador2.setDepth(1);
        this.brazo2.setDepth(3);

        this.physics.world.enable([this.jugador1, this.jugador2]);
        //this.physics.world.enable(this.jugador2);
        

        this.jugador1.body.setBounce(0.1).setCollideWorldBounds(true);
        this.jugador2.body.setBounce(0.1).setCollideWorldBounds(true).updateBounds();

        this.physics.add.collider(this.jugador1, this.plataformas);
        this.physics.add.collider(this.jugador2, this.plataformas);
        this.physics.add.collider(this.armas, this.plataformas);
        this.physics.add.collider(this.balas1, this.plataformas, this.chocarSuelo, null, this);
        this.physics.add.collider(this.balas2, this.plataformas, this.chocarSuelo, null, this);

        this.physics.add.overlap(this.jugador1, this.armas, this.cambiarArma1, null, this);
        this.physics.add.overlap(this.jugador2, this.armas, this.cambiarArma2, null, this);
        this.physics.add.overlap(this.jugador2, this.balas1, this.golpeJugador2, null, this);
        this.physics.add.overlap(this.jugador1, this.balas2, this.golpeJugador1, null, this);

        //this.jugador1.body.center = new Vector2D();



        //this.jugador1.setCollideWorldBounds(true);
        //this.jugador2.setCollideWorldBounds(true);

        //this.jugador1.setBounce(0.3);
        //this.jugador2.setBounce(0.3);

        /**
        this.personaje3 = this.add.image(640, 640,'spritePerro');
        this.personaje3.setScale(0.23);
        this.personaje3.setOrigin(0.72, 0.53);
        this.arma3 = this.add.image(640, 640,'sniper');
        this.arma3.setScale(0.23);
        this.arma3.setOrigin(0.78, 0.28);
        this.brazo3 = this.add.image(640, 640,'brazoPerro');
        this.brazo3.setScale(0.23);
        this.brazo3.setOrigin(0.61, 0.33);

        /**
        this.personaje1 = this.add.image(840, 640,'spritePerro');
        this.personaje1.setScale(-0.23, 0.23);
        this.personaje1.setOrigin(0.72, 0.53);
        this.arma1 = this.add.image(840, 640,'lanzacohetes');
        this.arma1.setScale(-0.23, 0.23);
        this.arma1.setOrigin(0.78, 0.28);
        this.brazo1 = this.add.image(840, 640,'brazoPerro');
        this.brazo1.setScale(-0.23, 0.23);
        this.brazo1.setOrigin(0.61, 0.33);
        /**/

        this.personaje2 = this.add.image(640, 640,'spritePerro');
        this.personaje2.setScale(0.23);
        this.personaje2.setOrigin(0.72, 0.53);
        this.arma2 = this.add.image(640, 640,'sniper');
        this.arma2.setScale(0.23);
        this.arma2.setOrigin(0.78, 0.28);
        this.brazo2 = this.add.image(640, 640,'brazoPerro');
        this.brazo2.setScale(0.23);
        this.brazo2.setOrigin(0.61, 0.33);

        this.personaje4 = this.add.image(840, 640,'spritePerro');
        this.personaje4.setFlipX(true);
        this.personaje4.setScale(0.23);
        this.personaje4.setOrigin(0.72, 0.53);
        this.arma4 = this.add.image(840, 640,'lanzacohetes');
        this.arma4.setScale(-0.23, 0.23);
        this.arma4.setOrigin(0.78, 0.28);
        this.brazo4 = this.add.image(840, 640,'brazoPerro');
        this.brazo4.setScale(-0.23, 0.23);
        this.brazo4.setOrigin(0.61, 0.33);

        /**
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
        
        this.timeText = this.add.text(638, 130, '02:00', { fontFamily: 'luckiestGuy', fontSize: 50, shadowStroke: true, shadowBlur: 1, strokeThickness: 4, stroke: '#000000' });
        this.timeText.setOrigin(0.5);

        this.p1Text = this.add.text(530, 60);
        this.p1Text.setOrigin(0.5);
        this.p1Text.setScale(2.5);

        this.p2Text = this.add.text(760, 60);
        this.p2Text.setOrigin(0.5);
        this.p2Text.setScale(2.5);

        // https://stackoverflow.com/questions/51217147/how-to-use-a-local-font-in-phaser-3
        // https://github.com/photonstorm/phaser3-examples/tree/master/public/src/game%20objects/text
        // https://www.youtube.com/watch?v=PPT-pvrWzp0&list=PLlultXOnQ04Qj5vm4Cf8l2zlFg7_4A7i8&index=3

        this.cursor_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        
        this.cursors_jugador1 = {
            derecha: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            izquierda: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            saltar: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            disparar: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
            interactuar: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        };

        this.cursors_jugador2 = {
            derecha: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L),
            izquierda: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),
            saltar: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I),
            disparar: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B),
            interactuar: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O)
        };

        this.cameras.main.once('camerafadeoutcomplete', function () {
            this.scene.start("SceneFinal");
        }.bind(this));
    }

    updateGanador (value) {
        this.personaje.ganador = value;
    }

    update(time) {
        /*
        this.brazo.angle += 1;
        this.arma.angle += 1;

        this.brazo2.angle += 1;
        this.arma2.angle += 1;

        this.brazo4.angle += 1;
        this.arma4.angle += 1;

        this.brazo3.angle += 1;
        this.arma3.angle += 1;
        */
        if (!this.cargado){
            // this.currentTime = time + 120000;
            this.currentTime = time + 30000;
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
            this.sonidoAtras.play();
            this.pulsado = true;
        }

        if (this.cursor_ESC.isUp && this.pulsado) {
            this.pulsado = false;
            this.timeRestante = this.currentTime - time;
            this.pausado = true;
            this.scene.pause();
            this.scene.launch("ScenePausa");
        }

        
        if (this.minutos <= 0 && this.segundos <= 0 && !this.entrado) {
            this.timeText.setText('00:00');
            
            if(this.puntos1 > this.puntos2){
                this.updateGanador(1);
                this.entrado = true;
            } 
            else if(this.puntos1 < this.puntos2){
                this.updateGanador(2);
                this.entrado = true;
                
            }
            else this.updateGanador(0);
            
        }
        
        if (this.minutos <= 0 && this.segundos <= 0 && !this.final && this.personaje.ganador != 0 ) {
            this.final = true;
            if (this.personaje.ganador == 1) {
                this.victoria = this.add.sprite(640, 360, 'victoriaUno').setDepth(4).play('animacion1');
                
            } else if (this.personaje.ganador == 2) {
                this.victoria = this.add.sprite(640, 360, 'victoriaDos').setDepth(4).play('animacion2');                
            }
        }
        if(this.final){
            this.timeText.setText('00:00');
            this.victoria.on('animationcomplete', function(){
                
                if(this.entradoTime == 0)this.entradoTime = time + 2000;
                            
            }.bind(this));
        }

        if(this.entradoTime < time && this.entradoTime != 0 && !this.acabar){
            this.cameras.main.fadeOut(250);
            this.acabar = true;
        }
        
        if(this.salud1 <= 0){
            this.puntos2 ++;
            this.salud1 = 100;
            this.jugador1.body.reset(Phaser.Math.Between(80,1200),80);
        }
        if(this.salud2 <= 0){
            this.puntos1 ++;
            this.salud2 = 100;
            this.jugador2.body.reset(Phaser.Math.Between(80,1200),80);
        }

        this.p1Text.setText(this.puntos1);
        this.p2Text.setText(this.puntos2);

        /* Fisicas*/
        /*Posicion*/

        

        this.brazo1.setPosition(this.jugador1.x,this.jugador1.y);
        this.brazo2.setPosition(this.jugador2.x,this.jugador2.y);
        
        if(this.personaje.jugadorUno == 'c') this.ciego.setPosition(this.jugador1.x,this.jugador1.y);
        if(this.personaje.jugadorDos == 'c') this.ciego.setPosition(this.jugador2.x,this.jugador2.y);
        
        if(this.girar){ 
            this.brazo1.setRotation(Phaser.Math.Angle.Between(this.jugador2.x,this.jugador2.y,this.jugador1.x,this.jugador1.y));
            this.brazo2.setRotation(Phaser.Math.Angle.Between(this.jugador2.x,this.jugador2.y,this.jugador1.x,this.jugador1.y));
            if(this.jugador1.x < this.jugador2.x){
                this.jugador1.setFlipX(true).setOrigin(0.28, 0.53);
                this.jugador2.setFlipX(false).setOrigin(0.72, 0.53);
                this.brazo1.setScale(-0.23, 0.23);
                this.brazo2.setScale(0.23);
                if(this.personaje.jugadorUno == 'c') this.ciego.setTexture('spriteCiegoReverse').setOrigin(1,0.5);
                if(this.personaje.jugadorDos == 'c') this.ciego.setTexture('spriteCiego').setOrigin(0,0.5);
                this.girar = false;
            }
            
        }
        else if (!this.girar){
            this.brazo1.setRotation(Phaser.Math.Angle.Between(this.jugador1.x,this.jugador1.y,this.jugador2.x,this.jugador2.y));
            this.brazo2.setRotation(Phaser.Math.Angle.Between(this.jugador1.x,this.jugador1.y,this.jugador2.x,this.jugador2.y));
            if(this.jugador1.x > this.jugador2.x){
                this.jugador1.setFlipX(false).setOrigin(0.72, 0.53);
                this.jugador2.setFlipX(true).setOrigin(0.28, 0.53);
                this.brazo1.setScale(0.23);
                this.brazo2.setScale(-0.23, 0.23);
                if(this.personaje.jugadorUno == 'c') this.ciego.setTexture('spriteCiego').setOrigin(0,0.5);
                if(this.personaje.jugadorDos == 'c') this.ciego.setTexture('spriteCiegoReverse').setOrigin(1,0.5);
                this.girar = true;
            }
            
        }
        if (this.arma1){
            if(this.jugador1.flipX == true){
                this.arma1.setOrigin(0.22, 0.28).setFlipX(true);
            }
            else this.arma1.setOrigin(0.78, 0.28).setFlipX(false);
            this.arma1.setPosition(this.jugador1.x,this.jugador1.y);
            this.arma1.setRotation(this.brazo1.rotation);
        }
        if (this.arma2){
            if(this.jugador2.flipX == true){
                this.arma2.setOrigin(0.22, 0.28).setFlipX(true);
            }
            else this.arma2.setOrigin(0.78, 0.28).setFlipX(false);
            this.arma2.setPosition(this.jugador2.x,this.jugador2.y);
            this.arma2.setRotation(this.brazo2.rotation);
        }

        /*Movimiento*/
        /*Jugador 1*/
        if (this.cursors_jugador1.izquierda.isDown)
        {
            this.jugador1.body.setVelocityX(-200);
        }
        else if (this.cursors_jugador1.derecha.isDown)
        {
            this.jugador1.body.setVelocityX(200);
        }
        
        else
        {
            this.jugador1.body.setVelocityX(0);
        }
        
        if (this.cursors_jugador1.saltar.isDown && this.jugador1.body.touching.down)
        {
            this.jugador1.body.setVelocityY(-620);
        }
        
        if (this.cursors_jugador1.disparar.isDown && this.cd1 < time)
        {
            var bullet = this.balas1.get();
            if (bullet)
            {
                bullet.fire(this.arma1);
                this.cd1 = time + 500;
            }
        }
        /*Jugador 2*/
        if (this.cursors_jugador2.izquierda.isDown)
        {
            this.jugador2.body.setVelocityX(-200);
        }
        else if (this.cursors_jugador2.derecha.isDown)
        {
            this.jugador2.body.setVelocityX(200);
        }
        else
        {
            this.jugador2.body.setVelocityX(0);
        }
        if (this.cursors_jugador2.saltar.isDown && this.jugador2.body.touching.down)
        {
            this.jugador2.body.setVelocityY(-620);
        }
        if (this.cursors_jugador2.disparar.isDown && this.cd2 < time)
        {
            var bullet = this.balas2.get();
            if (bullet)
            {
                bullet.fire(this.arma2);
                this.cd2 = time + 500;
            }
        }

         this.vidaUno.clear();
         this.vidaUno.setDepth(3);
         this.vidaUno.fillStyle(0x4d99ff, 1);
         this.vidaUno.fillRect(23, 53, 394*Phaser.Math.Clamp(this.salud1/100,0,1), 24);
 
         this.vidaDos.clear();
         this.vidaDos.setDepth(3);
         this.vidaDos.fillStyle(0xff4d4d, 1);
         this.vidaDos.fillRect(863, 53, 394*Phaser.Math.Clamp(this.salud2/100,0,1), 24);
    }

    cambiarArma1(jugador1,arma) {
        if(this.cursors_jugador1.interactuar.isDown){
            if(this.arma1 == null){
                arma.disableBody(true,false);
                this.arma1 = arma;
                this.arma1.setPosition(jugador1.x,jugador1.y)
                this.arma1.setRotation(this.brazo1.rotation);
                this.arma1.setDepth(2);
            }

        }
    }

    cambiarArma2(jugador2,arma) {
        if(this.cursors_jugador2.interactuar.isDown){
            if(this.arma2 == null){
                arma.disableBody(true,false);
                this.arma2 = arma;
                this.arma2.setPosition(jugador2.x,jugador2.y)
                this.arma2.setRotation(this.brazo2.rotation);
                this.arma2.setDepth(2);
            }

        }
    }

    chocarSuelo(bala,plataforma){
        bala.kill();
    }

    golpeJugador2(jugador2, bala){
        if(bala.active){
            this.salud2 -= 10;
            bala.kill();
        }
    }
    golpeJugador1(jugador1, bala){
        if(bala.active){
            this.salud1 -= 10;
            bala.kill();
        }
    }
}