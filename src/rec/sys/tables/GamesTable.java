package rec.sys.tables;

import java.util.List;

public class GamesTable {
	
	public int gameNumber;
	public String gameName;
	public List<Integer> spriteItems;//spriteSet;
	
	public GamesTable(int gameNumber, String gameName, List<Integer> spriteItems)
	{
		this.gameNumber = gameNumber;
		this.gameName = gameName;
		this.spriteItems = spriteItems;
	}

}
