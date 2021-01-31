package es.urjc.code.jer.mortalgunfight;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
@CrossOrigin
public class MortalgunfightApplication implements WebSocketConfigurer {
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(mortalgunfightHandler(), "/servidor").setAllowedOrigins("*");
	}
	
	@Bean
	public WebsocketMortalgunfightHandler mortalgunfightHandler() {
		return new WebsocketMortalgunfightHandler();
	}

	public static void main(String[] args) {
		SpringApplication.run(MortalgunfightApplication.class, args);
	}

}
