package _.myParser;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import core.Node;
import core.VGDLParser;
import core.content.SpriteContent;
import ontology.Types;
import tools.IO;

public class ParserGameDescription extends VGDLParser{

	public ArrayList<SpriteContentParsed> spriteSet;

	public ParserGameDescription()
	{
		super();
		spriteSet = new ArrayList<>();
	}

	public ParserGameDescription(String game)
	{
		super();
		spriteSet = new ArrayList<>();
	}
	
	/**
	 * @param n
	 */
	public ArrayList<SpriteContentParsed> parseSpriteSet(Node n) {
		ArrayList<Node> spriteNodes = n.children;
		for (Node node : spriteNodes) {
			
			SpriteContent spriteContent = (SpriteContent) node.content;
			SpriteContentParsed spriteContentParsed = new SpriteContentParsed(spriteContent);

			if(node.parent.content.identifier.equals("SpriteSet"))
			{
				spriteSet.add(spriteContentParsed);
			}
			
			parseSpriteChildren(node, spriteContentParsed);
			/*********COMMENT THE LINE BELOW***************/
			spriteContentParsed.childrenInheritParameters();
			/****TO HAVE THE REGULAR VGDL PARSER**********/
			JSONObject obj = spriteContentParsed.spriteContentParsedToJSON();
		}
		return spriteSet;
	}

	/**
	 * @param node
	 * @param spriteContentParsed
	 */
	public void parseSpriteChildren(Node node, SpriteContentParsed spriteContentParsed) {
		if(node.children.size() > 0)
		{
			for (Node innerNode : node.children) 
			{
				SpriteContent innerSpriteContent = (SpriteContent) innerNode.content;
				SpriteContentParsed innerSpriteContentParsed = new SpriteContentParsed(innerSpriteContent);
				spriteContentParsed.addSprite(innerSpriteContentParsed);
				parseSpriteChildren(innerNode, innerSpriteContentParsed);
			}
		}
	}

	public static void main(String [] args){
		System.out.println("hola");
		ParserGameDescription myParser = new ParserGameDescription();

		String[] desc_lines = new IO().readFile("examples/gridphysics/zelda.txt");
		if(desc_lines != null)
		{
			Node rootNode = myParser.indentTreeParser(desc_lines);

			//Parse here blocks of VGDL.
			for(Node n : rootNode.children)
			{
				if(n.content.identifier.equals("SpriteSet"))
				{
					ArrayList<SpriteContentParsed> spriteContentParseds = myParser.parseSpriteSet(n);
					JSONObject obj = spriteContentParseds.get(4).exploreNode(spriteContentParseds.get(4));
					System.out.println();
							
				}
				else if(n.content.identifier.equals("InteractionSet"))
				{

				}
				else if(n.content.identifier.equals("LevelMapping"))
				{

				}
				else if(n.content.identifier.equals("TerminationSet"))
				{

				}
			}

		}
	}
}