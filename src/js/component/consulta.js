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

                var numJugadores = document.getElementById("contador");
                numJugadores.innerHTML = "(" + this.jugadores.length + ")"

                var element = document.getElementById("tablaJugadores");
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }

                for (var i = 0; i < this.jugadores.length; i++){
                    var newTr = document.createElement("tr");
                    newTr.setAttribute("id", "destruir");
                    var newContent = document.createElement("td")
                    newContent.setAttribute("class", "jugador");
                    var newH3 = document.createElement("h3")
                    newH3.setAttribute("id", i+1);

                    newContent.appendChild(newH3);
                    newTr.appendChild(newContent);
                    
                    var tabla = document.getElementById("tablaJugadores");
                    tabla.appendChild(newTr);
    
                    var newUser = document.getElementById(i+1);
                    newUser.innerHTML = "" + this.jugadores[i];
                }

            }.bind(this));
        }.bind(this));
    }
       
}
    

