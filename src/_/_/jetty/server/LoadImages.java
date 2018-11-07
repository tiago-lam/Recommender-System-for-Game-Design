package _._.jetty.server;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;

public class LoadImages extends HttpServlet
{
	@Override
    protected void doGet( HttpServletRequest request,
                          HttpServletResponse response ) throws ServletException,
                                                        IOException
    {
    	String gameToServe = request.getParameter("game");
		System.out.println(gameToServe);
		
		String toSend = getGameNames("sprites/oryx/").toJSONString();
		
		response.addHeader("Access-Control-Allow-Origin", "*");
    	response.setContentType("text/html");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().println(toSend);
    }
	
	public JSONArray getGameNames(String imageDirectoryPath)
	{
		JSONArray imageNames = new JSONArray();
		File folder = new File(imageDirectoryPath);
		File[] listOfFiles = folder.listFiles();

		for (int i = 0; i < listOfFiles.length; i++) {
			if (listOfFiles[i].isFile() 
					&& (!listOfFiles[i].getName().contains("DS_Store"))) {				
						imageNames.add(listOfFiles[i].getName());
			}
		}
		return imageNames;
	}
}
