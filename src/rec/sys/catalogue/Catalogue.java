package rec.sys.catalogue;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import org.json.simple.JSONObject;

import core.Node;
import core.VGDLParser;
import tools.IO;

public class Catalogue {
	
	public Catalogue()
	{
		
	}
	
	public Catalogue(String gamesDirectory) throws IOException
	{
		allGames = new ArrayList<>();
		fillList(gamesDirectory);
	}
	
	public ArrayList<JSONObject> allGames;
	
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
	
}