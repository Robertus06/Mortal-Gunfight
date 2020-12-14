export default class Personaje {
    constructor() {
      this._jugadorUno = null;
      this._jugadorDos = null;
      this._ganador = null;
    }

    set jugadorUno(value) {
        this._jugadorUno = value;
    }

    get jugadorUno() {
        return this._jugadorUno;
    }
     
    set jugadorDos(value) {
        this._jugadorDos = value;
    }
     
    get jugadorDos() {
        return this._jugadorDos;
    }

    set ganador(value) {
        this._ganador = value;
    }

    get ganador() {
        return this._ganador;
    }
}

/* ----------------- */
/* 'd' -> Dinosaurio */
/* 'c' -> Ciego      */
/* 'z' -> Zombie     */
/* 'n' -> Ninja      */
/*                   */
/* '1' -> Ganador 1  */
/* '2' -> Ganador 2  */
/* ----------------- */