package rec.sys.tables;

import java.util.List;

public class GameItem {
	
	public int gameNumber;
	public String gameName;
	public List<Integer> spriteItems;//spriteSet;
	
	public GameItem()
	{
		
	}
	
	public GameItem(int gameNumber, String gameName, List<Integer> spriteItems)
	{
		this.gameNumber = gameNumber;
		this.gameName = gameName;
		this.spriteItems = spriteItems;
	}

}
