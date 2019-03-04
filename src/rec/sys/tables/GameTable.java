package rec.sys.tables;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Scanner;

import rec.sys.constants.TableIDGame;

public class GameTable {

	public ArrayList<GameItem> games;
	
	public GameTable()
	{
		games = new ArrayList<>();
		storeGames("recommender/tables/games.txt");
	}
	
	public void storeGames(String gameFile)
	{
        String line = null;

        try {
           
            FileReader fileReader = new FileReader(gameFile);

            BufferedReader bufferedReader = new BufferedReader(fileReader);

            int gameCounter = 1;
            while((line = bufferedReader.readLine()) != null) {
            	GameItem g = new GameItem();
            	Scanner scanner = new Scanner(line);
            	HashSet<Integer> items = new HashSet<>();
            	while(scanner.hasNextInt())
            	{
            		items.add(scanner.nextInt());
            	}
            	g.gameName = TableIDGame.entryIDGame.get(gameCounter);
            	g.gameNumber = gameCounter++;
            	g.spriteItems = items;
            	games.add(g);
            }   
            bufferedReader.close();         
        }
        catch(FileNotFoundException ex) {
            System.out.println(
                "Unable to open file '" + 
                		gameFile + "'");                
        }
        catch(IOException ex) {
            System.out.println(
                "Error reading file '" 
                + gameFile + "'");                  
            
        }
	}
	
	public static void main(String[] args) {
		GameTable gt = new GameTable();
		System.out.println();
	}
}
