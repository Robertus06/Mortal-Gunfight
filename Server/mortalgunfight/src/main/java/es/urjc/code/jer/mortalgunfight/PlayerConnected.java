package es.urjc.code.jer.mortalgunfight;

public class PlayerConnected {
	private long id = -1;
	private String usuario;
	private Long lastConexTime = System.currentTimeMillis();
	
	public PlayerConnected() {}
	
	public PlayerConnected(String usuario) {
		this.usuario = usuario;
		this.lastConexTime = System.currentTimeMillis();		
	}	
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getUsuario() {
		return usuario;
	}
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	public Long getLastConexTime() {
		return lastConexTime;
	}
	public void setLastConexTime(Long lastConexTime) {
		this.lastConexTime = lastConexTime;
	}
}
