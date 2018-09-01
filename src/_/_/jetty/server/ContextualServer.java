package _._.jetty.server;

import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletHandler;
import org.eclipse.jetty.webapp.WebAppContext;

public class ContextualServer {
	
	public static void main( String[] args ) throws Exception
    {
        Server server = new Server(9001);

        ServletHandler spriteSerialize = new ServletHandler();
        spriteSerialize.addServletWithMapping(GetGame.class, "/getGame");
        spriteSerialize.addServletWithMapping(GetImages.class, "/imgs");
        spriteSerialize.addServletWithMapping(Processing.class, "/processing");
        spriteSerialize.addServletWithMapping(UploadImage.class, "/uploadImage");
        spriteSerialize.addServletWithMapping(LoadImages.class, "/loadImages");
        spriteSerialize.addServletWithMapping(Play.class, "/play");
        

        ResourceHandler resource_handler = new ResourceHandler();
        resource_handler.setDirectoriesListed(true);
        resource_handler.setWelcomeFiles(new String[]
        		{ 
        				"WAR/views/main.html",
        				"WAR/views/showSpriteSet.html",
        				"WAR/views/js/showSpriteSetScript.js",
        				"WAR/views/css/spriteSetStyle.css",
        				"WAR/views/css/panelLayout.css",
        				"WAR/views/css/inspectorStyles.css",
        				"sprites/"
        		});
        resource_handler.setResourceBase(".");

        HandlerList handlers = new HandlerList();
        handlers.setHandlers(new Handler[] {resource_handler, spriteSerialize});
        server.setHandler(handlers);
        
        server.start();
        server.join();
    }

}