export default class Puntos {
    constructor() {
      this._puntosJugadorUno = 0;
      this._puntosJugadorDos = 0;
    }

    set puntosJugadorUno(value) {
        this._puntosJugadorUno = value;
    }

    get puntosJugadorUno() {
        return this._puntosJugadorUno;
    }

    set puntosJugadorDos(value) {
        this._puntosJugadorDos = value;
    }

    get puntosJugadorDos() {
        return this._puntosJugadorDos;
    }
}