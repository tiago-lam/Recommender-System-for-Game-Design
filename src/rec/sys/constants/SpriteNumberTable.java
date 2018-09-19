package rec.sys.constants;

import rec.sys.basics.SpriteNumberTuple;

public abstract class SpriteNumberTable 
{
	public static final SpriteNumberTuple [] table 
		= new SpriteNumberTuple[]
			{
				new SpriteNumberTuple("HorizontalAvatar", 1),
				new SpriteNumberTuple("MissileAvatar", 2),
				new SpriteNumberTuple("MovingAvatar", 3),
				new SpriteNumberTuple("OngoingAvatar", 4),
				new SpriteNumberTuple("OrientedAvatar" , 5),
				new SpriteNumberTuple("ShootAvatar" , 6),
				new SpriteNumberTuple("AlternateChaser" , 7),
				new SpriteNumberTuple("FlakAvatar", 8),
				new SpriteNumberTuple("Chaser" , 9),
				new SpriteNumberTuple("Fleeing" , 10),
				new SpriteNumberTuple("RandomPathAltChaser" , 11),
				new SpriteNumberTuple("RandomNPC" , 12),
				new SpriteNumberTuple("Bomber" , 13),
				new SpriteNumberTuple("Door" , 14),
				new SpriteNumberTuple("Portal" , 15),
				new SpriteNumberTuple("RandomBomber" , 16),
				new SpriteNumberTuple("Resource" , 17),
				new SpriteNumberTuple("SpawnPoint" , 18),
				new SpriteNumberTuple("Spreader" , 19),
				new SpriteNumberTuple("Flicker" , 20),
				new SpriteNumberTuple("Immovable" , 21),//
				new SpriteNumberTuple("Missile" , 22),
				new SpriteNumberTuple("OrientedFlicker" , 23),
				new SpriteNumberTuple("Passive" , 24),
				new SpriteNumberTuple("RandomMissile" , 25),
				new SpriteNumberTuple("BomberRandomMissile" , 26)
			};	
	
	public static final int retrieveSpriteID(String sprite)
	{
		for (SpriteNumberTuple spriteNumberTuple : table) 
		{
			if(spriteNumberTuple.spriteName.equals(sprite))
				return spriteNumberTuple.number;
		}
		return -1;
	}
	
	public static final String retrieveSpriteNameID(int sprite)
	{
		for (SpriteNumberTuple spriteNumberTuple : table) 
		{
			if(spriteNumberTuple.number == (sprite))
				return spriteNumberTuple.spriteName;
		}
		return "";
	}
}