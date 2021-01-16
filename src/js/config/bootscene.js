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
        this.cameras.main.setBackgroundColor('#e2e2e2');

        this.fondo = this.add.image(640, 360, 'inicio');
        this.fondo.setAlpha(0.4);
        
        this.logo = this.add.image(640, 360, 'logo');
        this.logo.setScale(0.8, 0.77);
        
        this.element = this.add.dom(759, 267).createFromCache('nameform');
        this.element.addListener('click');

        this.element.on('click', function (event) {
            if (event.target.name === 'loginButton') {
                var inputUsername = this.element.getChildByName('username');
                var inputPassword = this.element.getChildByName('password');

                $(document).ready(function(){
    
                    $.ajax({
                        url:"https://www.googleapis.com/books/v1/volumes?q=intitle:javascript"
                    }).done(function(data) {
                        console.log(data)
                    });
                });

                if (inputUsername.value === 'admin' && inputPassword.value === '1234') {
                    this.element.removeListener('click');
                    this.scene.start('Bootloader');
                } else if (inputUsername.value === 'admin' && inputPassword.value !== '' && inputPassword.value !== '1234') {
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
            } else if (event.target.name === 'RegisterButton') {
                var inputUsername = this.element.getChildByName('username');
                var inputPassword = this.element.getChildByName('password');

                if (inputUsername.value !== '' && inputUsername.value !== 'admin' && inputPassword.value !== '') {
                    var p = document.getElementById("error");
                    p.innerHTML = "Registrado con éxito.";
                    p.style.visibility = "visible";
                    p.style.color = "green";
                } else if (inputUsername.value === 'admin' && inputPassword.value !== '') {
                    var p = document.getElementById("error");
                    p.innerHTML = "El nombre de usuario ya existe.";
                    p.style.visibility = "visible";
                    p.style.color = "#b80000";
                } else {
                    var p = document.getElementById("error");
                    p.innerHTML = "Datos erróneos. Por favor, inténtalo de nuevo.";
                    p.style.visibility = "visible";
                    p.style.color = "#b80000";
                }
            }
        }.bind(this));
    }
}