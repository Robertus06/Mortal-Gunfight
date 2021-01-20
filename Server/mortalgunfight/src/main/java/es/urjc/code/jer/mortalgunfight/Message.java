package es.urjc.code.jer.mortalgunfight;

public class Message {
	private String nombre;
	private String mensaje;
	
	public Message() {}
	
	public Message(String nombre,String mensaje) {
		this.nombre = nombre;
		this.mensaje = mensaje;
	}
	
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getMensaje() {
		return mensaje;
	}
	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
	
}
