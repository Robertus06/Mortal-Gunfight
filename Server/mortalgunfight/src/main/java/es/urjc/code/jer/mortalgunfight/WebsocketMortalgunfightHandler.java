package es.urjc.code.jer.mortalgunfight;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@CrossOrigin
public class WebsocketMortalgunfightHandler extends TextWebSocketHandler {
	
	private Map<String, WebsocketJugador> jugadores = new ConcurrentHashMap<>();
	private List<WebsocketJugador> enPartida = new ArrayList<WebsocketJugador>();
	
	private ObjectMapper mapper = new ObjectMapper();

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		WebsocketJugador jugador = new WebsocketJugador(session);
		jugadores.put(session.getId(), jugador);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		WebsocketJugador jugador = jugadores.get(session.getId());
		
		if (enPartida.contains(jugador)) {			
			ObjectNode node = mapper.createObjectNode();
			node.put("id", -1);
			
			for (WebsocketJugador i : enPartida) {
				if (i != jugador) {
					if (i.session.isOpen()) {
						i.session.sendMessage(new TextMessage(node.toString()));
					}
				}
				enPartida.remove(i);
			}
		}
		jugadores.remove(session.getId());
	}
	
	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		JsonNode node = mapper.readTree(message.getPayload());
		
		WebsocketJugador jugador = jugadores.get(session.getId());
		jugador.nombre = node.get("nombre").asText();
		
		if (node.get("id").asInt() == 0) {	
			if (enPartida.size() < 2) {
				enPartida.add(jugador);

				ObjectNode msg = mapper.createObjectNode();
				msg.put("id", 0);
				msg.put("enemigo", false);
				
				
				if (enPartida.indexOf(jugador) + 1 == 2) {
					
					msg.put("enemigo", true);
					
				}
				for (WebsocketJugador i : enPartida) {
					msg.put("jugador", enPartida.indexOf(i) + 1);
					i.session.sendMessage(new TextMessage(msg.toString()));
				}
			} else {
				ObjectNode lleno = mapper.createObjectNode();
				lleno.put("id", -2);
				
				jugador.session.sendMessage(new TextMessage(lleno.toString()));
			}
		} else if (node.get("id").asInt() == -1) {
			if (enPartida.contains(jugador)) {			
				ObjectNode salir = mapper.createObjectNode();
				salir.put("id", -1);
				
				for (WebsocketJugador i : enPartida) {
					if (i.session.isOpen()) {
						i.session.sendMessage(new TextMessage(salir.toString()));
					}
					enPartida.remove(i);
				}
			}
		}
	}
}
