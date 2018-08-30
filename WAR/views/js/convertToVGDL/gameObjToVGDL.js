function spriteSetToString(spriteSet)
{
    var string = "SpriteSet" + "\n";
    for(var i = 0; i < spriteSet.length; i++)
    {
        string = string + JSONtoString(spriteSet[i], 4);
    }

    string += "\n";

    return string;
}

function JSONtoString(obj, ident) {
    var objString =

        obj['identifier'] + ' > ' + obj['referenceClass'];
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
    var string = "LevelMapping" + "\n" + "    ";

    for(key in mappingSet)
    {
        string += key + " >";
        var mapObjects = mappingSet[key];
        for(var i = 0; i < mapObjects.length; i++)
        {
            string += " " + mapObjects[i];
        }
        string += "\n" + "    ";
    }

    string += "\n";

    return string;
}

function interactionSetToString(interactionSet)
{
    var string = "InteractionSet" + "\n" + "    ";

    for(var i = 0; i < interactionSet.length; i++)
    {
        let interactionObj = interactionSet[i];
        string += interactionObj.interactionName + " > " + interactionObj.sprite1 + " ";
        let spritesToCollide = interactionObj.sprite2;
        for(var j = 0; j < spritesToCollide.length; j++)
        {
            string +=  spritesToCollide[j];
        }

        let params = interactionObj.parameters;
        for(key in params)
        {
            string += " " + key + "=" + params[key];
        }
        string += "\n" + "    ";
    }

    string += "\n";

    return string;
}

function terminationSetToString(terminationSet)
{
    var string = "TerminationSet" + "\n" + "    ";

    for(var i = 0; i < terminationSet.length; i++)
    {
        let terminationObj = terminationSet[i];
        string += terminationObj.termination;

        let params = terminationObj.parameters;
        for(key in params)
        {
            string += " " + key + "=" + params[key];
        }
        string += "\n" + "    ";
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

    return string;
}

function fromObjToString()
{
    var string = spriteSetToString(gameObj["SpriteSet"]);
    string += mappingObjToString(gameObj["LevelMapping"]);
    string += interactionSetToString(gameObj["InteractionSet"]);
    string += terminationSetToString(gameObj["TerminationSet"]);
    return string;
}