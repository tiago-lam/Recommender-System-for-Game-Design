package rec.sys.sprite.recommender;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Scanner;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import _.myParser.ParserGameDescription;
import rec.sys.constants.SpriteNumberTable;
import rec.sys.constants.TableIDGame;
import rec.sys.tables.GameItem;
import rec.sys.tables.GameTable;
import rec.sys.tables.Transaction;
import rec.sys.tables.TransactionTable;

public class SpriteRecommender {
	
	public TransactionTable transactionTable;
	public GameTable gameTable;
	public ArrayList<Transaction> transactionsInUse;
	public HashSet<Integer> itemsInUse;
	private int MAX_PROTOCOL_REPS = 100;
	
	public SpriteRecommender()
	{
		transactionTable = new TransactionTable();
		gameTable = new GameTable();
		transactionsInUse = new ArrayList<>();
		itemsInUse = new HashSet<Integer>();
	}
	
	public SpriteRecommender(String itemsInUseFile, String transactionsInUseFile)
	{
		transactionTable = new TransactionTable();
		gameTable = new GameTable();
		initializeTransactionsInUse(transactionsInUseFile);
		initializeItemsInUse(itemsInUseFile);
	}
	
	
	public void initializeItemsInUse(String itemsInUseFile)
	{
		itemsInUse = new HashSet<Integer>();
		addAvatarSpritesToTheItemsInUse();
		String line = null;

		try {

			FileReader fileReader = new FileReader(itemsInUseFile);

			BufferedReader bufferedReader = new BufferedReader(fileReader);

			while((line = bufferedReader.readLine()) != null) {
				Scanner scanner = new Scanner(line);
				itemsInUse.add(scanner.nextInt());
			}   
			bufferedReader.close();         
		}
		catch(FileNotFoundException ex) {
			System.out.println(
					"Unable to open file '" + 
							itemsInUseFile + "'");                
		}
		catch(IOException ex) {
			System.out.println(
					"Error reading file '" 
							+ itemsInUseFile + "'");                  

		}
	}
	
	public void initializeTransactionsInUse(String transactionFile)
	{
        String line = null;

        try {
           
            FileReader fileReader = new FileReader(transactionFile);

            BufferedReader bufferedReader = new BufferedReader(fileReader);

            while((line = bufferedReader.readLine()) != null) {
            	Transaction t = new Transaction();
            	Scanner scanner = new Scanner(line);
            	t.transactionNumber = scanner.nextInt();
            	t.transactionSupport = scanner.nextInt();
            	ArrayList<Integer> transactions = new ArrayList<Integer>();
            	while(scanner.hasNextInt())
            	{
            		transactions.add(scanner.nextInt());
            	}
            	t.spriteItems = transactions;
            	this.transactionsInUse.add(t);
            }   
            bufferedReader.close();         
        }
        catch(FileNotFoundException ex) {
            System.out.println(
                "Unable to open file '" + 
                		transactionFile + "'");                
        }
        catch(IOException ex) {
            System.out.println(
                "Error reading file '" 
                + transactionFile + "'");                  
            
        }
	}
	
	public void updateItemsInUseFile(String itemsInUseFile) throws IOException
	{
		File f = new File(itemsInUseFile);
		if (!f.exists()) {
			f.createNewFile();
		}
		        
		FileWriter fw = new FileWriter(f); 
		BufferedWriter bw = new BufferedWriter(fw);
		
		for(Integer i : itemsInUse)
		{	
			String content = String.valueOf(i) + "\n";
			bw.write(content);	
		}
		bw.close();
	}
	
	public void updateTransactionsInUseFile(String transactionsInUseFile)
	{
		for(Transaction t : transactionsInUse)
		{
			try (BufferedWriter bw = new BufferedWriter(new FileWriter(transactionsInUseFile))) {

				String content = "";
				String tNumber = String.valueOf(t.transactionNumber);
				String tSupport = String.valueOf(t.transactionSupport);
				content = tNumber + " " + tSupport;
				ArrayList<Integer> tItems = new ArrayList<>();
				for(Integer i : tItems)
				{
					content += " " + i; 
				}

				bw.write(content + "\n");

			} catch (IOException e) {

				e.printStackTrace();

			}
		}
	}
	
	public Transaction lookForSprite(int spriteTypeNumber)
	{
		ArrayList<Transaction> transactions = transactionTable.transactions;
		
		for(int i = 0; i < transactions.size(); i++)
		{
			Transaction trans = transactions.get(i);
			List<Integer> items = trans.spriteItems;
			if(items.contains(new Integer(spriteTypeNumber)))
			{
				return trans;
			}
		}	
		return null;
	}
	
	public int recommendSprite(int spriteTypeInUse, Transaction trans) throws IOException
	{
		List<Integer> items = trans.spriteItems;
		items.remove(new Integer(spriteTypeInUse));
		trans.spriteItems = items;
		if(items.size() > 0)
		{
			return getTheRightItemToRecommend(trans, items);
		}	
		return -1;
	}

	public int getTheRightItemToRecommend(Transaction trans, List<Integer> items) throws IOException 
	{
		for(Integer type : items)
		{
			if(!itemsInUse.contains(new Integer(type)))
			{
				itemsInUse.add(type);
				removeTransaction(trans);
				updateItemsInUseFile("recommender/itemsInUse.txt");
				return type;
			}
		}
		return -1;
	}
	
	public boolean removeTransaction(Transaction trans)
	{
		return transactionTable.transactions.remove(trans);
	}
	
	public void addAvatarSpritesToTheItemsInUse()
	{
		for(int i = 1; i < 9; i++)
		{
			itemsInUse.add(i);
		}
	}
	
	public int protocol(int spriteTypeNumber) throws IOException
	{
		for(int i = 0; i < MAX_PROTOCOL_REPS; i++)
		{
			Transaction trans = lookForSprite(spriteTypeNumber);
			int sprite = recommendSprite(spriteTypeNumber, trans);
			if(sprite != - 1)
				return sprite;
		}
		return -1;
	}
	
	public ArrayList<Integer> retrieveAllTheGamesWithThisCombinationOfSprites(ArrayList<Integer> sprites)
	{	
		ArrayList<Integer> gamesWithTheCombination = new ArrayList<>();
		ArrayList<GameItem> games = gameTable.games;
		for (int i = 0; i < games.size(); i++) 
		{
			GameItem tempGame = games.get(i);
			ArrayList<Integer> tempGameList = (ArrayList<Integer>) tempGame.spriteItems;
			HashSet<Integer> spriteSetTemp = new HashSet<>();
			for(Integer sp : tempGameList) { spriteSetTemp.add(sp); }
			
			if(DoesSetContainsSprites(sprites, spriteSetTemp))
				gamesWithTheCombination.add(tempGame.gameNumber);
		}
		return gamesWithTheCombination;
	}
	
	public ArrayList<JSONObject> retrieveAllTheSpritesToRecommend(ArrayList<Integer> gamesID, String type) throws ParseException
	{
		ArrayList<JSONObject> spritesToRecommend = new ArrayList<>();
		for (int i = 0; i < gamesID.size(); i++) 
		{
			String gameName = TableIDGame.entryIDGame.get(gamesID.get(i));
			if(gameName != null)
			{
				JSONArray gameSpriteSet = getSpriteSet("examples/gridphysics/" + gameName + ".txt");
				ArrayList<JSONObject> spriteList = retrieveObjectsWithThisType(type, gameSpriteSet, new ArrayList<JSONObject>());
				for(JSONObject spriteObj : spriteList)
				{
					JSONObject gameAndItsSprites = new JSONObject();
					gameAndItsSprites.put("game", gameName);
					gameAndItsSprites.put("sprites", spriteObj);
					spritesToRecommend.add(gameAndItsSprites); 
				}
			}
		}
		return spritesToRecommend;
	}
	

	/**
	 * @param sprites
	 * @param spriteSetTemp
	 */
	public boolean DoesSetContainsSprites(ArrayList<Integer> sprites, HashSet<Integer> spriteSetTemp) {
		
		boolean contains = true;
		for(Integer sp : sprites)
		{
			contains = contains && spriteSetTemp.contains(new Integer(sp));
		}
		return contains;
	}
	
	public String getGame(String gamePath)
	{
		ParserGameDescription parser = new ParserGameDescription();
		return parser.getGameObject(gamePath);
	}
	
	public JSONArray getSpriteSet(String gamePath) throws ParseException
	{
		JSONParser parser = new JSONParser();
		String gameString = getGame(gamePath);
		JSONObject gameObject = (JSONObject) parser.parse(gameString);
		JSONArray spriteSet = (JSONArray) gameObject.get("SpriteSet");
		return spriteSet;
	}
	
	public ArrayList<JSONObject> retrieveObjectsWithThisType(String type, JSONArray spriteSet, ArrayList<JSONObject> sprites)
	{
		for (int i = 0; i < spriteSet.size(); i++) 
		{
			JSONObject obj = (JSONObject) spriteSet.get(i);
			if(obj.get("referenceClass") != null && obj.get("referenceClass").equals(type))
				sprites.add(obj);
			
			JSONArray children = (JSONArray) obj.get("children");
			for (int j = 0; j < children.size(); j++) 
			{
				retrieveObjectsWithThisType(type, children, sprites);
			}
		}
		return sprites;
	}
	
	public ArrayList<JSONObject> spriteRecommendationList(String gamePath, String type) throws ParseException
	{
		JSONArray spriteSet = getSpriteSet(gamePath);
		return retrieveObjectsWithThisType(type, spriteSet, new ArrayList<>());
	}
	
	public ArrayList<JSONObject> recommend(int type) throws ParseException, IOException
	{
		int stype = protocol(type);
		ArrayList<Integer> sprites = new ArrayList<>(); sprites.add(type); sprites.add(stype);
		ArrayList<Integer> games = retrieveAllTheGamesWithThisCombinationOfSprites(sprites);
		ArrayList<JSONObject> recommendations = retrieveAllTheSpritesToRecommend(games, SpriteNumberTable.retrieveSpriteNameID(stype));
		return recommendations;
	}
	
	
	
	public static void main(String[] args) throws ParseException, FileNotFoundException 
	{
//		SpriteRecommender spriteRecommender = new SpriteRecommender();
//		spriteRecommender.addAvatarSpritesToTheItemsInUse();
//		int type = spriteRecommender.protocol(6);
//		System.out.println();
		
		try{
		    String test = "Test string !";
		    File file = new File("simulation/ho.txt");

		    // if file doesnt exists, then create it
		    if (!file.exists()) {
		        file.createNewFile();
		    }else{

		    }

		    FileWriter fw = new FileWriter(file.getAbsoluteFile());
		    BufferedWriter bw = new BufferedWriter(fw);
		    bw.write(test);
		    bw.close();

		    System.out.println("Done");
		}catch(IOException e){
		    e.printStackTrace();
		}
	}

}