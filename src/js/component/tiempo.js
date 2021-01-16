export default class Tiempo {
    constructor() {
      this._tiempoJuego = 120000;
    }

    set tiempoJuego(value) {
        this._tiempoJuego = value;
    }

    get tiempoJuego() {
        return this._tiempoJuego;
    }
}