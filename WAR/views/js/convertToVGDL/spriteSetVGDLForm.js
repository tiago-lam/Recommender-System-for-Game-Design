function spriteSetToString(spriteSet)
{
    var string = "";
    for(var i = 0; i < spriteSet.length; i++)
    {
        string = string + JSONtoString(spriteSet[i], 0);
    }
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
}

