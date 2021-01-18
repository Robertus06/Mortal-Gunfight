
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

        this.element.on('click', function (event) {
            if (event.target.name === 'loginButton') {
                var inputUsername = this.element.getChildByName('username');
                var inputPassword = this.element.getChildByName('password');
                
                var playerData = null;

                $(document).ready(function(){
                    $.ajax({
                        url:'http://localhost:8080/logins/' + inputUsername.value
                    }).done(function(data) {
                        playerData = data;

                        if (inputUsername.value === playerData.usuario && inputPassword.value === playerData.contraseña) {
                            this.element.removeListener('click');
                            this.consulta.conectados(playerData.usuario);
                            setInterval(function(){this.consulta.conectados(playerData.usuario);}.bind(this),1000);                            
                            this.scene.start('Bootloader');
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
                        url:'http://localhost:8080/logins/' + inputUsername.value
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
                                    url:'http://localhost:8080/logins',
                                    data: JSON.stringify({
                                        usuario : inputUsername.value,
                                        contraseña : inputPassword.value,
                                    }),
                                    headers: {
                                        'Accept' : 'application/json',
                                        'Content-Type' : 'application/json'
                                    },
                                    success : function(data) {
                                        console.log(data);
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