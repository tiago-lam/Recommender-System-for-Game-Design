package _._.jetty.server;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import _.myParser.ParserGameDescription;
import core.Node;
import tools.IO;

@SuppressWarnings("serial")
public class GetGame extends HttpServlet
{
    @Override
    protected void doGet( HttpServletRequest request,
                          HttpServletResponse response ) throws ServletException,
                                                        IOException
    {
    	String gameToServe = request.getParameter("game");
		System.out.println(gameToServe);
		
		String toSend = "";
		if(gameToServe == null)
		{
			toSend = getGameJSONObject("examples/gridphysics/" + "_" + ".txt");
		}
		else
		{
			toSend = getGameJSONObject("examples/gridphysics/" + gameToServe + ".txt");
		}
		
    	response.setContentType("text/html");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().println(toSend);
    }

	/**
	 * @return
	 */
	public String getGameJSONObject(String gamePath) {
		ParserGameDescription parser = new ParserGameDescription();
		return parser.getGameObject(gamePath);
	}
	
	
	
	public String findIdentifierType(String identifier, JSONArray spriteSet)
	{
		for(int i = 0; i < spriteSet.size(); i++)
		{
			JSONObject obj = (JSONObject) spriteSet.get(i);
			
			if(obj.get("identifier").equals(identifier))
				return (String) obj.get("referenceClass");
			
			JSONArray arr = (JSONArray) obj.get("children");
			return findIdentifierType(identifier, arr);
		}
		
		return "";
	}
	
	public static void main(String[] args) {
		GetGame gg = new GetGame();
		String gameString = gg.getGameJSONObject("examples/gridphysics/zelda.txt");
		JSONParser parser = new JSONParser();
		try {
			JSONObject gameObj = (JSONObject) parser.parse(gameString);
			JSONArray spriteSet = (JSONArray) gameObj.get("SpriteSet");
			
			JSONArray interactionSet = (JSONArray) gameObj.get("InteractionSet");
			for (int i = 0; i < interactionSet.size(); i++) 
			{
				JSONObject interaction = (JSONObject) interactionSet.get(i);
				String identifier = (String) interaction.get("sprite1");
			}
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}

