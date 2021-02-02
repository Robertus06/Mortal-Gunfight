export default class SceneJuegoOnline extends Phaser.Scene {
    constructor() {
        super({ key: "SceneJuegoOnline" });
    }

    create() {
        this.Bala = new Phaser.Class({

            Extends: Phaser.Physics.Arcade.Image,
        
            initialize:
        
            function Bala (scene, nombre,daño)
            {
                Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, nombre);        
            
                this.setDepth(1);
                this.setScale(0.27);
                this.daño = daño;
                
        
                this.speed = 1200;
                
        
                //this._temp = new Phaser.Math.Vector2();
            },
        
            fire: function (arma)
            {                        
                this.setActive(true);
                this.setVisible(true);
                this.setRotation(arma.rotation);

                if(arma.texture.key == "minigun"){
                    this.setPosition(arma.x - 30 * Math.sin(arma.rotation), arma.y + 30 * Math.cos(arma.rotation));
                    this.body.reset(arma.x - 30 * Math.sin(arma.rotation), arma.y + 30 * Math.cos(arma.rotation));
                } 
                else{
                    this.setPosition(arma.x, arma.y);
                    this.body.reset(arma.x, arma.y);
                }
        
        
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
                this.destroy();
            },
            flip: function ()
            {
                if(this.flipX) this.setFlipX(false);
                else this.setFlipX(true);
            }
        
        });

        this.Arma = new Phaser.Class({

            Extends: Phaser.Physics.Arcade.Image,
        
            initialize:

            function Arma(scene,nombre,sonido,municionMax,cadencia,recarga,daño,balas)
            {
                Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, nombre);
                this.setScale(0.27);
                this.setOrigin(0.78, 0.28);
                //this.body.setSize(150,150);
                //this.body.setOffset(400,100);

                if(nombre=="lanzacohetes") this.tipoBala = 'cohete';
                else this.tipoBala = 'bala';
                this.sonido = scene.sound.add(sonido);
                this.municionMax = municionMax;
                this.municion = municionMax;
                this.cadencia  = cadencia;
                this.recarga = recarga;
                this.cd = 0;
                this.daño = daño;
                this.balas = balas;
                this.setActive(true);
                this.setVisible(true);
            },
            update: function (time)
            {
                if(this.cd < time)
                {
                    if(this.municion == 0)
                    {
                        this.municion = this.municionMax;
                    }
                }
            },
            disparar: function(scene,time)
            {
                if(this.cd < time)
                {
                    var bullet = new scene.Bala(scene, this.tipoBala,this.daño);
                    if(this.flipX == true)
                    bullet.flip();
                    this.balas.add(bullet, true);
                    
                    this.sonido.play();
                    if(this.municion == 0)
                    {
                        this.municion = this.municionMax;
                    }
                    
                    if (bullet)
                    {   
                        bullet.fire(this);
                        this.municion--;
                        if(this.municion > 0)
                        {
                            this.cd = time + this.cadencia;
                        }
                        else
                        {
                            this.cd = time + this.recarga;
                        }
                    }
                }
            },



            flip: function()
            {
                if(this.flipX) 
                {
                    this.setFlipX(false)
                    this.setOrigin(0.78, 0.28);
                    //this.body.setOffset(200,100);
                }
                else
                {
                    this.setFlipX(true)
                    this.setOrigin(0.22, 0.28);
                    //this.body.setOffset(400,100);
                }

            }




        });

        this.minutos = 0;
        this.currentTime = 0;
        this.cd1 = 0;
        this.cd2 = 0;
        this.cdGenerarArma = 0;
        this.cargado = false;
        this.final = false;
        this.entrado = false;
        this.entradoTime = 0;
        this.acabar = false;
        this.girar = false;
        this.conArma1 = false;
        this.conArma2 = false;
        this.transicion = this.sys.game.globalsTransicion.transicion;
        this.abandonado = this.sys.game.globalsAbandonado.abandonado;

        this.victoria = null;

        this.nombreArmas = ['ar','lanzacohetes','minigun','pistola','smg','sniper'];

        this.salud1 = 100;
        this.salud2 = 100;
        this.puntos1 = 0;
        this.puntos2 = 0;

        this.tiempo = this.sys.game.globalsTiempo.tiempo;
        this.jugadores = this.sys.game.globalsJugadores.jugadores;

        this.cambiar1 = false;
        this.disparar1 = false;
        this.cambiar2 = false;
        this.disparar2 = false;
        this.x1 = 0;
        this.x2 = 0;
        this.y1 = 0;
        this.y2 = 0;
        this.armasOnline = null;
        this.x = null;
        this.t1 = null;
        this.t2 = null;
        this.municion1 = 0;
        this.municion2 = 0;
        this.muerto1 = false;
        this.muerto2 = false;

        this.sonidoPistola1 = this.sound.add('sonidoPistola1');
        this.sonidoPistola2 = this.sound.add('sonidoPistola2');
        this.sonidoAr1 = this.sound.add('sonidoAr1');
        this.sonidoAr2 = this.sound.add('sonidoAr2');
        this.sonidoSmg1 = this.sound.add('sonidoSmg1');
        this.sonidoSmg2 = this.sound.add('sonidoSmg2');
        this.sonidoSniper1 = this.sound.add('sonidoSniper1');
        this.sonidoSniper2 = this.sound.add('sonidoSniper2');
        this.sonidoMinigun1 = this.sound.add('sonidoMinigun1');
        this.sonidoMinigun2 = this.sound.add('sonidoMinigun2');
        this.sonidoCohete1 = this.sound.add('sonidoCohete1');
        this.sonidoCohete2 = this.sound.add('sonidoCohete2');
        this.sonidoLanzacohetes1 = this.sound.add('sonidoLanzacohetes1');
        this.sonidoLanzacohetes2 = this.sound.add('sonidoLanzacohetes2');
        this.viento1 = this.sound.add('viento1');
        this.viento2 = this.sound.add('viento2');

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

        this.puntos = this.sys.game.globalsPuntos.puntos;
        
        this.mapa = this.sys.game.globalsMapa.mapa;
        
        this.plataformas = this.physics.add.staticGroup();
        this.decoracion = this.add.group();
        
        if (this.mapa.escenario == 't') {
            this.fondo = this.add.image(640, 360, 'templo');

            this.decoracion.create(450, 0, 'cadenas').setOrigin(0.5, 0);
            this.decoracion.create(830, 0, 'cadenas').setOrigin(0.5, 0);
            
            this.plataformas.create(640, 703, 'spriteSuelo');
            this.plataformas.create(640, 720, 'pared').setOrigin(0.5, 1).refreshBody();
            this.plataformas.create(640, 385, 'plataforma').refreshBody();
            this.plataformas.create(56, 310, 'tejas').setScale(-1, 1).refreshBody();
            this.plataformas.create(246, 530, 'tejas').refreshBody().setScale(-1, 1);
            this.plataformas.create(1224, 310, 'tejas').refreshBody();
            this.plataformas.create(1034, 530, 'tejas').refreshBody();
            
            this.decoracion.create(390, 382, 'paloma').setScale(-1, 1).setOrigin(0.5, 1);
            this.decoracion.create(890, 382, 'paloma').setOrigin(0.5, 1);

        } else if (this.mapa.escenario == 'v') {
            this.fondo = this.add.image(640, 360, 'volcan');

            this.crater = this.physics.add.staticGroup();

            this.decoracion.create(640, 0, 'humo').setOrigin(0.5, 0);
            this.decoracion.create(640, 720, 'salto').setOrigin(0.5, 1);
            this.decoracion.create(640, 0, 'techo').setOrigin(0.5, 0);

            this.crater.create(640, 720, 'salto2').setOrigin(0.5, 1).refreshBody();

            this.plataformas.create(640, 720, 'spriteSuelo3').setOrigin(0.5, 1).refreshBody();
            this.plataformas.create(540, 720, 'pared3').setOrigin(0.5, 1).setScale(0.92).refreshBody();
            this.plataformas.create(740, 720, 'pared3').setOrigin(0.5, 1).setScale(0.92).refreshBody();
            this.plataformas.create(1170, 400, 'rocas').setScale(-1, 1).refreshBody();
            this.plataformas.create(855, 235, 'rocas').setScale(-1, 1).refreshBody();
            this.plataformas.create(425, 235, 'rocas').refreshBody();
            this.plataformas.create(110, 400, 'rocas').refreshBody();

        } else if (this.mapa.escenario == 'c') {
            this.fondo = this.add.image(640, 360, 'ciudad');

            this.decoracion.create(123, 544, 'cuerda').setOrigin(0.5, 1);
            this.decoracion.create(1157, 544, 'cuerda').setOrigin(0.5, 1);
            this.decoracion.create(403, 399, 'cuerda').setOrigin(0.5, 1);
            this.decoracion.create(877, 399, 'cuerda').setOrigin(0.5, 1);

            this.plataformas.create(640, 703, 'spriteSuelo2');
            this.plataformas.create(640, 720, 'pared2').setOrigin(0.5, 1).refreshBody();
            this.plataformas.create(123, 530, 'pale').refreshBody();
            this.plataformas.create(1157, 530, 'pale').refreshBody();
            this.plataformas.create(877, 385, 'pale').refreshBody();
            this.plataformas.create(403, 385, 'pale').refreshBody();
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
        this.vidaUnoBox.setDepth(4);

        this.vidaDosBox.fillStyle(0x000000, 1);
        this.vidaDosBox.fillRect(860, 50, 400, 30);
        this.vidaDosBox.setDepth(4);

        this.vidaUnoBar.setDepth(5);
        this.vidaUnoBar.fillStyle(0xffffff, 0.5);
        this.vidaUnoBar.fillRect(23, 53, 394, 24);

        this.vidaDosBar.setDepth(5);
        this.vidaDosBar.fillStyle(0xffffff, 0.5);
        this.vidaDosBar.fillRect(863, 53, 394, 24);

        // this.vidaUno.clear();
        this.vidaUno.setDepth(6);
        this.vidaUno.fillStyle(0x4d99ff, 1);
        this.vidaUno.fillRect(23, 53, 394*(this.salud1/100), 24);

        // this.vidaDosBar.clear();
        this.vidaDos.setDepth(6);
        this.vidaDos.fillStyle(0xff4d4d, 1);
        this.vidaDos.fillRect(863, 53, 394*(this.salud2/100), 24);
        
        this.versus = this.add.image(640, 60, 'vs');
        this.versus.setDepth(4);

        this.arma1 = null;
        this.arma2 = null;
        this.armas = this.physics.add.group();
        //this.armas.create(230, 20, 'pistola').setScale(0.27).setOrigin(0.22, 0.28).setFlipX(true);
        //this.armas.create(1050, 20, 'pistola').setScale(0.27).setOrigin(0.78, 0.28);
        
        this.armas.children.iterate(function(child){
            //child.body.syncBounds = true;
            //child.body.updateBounds();
            child.body.setSize(150,150);
            if(child.flipX === true) child.body.setOffset(200,100);
            else child.body.setOffset(400,100);

        });

        this.balas1 = this.physics.add.group({
            classType: this.Bala,
            defaultKey: 'bala',
            maxSize: 100,
            runChildUpdate: true
        });
        this.balas2 = this.physics.add.group({
            classType: this.Bala,
            defaultKey: 'bala',
            maxSize: 100,
            runChildUpdate: true
        });
        
        if (this.personaje.jugadorUno == 'd') {
            this.nombreUno = this.add.image(40, 20, 'nombreDinosaurio');
            this.nombreUno.setOrigin(0);
            this.nombreUno.setScale(0.75);
            this.nombreUno.setDepth(4);
            if (this.mapa.escenario == 'v') {
                this.jugador1 = this.add.image(80, 580,'spriteDinosaurio');
            } else {
                this.jugador1 = this.add.image(80, 640,'spriteDinosaurio');
            }
            this.jugador1.setScale(0.27).setFlipX(true).setOrigin(0.28, 0.53);    
            this.brazo1 = this.add.image(80, 640,'brazoDinosaurio');
            this.brazo1.setScale(-0.27, 0.27);
            this.brazo1.setOrigin(0.61, 0.33);
        } else if (this.personaje.jugadorUno == 'c') {
            this.nombreUno = this.add.image(40, 20, 'nombreCiego');
            this.nombreUno.setOrigin(0);
            this.nombreUno.setScale(0.75);
            this.nombreUno.setDepth(4);
            if (this.mapa.escenario == 'v') {
                this.jugador1 = this.add.image(80, 580,'spritePerro');            
            } else {
                this.jugador1 = this.add.image(80, 640,'spritePerro');            
            }
            this.jugador1.setScale(0.27).setFlipX(true).setOrigin(0.28, 0.53);
            this.brazo1 = this.add.image(80, 640,'brazoPerro');
            this.brazo1.setScale(-0.27, 0.27);
            this.brazo1.setOrigin(0.61, 0.33);
            this.ciego = this.add.image(80, 640,'spriteCiegoReverse');
            this.ciego.setScale(0.31);
            this.ciego.setOrigin(1,0.5);
        } else if (this.personaje.jugadorUno == 'n') {
            this.nombreUno = this.add.image(40, 20, 'nombreNinja');
            this.nombreUno.setOrigin(0);
            this.nombreUno.setScale(0.75);
            this.nombreUno.setDepth(4);
            if (this.mapa.escenario == 'v') {
                this.jugador1 = this.add.image(80, 580,'spriteNinja');
            } else {
                this.jugador1 = this.add.image(80, 640,'spriteNinja');
            }
            this.jugador1.setScale(0.27).setFlipX(true).setOrigin(0.28, 0.53);
            this.brazo1 = this.add.image(80, 640,'brazoNinja');
            this.brazo1.setScale(-0.27, 0.27);
            this.brazo1.setOrigin(0.61, 0.33);
        } else if (this.personaje.jugadorUno == 'z') {
            this.nombreUno = this.add.image(40, 20, 'nombreZombie');
            this.nombreUno.setOrigin(0);
            this.nombreUno.setScale(0.75);
            this.nombreUno.setDepth(4);
            if (this.mapa.escenario == 'v') {
                this.jugador1 = this.add.image(80, 580,'spriteZombie');
            } else {
                this.jugador1 = this.add.image(80, 640,'spriteZombie');
            }
            this.jugador1.setScale(0.27).setFlipX(true).setOrigin(0.28, 0.53);
            this.brazo1 = this.add.image(80, 640,'brazoZombie');
            this.brazo1.setScale(-0.27, 0.27);
            this.brazo1.setOrigin(0.61, 0.33);
        }

        if (this.personaje.jugadorDos == 'd') {
            this.nombreDos = this.add.image(1240, 20, 'nombreDinosaurio');
            this.nombreDos.setOrigin(1, 0);
            this.nombreDos.setScale(0.75);
            this.nombreDos.setDepth(4);
            if (this.mapa.escenario == 'v') {
                this.jugador2 = this.add.image(1200, 580,'spriteDinosaurio');
            } else {
                this.jugador2 = this.add.image(1200, 640,'spriteDinosaurio');
            }
            this.jugador2.setScale(0.27);
            this.jugador2.setOrigin(0.72, 0.53);
            this.brazo2 = this.add.image(1200, 640,'brazoDinosaurio');
            this.brazo2.setScale(0.27);
            this.brazo2.setOrigin(0.61, 0.33);
        } else if (this.personaje.jugadorDos == 'c') {
            this.nombreDos = this.add.image(1240, 20, 'nombreCiego');
            this.nombreDos.setOrigin(1, 0);
            this.nombreDos.setScale(0.75);
            this.nombreDos.setDepth(4);
            if (this.mapa.escenario == 'v') {
                this.jugador2 = this.add.image(1200, 580,'spritePerro');
            } else {
                this.jugador2 = this.add.image(1200, 640,'spritePerro');
            }
            this.jugador2.setScale(0.27);
            this.jugador2.setOrigin(0.72, 0.53);
            this.brazo2 = this.add.image(1200, 640,'brazoPerro');
            this.brazo2.setScale(0.27);
            this.brazo2.setOrigin(0.61, 0.33);
            this.ciego = this.add.image(1200,640,'spriteCiego');
            this.ciego.setScale(0.31);
            this.ciego.setOrigin(0,0.5);
        } else if (this.personaje.jugadorDos == 'n') {
            this.nombreDos = this.add.image(1240, 20, 'nombreNinja');
            this.nombreDos.setOrigin(1, 0);
            this.nombreDos.setScale(0.75);
            this.nombreDos.setDepth(4);
            if (this.mapa.escenario == 'v') {
                this.jugador2 = this.add.image(1200, 580,'spriteNinja');
            } else {
                this.jugador2 = this.add.image(1200, 640,'spriteNinja');
            }
            this.jugador2.setScale(0.27);
            this.jugador2.setOrigin(0.72, 0.53);
            this.brazo2 = this.add.image(1200, 640,'brazoNinja');
            this.brazo2.setScale(0.27);
            this.brazo2.setOrigin(0.61, 0.33);
        } else if (this.personaje.jugadorDos == 'z') {
            this.nombreDos = this.add.image(1240, 20, 'nombreZombie');
            this.nombreDos.setOrigin(1, 0);
            this.nombreDos.setScale(0.75);
            this.nombreDos.setDepth(4);
            if (this.mapa.escenario == 'v') {
                this.jugador2 = this.add.image(1200, 580,'spriteZombie');
            } else {
                this.jugador2 = this.add.image(1200, 640,'spriteZombie');
            }
            this.jugador2.setScale(0.27);
            this.jugador2.setOrigin(0.72, 0.53);
            this.brazo2 = this.add.image(1200, 640,'brazoZombie');
            this.brazo2.setScale(0.27);
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
        if (this.mapa.escenario == 'v') {
            this.physics.add.collider(this.jugador1, this.crater, this.saltoCrater1, null, this);
            this.physics.add.collider(this.jugador2, this.crater, this.saltoCrater2, null, this);
        }
        this.physics.add.collider(this.armas, this.plataformas);
        this.physics.add.collider(this.balas1, this.plataformas, this.chocarSuelo1, null, this);
        this.physics.add.collider(this.balas2, this.plataformas, this.chocarSuelo2, null, this);

        this.physics.add.overlap(this.jugador1, this.armas, this.cambiarArma1, null, this);
        this.physics.add.overlap(this.jugador2, this.armas, this.cambiarArma2, null, this);
        this.physics.add.overlap(this.jugador2, this.balas1, this.golpeJugador2, null, this);
        this.physics.add.overlap(this.jugador1, this.balas2, this.golpeJugador1, null, this);    
        
        this.timeText = this.add.text(638, 130, '02:00', { fontFamily: 'luckiestGuy', fontSize: 50, shadowStroke: true, shadowBlur: 1, strokeThickness: 4, stroke: '#000000' });
        this.timeText.setOrigin(0.5);
        this.timeText.setDepth(4);

        this.p1Text = this.add.text(530, 60,'0',{ fontFamily: 'luckiestGuy', fontSize: 70, shadowStroke: true, shadowBlur: 1, strokeThickness: 4, stroke: '#000000' });
        this.p1Text.setOrigin(0.5);
        this.p1Text.setDepth(4);

        this.p2Text = this.add.text(760, 60,'0',{ fontFamily: 'luckiestGuy', fontSize: 70, shadowStroke: true, shadowBlur: 1, strokeThickness: 4, stroke: '#000000' });
        this.p2Text.setOrigin(0.5);
        this.p2Text.setDepth(4);

        this.m1Text = this.add.text(80, 90,' ',{ fontFamily: 'luckiestGuy', fontSize: 30, shadowStroke: true, shadowBlur: 1, strokeThickness: 4, stroke: '#000000' });
        this.m1Text.setOrigin(0);
        this.m1Text.setDepth(4);

        this.interfaz = this.add.group();

        

        this.m2Text = this.add.text(1200, 90,' ',{ fontFamily: 'luckiestGuy', fontSize: 30, shadowStroke: true, shadowBlur: 1, strokeThickness: 4, stroke: '#000000' });
        this.m2Text.setOrigin(1,0);
        this.m2Text.setDepth(4);
        
        this.cursors_jugador = {
            derecha: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            izquierda: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            saltar: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            interactuar: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        };

        this.cameras.main.once('camerafadeoutcomplete', function () {
            this.scene.start("SceneFinalOnline");
        }.bind(this));
    }

    updateGanador (value) {
        this.personaje.ganador = value;
    }

    update(time) {
        
        
        if(this.sys.game.mensaje.id == 4){
            if (this.jugadores.jugYo == 1){
                this.jugador2.x = this.sys.game.mensaje.posx;
                this.jugador2.y = this.sys.game.mensaje.posy;
                this.x2 = this.sys.game.mensaje.x;
                this.y2 = this.sys.game.mensaje.y;
                this.disparar2 = this.sys.game.mensaje.disparar;
                this.cambiar2 = this.sys.game.mensaje.cambiar; 
                if(this.arma2)
                this.arma2.municion = this.sys.game.mensaje.municion;
            }else if(this.jugadores.jugYo == 2){
                this.jugador1.x = this.sys.game.mensaje.posx;
                this.jugador1.y = this.sys.game.mensaje.posy;
                this.x1 = this.sys.game.mensaje.x;
                this.y1 = this.sys.game.mensaje.y;
                this.disparar1 = this.sys.game.mensaje.disparar;
                this.cambiar1 = this.sys.game.mensaje.cambiar;
                this.x =  this.sys.game.mensaje.xarma;
                this.t1 = this.sys.game.mensaje.t1;
                this.t2 = this.sys.game.mensaje.t2;
                this.salud1 = this.sys.game.mensaje.vida1;
                this.salud2 = this.sys.game.mensaje.vida2;
                this.muerto1 = this.sys.game.mensaje.muerto1;
                this.muerto2 = this.sys.game.mensaje.muerto2;
                if(this.arma1)
                this.arma1.municion = this.sys.game.mensaje.municion;
            }
        }
        if (this.jugadores.jugYo == 1){
            this.x1 = this.input.mousePointer.x;
            this.y1 = this.input.mousePointer.y;
        }else if (this.jugadores.jugYo == 2){
            this.x2 = this.input.mousePointer.x;
            this.y2 = this.input.mousePointer.y;
        }

        
        if (!this.cargado){            
            this.currentTime = time + this.tiempo.tiempoJuego;
            this.cdGenerarArma = time + 3000;
            this.cargado = true;
        }

        this.segundos = Math.trunc(((this.currentTime-time)/1000)%60);
        this.minutos = Math.trunc(((this.currentTime-time)/1000)/60);

        if (this.segundos < 10){
            this.timeText.setText('0' + this.minutos + ':0' + this.segundos);
        } else {
            this.timeText.setText('0' + this.minutos + ':' + this.segundos);
        }

        /*******************************************************************************************************************************/
        if(this.cdGenerarArma < time && this.jugadores.jugYo == 1)
        {
            this.x = Phaser.Math.Between(80,480);
            this.t1 = Phaser.Math.Between(0,5);
            this.t2 = Phaser.Math.Between(0,5);
            this.cdGenerarArma = time + 20000;
        }
        if(this.x != null && this.t1 != null && this.t2 != null){
            this.generarArmas(this.x,this.t1,this.t2);
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
            else{
                this.updateGanador(0);
                this.timeText.setText('Muerte súbita');
            } 
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
            this.puntos.puntosJugadorUno = this.puntos1;
            this.puntos.puntosJugadorDos = this.puntos2;
            this.timeText.setText('00:00');
            this.victoria.on('animationcomplete', function(){
                
                if(this.entradoTime == 0)this.entradoTime = time + 2000;
                            
            }.bind(this));
        }

        if(this.entradoTime < time && this.entradoTime != 0 && !this.acabar){
            this.cameras.main.fadeOut(250);
            this.acabar = true;
        }
        
        if(this.salud1 <= 0 || this.muerto1){
            this.puntos2 ++;
            this.salud1 = 100;
            this.jugador1.body.reset(Phaser.Math.Between(80,1200),80);
            this.muerto1 = true;
        }
        if(this.salud2 <= 0 || this.muerto2){
            this.puntos1 ++;
            this.salud2 = 100;
            this.jugador2.body.reset(Phaser.Math.Between(80,1200),80);
            this.muerto2 = true;
        }

        if(!this.final){
            this.p1Text.setText(this.puntos1);
            this.p2Text.setText(this.puntos2);
        }
        this.vidaUno.clear();
        this.vidaUno.setDepth(6);
        this.vidaUno.fillStyle(0x4d99ff, 1);
        this.vidaUno.fillRect(23, 53, 394*Phaser.Math.Clamp(this.salud1/100,0,1), 24);

        this.vidaDos.clear();
        this.vidaDos.setDepth(6);
        this.vidaDos.fillStyle(0xff4d4d, 1);
        this.vidaDos.fillRect(863, 53, 394*Phaser.Math.Clamp(this.salud2/100,0,1), 24);

        if(!this.conArma1 && this.arma1){
            this.interfaz.create(36,100,'bala').setScale(0.7,0.5).setDepth(4).setOrigin(0).setFlipX(true);
            this.interfaz.create(38,108,'bala').setScale(0.7,0.5).setDepth(4).setOrigin(0).setFlipX(true);
            this.interfaz.create(40,116,'bala').setScale(0.7,0.5).setDepth(4).setOrigin(0).setFlipX(true);
            this.conArma1 = true;
        }
        if(!this.conArma2 && this.arma2){
            this.interfaz.create(1244,100,'bala').setScale(0.7,0.5).setDepth(4).setOrigin(1,0);
            this.interfaz.create(1242,108,'bala').setScale(0.7,0.5).setDepth(4).setOrigin(1,0);
            this.interfaz.create(1240,116,'bala').setScale(0.7,0.5).setDepth(4).setOrigin(1,0);
            this.conArma2 = true;
        }

        /* Fisicas*/
        /*Posicion*/        

        this.brazo1.setPosition(this.jugador1.x,this.jugador1.y);
        this.brazo2.setPosition(this.jugador2.x,this.jugador2.y);
        
        if(this.personaje.jugadorUno == 'c') this.ciego.setPosition(this.jugador1.x,this.jugador1.y);
        if(this.personaje.jugadorDos == 'c') this.ciego.setPosition(this.jugador2.x,this.jugador2.y);
        
        /*********************************************************************************************************************************************/

        if(this.girar){
            this.brazo1.setRotation(Phaser.Math.Angle.Between(this.x1,this.y1,this.jugador1.x,this.jugador1.y));
            this.brazo2.setRotation(Phaser.Math.Angle.Between(this.jugador2.x,this.jugador2.y,this.x2,this.y2));
            if(this.jugador1.x < this.jugador2.x){
                this.jugador1.setFlipX(true).setOrigin(0.28, 0.53);
                this.jugador2.setFlipX(false).setOrigin(0.72, 0.53);
                this.brazo1.setScale(-0.27, 0.27);
                this.brazo2.setScale(0.27);
                if(this.personaje.jugadorUno == 'c') this.ciego.setTexture('spriteCiegoReverse').setOrigin(1,0.5);
                if(this.personaje.jugadorDos == 'c') this.ciego.setTexture('spriteCiego').setOrigin(0,0.5);
                this.girar = false;
            }
            
        }
        else if (!this.girar){
            this.brazo1.setRotation(Phaser.Math.Angle.Between(this.jugador1.x,this.jugador1.y,this.x1,this.y1));
            this.brazo2.setRotation(Phaser.Math.Angle.Between(this.x2,this.y2,this.jugador2.x,this.jugador2.y));            
            if(this.jugador1.x > this.jugador2.x){
                this.jugador1.setFlipX(false).setOrigin(0.72, 0.53);
                this.jugador2.setFlipX(true).setOrigin(0.28, 0.53);
                this.brazo1.setScale(0.27);
                this.brazo2.setScale(-0.27, 0.27);
                if(this.personaje.jugadorUno == 'c') this.ciego.setTexture('spriteCiego').setOrigin(0,0.5);
                if(this.personaje.jugadorDos == 'c') this.ciego.setTexture('spriteCiegoReverse').setOrigin(1,0.5);
                this.girar = true;
            }
            
        }
        if (this.arma1){
            this.arma1.update(time);
            if(this.arma1.texture.key == "lanzacohetes"){
                if(this.arma1.municion <= 0) this.arma1.setFrame(1);
                else this.arma1.setFrame(0);
            }
            if(this.jugador1.flipX == true){
                this.arma1.setOrigin(0.22, 0.28).setFlipX(true);
            }
            else this.arma1.setOrigin(0.78, 0.28).setFlipX(false);
            this.arma1.setPosition(this.jugador1.x,this.jugador1.y);
            this.arma1.setRotation(this.brazo1.rotation);
            
            if(this.arma1.municion <= 0) this.m1Text.setText(this.arma1.municion + ' / ' + this.arma1.municionMax + '     RECARGANDO');
            else this.m1Text.setText(this.arma1.municion + ' / ' + this.arma1.municionMax);
        }
        if (this.arma2){
            this.arma2.update(time);
            if(this.arma2.texture.key == "lanzacohetes"){
                if(this.arma2.municion <= 0) this.arma2.setFrame(1);
                else this.arma2.setFrame(0);
            }
            if(this.jugador2.flipX == true){
                this.arma2.setOrigin(0.22, 0.28).setFlipX(true);
            }
            else this.arma2.setOrigin(0.78, 0.28).setFlipX(false);
            this.arma2.setPosition(this.jugador2.x,this.jugador2.y);
            this.arma2.setRotation(this.brazo2.rotation);

            if(this.arma2.municion <= 0) this.m2Text.setText('RECARGANDO     '+this.arma2.municion + ' / ' + this.arma2.municionMax);
            else this.m2Text.setText(this.arma2.municion + ' / ' + this.arma2.municionMax);
        }

        /*Movimiento*/


        
        if(this.input.mousePointer.isDown){
            if(this.jugadores.jugYo == 1){
                if(this.physics.overlap(this.jugador1, this.armas))
                this.disparar1 = true;
                
            }else if (this.jugadores.jugYo == 2){
                if(this.physics.overlap(this.jugador2, this.armas))
                this.disparar2 = true;
            }
        }
        if(this.cursors_jugador.interactuar.isDown){
            if(this.jugadores.jugYo == 1){
                if(this.physics.overlap(this.jugador1, this.armas))
                this.cambiar1 = true;
            }else if (this.jugadores.jugYo == 2){
                if(this.physics.overlap(this.jugador2, this.armas))
                this.cambiar2 = true;
            }
        }

        if(this.disparar1){
            if (this.arma1 != null){
                this.arma1.disparar(this,time);
            }
        }
        if(this.disparar2){
            if (this.arma2 != null){
                this.arma2.disparar(this,time);
            }
        }

        if(this.jugadores.jugYo == 1){
            if(this.arma1)
           this.municion1 = this.arma1.municion;
            
        }else if (this.jugadores.jugYo == 2){
            if(this.arma2)
            this.municion2 = this.arma2.municion;
        }
        
        
        if (this.cursors_jugador.izquierda.isDown)
        {
            if (this.jugadores.jugYo == 1) {
                this.jugador1.body.setVelocityX(-200);
            } else if (this.jugadores.jugYo == 2) {
                this.jugador2.body.setVelocityX(-200);
            }
        }
        else if (this.cursors_jugador.derecha.isDown)
        {
            if (this.jugadores.jugYo == 1) {
                this.jugador1.body.setVelocityX(200);
            } else if (this.jugadores.jugYo == 2) {
                this.jugador2.body.setVelocityX(200);
            }
        }
        
        else
        {
            if (this.jugadores.jugYo == 1) {
                this.jugador1.body.setVelocityX(0);
            } else if (this.jugadores.jugYo == 2) {
                this.jugador2.body.setVelocityX(0);
            }
        }
        
        if (this.jugadores.jugYo == 1) {
            if (this.cursors_jugador.saltar.isDown && this.jugador1.body.touching.down)
            {
                this.jugador1.body.setVelocityY(-620);
            }
        } else if (this.jugadores.jugYo == 2) {
            if (this.cursors_jugador.saltar.isDown && this.jugador2.body.touching.down)
            {
                this.jugador2.body.setVelocityY(-620);
            }
        }
        /** Construir mensaje */
        
        
        if(this.jugadores.jugYo == 1){
            
            this.mensaje = {
                id: 4,
                nombre: this.sys.game.globalsConsulta.consulta.nombre,
                posx: this.jugador1.x,
                posy: this.jugador1.y,
                xarma: this.x, 
                t1: this.t1,
                t2: this.t2,
                x: this.x1,
                y: this.y1,
                municion: this.municion1,
                disparar: this.disparar1,
                cambiar: this.cambiar1,
                vida1: this.salud1,
                vida2: this.salud2,
                muerto1: this.muerto1,
                muerto2: this.muerto2
            };
        }else if(this.jugadores.jugYo == 2){
            
            this.mensaje = {
                id: 4,
                nombre: this.sys.game.globalsConsulta.consulta.nombre,
                posx: this.jugador2.x,
                posy: this.jugador2.y,
                x: this.x2,
                y: this.y2,
                municion: this.municion2,
                disparar: this.disparar2,
                cambiar: this.cambiar2
            };
        }
        
        if (this.sys.game.mensaje.id == -1){
            this.abandonado.haAbandonado = true;
            this.transicion.cancelarSeleccion = true;
            this.scene.start("SceneMenu");
        }else if(this.sys.game.connection.readyState == 1){
            this.sys.game.connection.send(JSON.stringify(this.mensaje));
        }
        
        
        
        this.disparar1 = false;
        this.disparar2 = false;
        this.x = null;
        this.t1 = null;
        this.t2 = null;
        this.muerto1 = false;
        this.muerto2 = false;


        
    }

    cambiarArma1(jugador1,arma) {
        
        if(this.cambiar1){
            if(this.arma1 != null)
            {
                /*
                this.arma1.setActive(false);
                this.arma1.setVisible(false);
                this.arma1.body.stop();
                */
                this.arma1.destroy();
            }
            
            this.arma1 = this.crearArma(arma.texture,1);
            this.add.existing(this.arma1);
            arma.destroy();
            //arma.disableBody(true,false);
            //this.arma1 = arma;
            this.arma1.setPosition(jugador1.x,jugador1.y)
            this.arma1.setRotation(this.brazo1.rotation);
            this.arma1.setDepth(2);
        }
        this.cambiar1 = false;
         
    }

    cambiarArma2(jugador2,arma) {  
        if(this.cambiar2){
            if(this.arma2 != null)
            {
                /*
                this.arma2.setActive(false);                
                this.arma2.setVisible(false);
                this.arma2.body.stop();
                */
                this.arma2.destroy();
            }
            this.arma2 = this.crearArma(arma.texture,2);
            this.add.existing(this.arma2);
            arma.destroy();
            //arma.disableBody(true,false);
            //this.arma2 = arma;
            this.arma2.setPosition(jugador2.x,jugador2.y)
            this.arma2.setRotation(this.brazo2.rotation);
            this.arma2.setDepth(2);
        }
        this.cambiar2 = false;
        
    }

    chocarSuelo1(bala,plataforma){
        if(bala.texture.key == "cohete") this.sonidoCohete1.play();
        bala.kill();
    }
    chocarSuelo2(bala,plataforma){
        if(bala.texture.key == "cohete") this.sonidoCohete2.play();
        bala.kill();
    }

    saltoCrater1(jugador1,crater){
        this.jugador1.body.setVelocityY(-950);
        this.viento1.play();
    }

    saltoCrater2(jugador2,crater){
        this.jugador2.body.setVelocityY(-950);
        this.viento2.play();
    }

    golpeJugador2(jugador2, bala){
        if(this.jugadores.jugYo == 1){
            
            if(bala.active){
                if(bala.texture.key == "cohete") this.sonidoCohete1.play();
                this.salud2 -= bala.daño;
                bala.kill();
            }
        }
    }
    golpeJugador1(jugador1, bala){
        if(this.jugadores.jugYo == 1){
            if(bala.active){
                if(bala.texture.key == "cohete") this.sonidoCohete2.play();
                this.salud1 -= bala.daño;
                bala.kill();
            }
        }
    }

    generarArmas(x,t1,t2){
        this.armas.clear(true,true);
        //this.armas.children.iterate(function(child){
            //child.setActive(false);                
            //child.setVisible(false);
            //child.body.stop();
            //child.destroy();
        //});

        this.armaX = this.armas.create(x, 20, this.nombreArmas[t1]).setScale(0.27).setOrigin(0.22, 0.28).setFlipX(true);
        this.armaX.body.setSize(150,150).setOffset(200,100);        
        this.armaY = this.armas.create(1280 - x, 20, this.nombreArmas[t2]).setScale(0.27).setOrigin(0.78, 0.28);
        this.armaY.body.setSize(150,150).setOffset(400,100);
    }

    crearArma(tipo,jugador)
    {
        if(jugador == 1) var balas = this.balas1;
        else if (jugador == 2) var balas = this.balas2;
        if(tipo.key == 'pistola')
        {
            var sonido = 'sonidoPistola' + jugador;
            var arma = new this.Arma(this,tipo.key,sonido,12,500,2000,20,balas); //20 dps
        }
        if(tipo.key == 'smg')
        {
            var sonido = 'sonidoSmg' + jugador;
            var arma = new this.Arma(this,tipo.key,sonido,28,100,1800,5,balas); // 50 dps
        }
        if(tipo.key == 'ar')
        {
            var sonido = 'sonidoAr' + jugador;
            var arma = new this.Arma(this,tipo.key,sonido,32,250,2600,15,balas); //40 dps
        }
        if(tipo.key == 'sniper')
        {
            var sonido = 'sonidoSniper' + jugador;
            var arma = new this.Arma(this,tipo.key,sonido,3,1500,3500,80,balas); //60 dps 
        }
        if(tipo.key == 'minigun')
        {
            var sonido = 'sonidoMinigun' + jugador;
            var arma = new this.Arma(this,tipo.key,sonido,100,50,6000,2,balas); // 40 dps
        }
        if(tipo.key == 'lanzacohetes')
        {
            var sonido = 'sonidoLanzacohetes' + jugador;
            var arma = new this.Arma(this,tipo.key,sonido,1,5000,5000,100,balas);
        }
        return arma;
    }
}