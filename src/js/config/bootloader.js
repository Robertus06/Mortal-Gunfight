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
            key: 'carga',
            frames: this.anims.generateFrameNumbers('cargando'),
            frameRate: 3,
            repeat: -1
        });

        this.textoCarga = this.add.sprite(30, 655, 'cargando').play('carga');
        this.textoCarga.setOrigin(0, 0.5);

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0xa7a7a7, 0.4);
        progressBox.fillRect(20, 680, 1240, 16);
        progressBox.setDepth(1);

        // var width = this.cameras.main.width;
        // var height = this.cameras.main.height;

        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.setDepth(2);
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
        this.load.image('fondoMenu', 'resources/img/fondoMenu.png');
        this.load.image('botonCreditos', 'resources/img/botonCreditos.png');
        this.load.image('creditos', 'resources/img/creditos.png');
        // this.load.image('botonSonido', 'resources/img/botonSonido.png');
        // this.load.image('botonMute', 'resources/img/botonMute.png');
        this.load.spritesheet('botonMusic', 'resources/img/botonMusic.png', { frameWidth: 66, frameHeight: 55 });
        this.load.image('controles', 'resources/img/controles.png');
        this.load.audio('musica', 'resources/music/backgroundMusic.mp3');
        this.load.image('personajes', 'resources/img/personajes.png');
        this.load.image('dinosaurio', 'resources/img/dinosaurio.png');
        this.load.image('aleatorio', 'resources/img/aleatorio.png');
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
        this.load.image('botonAleatorio', 'resources/img/botonAleatorio.png');
        this.load.image('nombreDinosaurio', 'resources/img/nombreDinosaurio.png');
        this.load.image('nombreZombie', 'resources/img/nombreZombie.png');
        this.load.image('nombreCiego', 'resources/img/nombreCiego.png');
        this.load.image('nombreNinja', 'resources/img/nombreNinja.png');
        this.load.image('nombreAleatorio', 'resources/img/nombreAleatorio.png');
        this.load.image('mapa', 'resources/img/mapa.png');
        this.load.image('botonTemplo', 'resources/img/botonTemplo.png');
        this.load.image('botonVolcan', 'resources/img/botonVolcan.png');
        this.load.image('botonCiudad', 'resources/img/botonCiudad.png');
        this.load.image('templo', 'resources/img/templo.png');
        this.load.image('temploSeleccion', 'resources/img/temploSeleccion.png');
        this.load.image('volcan', 'resources/img/volcan.png');
        this.load.image('ciudad', 'resources/img/ciudad.png');
        this.load.image('mapaAleatorio', 'resources/img/mapaAleatorio.png');
        this.load.image('nombreTemplo', 'resources/img/nombreTemplo.png');
        this.load.image('nombreCiudad', 'resources/img/nombreCiudad.png');
        this.load.image('nombreVolcan', 'resources/img/nombreVolcan.png');
        this.load.image('botonJugadorUno', 'resources/img/botonJugadorUno.png');
        this.load.image('botonJugadorDos', 'resources/img/botonJugadorDos.png');
        this.load.image('botonMapa', 'resources/img/botonMapa.png');
        this.load.image('botonMapaAleatorio', 'resources/img/botonMapaAleatorio.png');
        this.load.spritesheet('cuentaAtras', 'resources/img/cuentaAtras.png', { frameWidth: 258, frameHeight: 319 });
        this.load.image('preparatoria', 'resources/img/preparatoria.png');
        this.load.image('listo', 'resources/img/listo.png');
        this.load.image('temploBlur', 'resources/img/temploBlur.png');
        this.load.image('volcanBlur', 'resources/img/volcanBlur.png');
        this.load.image('ciudadBlur', 'resources/img/ciudadBlur.png');
        this.load.image('cohete', 'resources/img/cohete.png');
        this.load.image('bala', 'resources/img/bala.png');
        this.load.image('ar', 'resources/img/ar.png');
        // this.load.image('lanzacohetes0', 'resources/img/lanzacahotes0.png');
        // this.load.image('lanzacohetes1', 'resources/img/lanzacahotes1.png');
        this.load.spritesheet('lanzacohetes', 'resources/img/lanzacohetes.png', { frameWidth: 745, frameHeight: 273 });
        this.load.image('minigun', 'resources/img/minigun.png');
        this.load.image('pistola', 'resources/img/pistola.png');
        this.load.image('smg', 'resources/img/smg.png');
        this.load.image('sniper', 'resources/img/sniper.png');
        this.load.image('brazoPerro', 'resources/img/brazoPerro.png');
        this.load.image('brazoPerroRelax', 'resources/img/brazoPerroRelax.png');
        this.load.image('brazoDinosaurio', 'resources/img/brazoDinosaurio.png');
        this.load.image('brazoDinosaurioRelax', 'resources/img/brazoDinosaurioRelax.png');
        this.load.image('brazoNinja', 'resources/img/brazoNinja.png');
        this.load.image('brazoNinjaRelax', 'resources/img/brazoNinjaRelax.png');
        this.load.image('brazoZombie', 'resources/img/brazoZombie.png');
        this.load.image('spritePerro', 'resources/img/perroSprite.png');
        this.load.image('spriteCiego', 'resources/img/ciegoSprite.png');
        this.load.image('spriteCiegoReverse', 'resources/img/ciegoSpriteReverse.png');
        this.load.image('spriteDinosaurio', 'resources/img/dinosaurioSprite.png');
        this.load.image('spriteNinja', 'resources/img/ninjaSprite.png');
        this.load.image('spriteZombie', 'resources/img/zombieSprite.png');
        // this.load.image('victoriaUno', 'resources/img/victoriaUnoEstatica.png');
        this.load.spritesheet('victoriaUno', 'resources/img/victoriaUno.png', { frameWidth: 1280, frameHeight: 720 });
        // this.load.image('victoriaDos', 'resources/img/victoriaDosEstatica.png');
        this.load.spritesheet('victoriaDos', 'resources/img/victoriaDos.png', { frameWidth: 1280, frameHeight: 720 });
        this.load.image('final', 'resources/img/final.png');
        this.load.image('victoria', 'resources/img/victoria.png');
        this.load.image('derrota', 'resources/img/derrota.png');
        this.load.image('mismosPersonajes', 'resources/img/mismosPersonajes.png');
        this.load.image('cambiarPersonajes', 'resources/img/cambiarPersonajes.png');
        this.load.image('salirMenu', 'resources/img/salirMenu.png');
        this.load.image('continuarPartida', 'resources/img/continuarPartida.png');
        this.load.image('vs', 'resources/img/vs.png');
        this.load.audio('fraseCiego', 'resources/music/ciego.mp3');
        this.load.audio('fraseDinosaurio', 'resources/music/dinosaurio.mp3');
        this.load.audio('fraseNinja', 'resources/music/ninja.mp3');
        this.load.audio('fraseZombie', 'resources/music/zombie.mp3');
        this.load.audio('sonidoBoton', 'resources/music/boton.mp3');
        this.load.audio('sonidoAtras', 'resources/music/atras.mp3');
        this.load.audio('sonidoAr', 'resources/music/ar.mp3');
        this.load.audio('sonidoCohete', 'resources/music/cohete.mp3');
        this.load.audio('sonidoLanzacohetes', 'resources/music/lanzacohetes.mp3');
        this.load.audio('sonidoMinigun', 'resources/music/minigun.mp3');
        this.load.audio('sonidoMinigunDos', 'resources/music/minigunDos.mp3');
        this.load.audio('sonidoPistola', 'resources/music/pistola.mp3');
        this.load.audio('sonidoSmg', 'resources/music/smg.mp3');
        this.load.audio('sonidoSniper', 'resources/music/sniper.mp3');
        this.load.image('spriteSuelo','resources/img/suelo.png');
        this.load.image('plataforma', 'resources/img/plataforma.png');
        this.load.image('tejas', 'resources/img/tejas.png');
        this.load.image('pared', 'resources/img/pared.png');
        this.load.image('paloma', 'resources/img/paloma.png');
        this.load.image('cadenas', 'resources/img/cadenas.png');
        this.load.spritesheet('botones', 'resources/img/botonTiempo.png', { frameWidth: 139, frameHeight: 56 });

        // cortar sonidos
        // https://mp3cut.net/es/

        // alargar tiempo de espera...
        /**
        for (var i = 0; i < 20; i++) {
            this.load.audio('musica' + i, 'resources/music/cancionPrueba.mp3');
        }
        /**/

        this.input.on('pointerdown', function () {
            this.cameras.main.fadeOut(500);
        }.bind(this));

        this.cameras.main.once('camerafadeoutcomplete', function () {
            progressBar.destroy();
            progressBox.destroy();
            this.scene.start("SceneMenu");
        }.bind(this));
    }
}