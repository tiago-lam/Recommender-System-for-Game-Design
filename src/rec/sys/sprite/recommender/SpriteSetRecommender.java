package rec.sys.sprite.recommender;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;

import rec.sys.basics.RecommendationSpriteData;
import rec.sys.basics.SpriteConfidence;
import rec.sys.catalogue.GameDesignBreakdown;
import rec.sys.constants.SpriteNumberTable;
import rec.sys.tables.GameItem;
import rec.sys.tables.Transaction;

public class SpriteSetRecommender extends SpriteRecommender 
{
	ArrayList<Transaction> transactionSet;
	ArrayList<GameItem> gameSet;
	
	public SpriteSetRecommender()
	{
		super();
		transactionSet = new ArrayList<Transaction>(transactionTable.transactions);
		gameSet = new ArrayList<GameItem>(gameTable.games);
	}
	
	public ArrayList<GameItem> retrieveGamesWithThisSet(ArrayList<Integer> s)
	{
		ArrayList<GameItem> games = new ArrayList<>();
		for(GameItem g : gameSet)
		{
			if(gameContainsSet(g, s))
			{
				games.add(g);
			}
		}
		return games;
	}
	
	public ArrayList<GameItem> retrieveGamesWithThisSprite(ArrayList<GameItem> games, Integer s)
	{
		ArrayList<GameItem> gameCollection = new ArrayList<>();
		for (GameItem g : games) 
		{
			if(gameContainSprite(g, s))
			{
				gameCollection.add(g);
			}
		}
		return gameCollection;
	}
	
	public boolean gameContainsSet(GameItem g, ArrayList<Integer> s)
	{
		for(Integer i : s)
		{
			if(!gameContainSprite(g, i))
				return false;
		}
		return true;
	}
	
	public boolean gameContainSprite(GameItem g, int s)
	{
		return g.spriteItems.contains(new Integer(s));
	}
	
	public ArrayList<GameItem> allTheGamesWithThisSprite(ArrayList<GameItem> games, Integer s)
	{
		ArrayList<GameItem> gamesWithTheSprite = new ArrayList<>();
		for(GameItem g : games)
		{
			if(gameContainSprite(g, s))
				gamesWithTheSprite.add(g);
		}
		return gamesWithTheSprite;
	}
	
	public boolean transactionContainsSubSet(Transaction t, ArrayList<Integer> s)
	{
		ArrayList<Integer> transactionSet = t.spriteItems;
		for(Integer i : s)
		{
			if(!transactionSet.contains(new Integer(i)))
				return false;
		}
		return true;
	}
	
	public ArrayList<Transaction> transactionsWithTheSpriteSetIn(ArrayList<Integer> s)
	{
		ArrayList<Transaction> trans = new ArrayList<>();
		for (Transaction t : transactionSet) 
		{
			if(transactionContainsSubSet(t, s))
				trans.add(t);
		}
		return trans;
	}
	
	public ArrayList<GameItem> gamesWithTheSpriteSetIn(ArrayList<Integer> s)
	{
		ArrayList<GameItem> games = new ArrayList<>();
		for (GameItem g : gameSet) 
		{
			if(gameContainsSet(g, s))
				games.add(g);
		}
		return games;
	}
	
	public HashSet<Integer> differenceWithCurrentSpriteSet(ArrayList<Integer> currentSpriteSet)
	{
		HashSet<Integer> elementsOfTheDifference = new HashSet<>();
		ArrayList<Transaction> trans = transactionsWithTheSpriteSetIn(currentSpriteSet);
		for(Transaction t : trans)
		{
			ArrayList<Integer> tempSpriteItems = new ArrayList<Integer>();
			copySpriteItemList(t, tempSpriteItems);
			ArrayList<Integer> difference = new ArrayList<>(currentSpriteSet);
			if(t.spriteItems.size() >= difference.size())
			{
				t.spriteItems.removeAll(difference);
				difference = t.spriteItems;
			}
			else
			{
				difference.removeAll(t.spriteItems);
			}
			for (Integer i : difference) 
			{
				elementsOfTheDifference.add(i);
			}
			t.spriteItems = tempSpriteItems;
		}
		return elementsOfTheDifference;
	}

	/**
	 * @param t
	 * @param tempSpriteItems
	 */
	public void copySpriteItemList(Transaction t, ArrayList<Integer> tempSpriteItems) {
		for(Integer i : t.spriteItems)
		{
			tempSpriteItems.add(i);
		}
	}
	
	public double confidenceForThisSprite(ArrayList<Transaction> trans, int sprite, ArrayList<Integer> s)
	{
		double confidence = 0.0;
		int count = 0;
		for (Transaction t : trans) 
		{
			if(t.spriteItems.contains(new Integer(sprite)))
				count++;
		}
		
		confidence = ((double)count / (double)trans.size());
		return confidence;
	}
	
	public HashMap<Integer, Double> recommenderProtocol(ArrayList<Integer> spriteSet)
	{
		HashSet<Integer> elementsToRecommend = differenceWithCurrentSpriteSet(spriteSet);
		HashMap<Integer, Double> spriteAndItsConfidence = new HashMap<>();
		for(Integer i : elementsToRecommend)
		{
			ArrayList<Transaction> trans = transactionsWithTheSpriteSetIn(spriteSet);
			double conf = confidenceForThisSprite(trans, i, spriteSet);
			spriteAndItsConfidence.put(i, conf);
		}
		return spriteAndItsConfidence;
	}
	
	public ArrayList<RecommendationSpriteData> recommendationsBasedOnSpriteSet(ArrayList<Integer> set) throws ParseException
	{
		ArrayList<RecommendationSpriteData> toRecommend = new ArrayList<>();
		HashMap<Integer, Double> map = recommenderProtocol(set);
		ArrayList<GameItem> games = gamesWithTheSpriteSetIn(set);
		
		HashMap<SpriteConfidence, ArrayList<GameItem>> spritesAndGames = new HashMap<>();
		for(Integer i : map.keySet())
		{
			ArrayList<GameItem> gs = allTheGamesWithThisSprite(games, i);
			SpriteConfidence sc = new SpriteConfidence(i, map.get(i));
			spritesAndGames.put(sc, gs);
		}
		
		HashMap<SpriteConfidence, ArrayList<GameItem>> mapSpriteTypeToItsGame = new HashMap<>();
		for(SpriteConfidence sc : spritesAndGames.keySet())
		{
			ArrayList<GameItem> gamesToRecommend = retrieveGamesWithThisSprite(games, sc.spriteType);
			mapSpriteTypeToItsGame.put(sc, gamesToRecommend);
		}
		
		for(SpriteConfidence sc : mapSpriteTypeToItsGame.keySet())
		{
			ArrayList<GameItem> gamesForThisSprite = mapSpriteTypeToItsGame.get(sc);
			if(gamesForThisSprite != null)
			{
				for(GameItem gi : gamesForThisSprite)
				{
					if(gi.gameName != null)
					{
						JSONArray gameSpriteSet = getSpriteSet("examples/gridphysics/" + gi.gameName + ".txt");
						String spName = SpriteNumberTable.retrieveSpriteNameID(sc.spriteType);
						ArrayList<JSONObject> spriteList = retrieveObjectsWithThisType(spName, gameSpriteSet, new ArrayList<JSONObject>());
						if(spriteList.size() > 0)
						{
							Collections.sort(spriteList, new SortRecommendations());
							JSONObject obj0 = spriteList.get(0);
							obj0.put("gameItBelongsTo", gi.gameName);
							JSONObject objLast = spriteList.get(spriteList.size()-1);
							objLast.put("gameItBelongsTo", gi.gameName);
							RecommendationSpriteData rsd = new RecommendationSpriteData(sc.spriteType, spName, sc.confidence, obj0, objLast, gi.gameName);
							toRecommend.add(rsd);
						}
					}
				}
			}
		}
		Collections.sort(toRecommend, new SortRecommendationsByConfidence());
		Collections.reverse(toRecommend);
		return toRecommend;
	}
	
	public ArrayList<RecommendationSpriteData> recommendationsBasedOnSpriteSet2(ArrayList<Integer> set) throws ParseException
	{
		ArrayList<RecommendationSpriteData> toRecommend = new ArrayList<>();
		HashMap<Integer, Double> map = recommenderProtocol(set);
		ArrayList<GameItem> games = gamesWithTheSpriteSetIn(set);
		
		HashMap<SpriteConfidence, ArrayList<GameItem>> spritesAndGames = new HashMap<>();
		for(Integer i : map.keySet())
		{
			ArrayList<GameItem> gs = allTheGamesWithThisSprite(games, i);
			SpriteConfidence sc = new SpriteConfidence(i, map.get(i));
			spritesAndGames.put(sc, gs);
		}
		
		HashMap<SpriteConfidence, ArrayList<GameItem>> mapSpriteTypeToItsGame = new HashMap<>();
		for(SpriteConfidence sc : spritesAndGames.keySet())
		{
			ArrayList<GameItem> gamesToRecommend = retrieveGamesWithThisSprite(games, sc.spriteType);
			mapSpriteTypeToItsGame.put(sc, gamesToRecommend);
		}
		
		for(SpriteConfidence sc : mapSpriteTypeToItsGame.keySet())
		{
			ArrayList<GameItem> gamesForThisSprite = mapSpriteTypeToItsGame.get(sc);
			if(gamesForThisSprite != null)
			{
				for(GameItem gi : gamesForThisSprite)
				{
					if(gi.gameName != null)
					{
						JSONArray gameSpriteSet = getSpriteSet("examples/gridphysics/" + gi.gameName + ".txt");
						String spName = SpriteNumberTable.retrieveSpriteNameID(sc.spriteType);
						ArrayList<JSONObject> spriteList = retrieveObjectsWithThisType(spName, gameSpriteSet, new ArrayList<JSONObject>());
						if(spriteList.size() > 0)
						{
							Collections.sort(spriteList, new SortRecommendations());
							JSONObject objLast = spriteList.get(spriteList.size()-1);
							objLast.put("gameItBelongsTo", gi.gameName);
							JSONObject params = (JSONObject) objLast.get("parameters");
							if(params.containsKey("img"))
							{
								ArrayList<JSONObject> arr = getComplimentarySpritesIfAny(gi, (String) objLast.get("identifier")); arr.remove(0);
								RecommendationSpriteData rsd = new RecommendationSpriteData(sc.spriteType, spName, sc.confidence, objLast, arr, gi.gameName);
								toRecommend.add(rsd);
							}
						}
					}
				}
			}
		}
		Collections.sort(toRecommend, new SortRecommendationsByConfidence());
		Collections.reverse(toRecommend);
		return toRecommend;
	}

	/**
	 * @param gi
	 */
	public ArrayList<JSONObject> getComplimentarySpritesIfAny(GameItem gi, String identifier) {
		GameDesignBreakdown gdb = new GameDesignBreakdown();
		JSONObject obj = gdb.gameJSON("examples/gridphysics/" + gi.gameName + ".txt");
		JSONArray spSet = (JSONArray) obj.get("SpriteSet");
		ArrayList<JSONObject> arr = (ArrayList<JSONObject>) gdb.returnStypeObjects(identifier, spSet, new ArrayList<>());
		return arr;
	}
	
	public static void main(String [] args) throws ParseException
	{

	}
}