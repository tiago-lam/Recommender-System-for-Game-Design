package tracks.singlePlayer;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class SpriteSetSerializer implements HttpHandler{

	@Override
	public void handle(HttpExchange he) throws IOException {
		// TODO Auto-generated method stub
		byte[] encoded = Files.readAllBytes(
    			Paths.get("Views/load.html"));
    	String response =  new String(encoded, "UTF-8");
    	
    	
    	
    	
    	he.sendResponseHeaders(200, response.length());
    	OutputStream os = he.getResponseBody();
    	os.write(response.getBytes());
    	os.close();
	}

}
