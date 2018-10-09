package rec.sys.catalogue;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import rec.sys.constants.SpriteNumberTable;
import rec.sys.utils.Utils;

public class Transactions {
	
	public Catalogue catalogue;
	
	public HashMap<Integer, ArrayList> gameTransaction;
	
	public Transactions() throws IOException
	{
		this.catalogue = new Catalogue("examples/gridphysics/");
		this.gameTransaction = new HashMap<Integer, ArrayList>();
	}
	
	public void printTransactions() throws IOException
	{
		PrintWriter writer = new PrintWriter("recommender/input.txt", "UTF-8");
		for(Integer i: gameTransaction.keySet())
		{
			    System.out.println(i);
			 	ArrayList<String> transaction = gameTransaction.get(i);
			 	String transNumbers = "";
			 	int idTrans [] = new int [transaction.size()];
			 	int j = 0;
			 	for(String trans : transaction)
			 	{
			 		 idTrans[j++] = Integer.valueOf(SpriteNumberTable.retrieveSpriteID(trans));
			 	}
			 	Arrays.sort(idTrans);
			 	for (int j2 = 0; j2 < idTrans.length; j2++) {
					transNumbers += " " + idTrans[j2];
				}
			 	transNumbers = transNumbers.replaceFirst(" ", "");
			    writer.println(transNumbers);
		}
		writer.close();
	}
	
	public JSONArray getSpriteSet(JSONObject game)
	{
		JSONArray sprites = (JSONArray) game.get("SpriteSet");
		return sprites;
	}
	
	public ArrayList<String> getGameTransactions(JSONArray spriteSet, ArrayList<String> set)
	{
		for(int i = 0; i < spriteSet.size(); i++)
		{
			JSONObject obj = (JSONObject) spriteSet.get(i);
			String referenceClass = (String) obj.get("referenceClass");
			if(referenceClass != null && !set.contains(referenceClass))
				set.add(referenceClass);
			JSONArray children = (JSONArray) obj.get("children");
			if(children.size() > 0)
			{
				getGameTransactions(children, set);
			}
		}
		return set;
	}
	
	public void allTransactions()
	{
		ArrayList<JSONObject> gameCollection = this.catalogue.allGames;
		for(int i = 0; i < gameCollection.size(); i++)
		{
			JSONObject obj = gameCollection.get(i);
			JSONArray spriteSet = (JSONArray) obj.get("SpriteSet");
			ArrayList transaction = getGameTransactions(spriteSet, new ArrayList());
			this.gameTransaction.put(i, transaction);
		}
	}
	
	public static void main(String[] args) throws IOException {
		Transactions t = new Transactions();
		t.allTransactions();
		t.printTransactions();
//		for (JSONObject obj : t.catalogue.allGames) 
//		{
//		JSONObject obj = t.catalogue.loadSingleGame("camelRace.txt", "examples/gridphysics/");
//		ArrayList<String> arr = t.getGameTransactions((JSONArray)obj.get("SpriteSet"), new ArrayList<String>());
//		t.allTransactions();
//		t.printTransactions();
//		System.out.println();

//		}
		System.out.println();
	}

}