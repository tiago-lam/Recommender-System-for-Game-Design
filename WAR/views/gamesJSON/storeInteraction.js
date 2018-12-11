var interactionData = {totalCount: 0};

function addInteraction(interaction)
{
    if(interaction in interactionData)
        interactionData[interaction]++;
    else
        interactionData[interaction] = 1;
    interactionData.totalCount++;
}

function getConfidenceOfThis(interaction)
{
    return interactionData[interaction] / interactionData.totalCount;
}

function sortInteractionData()
{
    var keysSorted = Object.keys(interactionData).sort(function(a,b){return interactionData[a]-interactionData[b]});
    keysSorted.pop();
    return keysSorted;
}