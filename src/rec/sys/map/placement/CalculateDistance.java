package rec.sys.map.placement;
import java.io.File;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import _.myParser.ParserGameDescription;
import rec.sys.basics.TuplePosition;
import rec.sys.basics.Vector;
import tools.IO;

public class CalculateDistance 
{
	
	public JSONObject gameObj;
	public ArrayList<String []> gameLevel = new ArrayList<>();
	public Character avatarId;
	public ParserGameDescription parserGameDescription;
	
	public CalculateDistance(String gamePath) throws ParseException
	{
		parserGameDescription = new ParserGameDescription();
		String game = parserGameDescription.getGameObject(gamePath);
		JSONParser parser = new JSONParser();
		gameObj =  (JSONObject) parser.parse(game);
		storeTheLevelsForThis(gamePath);
		//ExpandMapEntry.expandedMap(gameObj);
		this.avatarId = ExpandMapEntry.getAvatarMapId(gameObj);
	}
	
	public void storeTheLevelsForThis(String game)
	{
		for(int i = 0; i < 5; i++)//5 bcz gvgai usually has 5 levels per game
		{
			File f = new File(game.replace(".txt", "_lvl" + i + ".txt"));
			if(f.exists() && !f.isDirectory()) { 
				gameLevel.add(new IO().readFile(game.replace(".txt", "_lvl" + i + ".txt")));
			}
		}
	}
	
	public JSONObject initializeMap(String gameLevelPath) throws ParseException
	{
		JSONObject levelObj = parserGameDescription.getLevel(gameLevelPath);
		return levelObj;
	}
	
	public TuplePosition retrieveFirstPositionOfThis(Character element, int levelIndex)
	{
		int rows = gameLevel.get(levelIndex).length;
		int columns = gameLevel.get(levelIndex)[0].length();
		for (int i = 0; i < rows; i++) {
			for (int j = 0; j < columns; j++) {
				if(gameLevel.get(levelIndex)[i].charAt(j) == element)
					return new TuplePosition((double)i, (double)j);
			}
		}
		return new TuplePosition(-1.0, -1.0);
	}
	
	public LinkedHashMap<String, LinkedHashSet<Vector>> distances(JSONObject game)
	{
		LinkedHashMap<String, LinkedHashSet<Vector>> elementDistances = new LinkedHashMap<String, LinkedHashSet<Vector>>();
		int levelAmount = gameLevel.size();
		for (int i = 0; i < levelAmount; i++) {
			TuplePosition avatarPos = retrieveFirstPositionOfThis(avatarId, i);

			int rows = gameLevel.get(i).length;
			int columns = gameLevel.get(i)[0].length();
			JSONArray entries = ExpandMapEntry.expandedMap(game);
			for(int e = 0; e < entries.size(); e++)
			{
				JSONObject obj = (JSONObject) entries.get(e);
				JSONArray refs = (JSONArray) obj.get("refs");
				String ref = (String) refs.get(0);
				if(!ref.contains("Avatar"))
				{
					String s = (String) obj.get("mapId");
					Character key = s.charAt(0);
					JSONArray refClass = (JSONArray) obj.get("refs");
					for (int k = 0; k < rows; k++) {
						for (int j = 0; j < columns; j++) {
							if(gameLevel.get(i)[k].charAt(j) == key)
							{
								double d = distance(avatarPos.x, avatarPos.y, k, j);
								Vector v = new Vector(avatarPos, new TuplePosition((double)k, (double)j), d);
								if(!elementDistances.keySet().contains((String) refClass.get(0)))
								{
									LinkedHashSet<Vector> set = new LinkedHashSet<Vector>();
									set.add(v);
									elementDistances.put((String) refClass.get(0), set);
								}
								else
								{
									LinkedHashSet<Vector> temp = elementDistances.get((String) refClass.get(0));
									temp.add(v);
									elementDistances.put((String) refClass.get(0), temp);
								}
							}
						}
					}
				}
			}
		}
		return elementDistances;
	}
	
	public JSONArray sendDistancesToClient(JSONObject game)
	{
		JSONArray ret = new JSONArray();
		LinkedHashMap<String, LinkedHashSet<Vector>> ds = distances(game);
		for(String key : ds.keySet())
		{
			JSONObject obj = new JSONObject();
			obj.put("type", key);
			LinkedHashSet<Vector> vs = ds.get(key);
			JSONArray position = new JSONArray();
			for(Vector v : vs)
			{
				JSONObject posObj = new JSONObject();
				posObj.put("x", v.destiny.x.intValue());
				posObj.put("y", v.destiny.y.intValue());
				position.add(posObj);
			}
			obj.put("posCollection", position);
			ret.add(obj);
		}
		return ret;
	}
	
	static double distance(double x1, double y1, double x2, double y2) 
	{ 
	    return Math.sqrt(Math.pow(x2 - x1, 2) +  
	                Math.pow(y2 - y1, 2) * 1.0); 
	}
	
	public static void main(String [] args) throws ParseException
	{
		boolean b = "FlakAvatar".contains("Avatar");
		CalculateDistance cd = new CalculateDistance("examples/gridphysics/zelda.txt");
		LinkedHashMap<String, LinkedHashSet<Vector>> ds = cd.distances(cd.gameObj);
		for(String key : ds.keySet())
		{
			System.out.println(key);
			LinkedHashSet<Vector> v = ds.get(key);
			for(Vector vec : v)
			{
				System.out.println(vec.origin.x);
				System.out.println(vec.origin.y);
				System.out.println(vec.destiny.x);
				System.out.println(vec.destiny.y);
				System.out.println(vec.manhattanDistanceX);
				System.out.println(vec.manhattanDistanceY);
				System.out.println(vec.distance);
				System.out.println(vec.quad);
			}
			System.out.println();
		}
		System.out.println(b);
	}
	
}