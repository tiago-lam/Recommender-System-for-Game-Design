package _.utils;

import java.awt.Component;
import java.awt.Container;
import java.util.HashMap;
import java.util.Map;

import javax.swing.JButton;
import javax.swing.JFrame;

public class ComponentTreeBuilder{
	
	   private Map<String, Component> hashMap = new HashMap<String,Component>();
	   public Map<String, Component> getComponentsTree(){
	      return hashMap;
	   }
	   
	   public void visitComponent(Component cmp){
	      // Add this component
	      if(cmp != null) hashMap.put(cmp.getName(), cmp);
	      Container container = (Container) cmp;
	      if(container == null ) {
	          // Not a container, return
	          return;
	      }
	      // Go visit and add all children
	      for(Component subComponent : container.getComponents()){
	          visitComponent(subComponent);
	      }
	   }
	   
	   public static void main(String [] args)
	   {
		   JFrame myFrame = new JFrame();
		   // Make sure you add your elements into the frame's content pane by
		   myFrame.getContentPane().add(new JButton());
		   ComponentTreeBuilder cmpBuilder = new ComponentTreeBuilder();
		   cmpBuilder.visitComponent(myFrame);
		   Map<String, Component> components = cmpBuilder.getComponentsTree(); 
		   // All components should now be in components hashmap
	   }
	}
