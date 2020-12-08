export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: "BootScene" });
    }

    preload() {
        this.load.image('logo', 'resources/img/Icono.png')
        this.load.image('inicio', 'resources/img/inicio.png');
        this.load.spritesheet('cargando', 'resources/img/cargandoAnimado.png', { frameWidth: 212, frameHeight: 58 });
        this.load.image('cargado', 'resources/img/cargadoLargo.png');
    }

    create() {
        this.scene.start('Bootloader');
    }
}