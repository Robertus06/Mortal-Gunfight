export default class JugadoresOnline {
    constructor() {
      this._jugYo = null;
      this._jugEnemi = null;
    }

    set jugYo(value) {
        this._jugYo = value;
    }

    get jugYo() {
        return this._jugYo;
    }
     
    set jugEnemi(value) {
        this._jugEnemi = value;
    }
     
    get jugEnemi() {
        return this._jugEnemi;
    }
}