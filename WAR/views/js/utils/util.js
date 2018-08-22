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
