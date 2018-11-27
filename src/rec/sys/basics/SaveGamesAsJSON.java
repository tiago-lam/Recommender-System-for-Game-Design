package rec.sys.basics;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

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
	
	public void printGameJSONString(String gameName) throws IOException
	{
		ParserGameDescription parser = new ParserGameDescription();
		String game = parser.getGameObject("examples/gridphysics/" + gameName + ".txt");
		System.out.println(game);
	}
	
	public static void main(String[] args) throws IOException {
		SaveGamesAsJSON s = new SaveGamesAsJSON();
		Catalogue c = new Catalogue();
		ArrayList<String> arr = c.getGameNames("examples/gridphysics/");
		for (String g : arr) {
			g = g.replace(".txt", "");
			s.printGameJSONString(g);	
		}
		
	}

}
