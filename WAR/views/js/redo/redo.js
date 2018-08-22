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

function redoSpriteSet(game)
{
    var sprites = game["SpriteSet"];
    deleteSpriteHierarchyList();
    buildTheSpriteSet(sprites, spriteList);
    activateHierarchyListSort();
    getObjectForUpdatingOnMouseClick();
    updateObjectsAfterListChange();
}

function redoInteractionSet(game)
{
    var interactions = game["InteractionSet"];
    deleteInteractionList();
    buildTheInteractionSet(interactions);
}

function redoGame() {
    if (gameStates.count == 0) {
        gameStates.count = gameStates.states.length;
    }

    if (gameStates.count >= 1) {
        var game = gameStates.states[gameStates.count - 1];
        gameStates.count--;
        game = JSON.parse(game);
        redoSpriteSet(game);
        redoInteractionSet(game);
    } else {
        alert("no game state saved");
    }
}

function redoProcedureByPressingCtrlZ(e) {

    var levelMapTab = document.getElementById('levelMap');
    var spriteSetTab = document.getElementById('spriteSet');
    var interactionSetTab = document.getElementById('interactionSet');

    var evtobj = window.event ? event : e
    if (evtobj.keyCode == 90 && evtobj.ctrlKey) {

        if(levelMapTab.checked) {
            redoMap();
        }

        if(spriteSetTab.checked || interactionSetTab.checked)
        {
            redoGame();
        }

    }

}