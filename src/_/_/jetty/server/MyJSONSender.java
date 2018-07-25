package _._.jetty.server;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class MyJSONSender extends HttpServlet
{
	 @Override
	    protected void doGet( HttpServletRequest request,
	                          HttpServletResponse response ) throws ServletException,
	                                                        IOException
	    {
		    JSONArray array = new JSONArray();
		    
		    JSONObject obj1 = new JSONObject();
		    obj1.put("name", "axeman");
		    obj1.put("img", "oryx/axeman1.png");
		    JSONObject obj2 = new JSONObject();
		    obj2.put("name", "alien1");
		    obj2.put("img", "oryx/alien1.png");
		    JSONObject obj3 = new JSONObject();
		    obj3.put("name", "barrel1");
		    obj3.put("img", "oryx/barrel1.png");
		    
		    array.add(obj1); array.add(obj2); array.add(obj3);
		 
			String toSend = array.toJSONString();
			
	    	response.setContentType("text/html");
	        response.setStatus(HttpServletResponse.SC_OK);
	        response.getWriter().println(toSend);
	    }
}
