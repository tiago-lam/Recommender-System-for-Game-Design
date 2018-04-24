package _._.jetty.server;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
public class GetImages extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		String imageToServe = req.getParameter("picture");
		System.out.println(imageToServe);

		Path path = Paths.get("sprites/" + 
				imageToServe);
		byte[] data = Files.readAllBytes(path);
		
		resp.setContentType("image/png");
        resp.setStatus(HttpServletResponse.SC_OK);
        resp.getOutputStream().write(data);
	}
}
