function saveProcedure()
{
    //save game procedure
    if(gameStates.count == gameStates.capacity)
    {
        gameStates.count = 0;
    }
    gameObj["Level"] = saveLevelState();
    let game = Object.freeze(JSON.stringify(gameObj));
    gameStates.states[gameStates.count] = game;
    gameStates.count++;
    //alert("game and level changes saved");
}
