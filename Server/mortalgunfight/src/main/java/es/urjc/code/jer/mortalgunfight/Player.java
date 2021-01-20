package es.urjc.code.jer.mortalgunfight;

public class Player {
	private String usuario;
	private String contraseña;	
	private Long lastConexTime = System.currentTimeMillis();
	
	public Player(String usuario, String contraseña) {
		this.usuario = usuario;
		this.contraseña = contraseña;
		this.lastConexTime = System.currentTimeMillis();
	}
	
	public Long getLastConexTime() {
		return lastConexTime;
	}

	public void setLastConexTime(Long lastConexTime) {
		this.lastConexTime = lastConexTime;
	}


	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getContraseña() {
		return contraseña;
	}

	public void setContraseña(String contraseña) {
		this.contraseña = contraseña;
	}
}
