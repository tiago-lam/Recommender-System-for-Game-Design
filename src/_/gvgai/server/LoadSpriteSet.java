package _.gvgai.server;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

/**
 * @author Tiago Machado
 *
 * Apr 10, 2018
 */
public class LoadSpriteSet implements HttpHandler{

	@Override
	public void handle(HttpExchange he) throws IOException {
		// TODO Auto-generated method stub
		byte[] encoded = Files.readAllBytes(
				Paths.get("Views/loadSpriteSet2.html"));
		String response =  new String(encoded, "UTF-8");
		he.sendResponseHeaders(200, encoded.length);
		he.getResponseHeaders().set("Content-Type", "text/html");
		OutputStream os = he.getResponseBody();
		os.write(response.getBytes());
		os.close();
	}

}
