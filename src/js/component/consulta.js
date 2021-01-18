export default class Consulta{
    constructor() {
        this._jugadores = [];
    }
    
    set jugadores(value) {
        this._jugadores = value;
    }

    get jugadores() {
        return this._jugadores;
    }

    conectados(usuario) {
        $(document).ready(function(){
            $.ajax({
                url:'http://localhost:8080/connected/' + usuario
            }).done(function(data) {
                console.log(data);
                this.jugadores = data;
            }.bind(this));
        }.bind(this));
    }
       
}
    

