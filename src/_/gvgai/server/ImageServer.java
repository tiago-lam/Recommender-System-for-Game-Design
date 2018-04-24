package _.gvgai.server;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import sun.rmi.runtime.Log;

/**
 * @author Tiago Machado
 *
 * Apr 10, 2018
 */
public class ImageServer implements HttpHandler{

	@Override
	public void handle(HttpExchange he) throws IOException {
		
		//Parse Request
		Map<String, Object> parameters = new HashMap<String, Object>();
		URI requestedUri = he.getRequestURI();
		
		String query = requestedUri.getRawQuery();
		parseQuery(query, parameters);
		//picture is the key that comes from the client - 
		//we use it to retrieve the image (value) it is requesting.
		String imageToServe = (String) parameters.get("picture");

		File file = new File("sprites/" + 
				imageToServe);
		he.sendResponseHeaders(200, file.length());
		he.getResponseHeaders().set("Content-Type", "image/png");

		OutputStream outputStream=he.getResponseBody();
		Files.copy(file.toPath(), outputStream);
		outputStream.close();

	}

	public static void parseQuery(String query, Map<String, 
			Object> parameters) throws UnsupportedEncodingException {

		if (query != null) {
			String pairs[] = query.split("[&]");
			for (String pair : pairs) {
				String param[] = pair.split("[=]");
				String key = null;
				String value = null;
				if (param.length > 0) {
					key = URLDecoder.decode(param[0], 
							System.getProperty("file.encoding"));
				}

				if (param.length > 1) {
					value = URLDecoder.decode(param[1], 
							System.getProperty("file.encoding"));
				}

				if (parameters.containsKey(key)) {
					Object obj = parameters.get(key);
					if (obj instanceof List<?>) {
						List<String> values = (List<String>) obj;
						values.add(value);

					} else if (obj instanceof String) {
						List<String> values = new ArrayList<String>();
						values.add((String) obj);
						values.add(value);
						parameters.put(key, values);
					}
				} else {
					parameters.put(key, value);
				}
			}
		}
	}
}