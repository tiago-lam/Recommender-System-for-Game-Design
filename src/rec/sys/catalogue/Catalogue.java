package rec.sys.catalogue;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;

import org.json.simple.JSONObject;

public class Catalogue {
	
	public ArrayList<JSONObject> allGames;
	
	public Catalogue()
	{
		
	}
	
	public Catalogue(String gamesDirectory) throws IOException
	{
		allGames = new ArrayList<>();
		fillList(gamesDirectory);
	}
	
	public ArrayList<String> getGameNames(String gameDirectoryPath)
	{
		ArrayList<String> gameNames = new ArrayList<String>();
		File folder = new File(gameDirectoryPath);
		File[] listOfFiles = folder.listFiles();

		for (int i = 0; i < listOfFiles.length; i++) {
			if (listOfFiles[i].isFile() && (!listOfFiles[i].getName().contains("_lvl") 
					&& (!listOfFiles[i].getName().contains("DS_Store")))) {
					gameNames.add(listOfFiles[i].getName());
			}
		}
		Collections.sort(gameNames);
		return gameNames;
	}
	
	public JSONObject loadSingleGame(String gameName, String gameDirectoryPath) throws IOException{
		
		GameDesignBreakdown gdb = new GameDesignBreakdown();
		return gdb.gameJSON(gameDirectoryPath + gameName); 
	}
	
	public void fillList(String gamesDirectory) throws IOException
	{
		ArrayList<String> gameNames = getGameNames(gamesDirectory);
		for (String game : gameNames) 
		{
			JSONObject gameObj = loadSingleGame(game, gamesDirectory);
			allGames.add(gameObj);
		}
	}
	
	public void generateInputForApriori()
	{
		
	}
	
	public static void main(String[] args) throws IOException {
		Catalogue c = new Catalogue("examples/gridphysics/");
		System.out.println();
	}
	
}