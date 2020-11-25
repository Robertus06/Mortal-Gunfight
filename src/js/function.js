var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: "juego",

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    //Alo
    this.load.image('inicio', 'resources/img/inicio.png');
    this.load.image('botonControles', 'resources/img/botonControles.png');
    this.load.image('botonJugar', 'resources/img/botonJugar.png');
    this.load.image('botonSonido', 'resources/img/botonSonido.png');
    this.load.image('botonMute', 'resources/img/botonMute.png');
    this.load.spritesheet('botonMusic', 'resources/img/botonMusic.png', {frameWidth:66, frameHeight:55});
    this.load.image('controles', 'resources/img/controles.png');
}

function create ()
{
    var fondo = this.add.image(640, 360, 'inicio');

    var bJugar = this.add.sprite(640, 500, 'botonJugar').setInteractive();
    var bControles = this.add.sprite(640, 630, 'botonControles').setInteractive();
    //var bSonido = this.add.sprite(1240, 30, 'botonSonido').setInteractive();
    var bSonido = this.add.sprite(1240, 30, 'botonMusic').setInteractive();

    bJugar.on('pointerover', function(pointer){
        bJugar.setScale(1.15);
    })
    bJugar.on('pointerout', function(pointer){
        bJugar.setScale(1);
    })

    bControles.on('pointerover', function(pointer){
        bControles.setScale(1.2);
    })
    bControles.on('pointerout', function(pointer){
        bControles.setScale(1);
    })

    bSonido.on('pointerover', function(pointer){
        //bSonido.setTexture('botonMute');
        bSonido.setFrame(1);
    })
    bSonido.on('pointerout', function(pointer){
        //bSonido.setTexture('botonSonido');
        bSonido.setFrame(0);
    })
}

function update ()
{

}