package _._.jetty.server;

import java.awt.BorderLayout;
import java.awt.Image;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;

@SuppressWarnings("serial")
public class UploadImage extends HttpServlet
{
  
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//super.doPost(req, resp);
		System.out.println("img");
		
		InputStream in = req.getInputStream();
		String urlPath = getStringFromInputStream(in);
		
		Image image = null;
		  try {
		      // Read from a file
//		      File sourceimage = new File("source.gif");
//		      image = ImageIO.read(sourceimage);
		   
		      // Read from an input stream
//		      InputStream is = req.getInputStream();
//		      image = ImageIO.read(is);
		   
//		      // Read from a URL
		      URL url = new URL(urlPath);
		      image = ImageIO.read(url);
		  } 
		  catch (IOException e) 
		  {
			  
		  }
		   
		  // Use a label to display the image
		  JFrame frame = new JFrame();
		  JLabel label = new JLabel(new ImageIcon(image));
		  frame.getContentPane().add(label, BorderLayout.CENTER);
		  frame.pack();
		  frame.setVisible(true);

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
	
}

