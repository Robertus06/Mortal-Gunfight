export default class Bootloader extends Phaser.Scene {
    constructor() {
        super({key: "Bootloader"});
    }
    

    preload() {
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(280, 330, 720, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 60,
            text: 'Cargando el Juego',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        var completeText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        completeText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(290, 340, 700 * value, 30);
        });
        
        this.load.on('complete', function () {
            loadingText.text = 'Juego Cargado con Exito!';
            completeText.text = 'Clica en cualquier sitio para jugar';
        });

        this.load.image('inicio', 'resources/img/inicio.png');
        this.load.image('botonControles', 'resources/img/botonControles.png');
        this.load.image('botonJugar', 'resources/img/botonJugar.png');
        this.load.image('botonSonido', 'resources/img/botonSonido.png');
        this.load.image('botonMute', 'resources/img/botonMute.png');
        this.load.spritesheet('botonMusic', 'resources/img/botonMusic.png', {frameWidth:66, frameHeight:55});
        this.load.image('controles', 'resources/img/controles.png');
        this.load.audio('musica', 'resources/music/cancionPrueba.mp3');

        this.input.on('pointerdown', function(){
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            completeText.destroy();
            percentText.destroy();
               
            this.scene.start("SceneMenu");
        }.bind(this));
    }
}