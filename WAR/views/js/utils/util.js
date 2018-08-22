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
