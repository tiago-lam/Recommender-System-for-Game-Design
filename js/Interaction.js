interactionList = [{object1: "nokey", object2: "wall", action: "stepBack"},
				   {object1: "monsterSlow", object2: "sword", action: "killSprite"}]

var interactionListDiv = document.getElementById("interactionList")

interactionList.forEach(function(element) {
  	
    interactionListDiv.appendChild(document.createElement("br"));
    
    
  	var mi = document.createElement("input");
	mi.setAttribute('type', 'text');
	mi.setAttribute('value', element['object1']);
	interactionListDiv.appendChild(mi);
	
	var mi2 = document.createElement("input");
	mi2.setAttribute('type', 'text');
	mi2.setAttribute('value', element['object2']);
	interactionListDiv.appendChild(mi2);
	
	var mi3 = document.createElement("input");
	mi3.setAttribute('type', 'text');
	mi3.setAttribute('value', element['action']);
	interactionListDiv.appendChild(mi3);
	
});

console.log("Hi")