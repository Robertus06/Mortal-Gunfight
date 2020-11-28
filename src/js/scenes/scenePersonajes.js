export default class ScenePersonajes extends Phaser.Scene {
    constructor() {
        super({key: "ScenePersonajes"});
    }

    create() {
        this.fondo = this.add.image(640, 360, 'inicio');

        this.model = this.sys.game.globals.model;

        this.bSonido = this.add.sprite(1240, 30, 'botonMusic').setInteractive();

        this.bSonido.on('pointerdown', function(){
            this.model.musicOn = !this.model.musicOn;
            this.updateAudio();
        }.bind(this));

        this.updateAudio();

        this.input.on('pointerover', function(event, gameObjects){
            gameObjects[0].setScale(1.15);
        }.bind(this));
        this.input.on('pointerout', function(event, gameObjects){
            gameObjects[0].setScale(1);
        }.bind(this));

        this.cursor_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
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

    update() {
        if (this.cursor_ESC.isDown) {
            this.scene.start("SceneMenu");
        }
    }
}