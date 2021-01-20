export default class Transicion {
    constructor() {
      this._cancelarSeleccion = false;
    }

    set cancelarSeleccion(value) {
        this._cancelarSeleccion = value;
    }

    get cancelarSeleccion() {
        return this._cancelarSeleccion;
    }
}