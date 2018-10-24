package rec.sys.map.placement;

import java.util.HashMap;
import java.util.Iterator;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import _._.jetty.server.GetGame;

public abstract class ExpandMapEntry {

	public static HashMap<String, String> idRef = new HashMap<>();
	public static void mapIdToRefClass(JSONArray spriteSet, HashMap<String, String> idRef)
	{
		for(int i = 0; i < spriteSet.size(); i++)
		{
			JSONObject obj = (JSONObject) spriteSet.get(i);

			if(obj.get("referenceClass") != null)
				idRef.put((String) obj.get("identifier"), (String) obj.get("referenceClass"));

			JSONArray arr = (JSONArray) obj.get("children");
			if(arr.size() > 0)
			{
				mapIdToRefClass(arr, idRef);
			}
		}
	}

	public static JSONArray expandedMap(JSONObject game)
	{
		mapIdToRefClass((JSONArray)game.get("SpriteSet"), idRef);
		JSONArray expandedEntry = new JSONArray();
		JSONObject levelMapping = (JSONObject) game.get("LevelMapping");
		String notAddThis = filterExpandedMap(levelMapping);
		for(Iterator iterator = levelMapping.keySet().iterator(); iterator.hasNext();) 
		{
			String key = (String) iterator.next();
			JSONArray entries = (JSONArray) levelMapping.get(key);
			JSONArray refs = new JSONArray();
			int indexOfNotAddThis = -1;
			for(int i = 0; i < entries.size(); i++)
			{
				String entry = entries.get(i).toString();
								if(!entry.equals(notAddThis))
								{
				String refClass = idRef.get(entry);
				refs.add(refClass);
								}
								else
								{
									indexOfNotAddThis = i;
								}
							}
							if(indexOfNotAddThis != - 1)
							{
								entries.remove(indexOfNotAddThis);
							}
				JSONObject objEntry = new JSONObject();
				objEntry.put("mapId", key);
				objEntry.put("identifiers", entries);
				objEntry.put("refs", refs);
				expandedEntry.add(objEntry);
			}
		return expandedEntry; 
	}

	public static String filterExpandedMap(JSONObject levelMapping)
	{
		String keyToRemove = "";
		String identifierToRemove = "";
		for(Iterator iterator = levelMapping.keySet().iterator(); iterator.hasNext();) 
		{
			String key = (String) iterator.next();
			JSONArray entries = (JSONArray) levelMapping.get(key);
			if(entries.size() == 1 && !entries.get(0).equals("wall"))
			{
				identifierToRemove = (String) entries.get(0);
				keyToRemove = key;
				break;
			}
		}
		levelMapping.remove(keyToRemove);
		return identifierToRemove;
	}
	
	public static Character getAvatarMapId(JSONObject game)
	{
		JSONArray expandedMap = expandedMap(game);
		for(int i = 0; i < expandedMap.size(); i++)
		{
			JSONObject obj = (JSONObject) expandedMap.get(i);
			JSONArray arr = (JSONArray) obj.get("refs");
			for(int j = 0; j < arr.size(); j++)
			{
				String entry = (String) arr.get(j);
				if(entry.contains("Avatar"))
				{
					String s = (String) obj.get("mapId");
					return s.charAt(0);
				}
			}
		}
		
		return ' ';
	}

	public static void main(String [] args)
	{
		GetGame gg = new GetGame();
		String gameString = gg.getGameJSONObject("examples/gridphysics/zelda.txt");
		JSONParser parser = new JSONParser();
		try {
			JSONObject gameObj = (JSONObject) parser.parse(gameString);
			JSONArray arr = ExpandMapEntry.expandedMap(gameObj);
			System.out.println();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}