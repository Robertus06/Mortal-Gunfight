export default class Bootloader extends Phaser.Scene {
    constructor() {
        super({ key: "Bootloader" });
    }

    preload() {        
        this.cameras.main.setBackgroundColor('#e2e2e2');

        this.fondo = this.add.image(640, 360, 'inicio');
        this.fondo.setAlpha(0.4);

        this.logo = this.add.image(640, 360, 'logo');
        this.logo.setScale(0.8, 0.77);
        /**/
        this.anims.create({
            key: 'carga',
            frames: this.anims.generateFrameNumbers('cargando'),
            frameRate: 3,
            repeat: -1
        });
        /**/
        this.start = false;
        this.startCd = false;
        this.timeAux = 0;
        this.cd = 0;

        this.textoCarga = this.add.sprite(30, 655, 'cargando').play('carga');
        this.textoCarga.setOrigin(0, 0.5);

        this.progressBarAux = this.add.graphics();
        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0xa7a7a7, 0.4);
        this.progressBox.fillRect(20, 680, 1240, 16);
        this.progressBox.setDepth(1);

        // var width = this.cameras.main.width;
        // var height = this.cameras.main.height;

        this.load.on('progress', function (value) {
            this.progressBar.clear();
            this.progressBar.setDepth(2);
            this.progressBar.fillStyle(0xff9900, 1);
            this.progressBar.fillRect(25, 685, 1000 * value, 8);
        }.bind(this));

        this.load.on('complete', function () {
            this.start = true;
            this.startCd = true;
        }.bind(this));

        this.load.image('inicio', 'resources/img/inicio.png');
        this.load.image('fondoControles', 'resources/img/fondoControles.png');
        this.load.image('botonControles', 'resources/img/botonControles.png');
        this.load.image('botonControlesLocal', 'resources/img/botonControlesLocal.png');
        this.load.image('botonControlesLinea', 'resources/img/botonControlesLinea.png');
        this.load.image('botonLocal', 'resources/img/botonLocal.png');
        this.load.image('botonJugar', 'resources/img/botonJugar.png');
        this.load.image('fondoMenu', 'resources/img/fondoMenu.png');
        this.load.image('botonCreditos', 'resources/img/botonCreditos.png');
        this.load.image('creditos', 'resources/img/creditos.png');
        // this.load.image('botonSonido', 'resources/img/botonSonido.png');
        // this.load.image('botonMute', 'resources/img/botonMute.png');
        this.load.spritesheet('botonMusic', 'resources/img/botonMusic.png', { frameWidth: 66, frameHeight: 55 });
        this.load.image('controles', 'resources/img/controles.png');
        this.load.image('controlesLinea', 'resources/img/controlesLinea.png');
        this.load.spritesheet('buscando', 'resources/img/buscandoAnimado.png', { frameWidth: 114, frameHeight: 35 });
        this.load.image('buscandoText', 'resources/img/buscandoText.png');
        this.load.image('encontradoText', 'resources/img/encontradoText.png');
        this.load.image('enCurso', 'resources/img/enCurso.png');
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
        this.load.image('mapaEnemigo', 'resources/img/mapaEnemigo.png');
        this.load.image('botonTemplo', 'resources/img/botonTemplo.png');
        this.load.image('botonVolcan', 'resources/img/botonVolcan.png');
        this.load.image('botonCiudad', 'resources/img/botonCiudad.png');
        this.load.image('templo', 'resources/img/templo.png');
        this.load.image('temploSeleccion', 'resources/img/temploSeleccion.png');
        this.load.image('ciudadSeleccion', 'resources/img/ciudadSeleccion.png');
        this.load.image('volcanSeleccion', 'resources/img/volcanSeleccion.png');
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
        this.load.image('preparatoriaOnline', 'resources/img/preparatoriaOnline.png');
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
        this.load.audio('sonidoAr1', 'resources/music/ar1.mp3');
        this.load.audio('sonidoAr2', 'resources/music/ar2.mp3');
        this.load.audio('sonidoCohete1', 'resources/music/cohete1.mp3');
        this.load.audio('sonidoCohete2', 'resources/music/cohete2.mp3');
        this.load.audio('sonidoLanzacohetes1', 'resources/music/lanzacohetes1.mp3');
        this.load.audio('sonidoLanzacohetes2', 'resources/music/lanzacohetes2.mp3');
        this.load.audio('sonidoMinigun1', 'resources/music/minigun1.mp3');
        this.load.audio('sonidoMinigun2', 'resources/music/minigun2.mp3');
        this.load.audio('sonidoMinigunDos1', 'resources/music/minigunDos1.mp3');
        this.load.audio('sonidoMinigunDos2', 'resources/music/minigunDos2.mp3');
        this.load.audio('sonidoPistola1', 'resources/music/pistola1.mp3');
        this.load.audio('sonidoPistola2', 'resources/music/pistola2.mp3');
        this.load.audio('viento1', 'resources/music/viento1.mp3');
        this.load.audio('viento2', 'resources/music/viento2.mp3');
        this.load.audio('sonidoSmg1', 'resources/music/smg1.mp3');
        this.load.audio('sonidoSmg2', 'resources/music/smg2.mp3');
        this.load.audio('sonidoSniper1', 'resources/music/sniper1.mp3');
        this.load.audio('sonidoSniper2', 'resources/music/sniper2.mp3');
        this.load.image('spriteSuelo','resources/img/suelo.png');
        this.load.image('spriteSuelo2','resources/img/suelo2.png');
        this.load.image('spriteSuelo3','resources/img/suelo3.png');
        this.load.image('plataforma', 'resources/img/plataforma.png');
        this.load.image('tejas', 'resources/img/tejas.png');
        this.load.image('pale', 'resources/img/pale.png');
        this.load.image('rocas', 'resources/img/rocas.png');
        this.load.image('pared', 'resources/img/pared.png');
        this.load.image('humo', 'resources/img/humo.png');
        this.load.image('techo', 'resources/img/techo.png');
        this.load.image('salto', 'resources/img/salto.png');
        this.load.image('salto2', 'resources/img/salto2.png');
        this.load.image('pared2', 'resources/img/pared2.png');
        this.load.image('pared3', 'resources/img/pared3.png');
        this.load.image('paloma', 'resources/img/paloma.png');
        this.load.image('cadenas', 'resources/img/cadenas.png');
        this.load.image('cuerda', 'resources/img/cuerda.png');
        this.load.spritesheet('botones', 'resources/img/botonTiempo.png', { frameWidth: 139, frameHeight: 56 });

        // cortar sonidos
        // https://mp3cut.net/es/

        // alargar tiempo de espera...
        /**
        for (var i = 0; i < 20; i++) {
            this.load.audio('musica' + i, 'resources/music/cancionPrueba.mp3');
        }
        /**/

        this.cameras.main.once('camerafadeoutcomplete', function () {
            this.progressBar.destroy();
            this.progressBox.destroy();
            this.scene.start("SceneMenu");
        }.bind(this));
    }

    update(time) {
        if (this.start) {
            this.cd = time + 3000;
            this.start = false;

            this.timeAux = time;
        }

        if (this.cd > time && this.startCd) {
            this.progressBarAux.setDepth(2);
            this.progressBarAux.fillStyle(0xff9900, 1);
            this.progressBarAux.fillRect(25, 685, 1000, 8)

            this.progressBar.clear();
            this.progressBar.setDepth(2);
            this.progressBar.fillStyle(0xff9900, 1);
            this.progressBar.fillRect(1025, 685, 230 *Phaser.Math.Clamp((time-this.timeAux)/3000,0,1), 8);
        }

        if (this.cd < time && !this.start) {
            this.textoCarga.destroy();
            this.textoCarga = this.add.image(30, 655, 'cargado');
            this.textoCarga.setOrigin(0, 0.5);

            this.input.on('pointerdown', function () {
                this.cameras.main.fadeOut(500);
            }.bind(this));
        }
    }
}