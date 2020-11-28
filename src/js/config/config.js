export default {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: "juego",

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    }
};