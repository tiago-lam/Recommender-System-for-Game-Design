import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import _._.jetty.server.GetGame;

public class Tests {

	public static void main(String[] args) throws ParseException {
		GetGame g = new GetGame();
		String jsonGame = g.getGameJSONObject("examples/gridphysics/zelda.txt");
		JSONParser p = new JSONParser();
		JSONObject o = (JSONObject) p.parse(jsonGame);
		System.out.println(o);
	}
}
