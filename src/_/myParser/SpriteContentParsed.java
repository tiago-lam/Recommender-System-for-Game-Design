package _.myParser;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import core.content.SpriteContent;

public class SpriteContentParsed{
	
	public SpriteContent spriteContent;
	public ArrayList<SpriteContentParsed> children;
	
	public SpriteContentParsed(SpriteContent spriteContent)
	{
		this.spriteContent= spriteContent;
		children = new ArrayList<>();
	}
	
	public void addSprite(SpriteContentParsed spriteContentParsed)
	{
		children.add(spriteContentParsed);
	}
	
	public JSONObject spriteContentParsedToJSON()
	{
		JSONObject obj = spriteContentToJSON(this.spriteContent);
		return obj;
	}
	
	public JSONObject spriteContentToJSON(SpriteContent spriteContent)
	{
		JSONObject obj = new JSONObject();

		String identifier = spriteContent.identifier;
		String referenceClass = spriteContent.referenceClass;
		obj.put("identifier", identifier);
		obj.put("referenceClass", referenceClass);

		HashMap<String, String> parameters = spriteContent.parameters;
		JSONArray parametersArray = new JSONArray();
		for (String key: parameters.keySet()) 
		{
			JSONObject paramObj = new JSONObject();
			paramObj.put(key, parameters.get(key));
			parametersArray.add(paramObj);
		}
		obj.put("parameters", parametersArray);
		
		return obj;
	}
	
	public void childInheritParameters(SpriteContentParsed spriteContentParsed)
	{
		SpriteContent spriteContent = spriteContentParsed.spriteContent;
		if(spriteContent.referenceClass == null)
		{
			spriteContent.referenceClass = this.spriteContent.referenceClass;
		}
		
		for (String key : this.spriteContent.parameters.keySet()) 
		{
			if(!spriteContent.parameters.containsKey(key))
				spriteContent.parameters.put(key, this.spriteContent.parameters.get(key));
		}
	}
	
	public void childInheritFrom(SpriteContentParsed spriteContentParsed)
	{
		SpriteContent spriteContent = spriteContentParsed.spriteContent;
		if(spriteContent.referenceClass == null)
		{
			spriteContent.referenceClass = this.spriteContent.referenceClass;
		}
		
		for (String key : this.spriteContent.parameters.keySet()) 
		{
			if(!spriteContent.parameters.containsKey(key))
				spriteContent.parameters.put(key, this.spriteContent.parameters.get(key));
		}
	}
	
	public void childrenInheritParameters()
	{
		for(SpriteContentParsed spriteContentParsed: children)
		{
			childInheritParameters(spriteContentParsed);
			spriteContentParsed.childrenInheritParameters();
		}
	}
	
	public void childrenInheritParameters(SpriteContentParsed spriteContentParsed)
	{
		childInheritParameters(spriteContentParsed);
		for(int i = 0; i < spriteContentParsed.children.size(); i++)
		{
			SpriteContentParsed innerSpriteContentParsed = spriteContentParsed.children.get(i);
			if(innerSpriteContentParsed.children.size() == 0)
			{
				childInheritParameters(spriteContentParsed);
			}
			childrenInheritParameters(innerSpriteContentParsed);
		}
	}
	
	public JSONObject exploreNode(SpriteContentParsed spriteContentParsed)
	{
		JSONObject obj = spriteContentParsed.spriteContentParsedToJSON();
		if(spriteContentParsed.children.size() > 0)
		{
			JSONArray array = new JSONArray();
			for (SpriteContentParsed innerSpriteContentParsed : spriteContentParsed.children) 
			{
				JSONObject innerObj = innerSpriteContentParsed.spriteContentParsedToJSON();
				JSONObject objReturned = exploreNode(innerSpriteContentParsed);
				array.add(objReturned);
			}
			obj.put("children", array);
		}
		return obj;
	}
	
}