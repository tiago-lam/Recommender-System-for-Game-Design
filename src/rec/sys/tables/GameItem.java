package rec.sys.tables;

import java.util.HashSet;

public class GameItem {
	
	public int gameNumber;
	public String gameName;
	public HashSet<Integer> spriteItems;//spriteSet;
	
	public GameItem()
	{
		
	}
	
	public GameItem(int gameNumber, String gameName, HashSet<Integer> spriteItems)
	{
		this.gameNumber = gameNumber;
		this.gameName = gameName;
		this.spriteItems = spriteItems;
	}

}
