package _.myParser;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import _.utils.Utils;
import core.Node;
import core.VGDLParser;
import core.content.InteractionContent;
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
	
	public JSONArray parseInteractionSet(Node n)
	{
		JSONArray interactionArray = new JSONArray();
		ArrayList<Node> interactionNodes = n.children;
		for(Node node : interactionNodes)
		{
			JSONObject interactionObj = new JSONObject();
			InteractionContent interactionContent = (InteractionContent) node.content;
			interactionObj.put("interactionName", interactionContent.function);
			interactionObj.put("sprite1", interactionContent.object1);
			JSONArray sprite2Array = new JSONArray();
			String [] spritesToInteract = interactionContent.object2;
			for (int i = 0; i < spritesToInteract.length; i++) {
				JSONObject objToInteract = new JSONObject();
				objToInteract.put("spriteToInteract", spritesToInteract[i]);
				sprite2Array.add(objToInteract);
			}
			interactionObj.put("sprite2", sprite2Array);
			HashMap<String, String> parameters = interactionContent.parameters;
			JSONObject paramObj = new JSONObject();
			for (String key : parameters.keySet()) 
			{
				paramObj.put(key, parameters.get(key));
			}
			interactionObj.put("parameters", paramObj);
			interactionArray.add(interactionObj);
		}
		return interactionArray;
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
		
		ParserGameDescription myParser = new ParserGameDescription();

		String[] desc_lines = new IO().readFile("examples/gridphysics/assemblyline.txt");
		if(desc_lines != null)
		{
			Node rootNode = myParser.indentTreeParser(desc_lines);

			//Parse here blocks of VGDL.
			for(Node n : rootNode.children)
			{
				if(n.content.identifier.equals("SpriteSet"))
				{
					JSONArray spriteJSONArray = new JSONArray();
					ArrayList<SpriteContentParsed> spriteContentParseds = myParser.parseSpriteSet(n);
					for (SpriteContentParsed spriteContentParsed : spriteContentParseds) {
						JSONObject obj = spriteContentParsed.exploreNode(spriteContentParsed);
						spriteJSONArray.add(obj);
					}
					Utils.writeAsAJSON(spriteJSONArray, "sprtiteSet");
					System.out.println();
				}
				else if(n.content.identifier.equals("InteractionSet"))
				{
					JSONArray interactionJSONArray = myParser.parseInteractionSet(n);
					Utils.writeAsAJSON(interactionJSONArray, "interactionSet");
					System.out.println();
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