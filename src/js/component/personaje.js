export default class Personaje {
    constructor() {
      this._jugadorUno = null;
      this._jugadorDos = null;
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
}

/* ----------------- */
/* 'd' -> Dinosaurio */
/* 'c' -> Ciego      */
/* 'z' -> Zombie     */
/* 'n' -> Ninja      */
/* ----------------- */