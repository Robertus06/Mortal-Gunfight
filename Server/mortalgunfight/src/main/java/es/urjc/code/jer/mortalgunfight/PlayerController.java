package es.urjc.code.jer.mortalgunfight;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class PlayerController {
	@Autowired
	private PlayerService playerService;
	
	@RequestMapping(value="/logins", method=RequestMethod.GET)
	public List<Player> getPlayers() {
		return playerService.getUsers();
	}
	
	@RequestMapping(value="/connected/{user}", method=RequestMethod.GET)
	public List<String> getPlayers(@PathVariable("user") String user) {
		return playerService.getPlayers(user);
	}
	@RequestMapping(value="/logins/{playerUsuario}", method=RequestMethod.GET)
	public Player getPlayer(@PathVariable("playerUsuario") String playerUsuario) {
		return playerService.getPlayer(playerUsuario);
	}
	
	@RequestMapping(value="/logins", method=RequestMethod.POST)
	public ResponseEntity<Boolean> addPlayer(@RequestBody Player p) {
		playerService.add(p);
		return new ResponseEntity<>(true,HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/chat", method=RequestMethod.GET)
	public List<Message> getChat(){
		return playerService.getChat();
	}
	@RequestMapping(value="/chat", method=RequestMethod.POST)
	public ResponseEntity<Boolean> addPlayer(@RequestBody Message m) {
		playerService.addChat(m);
		return new ResponseEntity<>(true,HttpStatus.CREATED);
	}
}
