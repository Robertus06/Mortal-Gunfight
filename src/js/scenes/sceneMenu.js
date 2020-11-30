export default class SceneMenu extends Phaser.Scene {
    constructor() {
        super({key: "SceneMenu"});
    }

    create() {
        this.fondo = this.add.image(640, 360, 'inicio');
        
        this.model = this.sys.game.globals.model;
        if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
            this.music = this.sound.add('musica', {loop: true});
            this.music.play();
            this.model.bgMusicPlaying = true;
            this.sys.game.globals.music = this.music;
        }
        
        // Para que la música no pare si clicamos fuera de la pantalla de google
        this.sound.pauseOnBlur = false;

        this.bSonido = this.add.sprite(1240, 30, 'botonMusic', 0).setInteractive();

        this.bSonido.on('pointerdown', function(){
            this.model.musicOn = !this.model.musicOn;
            this.updateAudio();
        }.bind(this));

        this.updateAudio();

        this.bJugar = this.add.sprite(640, 500, 'botonJugar').setInteractive();
        this.bControles = this.add.sprite(640, 630, 'botonControles').setInteractive();

        // Clic botón controles
        this.bControles.on('pointerdown', function(){
            this.scene.start("SceneControles");
        }.bind(this));

        // Clic botón jugar
        this.bJugar.on('pointerdown', function(){
            this.scene.start("ScenePersonajes");
        }.bind(this));

        // Zoom en botones cuando pasas por encima
        this.input.on('pointerover', function(event, gameObjects){
            gameObjects[0].setScale(1.15);
        }.bind(this));
        this.input.on('pointerout', function(event, gameObjects){
            gameObjects[0].setScale(1);
        }.bind(this));
    }

    updateAudio() {
        if (this.model.musicOn === false) {
            this.bSonido.setFrame(1);
            this.sys.game.globals.music.pause();
        } else {
            this.bSonido.setFrame(0);
            this.sys.game.globals.music.resume();
        }
    }
}