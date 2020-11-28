import config from '/src/js/config/config.js'
import Bootloader from '/src/js/config/bootloader.js';
import SceneMenu from '/src/js/scenes/sceneMenu.js';
import SceneControles from '/src/js/scenes/sceneControles.js';
import ScenePersonajes from '/src/js/scenes/scenePersonajes.js';

import Model from '/src/js/component/model.js';

class Game extends Phaser.Game {
    constructor() {
        super(config);

        const model = new Model();
        this.globals = { model, music: null };

        this.scene.add('Bootloader', Bootloader);
        this.scene.add('SceneMenu', SceneMenu);
        this.scene.add('SceneControles', SceneControles);
        this.scene.add('ScenePersonajes', ScenePersonajes);

        this.scene.start('Bootloader');
    }
}

window.game = new Game();

/* ------------------------------- Tutoriales Phaser 3 ------------------------------- */
/*                                                                                     */
/* Barra de progreso durante la carga de objetos:                                      */
/* https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/?a=13           */
/*                                                                                     */
/* Hilo Tutorial creación de un videojuego (incluye sonido background):                */
/* https://phasertutorials.com/creating-a-phaser-3-template-part-1/                    */
/*                                                                                     */
/* Creación de escenas y botones:                                                      */
/* https://desarrolloweb.com/articulos/escenas-juegos-phaser                           */
/*                                                                                     */
/* Lista de reproducción explicando phaser 3 desde cero:                               */
/* https://www.youtube.com/watch?v=4RaN4g9KzDo&list=PLL_H5w4KA8dP9pPayzYxHCD4IQ80nkfY9 */
/*                                                                                     */
/* ----------------------------------------------------------------------------------- */