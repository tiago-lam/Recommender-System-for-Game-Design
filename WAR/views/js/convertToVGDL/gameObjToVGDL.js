function spriteSetToString(spriteSet)
{
    var string = "BasicGame" + "\n";
    string += "    " + "SpriteSet" + "\n";
    for(var i = 0; i < spriteSet.length; i++)
    {
        string = string + JSONtoString(spriteSet[i], 8);
    }

    string += "\n";

    return string;
}

function JSONtoString(obj, ident) {

    var objString;

    if(obj['referenceClass'] == "Regular" || obj['referenceClass'] == null)
    {
        objString =  obj['identifier'] + ' >';
    }
    else
    {
        objString = obj['identifier'] + ' > ' + obj['referenceClass'];
    }

    for (key in obj.parameters) {
        objString = objString + " " + key + "=" + obj.parameters[key];
    }

    for (var i = 0; i < ident; i++) {
        objString = ' ' + objString;
    }

    objString = objString + "\n";

    if ('children' in obj && obj.children.length > 0) {
        for (var j = 0; j < obj.children.length; j++) {
            objString = objString + JSONtoString(obj.children[j], ident + 4);
        }
    }

    return objString;
}

function mappingObjToString(mappingSet)
{
    var string = "    " + "LevelMapping" + "\n" + "        ";

    for(key in mappingSet)
    {
        string += key + " >";
        var mapObjects = mappingSet[key];
        for(var i = 0; i < mapObjects.length; i++)
        {
            string += " " + mapObjects[i];
        }
        string += "\n" + "        ";
    }

    string += "\n";

    return string;
}

function interactionSetToString(interactionSet)
{
    var string = "    " + "InteractionSet" + "\n" + "        ";

    for(var i = 0; i < interactionSet.length; i++)
    {
        let interactionObj = interactionSet[i];
        string += interactionObj.sprite1 + " ";
        let spritesToCollide = interactionObj.sprite2;
        for(var j = 0; j < spritesToCollide.length; j++)
        {
            string +=  spritesToCollide[j] + " ";
        }

        string+= "> " + interactionObj.interactionName;

        let params = interactionObj.parameters;
        for(key in params)
        {
            string += " " + key + "=" + params[key];
        }
        string += "\n" + "        ";
    }

    string += "\n";

    return string;
}

function terminationSetToString(terminationSet)
{
    var string = "    " + "TerminationSet" + "\n" + "        ";

    for(var i = 0; i < terminationSet.length; i++)
    {
        let terminationObj = terminationSet[i];
        string += terminationObj.termination;

        let params = terminationObj.parameters;
        for(key in params)
        {
            string += " " + key + "=" + params[key];
        }
        string += "\n" + "        ";
    }

    string += "\n";

    return string;
}

function levelObjToString(levelMap)
{
    var string = "";
    for(var i = 0; i < levelMap.length; i++)
    {
        string += levelMap[i] + "\n";
    }

    string = string.replace(/,/g, "");

    return string;
}

function fromObjToString()
{
    var string = spriteSetToString(gameObj["SpriteSet"]);
    string += mappingObjToString(gameObj["LevelMapping"]);
    string += interactionSetToString(gameObj["InteractionSet"]);
    string += terminationSetToString(gameObj["TerminationSet"]);

    var description = {game: string, level: levelObjToString(gameObj["Level"])};
    return description;
}

function play()
{
    console.log("play");
    xhr = new XMLHttpRequest();
    var url = "http://localhost:9001/play";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "text/plain");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var resp = xhr.responseText;
            console.log(resp);
        }
    }
    var data = fromObjToString();
    data = JSON.stringify(data);
    xhr.send(data);
}
