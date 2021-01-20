package es.urjc.code.jer.mortalgunfight;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class PlayerService {
	private Map<String, Player> playerMap = new HashMap<String, Player>();
	private List<String> connectedPlayers = new ArrayList<String>();
	private List<Message> chat = new ArrayList<Message>();
	 
	public PlayerService() {
		createAdminLogin();
	}
	
	public Player getPlayer(String usuario) {
		return playerMap.get(usuario);
	}
	
	public List<Player> getUsers() {
        return new ArrayList<Player>(playerMap.values());
    }
	
	public List<String> getPlayers(String user) {
		Player player = playerMap.get(user);
		player.setLastConexTime(System.currentTimeMillis());
		
		if(!connectedPlayers.contains(user)) {
			connectedPlayers.add(user);
		} 
		for (String st: connectedPlayers) {
			if(System.currentTimeMillis() - playerMap.get(st).getLastConexTime() > 3000) {
				connectedPlayers.remove(st);
			}
		}	
		return connectedPlayers;
	}
	
	public void createAdminLogin() {
		try {
			BufferedReader in = new BufferedReader(new FileReader("logins.txt"));
			String st = in.readLine();
			while (st != null) {
				String[] logins = st.split(":");
				playerMap.put(logins[0], new Player(logins[0],logins[1]));
				st = in.readLine();
			}
			in.close();
		} catch (FileNotFoundException e) {
			//e.printStackTrace();
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Fichero no encontrado");
		} catch (IOException e) {
			//e.printStackTrace();
			ResponseEntity.status(HttpStatus.OK).body("Fichero leido con éxito");
		}
	}
	
	public void add(Player jugador) {
		playerMap.put(jugador.getUsuario(), jugador);

		try {
			PrintStream out = new PrintStream(new FileOutputStream("logins.txt"));
			for (Player player : playerMap.values()) {				
				out.println(player.getUsuario()+":"+player.getContraseña());
			}
			out.close();
		} catch (FileNotFoundException e) {
			//e.printStackTrace();
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Fichero no encontrado");
		}
	}
	
	public List<Message> getChat(){
		return chat;
	}
	
	public void  addChat(Message m) {
		if(connectedPlayers.contains(m.getNombre()))
		chat.add(m);
	}
}
