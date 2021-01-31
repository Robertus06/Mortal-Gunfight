export default class Consulta{
    constructor() {
        this._jugadores = [];
        this._chat = [];
        this._ultConexion = Date.now();
        this._entrado = false;
        this._nombre;
    }
    
    set jugadores(value) {
        this._jugadores = value;
    }

    get jugadores() {
        return this._jugadores;
    }

    set chat(value) {
        this._chat = value;
    }

    get chat() {
        return this._chat;
    }

    set ultConexion(value) {
        this._ultConexion = value;
    }

    get ultConexion() {
        return this._ultConexion;
    }

    set entrado(value) {
        this._entrado = value;
    }

    get entrado() {
        return this._entrado;
    }

    set nombre(value) {
        this._nombre = value;
    }

    get nombre() {
        return this._nombre;
    }

    conectados(usuario) {
        $(document).ready(function(){
            $.ajax({
                url:'http://localhost:8080/connected/' + usuario
            }).done(function(data) {
                console.log(data);
                this.jugadores = data;

                this.ultConexion = Date.now();

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
                
                if (this.entrado) {
                    var pantalla = document.getElementById("conexion");
                    pantalla.style.visibility = "hidden";
                    
                    var estado = document.getElementById("estado");
                    estado.innerHTML = "EL SERVIDOR SE HA RECONECTADO CON ÉXITO";
                    setTimeout(function(){
                        estado.style.visibility = "hidden";
                    },5000);
                }
                this.entrado = false;

            }.bind(this));
        }.bind(this));

        if (Date.now() - this.ultConexion > 3000) {
            if (!this.entrado) {
                var pantalla = document.getElementById("conexion");
                pantalla.style.visibility = "visible";
                this.entrado = true;
            }
        }
    }

    chats() {
        $(document).ready(function(){
            $.ajax({
                url:'http://localhost:8080/chat'
            }).done(function(data) {
                console.log(data);
                this.chat = data;

                var element = document.getElementById("tablaChat");
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }

                for (var i = 0; i < this.chat.length; i++){
                    var newTr = document.createElement("tr");
                    newTr.setAttribute("id", "destruir");
                    var newContent = document.createElement("td")
                    newContent.setAttribute("class", "mensaje");
                    var newH6 = document.createElement("h6")
                    newH6.setAttribute("id", "jugador"+(i+1));
                    var newH5 = document.createElement("h5")
                    newH5.setAttribute("id", "mensaje"+(i+1));

                    newContent.appendChild(newH6);
                    newContent.appendChild(newH5);
                    newTr.appendChild(newContent);
                    
                    var tabla = document.getElementById("tablaChat");
                    tabla.appendChild(newTr);
    
                    var newJug = document.getElementById("jugador"+(i+1));
                    newJug.innerHTML = "" + this.chat[i].nombre + ":\n";
                    var newMessage = document.getElementById("mensaje"+(i+1));
                    newMessage.innerHTML = "" + this.chat[i].mensaje;
                }
            }.bind(this));
        }.bind(this));
    }
       
}
    

