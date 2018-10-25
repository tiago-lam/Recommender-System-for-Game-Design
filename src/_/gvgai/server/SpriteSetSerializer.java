package _.gvgai.server;


import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import _.myParser.ParserGameDescription;
import _.utils.Utils;
import core.Node;
import tools.IO;

/**
 * @author Tiago Machado
 *
 * Apr 10, 2018
 */
public class SpriteSetSerializer implements HttpHandler{

	@Override
	public void handle(HttpExchange he) throws IOException {
		// TODO Auto-generated method stub
    	String response = "";
    	JSONObject obj = new JSONObject();
    	//START BY REFACTORING THIS PART
    	ParserGameDescription parser = new ParserGameDescription();
    	String[] desc_lines = new IO().readFile("examples/gridphysics/solarfox.txt");
    	if(desc_lines != null)
    	{
    		Node rootNode = parser.indentTreeParser(desc_lines);

    		//Parse here blocks of VGDL.
    		for(Node n : rootNode.children)
    		{
    			if(n.content.identifier.equals("SpriteSet"))
    			{
    				JSONArray arr = parser.generate(n, "solarfox");
    				response =  arr.toJSONString();
    			}
    		}
    	}
    	
    	he.sendResponseHeaders(200, response.length());
    	OutputStream os = he.getResponseBody();
    	os.write(response.getBytes());
    	os.close();
	}

}
