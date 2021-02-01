export default class Abandonado {
    constructor() {
      this._haAbandonado = false;
    }

    set haAbandonado(value) {
        this._haAbandonado = value;
    }

    get haAbandonado() {
        return this._haAbandonado;
    }
}