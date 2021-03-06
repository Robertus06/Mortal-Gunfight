import config from '/src/js/config/config.js'
import BootScene from '/src/js/config/bootscene.js';
import Bootloader from '/src/js/config/bootloader.js';
import SceneMenu from '/src/js/scenes/sceneMenu.js';
import SceneCreditos from '/src/js/scenes/sceneCreditos.js';
import SceneControles from '/src/js/scenes/sceneControles.js';
import SceneControlesLinea from '/src/js/scenes/sceneControlesLinea.js';
import SceneMenuControles from '/src/js/scenes/sceneMenuControles.js';
import SceneEspera from '/src/js/scenes/sceneEspera.js';
import ScenePersonajeUno from '/src/js/scenes/scenePersonajeUno.js';
import ScenePersonajeOnline from '/src/js/scenes/scenePersonajeOnline.js';
import ScenePersonajeDos from '/src/js/scenes/scenePersonajeDos.js';
import SceneMapa from '/src/js/scenes/sceneMapa.js';
import SceneMapaOnline from '/src/js/scenes/sceneMapaOnline.js';
import ScenePreparatoria from '/src/js/scenes/scenePreparatoria.js';
import ScenePreparatoriaOnline from '/src/js/scenes/scenePreparatoriaOnline.js';
import SceneJuego from '/src/js/scenes/sceneJuego.js';
import SceneJuegoOnline from '/src/js/scenes/sceneJuegoOnline.js';
import ScenePausa from '/src/js/scenes/scenePausa.js';
import SceneFinal from '/src/js/scenes/sceneFinal.js';
import SceneFinalOnline from '/src/js/scenes/sceneFinalOnline.js';

import Sonido from '/src/js/component/sonido.js';
import Personaje from '/src/js/component/personaje.js';
import JugadoresOnline from '/src/js/component/jugadoresOnline.js';
import Mapa from '/src/js/component/mapa.js';
import Transicion from '/src/js/component/transicion.js';
import Tiempo from '/src/js/component/tiempo.js';
import Puntos from '/src/js/component/puntos.js';
import Consulta from '/src/js/component/consulta.js';
import Abandonado from '/src/js/component/abandonado.js';


class Game extends Phaser.Game {
    constructor() {
        super(config);

        this.mensaje = null;

        this.connection = new WebSocket('ws://localhost:8080/servidor');

        this.connection.onopen = function () {
            console.log('Comunicación con el servidor establecida con éxito');
        }
        this.connection.onerror = function (e) {
            console.log("WS error: " + e);
        }
        this.connection.onmessage = function(msg) {
            this.mensaje =  JSON.parse(msg.data);
        }.bind(this)

        const sonido = new Sonido();
        this.globalsSonido = { sonido, music: null };

        const personaje = new Personaje();
        this.globalsPersonaje = { personaje };

        const jugadores = new JugadoresOnline();
        this.globalsJugadores = { jugadores };

        const mapa = new Mapa();
        this.globalsMapa = { mapa };

        const transicion = new Transicion();
        this.globalsTransicion = { transicion };

        const tiempo = new Tiempo();
        this.globalsTiempo = { tiempo };

        const puntos = new Puntos();
        this.globalsPuntos = { puntos };

        const consulta = new Consulta();
        this.globalsConsulta = { consulta };

        const abandonado = new Abandonado();
        this.globalsAbandonado = { abandonado };

        this.scene.add('BootScene', BootScene);
        this.scene.add('Bootloader', Bootloader);
        this.scene.add('SceneMenu', SceneMenu);
        this.scene.add('SceneCreditos', SceneCreditos);
        this.scene.add('SceneControles', SceneControles);
        this.scene.add('SceneControlesLinea', SceneControlesLinea);
        this.scene.add('SceneMenuControles', SceneMenuControles);
        this.scene.add('SceneEspera', SceneEspera);
        this.scene.add('ScenePersonajeUno', ScenePersonajeUno);
        this.scene.add('ScenePersonajeOnline', ScenePersonajeOnline);
        this.scene.add('ScenePersonajeDos', ScenePersonajeDos);
        this.scene.add('SceneMapa', SceneMapa);
        this.scene.add('SceneMapaOnline', SceneMapaOnline);
        this.scene.add('ScenePreparatoria', ScenePreparatoria);
        this.scene.add('ScenePreparatoriaOnline', ScenePreparatoriaOnline);
        this.scene.add('SceneJuego', SceneJuego);
        this.scene.add('SceneJuegoOnline', SceneJuegoOnline);
        this.scene.add('ScenePausa', ScenePausa);
        this.scene.add('SceneFinal', SceneFinal);
        this.scene.add('SceneFinalOnline', SceneFinalOnline);

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