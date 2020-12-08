export default class Bootloader extends Phaser.Scene {
    constructor() {
        super({ key: "Bootloader" });
    }

    preload() {
        this.cameras.main.setBackgroundColor('#e2e2e2');

        this.fondo = this.add.image(640, 360, 'inicio');
        this.fondo.setAlpha(0.4);

        this.logo = this.add.image(640, 360, 'logo');
        this.logo.setScale(0.8);

        this.anims.create({
            key: 'hola',
            frames: this.anims.generateFrameNumbers('cargando'),
            frameRate: 3,
            repeat: -1
        });

        this.textoCarga = this.add.sprite(30, 655, 'cargando').play('hola');
        this.textoCarga.setOrigin(0, 0.5);

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0xa7a7a7, 0.4);
        progressBox.fillRect(20, 680, 1240, 16);

        // var width = this.cameras.main.width;
        // var height = this.cameras.main.height;

        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xff9900, 1);
            progressBar.fillRect(25, 685, 1230 * value, 8);
        });

        this.load.on('complete', function () {
            this.textoCarga.destroy();
            this.textoCarga = this.add.image(30, 655, 'cargado');
            this.textoCarga.setOrigin(0, 0.5);
        }.bind(this));

        this.load.image('botonControles', 'resources/img/botonControles.png');
        this.load.image('botonJugar', 'resources/img/botonJugar.png');
        // this.load.image('botonSonido', 'resources/img/botonSonido.png');
        // this.load.image('botonMute', 'resources/img/botonMute.png');
        this.load.spritesheet('botonMusic', 'resources/img/botonMusic.png', { frameWidth: 66, frameHeight: 55 });
        this.load.image('controles', 'resources/img/controles.png');
        this.load.audio('musica', 'resources/music/cancionPrueba.mp3');
        this.load.image('personajes', 'resources/img/personajes.png');
        this.load.image('dinosaurio', 'resources/img/dinosaurio.png');
        this.load.image('zombie', 'resources/img/zombie.png');
        this.load.image('ciego', 'resources/img/ciego.png');
        this.load.image('ninja', 'resources/img/ninja.png');
        // this.load.image('botonDinosaurio', 'resources/img/botonDinosaurio.png');
        // this.load.image('botonDinosaurioPulsado', 'resources/img/botonDinosaurioPulsado.png');
        this.load.spritesheet('botonesDinosaurio', 'resources/img/botonesDinosaurio.png', { frameWidth: 121, frameHeight: 107 });
        // this.load.image('botonZombie', 'resources/img/botonZombie.png');
        // this.load.image('botonZombiePulsado', 'resources/img/botonZombiePulsado.png');
        this.load.spritesheet('botonesZombie', 'resources/img/botonesZombie.png', { frameWidth: 121, frameHeight: 107 });
        // this.load.image('botonCiego', 'resources/img/botonCiego.png');
        // this.load.image('botonCiegoPulsado', 'resources/img/botonCiegoPulsado.png');
        this.load.spritesheet('botonesCiego', 'resources/img/botonesCiego.png', { frameWidth: 121, frameHeight: 107 });
        // this.load.image('botonNinja', 'resources/img/botonNinja.png');
        // this.load.image('botonNinjaPulsado', 'resources/img/botonNinjaPulsado.png');
        this.load.spritesheet('botonesNinja', 'resources/img/botonesNinja.png', { frameWidth: 121, frameHeight: 107 });
        this.load.image('nombreDinosaurio', 'resources/img/nombreDinosaurio.png');
        this.load.image('nombreZombie', 'resources/img/nombreZombie.png');
        this.load.image('nombreCiego', 'resources/img/nombreCiego.png');
        this.load.image('nombreNinja', 'resources/img/nombreNinja.png');
        this.load.image('mapa', 'resources/img/mapa.png');
        this.load.image('botonTemplo', 'resources/img/botonTemplo.png');
        this.load.image('botonVolcan', 'resources/img/botonVolcan.png');
        this.load.image('botonCiudad', 'resources/img/botonCiudad.png');
        this.load.image('templo', 'resources/img/templo.png');
        this.load.image('volcan', 'resources/img/volcan.png');
        this.load.image('ciudad', 'resources/img/ciudad.png');
        this.load.image('nombreTemplo', 'resources/img/nombreTemplo.png');
        this.load.image('nombreCiudad', 'resources/img/nombreCiudad.png');
        this.load.image('nombreVolcan', 'resources/img/nombreVolcan.png');

        // alargar tiempo de espera...
        /**
        for (var i = 0; i < 20; i++) {
            this.load.audio('musica' + i, 'resources/music/cancionPrueba.mp3');
        }
        /**/

        this.input.on('pointerdown', function () {
            progressBar.destroy();
            progressBox.destroy();

            this.scene.start("SceneMenu");
        }.bind(this));
    }
}