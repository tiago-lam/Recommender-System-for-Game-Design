function cleanLevel()
{
    var table = document.getElementById('gridTableId');
    var divCollection = table.getElementsByTagName('div');
    for(var i = 0; i < divCollection.length; i++)
    {
        divCollection[i].removeChild(divCollection[i].childNodes[0]);
    }
}

function redoMap()
{
    if(levelStates.count == 0)
    {
        levelStates.count = levelStates.levelMap.length;
    }
    var mapToDraw = levelStates.levelMap[levelStates.count - 1];
    levelMatrixObject.map = mapToDraw;
    cleanLevel();
    drawLevel();
    levelStates.count--;

}

function redoLevelByPressingCtrlZ(e) {
    var evtobj = window.event? event : e
    if (evtobj.keyCode == 90 && evtobj.ctrlKey)
    {
        redoMap();
    }
}