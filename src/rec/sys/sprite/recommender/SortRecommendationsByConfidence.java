package rec.sys.sprite.recommender;

import java.util.Comparator;

import rec.sys.basics.RecommendationSpriteData;

public class SortRecommendationsByConfidence implements Comparator<RecommendationSpriteData>
{
	@Override
	public int compare(RecommendationSpriteData o1, RecommendationSpriteData o2) {
		// TODO Auto-generated method stub
		if(o1.confidence > o2.confidence) return 1;
		if(o2.confidence > o1.confidence) return -1;
		return 0;
	}
	
}
