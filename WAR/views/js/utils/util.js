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

function findItemBySelect(selectElement, index)
{
    var opts = selectElement.options;
    return opts[index].value;
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

function confirmDialog(message, forWhat, target){

    console.log(target);
    $('<div></div>').appendTo('body')
        .html('<div><h6>'+message+'?</h6></div>')
        .dialog({
            modal: true, title: 'Delete message', zIndex: 10000, autoOpen: true,
            width: 'auto', resizable: false,
            buttons: {
                Yes: function () {
                    if(forWhat == 'interaction')
                    {
                        var interactionObject = extractInteractionFromDivHTMLText(target);
                        addRecommendedInteraction(gameObj.InteractionSet, interactionObject);
                        removeObjectFromTheRecommendationList(target.id);
                    }
                    $(this).dialog("close");
                },
                No: function () {
                    //$('body').append('<h1>Confirm Dialog Result: <i>No</i></h1>');
                    $(this).dialog("close");
                }
            },
            close: function (event, ui) {
                $(this).remove();
            }
        });
};

function stopServer()
{
    xhr = new XMLHttpRequest();
    var url = "http://localhost:9001/stop?" + "command=stop";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "text/plain");
    xhr.send();
}


