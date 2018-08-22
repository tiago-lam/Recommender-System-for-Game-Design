function interactionSetToString(interactionSet)
{
    var string = "";

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
        string += "\n";
    }

    console.log(string);
}

