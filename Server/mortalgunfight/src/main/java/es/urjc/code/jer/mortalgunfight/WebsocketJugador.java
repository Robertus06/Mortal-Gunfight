package es.urjc.code.jer.mortalgunfight;

import org.springframework.web.socket.WebSocketSession;

public class WebsocketJugador {

	public WebSocketSession session;
	public String nombre;
	
	public int tiempo;
	
	WebsocketJugador(WebSocketSession wss) {
		nombre = "";
		tiempo = 0;
		session = wss;
	}
	
}
