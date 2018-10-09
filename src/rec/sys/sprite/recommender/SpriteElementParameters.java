package rec.sys.sprite.recommender;

import org.json.simple.JSONObject;

public class SpriteElementParameters {
	
	JSONObject obj;
	int paramSetSize;
	
	public SpriteElementParameters (JSONObject obj,
			int paramSetSize)
	{
		this.obj = obj;
		this.paramSetSize = paramSetSize;
	}

}
