package _.gvgai.server;

import java.io.IOException;
import java.net.InetSocketAddress;

import com.sun.net.httpserver.HttpServer;

/**
 * @author Tiago Machado
 *
 * Apr 10, 2018
 */
public class MyServer {
	
	public static void main(String [] args) throws IOException
	{
		int port = 9000;
		HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
		System.out.println("server started at " + port);
		server.createContext("/", new LoadSpriteSet());
		server.createContext("/imgs", new ImageServer());
		server.createContext("/spriteSet", new SpriteSetSerializer());
		server.setExecutor(null);
		server.start();
	}
	
}
