package rec.sys.basics;

/**
 * @author tiagomachado
 * @since 01.22.2018
 * This class is responsible for creating the association table (matrix) - the first step of 
 * our version of the apriori algorithm
 */
public class SpriteNumberTuple 
{
	public String spriteName;
	public int number;
	
	public SpriteNumberTuple(String spriteName, int number)
	{
		this.spriteName = spriteName;
		this.number = number;
	}
}
