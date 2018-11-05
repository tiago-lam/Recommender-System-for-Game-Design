package rec.sys.basics;

import java.util.ArrayList;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class RecommendationSpriteData 
{
	public int type;
	public String typeName;
	public double confidence;
	public JSONObject common;
	public JSONObject specialized;
	public JSONArray sprites;
	public String gameTheyBelongTo;
	
	public RecommendationSpriteData()
	{
		
	}
	
	public RecommendationSpriteData(int type, String typeName, double confidence,
										JSONObject common, JSONObject specialized,
											JSONArray sprites, String gameTheyBelongTo)
	{
		this.type = type;
		this.typeName = typeName;
		this.confidence = confidence;
		this.common = common;
		this.specialized = specialized;
		this.sprites = sprites;
		this.gameTheyBelongTo = gameTheyBelongTo;
	}
}
