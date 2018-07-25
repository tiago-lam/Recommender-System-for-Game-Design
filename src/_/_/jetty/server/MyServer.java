package _._.jetty.server;

import javax.servlet.Servlet;

import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletHandler;

public class MyServer 
{
	public static void main(String[] args) 
	{
		Server server = new Server(8001);

        ServletHandler spriteSerialize = new ServletHandler();
        spriteSerialize.addServletWithMapping(MyJSONSender.class, "/json");
        spriteSerialize.addServletWithMapping(MyImages.class, "/imgs");
        
        ResourceHandler resource_handler = new ResourceHandler();
        resource_handler.setDirectoriesListed(true);
        resource_handler.setWelcomeFiles(new String[]
        		{ 
        				"WAR/views/entryPoint.html",
        		});
        resource_handler.setResourceBase(".");

        HandlerList handlers = new HandlerList();
        handlers.setHandlers(new Handler[] {resource_handler, spriteSerialize});
        server.setHandler(handlers);
        
        try {
			server.start();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        try {
			server.join();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}