package rec.sys.catalogue;

import java.util.ArrayList;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import _._.jetty.server.GetGame;

public class GameDesignBreakdown {
	
	JSONObject obj = new JSONObject();
	
	public JSONObject gameJSON(String gamePath)
	{
		GetGame g = new GetGame();
		String jsonGame = g.getGameJSONObject(gamePath);
		JSONParser p = new JSONParser();
		JSONObject o = null;
		try {
			o = (JSONObject) p.parse(jsonGame);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return o;
	}
	
	public void resetObj()
	{
		obj = new JSONObject();
	}
	
	public JSONObject findSprite(String spriteIdentifier, JSONArray spriteSet, int start)
	{
		for (int i = start; i < spriteSet.size(); i++) 
		{
			JSONObject spriteElement = (JSONObject) spriteSet.get(i);
			if(spriteElement.get("identifier").equals(spriteIdentifier))
			{
				obj = spriteElement;
				break;
			}
			else
			{
				JSONArray children = (JSONArray) spriteElement.get("children");
				if(children.size() > 0)
				{
					 findSprite(spriteIdentifier, children, 0);
				}
			}
		}
		return obj;
	}
	
	public ArrayList<JSONObject> returnStypeObjects(String spriteIdentifier, JSONArray spriteSet, ArrayList<JSONObject> arr)
	{
		JSONObject obj = findSprite(spriteIdentifier, spriteSet, 0);
		resetObj();
		
		if(!arr.contains(obj))
			arr.add(obj);
		
		if(obj.keySet().size() > 0)
		{
			String stype = "";
			JSONObject params = (JSONObject) obj.get("parameters");
			if(params.keySet().contains("stype"))
			{
				stype = (String) params.get("stype");
				JSONObject temp = findSprite(stype, spriteSet, 0);
				resetObj();
				if(!arr.contains(temp))
					arr.add(temp);
				returnStypeObjects((String) temp.get("identifier"), spriteSet, arr);
			}
			else if(params.keySet().contains("stype1"))
			{
				stype = (String) params.get("stype1");
				JSONObject temp = findSprite(stype, spriteSet, 0);
				resetObj();
				if(!arr.contains(temp))
					arr.add(temp);
				returnStypeObjects((String) temp.get("identifier"), spriteSet, arr);
			}
			else if(params.keySet().contains("stype2"))
			{
				stype = (String) params.get("stype2");
				JSONObject temp = findSprite(stype, spriteSet, 0);
				resetObj();
				if(!arr.contains(temp))
					arr.add(temp);
				returnStypeObjects((String) temp.get("identifier"), spriteSet, arr);
			}
			else if(params.keySet().contains("stypeMissile"))
			{
				stype = (String) params.get("stypeMissile");
				JSONObject temp = findSprite(stype, spriteSet, 0);
				resetObj();
				if(!arr.contains(temp))
					arr.add(temp);
				returnStypeObjects((String) temp.get("identifier"), spriteSet, arr);
			}
		}
		
		return arr;
	}
	
	public static void main(String [] args)
	{
		GameDesignBreakdown gdb = new GameDesignBreakdown();
		JSONObject obj = gdb.gameJSON("examples/gridphysics/zelda.txt");
		JSONArray spSet = (JSONArray) obj.get("SpriteSet");
		ArrayList<JSONObject> arr = (ArrayList<JSONObject>) gdb.returnStypeObjects("withkey", spSet, new ArrayList<>());
		System.out.println();
	}

}