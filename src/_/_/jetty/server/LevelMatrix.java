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
public class LevelMatrix extends HttpServlet
{
    @Override
    protected void doGet( HttpServletRequest request,
                          HttpServletResponse response ) throws ServletException,
                                                        IOException
    {
		String toSend = getLevelMatrixJSONObject("examples/gridphysics/aliens_lvl0.txt");
		
    	response.setContentType("text/html");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().println(toSend);
    }

	/**
	 * @return
	 */
	public String getLevelMatrixJSONObject(String gameLevelPath) {
		String toSend = "";

    	String[] mapLines = new IO().readFile(gameLevelPath);
    	
    	int rows = mapLines.length;
    	int columns = mapLines[0].length();
    	
    	JSONObject mapObject = new JSONObject();
    	mapObject.put("rows", rows);
    	mapObject.put("columns", columns);
    	JSONArray mapLinesJson = new JSONArray();
    	for(int i = 0; i < mapLines.length; i++)
    	{
    		mapLinesJson.add(mapLines[i]);
    	}
    	mapObject.put("map", mapLinesJson);
    	
    	toSend = mapObject.toJSONString();
    	
		return toSend;
	}
	
//	public static void main(String[] args) {
//		String s = new LevelMapping().getLevelMapJSONObject("examples/gridphysics/aliens_lvl0.txt");
//		System.out.println(s);
//	}
}



//new IO().readFile(Folder.FILES_FOLDER + levelMap);