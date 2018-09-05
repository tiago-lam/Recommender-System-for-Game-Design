package rec.sys.catalogue;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import _._.jetty.server.GetGame;

public class GameDesignBreakdown {
	
	public JSONObject gameJSON(String gamePath)
	{
		GetGame g = new GetGame();
		String jsonGame = g.getGameSONObject(gamePath);
		JSONParser p = new JSONParser();
		JSONObject o = null;
		try {
			o = (JSONObject) p.parse(jsonGame);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return o;
	}

}