var gameStates = {count: 0, states: []};

function saveGameState()
{
    let game = Object.freeze(JSON.stringify(gameObj));
    //game = Object.freeze(game);
    //makeImmutable(game);
    gameStates.count++;
    gameStates.states.push(game);
    alert("game changes saved");
}