
export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: "BootScene" });
    }

    preload() {
        this.load.html('nameform', 'src/html/loginform.html');
        this.load.image('logo', 'resources/img/Icono.png');
        this.load.image('inicio', 'resources/img/inicio.png');
        this.load.spritesheet('cargando', 'resources/img/cargandoAnimado.png', { frameWidth: 212, frameHeight: 58 });
        this.load.image('cargado', 'resources/img/cargadoLargo.png');
    }

    create() {
        this.consulta = this.sys.game.globalsConsulta.consulta;
        this.cameras.main.setBackgroundColor('#e2e2e2');

        this.fondo = this.add.image(640, 360, 'inicio');
        this.fondo.setAlpha(0.4);
        
        this.logo = this.add.image(640, 360, 'logo');
        this.logo.setScale(0.8, 0.77);
        
        this.element = this.add.dom(759, 267).createFromCache('nameform');
        //this.element = this.add.dom(640, 360).createFromCache('nameform');

        this.element.addListener('click');

        document.getElementById('username').addEventListener('keydown', sendForm);
        document.getElementById('password').addEventListener('keydown', sendForm);
        function sendForm(event) {
 
            if (event.keyCode == 13) {
                $("#login").trigger("click");
            }
          
        }
        document.getElementById('chatbar').addEventListener('keydown', sendChat);
        function sendChat(event) {
 
            if (event.keyCode == 13) {
                $("#enviar").trigger("click");
            }
        
        }

        function sendMessage(e,scene) {
            if (e.target.name === 'botonEnviar') {
                var messageText = document.getElementById("chatbar").value;

                if (messageText !== ""){
                    $(document).ready(function(){
                        $.ajax({
                            type: "POST",
                            url: 'http://localhost:8080/chat',
                            data: JSON.stringify({
                                nombre : scene.consulta.nombre,
                                mensaje : messageText,
                            }),
                            headers: {
                                'Accept' : 'application/json',
                                'Content-Type' : 'application/json'
                            },
                            success : function(data) {
                                scene.consulta.chats();
                            }
                        });
                    }.bind(this));
        
                    document.getElementById("chatbar").value = "";

                    setTimeout(function(){
                        var objDiv = document.getElementById("online2");
                        objDiv.scrollTop = objDiv.scrollHeight;
                    },1000);
                }
            }
        }

        document.getElementById('enviar').addEventListener('click', function() {sendMessage(event,this);}.bind(this));

        this.element.on('click', function (event) {
            if (event.target.name === 'loginButton') {
                var inputUsername = this.element.getChildByName('username');
                var inputPassword = this.element.getChildByName('password');
                
                var playerData = null;

                $(document).ready(function(){
                    $.ajax({
                        url: 'http://localhost:8080/logins/' + inputUsername.value
                    }).done(function(data) {
                        playerData = data;

                        if (inputUsername.value === playerData.usuario && inputPassword.value === playerData.contraseña) {
                            this.element.removeListener('click');
                            this.consulta.conectados(playerData.usuario);
                            setInterval(function(){this.consulta.conectados(playerData.usuario);}.bind(this),1000);
                            setInterval(function(){this.consulta.chats();}.bind(this),1000);
                            this.consulta.nombre = inputUsername.value;
                            document.getElementById("chatbar").style.visibility = "visible";
                            document.getElementById("enviar").style.visibility = "visible";
                            this.element.getChildByID("loginDiv").style.visibility = "hidden";
                            var p = document.getElementById("error");
                            p.style.visibility = "hidden";
                            this.scene.launch('Bootloader');
                        } else if (inputUsername.value === playerData.usuario && inputPassword.value !== '' && inputPassword.value !== playerData.contraseña) {
                            var p = document.getElementById("error");
                            p.innerHTML = "Contraseña incorrecta.";
                            p.style.visibility = "visible";
                            p.style.color = "#b80000";
                        } else {
                            var p = document.getElementById("error");
                            p.innerHTML = "Datos erróneos. Por favor, inténtalo de nuevo.";
                            p.style.visibility = "visible";
                            p.style.color = "#b80000";
                        }

                    }.bind(this));
                }.bind(this));

            } else if (event.target.name === 'RegisterButton') {
                var inputUsername = this.element.getChildByName('username');
                var inputPassword = this.element.getChildByName('password');

                var playerData = null;

                $(document).ready(function(){
                    $.ajax({
                        url: 'http://localhost:8080/logins/' + inputUsername.value
                    }).done(function(data) {
                        playerData = data;

                        if ((inputUsername.value === '' || inputPassword.value === '') && !playerData) {
                            var p = document.getElementById("error");
                            p.innerHTML = "Datos erróneos. Por favor, inténtalo de nuevo.";
                            p.style.visibility = "visible";
                            p.style.color = "#b80000";
                        } else if (playerData) {
                            var p = document.getElementById("error");
                            p.innerHTML = "El nombre de usuario ya existe.";
                            p.style.visibility = "visible";
                            p.style.color = "#b80000";
                        } else {
                            $(document).ready(function(){
                                $.ajax({
                                    type: "POST",
                                    url: 'http://localhost:8080/logins',
                                    data: JSON.stringify({
                                        usuario : inputUsername.value,
                                        contraseña : inputPassword.value,
                                    }),
                                    headers: {
                                        'Accept' : 'application/json',
                                        'Content-Type' : 'application/json'
                                    },
                                    success : function(data) {
                                        var p = document.getElementById("error");
                                        p.innerHTML = "Registrado con éxito.";
                                        p.style.visibility = "visible";
                                        p.style.color = "green";
                                    }
                                });
                            });
                        }
                    })
                })
            }
        }.bind(this));
    }
}