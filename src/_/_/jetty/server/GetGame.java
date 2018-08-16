package _._.jetty.server;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import _.myParser.ParserGameDescription;
import core.Node;
import tools.IO;

@SuppressWarnings("serial")
public class GetGame extends HttpServlet
{
    @Override
    protected void doGet( HttpServletRequest request,
                          HttpServletResponse response ) throws ServletException,
                                                        IOException
    {
		String toSend = getGameSONObject("examples/gridphysics/aliens.txt");
		
    	response.setContentType("text/html");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().println(toSend);
    }

	/**
	 * @return
	 */
	public String getGameSONObject(String gamePath) {
		String toSend = "";
		
		JSONArray spriteSet = null;
		JSONObject levelMapping = null;
		JSONArray interactionSet = null;
		JSONArray terminationSet = null;
		JSONObject game = new JSONObject();

		ParserGameDescription parser = new ParserGameDescription();
    	String[] desc_lines = new IO().readFile(gamePath);
    	if(desc_lines != null)
    	{
    		Node rootNode = parser.indentTreeParser(desc_lines);

    		//Parse here blocks of VGDL.
    		for(Node n : rootNode.children)
    		{
    			if(n.content.identifier.equals("SpriteSet"))
    			{
    				spriteSet = parser.generate(n);
    			}
    			
    			if(n.content.identifier.equals("LevelMapping"))
    			{
    				levelMapping = parser.parseLevelMappingSet(n);
    			}
    			
    			if(n.content.identifier.equals("InteractionSet"))
    			{
    				interactionSet = parser.parseInteractionSet(n);
    			}
    			
    			if(n.content.identifier.equals("TerminationSet"))
    			{
    				terminationSet = parser.parseTerminationSet(n);
    			}
    		}
    		
    		JSONObject level = getLevel(gamePath.replace(".txt", "_lvl0.txt"));
    		
    		game.put("SpriteSet", spriteSet);
    		game.put("LevelMapping", levelMapping);
    		game.put("InteractionSet", interactionSet);
    		game.put("TerminationSet", terminationSet);
    		game.put("Level", level);
    		
    		toSend = game.toJSONString();
    		
    	}
		return toSend;
	}
	
	public JSONObject getLevel(String gameLevelPath)
	{
		LevelMatrix levelMatrix = new LevelMatrix();
		JSONObject level = levelMatrix.getObjectLevelMatrix(gameLevelPath);
		return level;
	}

}

