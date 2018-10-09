package rec.sys.basics;

import org.json.simple.JSONObject;

public class RecommendationSpriteData 
{
	public int type;
	public String typeName;
	public double confidence;
	public JSONObject common;
	public JSONObject specialized;
	
	public RecommendationSpriteData()
	{
		
	}
	
	public RecommendationSpriteData(int type, String typeName, double confidence, JSONObject common, JSONObject specialized)
	{
		this.type = type;
		this.typeName = typeName;
		this.confidence = confidence;
		this.common = common;
		this.specialized = specialized;
	}
}
