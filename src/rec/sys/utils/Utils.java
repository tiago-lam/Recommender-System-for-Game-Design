package rec.sys.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public abstract class Utils {

	 public static String sortString(String inputString)
	    {
	        // convert input string to char array
	        char tempArray[] = inputString.toCharArray();
	         
	        // sort tempArray
	        Arrays.sort(tempArray);
	         
	        // return new sorted string
	        return new String(tempArray);
	    }
	 
}