package rec.sys.basics;

import java.math.RoundingMode;
import java.text.DecimalFormat;

public class SpriteConfidence
{
	public int spriteType;
	public double confidence;
	
	public SpriteConfidence(int spriteType, double confidence)
	{
		this.spriteType = spriteType;
		DecimalFormat df = new DecimalFormat("#.####");
    	df.setRoundingMode(RoundingMode.CEILING);
		this.confidence = confidence;//Double.valueOf(df.format(confidence));
	}
}
