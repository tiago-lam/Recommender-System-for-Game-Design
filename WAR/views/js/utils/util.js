function deleteElementsFrom(htmlObject) {
    while(htmlObject.childNodes.length > 0)
    {
        htmlObject.removeChild(htmlObject.lastChild);
    }
}

