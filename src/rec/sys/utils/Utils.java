package rec.sys.utils;

import java.util.Arrays;

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