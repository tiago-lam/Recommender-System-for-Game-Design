var checker = false;

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

    for (var paramKey in obj.parameters) {
        if(paramKey == "img")
        {
            obj.parameters[paramKey] =
                obj.parameters[paramKey].replace("http://localhost:9001/WAR/views/", "")
            if(!obj.parameters[paramKey].includes(".png"))
            {
                obj.parameters[paramKey] = obj.parameters[paramKey];
            }
        }

        if(paramKey == "stype" || paramKey == "stype1" || paramKey == "stype2")
        {
            if(!mapIdentifierToObject.has(obj.parameters[paramKey]))
            {
                alert(obj['identifier'] + " param: " + paramKey + ", needs to be signed");
                checker = true;
            }
        }

        if(obj.parameters[paramKey] != "none") {
            objString = objString + " " + paramKey + "=" + obj.parameters[paramKey];
        }
        else
        {
            if(paramKey == "stype" || paramKey == "stype1" || paramKey == "stype2") {
                alert(obj['identifier'] + " param: " + paramKey + ", needs to be signed");
                checker = true;
            }
        }
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
    var avatarsInTheMap = checkHowManyAvatarsAreInTheMap();

    if(avatarsInTheMap == 0 || avatarsInTheMap > 1) {

        $("<div class=warning' title='Warning'>" +
                "To run the game, make sure to have only one avatar object in the level map" +
            "</div>")
        .dialog();
        return;
    }

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

    if(getGameParam != null && getGameParam.replace("game=","") == "pacman")
    {
        var complete = "BasicGame square_size=20 obs=wall";
        string = complete + string;
    }

    var stringLevel = levelObjToString(gameObj["Level"]);
    var description = {game: string, level: stringLevel};
    return description;
}

function play()
{
    var hasAvatar = checkIfSpriteSetHasAnAvatar(gameObj["SpriteSet"])

    console.log("play");
    xhr = new XMLHttpRequest();
    var agent = document.getElementById('agentGameSelect');
    var url = "http://localhost:9001/play?" + "agent=" + agent.options[agent.selectedIndex].value;
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

    if(!checker) {
        xhr.send(data);
        setInterval(getImage(), 200);
    }
    else
        {
            $("<div class=warning' title='Warning'>" +
                "Errors in the game description. Check your Sprite, Interaction, and Termination sets" +
                "</div>")
                .dialog();
            checker = false;
        }

}

function getImage()
{
    frameXmlhttp.open("GET", "http://localhost:9001/frames", true);
    frameXmlhttp.send();
}

/*******************compiling********************************/

function checkIfSpriteSetHasAnAvatar(spriteSet)
{
    for(var i = 0; i < spriteSet.length; i++)
    {
        var obj = spriteSet[i];
        if(obj.referenceClass != null && obj.referenceClass.includes("Avatar"))
        {
            return true;
        }

        if(obj.children.length > 0)
        {
            var childs = obj.children;
            for(var j = 0; j < childs.length; j++)
            {
                checkIfSpriteSetHasAnAvatar(childs);
            }
        }
    }
    return false;
}

function getAvatarIdentifier()
{
    var spriteSet = gameObj["SpriteSet"];
    for(var i = 0; i < spriteSet.length; i++)
    {
        var obj = spriteSet[i];
        if(obj.referenceClass != null && obj.referenceClass.includes("Avatar"))
        {
            if(obj.referenceClass.includes("Avatar"))
            {
                return obj.identifier;
            }
        }

        if(obj.children.length > 0)
        {
            var childs = obj.children;
            for(var j = 0; j < childs.length; j++)
            {
                checkIfSpriteSetHasAnAvatar(childs);
            }
        }
    }
    return "No avatar found";
}

function gettingAvatarMapId()
{
    var avatarId = getAvatarIdentifier();
    if(avatarId != "No avatar found")
    {
        var levelMapping = gameObj["LevelMapping"];
        for(attr in levelMapping)
        {
            var elems = levelMapping[attr];
            if(elems.includes(avatarId))
            {
                return attr;
            }
        }
    }
    return "none";
}

function checkHowManyAvatarsAreInTheMap()
{
    //fix it - remove later
    if(getGameParam != null && getGameParam.replace("game=","") == "pacman")
    {return 1;}
    //
    var count = 0;
    var avatarMapId = gettingAvatarMapId();

    var lv = gameObj["Level"];
    for(var i = 0; i < lv.length; i++)
    {
        for(var j = 0; j < lv[i].length; j++)
        {
          if(lv[i][j] == avatarMapId)
          {
              count++;
          }
        }
    }

    return count;
}