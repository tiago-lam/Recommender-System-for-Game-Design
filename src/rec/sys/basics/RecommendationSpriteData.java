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
	public String gameTheyBelongTo;
	public JSONArray complimentarySprites;
	
	public RecommendationSpriteData()
	{
		
	}
	
	public RecommendationSpriteData(int type, String typeName, double confidence,
										JSONObject common, ArrayList<JSONObject> complimentarySprites,
											 String gameTheyBelongTo)
	{
		this.type = type;
		this.typeName = typeName;
		this.confidence = confidence;
		this.common = common;
		this.complimentarySprites = new JSONArray();
		for(JSONObject jobj : complimentarySprites)
		{
			if(!jobj.toJSONString().equals(common.toJSONString()))
				this.complimentarySprites.add(jobj);
		}
		this.gameTheyBelongTo = gameTheyBelongTo;
	}
	
	public RecommendationSpriteData(int type, String typeName, double confidence,
			JSONObject common, JSONObject specialized,
			String gameTheyBelongTo)
	{
		this.type = type;
		this.typeName = typeName;
		this.confidence = confidence;
		this.common = common;
		this.specialized = specialized;
		this.gameTheyBelongTo = gameTheyBelongTo;
	}
}
