export default class Mapa {
    constructor() {
      this._escenario = null;
    }

    set escenario(value) {
        this._escenario = value;
    }

    get escenario() {
        return this._escenario;
    }
}

/* ----------------- */
/* 'v' -> Volcán     */
/* 'c' -> Ciudad     */
/* 't' -> Templo     */
/* ----------------- */