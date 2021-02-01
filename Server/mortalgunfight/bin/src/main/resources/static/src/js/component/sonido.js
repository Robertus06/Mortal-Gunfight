export default class Sonido {
    constructor() {
        this._musicOn = true;
        this._bgMusicPlaying = false;
    }

    set musicOn(value) {
        this._musicOn = value;
    }

    get musicOn() {
        return this._musicOn;
    }

    set bgMusicPlaying(value) {
        this._bgMusicPlaying = value;
    }

    get bgMusicPlaying() {
        return this._bgMusicPlaying;
    }
}