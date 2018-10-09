package rec.sys.sprite.recommender;

import java.util.Comparator;

import org.json.simple.JSONObject;

public class SortRecommendations implements Comparator<JSONObject>{

	@Override
	public int compare(JSONObject o1, JSONObject o2) {
		// TODO Auto-generated method stub
		//JSONObject sprite1 = (JSONObject) o1.get("sprites"); JSONObject sprite2 = (JSONObject) o2.get("sprites");
		JSONObject param1 = (JSONObject) o1.get("parameters"); JSONObject param2 = (JSONObject) o2.get("parameters");
		int setSize1 = 0; int setSize2 = 0;
		if(param1 != null) { setSize1 = param1.entrySet().size(); }
		if(param2 != null) { setSize2 = param2.entrySet().size(); }
		return setSize1 - setSize2;
	}

}


