package _._.jetty.server;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class Play extends HttpServlet{
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//super.doPost(req, resp);
		System.out.println("play");
		String agent = req.getParameter("agent");
		InputStream in = req.getInputStream();
		String descriptions = getStringFromInputStream(in);
		
		JSONParser parser = new JSONParser(); 
		try {
			JSONObject json = (JSONObject) parser.parse(descriptions);
			String game = json.get("game").toString();
			String level = json.get("level").toString();
			generateVGDLFile("simulation/game.txt", "simulation/level.txt", game, level);
			
			GameRun gameRun = new GameRun();
			gameRun.run("simulation/game.txt", "simulation/level.txt", agent);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	/**
	 * @param game
	 * @throws IOException
	 */
	public void generateVGDLFile(String gameFile, String levelFile, String gameContent, String levelContent) throws IOException {

		purgeDirectory(new File("simulation/"));
		File fileGameDescription = new File(gameFile);
		
		FileWriter gameWriter = new FileWriter(fileGameDescription);
		gameWriter.write(gameContent);
		gameWriter.close();
		
		File fileLevelDescription = new File(levelFile);
		FileWriter levelWriter = new FileWriter(fileLevelDescription);
		levelWriter.write(levelContent);
		levelWriter.close();
	}
	
	// convert InputStream to String
		private static String getStringFromInputStream(InputStream is) {

			BufferedReader br = null;
			StringBuilder sb = new StringBuilder();

			String line;
			try {

				br = new BufferedReader(new InputStreamReader(is));
				while ((line = br.readLine()) != null) {
					sb.append(line);
				}

			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				if (br != null) {
					try {
						br.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}

			return sb.toString();

		}
		
		void purgeDirectory(File dir) {
		    for (File file: dir.listFiles()) {
		        if (file.isDirectory())
		            purgeDirectory(file);
		        file.delete();
		    }
		}
}