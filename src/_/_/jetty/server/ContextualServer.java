package _._.jetty.server;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.ContextHandler;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletHandler;
import org.json.simple.JSONArray;
import _.myParser.ParserGameDescription;
import core.Node;
import tools.IO;

public class ContextualServer {
	
	public static void main( String[] args ) throws Exception
    {
        Server server = new Server(9001);

        ServletHandler spriteSerialize = new ServletHandler();
        spriteSerialize.addServletWithMapping(GetSpriteSet.class, "/spriteSet");
        spriteSerialize.addServletWithMapping(GetImages.class, "/imgs");

        ResourceHandler resource_handler = new ResourceHandler();
        resource_handler.setDirectoriesListed(true);
        resource_handler.setWelcomeFiles(new String[]
        		{ 
        				"WAR/views/showSpriteSet.html",
        				"WAR/views/js/showSpriteSetScript.js",
        				"WAR/views/css/spriteSetStyle.css"
        		});
        resource_handler.setResourceBase(".");

        HandlerList handlers = new HandlerList();
        handlers.setHandlers(new Handler[] {resource_handler, spriteSerialize});
        server.setHandler(handlers);
        
        server.start();
        server.join();
    }

}