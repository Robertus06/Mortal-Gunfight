export default {
    type: Phaser.AUTO,
    parent: "juego",
    
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720,
    },

    dom: {
        createContainer: true
    },

    audio: {
        disableWebAudio: true
    },

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    }
};

// personajes
    // .setScale(0.27);
    // .setOrigin(0.72, 0.53);

// brazo
    // .setScale(0.27);
    // .setOrigin(0.61, 0.33);

// arma
    // .setScale(0.27);
    // .setOrigin(0.78, 0.28);