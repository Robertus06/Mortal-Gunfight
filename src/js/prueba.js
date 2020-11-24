var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },

    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('prueba', 'resources/img/controles.png');
}

function create ()
{
    var imagenPrueba = this.add.image(640, 360, 'prueba');
    //imagenPrueba.setScale(0.5);
    
    /**
    var particles = this.add.particles('prueba');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    var logo = this.physics.add.image(960, 540, 'prueba');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
    /**/
}
