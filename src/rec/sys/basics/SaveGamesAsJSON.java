package rec.sys.basics;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import _.myParser.ParserGameDescription;
import rec.sys.catalogue.Catalogue;

public class SaveGamesAsJSON {
	
	public void saveGameJSONFile(String gameName) throws IOException
	{
		ParserGameDescription parser = new ParserGameDescription();
		String game = parser.getGameObject("examples/gridphysics/" + gameName + ".txt");
		try (FileWriter file = new FileWriter("JSONFiles/games/" + gameName + ".json")) {
			file.write(game);
			System.out.println("Successfully Copied JSON Object to File...");
			System.out.println("\nJSON Object: " + game);
		}
	}
	
	public String printGameJSONString(String gameName) throws IOException
	{
		ParserGameDescription parser = new ParserGameDescription();
		String game = parser.getGameObject("examples/gridphysics/" + gameName + ".txt");
		return game;
	}
	
	public JSONArray getGameJSONCollection() throws IOException, ParseException
	{
		JSONArray arr = new JSONArray();
		ParserGameDescription parser = new ParserGameDescription();
		Catalogue c = new Catalogue();
		ArrayList<String> gameNames = c.getGameNames("examples/gridphysics/");
		for (String game : gameNames) {
			String gameString = parser.getGameObject("examples/gridphysics/" + game);
			JSONParser jsonParser = new JSONParser();
			JSONObject obj = (JSONObject) jsonParser.parse(gameString);
			arr.add(obj);
		}
		return arr;
	}
	
	public void saveAllGames() throws IOException, ParseException
	{
		JSONArray arr = getGameJSONCollection();
		try (FileWriter file = new FileWriter("JSONFiles/games/" + "collection" + ".json")) {
			file.write(arr.toJSONString());
			System.out.println("Successfully Copied JSON Object to File...");
		}
	}
	
	public static void main(String[] args) throws IOException, ParseException {
		SaveGamesAsJSON s = new SaveGamesAsJSON();
		s.saveAllGames();
	}

}
