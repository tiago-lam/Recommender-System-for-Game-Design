package rec.sys.constants;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;

import rec.sys.basics.TuplePosition;

public class EncodePositions {

	public int width = 50;
	public int height = 50;
	public int count = 0;
	public LinkedHashMap<Integer, TuplePosition> encodedPositions = new LinkedHashMap<>();
	
	public EncodePositions()
	{
		load();
	}
	
	//Store in memory
	public void load()
	{
		encode();
	}
			
	public void encode()
	{
		for(int i = 0; i < width; i++)
		{
			for(int j = 0; j < height; j++)
			{
				encodedPositions.put(count++, new TuplePosition((double)i, (double)j));
			}
		}
	}
	
	public void positionsToFile() throws FileNotFoundException, UnsupportedEncodingException
	{
		PrintWriter writer = new PrintWriter("recommender/positions.txt", "UTF-8");
		for(Integer key: encodedPositions.keySet())
		{
				TuplePosition pos = encodedPositions.get(key);
			 	String entry = key + " " + pos.x + " " + pos.y;
			    writer.println(entry);
		}
		writer.close();
	}
	
	public static void main(String [] args) throws FileNotFoundException, UnsupportedEncodingException
	{
		EncodePositions e = new EncodePositions();
		e.encode();
		e.positionsToFile();
	}
}
