package _._.jetty.server;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import _.myParser.ParserGameDescription;
import rec.sys.basics.RecommendationSpriteData;
import rec.sys.constants.SpriteNumberTable;
import rec.sys.map.placement.CalculateDistance;
import rec.sys.sprite.recommender.SpriteRecommender;
import rec.sys.sprite.recommender.SpriteSetRecommender;

@SuppressWarnings("serial")
public class GetRecommendationPositions extends HttpServlet
{
	
    @Override
    protected void doGet( HttpServletRequest request,
                          HttpServletResponse response ) throws ServletException,
                                                        IOException
    {
    	String requestedType = request.getParameter("type");
    	
    	String toSend = "";
    	String game = request.getParameter("askForPosIn");
    	JSONObject posToSend = new JSONObject();
    	
    	CalculateDistance calculateDistance;
    	try {
    		calculateDistance = new CalculateDistance("examples/gridphysics/" + game + ".txt");

    		JSONArray arr = calculateDistance.sendDistancesToClient(calculateDistance.gameObj);

    		
    		for(int i = 0; i < arr.size(); i++)
    		{
    			JSONObject typeObj = (JSONObject) arr.get(i);
    			String type = (String) typeObj.get("type");
    			if(type.equals(requestedType))
    			{
    				posToSend = typeObj;
    			}
    		}
    	} catch (ParseException e) {
    		// TODO Auto-generated catch block
    		e.printStackTrace();
    	}
    	
    	toSend = posToSend.toJSONString();
    	response.addHeader("Access-Control-Allow-Origin", "*");
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
		GetRecommendations gg = new GetRecommendations();
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


