package _.utils;

import java.io.FileWriter;
import java.io.IOException;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class Utils {

	public static void writeAsAJSON(JSONObject obj, String outputFileName)
	{
		try (FileWriter file = new FileWriter("JSONFiles/" + outputFileName + ".json")) {

			file.write(obj.toJSONString());
			file.flush();

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void writeAsAJSON(JSONArray objArray, String outputFileName)
	{
		try (FileWriter file = new FileWriter("JSONFiles/" + outputFileName + ".json")) {

			file.write(objArray.toJSONString());
			file.flush();

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
