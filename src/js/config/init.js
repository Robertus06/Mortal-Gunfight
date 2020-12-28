import config from '/src/js/config/config.js'
import BootScene from '/src/js/config/bootScene.js';
import Bootloader from '/src/js/config/bootloader.js';
import SceneMenu from '/src/js/scenes/sceneMenu.js';
import SceneCreditos from '/src/js/scenes/sceneCreditos.js';
import SceneControles from '/src/js/scenes/sceneControles.js';
import ScenePersonajeUno from '/src/js/scenes/scenePersonajeUno.js';
import ScenePersonajeDos from '/src/js/scenes/scenePersonajeDos.js';
import SceneMapa from '/src/js/scenes/sceneMapa.js';
import ScenePreparatoria from '/src/js/scenes/scenePreparatoria.js';
import SceneJuego from '/src/js/scenes/sceneJuego.js';
import ScenePausa from '/src/js/scenes/scenePausa.js';
import SceneFinal from '/src/js/scenes/sceneFinal.js';

import Sonido from '/src/js/component/sonido.js';
import Personaje from '/src/js/component/personaje.js';
import Mapa from '/src/js/component/mapa.js';
import Transicion from '/src/js/component/transicion.js';
import Tiempo from '/src/js/component/tiempo.js';
import Puntos from '/src/js/component/puntos.js';

class Game extends Phaser.Game {
    constructor() {
        super(config);

        const sonido = new Sonido();
        this.globalsSonido = { sonido, music: null };

        const personaje = new Personaje();
        this.globalsPersonaje = { personaje };

        const mapa = new Mapa();
        this.globalsMapa = { mapa };

        const transicion = new Transicion();
        this.globalsTransicion = { transicion };

        const tiempo = new Tiempo();
        this.globalsTiempo = { tiempo };

        const puntos = new Puntos();
        this.globalsPuntos = { puntos };

        this.scene.add('BootScene', BootScene);
        this.scene.add('Bootloader', Bootloader);
        this.scene.add('SceneMenu', SceneMenu);
        this.scene.add('SceneCreditos', SceneCreditos);
        this.scene.add('SceneControles', SceneControles);
        this.scene.add('ScenePersonajeUno', ScenePersonajeUno);
        this.scene.add('ScenePersonajeDos', ScenePersonajeDos);
        this.scene.add('SceneMapa', SceneMapa);
        this.scene.add('ScenePreparatoria', ScenePreparatoria);
        this.scene.add('SceneJuego', SceneJuego);
        this.scene.add('ScenePausa', ScenePausa);
        this.scene.add('SceneFinal', SceneFinal);

        this.scene.start('BootScene');
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
/* https://www.youtube.com/watch?v=jh4Jqb4wSHc&list=PLGy53JXEnxNYqR8DqITaFmDU1v9g6dYz6 */
/*                                                                                     */
/* ----------------------------------------------------------------------------------- */