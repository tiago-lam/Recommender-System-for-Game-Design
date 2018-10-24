package rec.sys.basics;

public class Vector
{
	public TuplePosition origin; 
	public TuplePosition destiny;
	public TuplePosition actualVector;
	public Double distance;
	public double manhattanDistanceX;
	public double manhattanDistanceY;
	public int quad;
	
	public Vector(TuplePosition origin, TuplePosition destiny, Double distance)
	{
		this.origin = origin;
		this.destiny = destiny;
		this.actualVector = new TuplePosition(destiny.x - origin.x, destiny.y - origin.y);
		this.distance = distance;
		this.manhattanDistanceX = (origin.x - destiny.x);
		this.manhattanDistanceY = (origin.y - destiny.y);
		this.quad = defineQuad(actualVector, distance);
	}
	
	public int defineQuad(TuplePosition v, Double length)
	{
		/*https://gamedev.stackexchange.com/questions/96099/is-there-a-quick-way-to-determine-if-a-vector-is-in-a-quadrant*/
		v = normalize(v, length);
		
		if(Math.abs(v.x) > Math.abs(v.y))
		{
			if(v.x < 0)
			{
				return 3;
			}
			else
			{
				return 1;
			}
		}else{
			if(v.y < 0)
			{
				return 2;
			}
			else
			{
				return 4;
			}
		}
	}
	
	public TuplePosition normalize(TuplePosition v, Double length)
	{
		v.x /= length;
		v.y /= length;
		
		return v;
	}
	
}
