function cleanLevel()
{
    var table = document.getElementById('gridTableId');
    var divCollection = table.getElementsByTagName('div');
    for(var i = 0; i < divCollection.length; i++)
    {
        if(divCollection[i].childNodes.length > 0)
        {
            divCollection[i].removeChild(divCollection[i].childNodes[0]);
        }
    }
}

function redoMap(game)
{
    levelMatrixObject.map = game["Level"];
    cleanLevel();
    drawLevel();
}

function redoSpriteSet(game)
{
    var sprites = game["SpriteSet"];
    deleteSpriteHierarchyList();
    buildTheSpriteSet(sprites, spriteList);
    activateHierarchyListSort();
    getObjectForUpdatingOnMouseClick();
    updateObjectsAfterListChange();
    removeAllElementsFromTheImgList();
    createImgList(sprites);
}

function redoInteractionSet(game) 
{
    var interactions = game["InteractionSet"];
    deleteInteractionList();
    buildTheInteractionSet(interactions);
}

function redoTerminationSet(game)
{
    var terminations = game['TerminationSet'];
    deleteTerminationList();
    buildTerminationSet(terminations);
}

function redoGame(refreshLevel) {

    if(gameStates.count > 0) {
        var game = gameStates.states[gameStates.count - 1];
        gameStates.count--;
        if(gameStates.count == 0) { gameStates.count = gameStates.states.length};
        game = JSON.parse(game);
        refreshGame(game, refreshLevel);
    }

}

function refreshGame(game, refreshLevel)
{
    redoSpriteSet(game);
    if(refreshLevel) redoMap(game);
    redoInteractionSet(game);
}

function redoProcedureByPressingCtrlZ(e) {

    var evtobj = window.event ? event : e
    if (evtobj.keyCode === 17 && evtobj.ctrlKey) {
        redoGame(true);
    }
    else if (e.key === "Escape") {
        var answer = confirm('Are you sure you want to reset the game')
        {
            if(answer)
            {
                localStorage.setItem("varGetGameParam", "_");
                location.reload();
            }
        }
    }


}