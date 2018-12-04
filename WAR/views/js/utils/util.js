function deleteElementsFrom(htmlObject) {
    while(htmlObject.childNodes.length > 0)
    {
        htmlObject.removeChild(htmlObject.lastChild);
    }
}

function removeItemFrom(array, obj)
{
    var index = array.indexOf(obj);
    if (index > -1) {
        array.splice(index, 1);
    }
}

function findItemIndexInSelectElement(selectElement, item)
{
    var opts = selectElement.options;
    for (var opt, j = 0; opt = opts[j]; j++) {
        if (opt.value == item) {
            return j;
        }
    }
    return -1;
}

function removeSelectItemFrom(selectElement, item)
{
    var index = findItemIndexInSelectElement(selectElement, item);
    if(index != -1)
    {
        selectElement.remove(index);
    }
}

function storeNamesOfThisObjAndItsKids(obj, familyNames)
{
    familyNames.push(obj.identifier);
    if(obj.children.length > 0)
    {
        for(var i = 0; i < obj.children.length; i++)
        {
            storeNamesOfThisObjAndItsKids(obj.children[i], familyNames);
        }
    }
    return familyNames;
}

var targetObject;

function getObjFromSpriteName(spriteSet, spriteName)
{
    for(var i = 0; i < spriteSet.length; i++)
    {
        var obj = spriteSet[i];
        if(obj.identifier == spriteName)
        {
            targetObject = obj;
        }


        for(var j = 0; j < obj.children.length; j++)
        {
            getObjFromSpriteName(obj.children, spriteName);
        }
    }
}

function retrieveObjFromSpriteName(spriteSet, spriteName)
{
    getObjFromSpriteName(spriteSet, spriteName);
    var retrievedObj = targetObject;
    targetObject = undefined;
    return retrievedObj;
}


