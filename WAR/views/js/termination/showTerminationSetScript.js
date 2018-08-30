var mapIdToTermination = new Map();

function buildTerminationSet(terminationSetObj)
{
    var ulElement = document.getElementById('terminationList');
    for(var i = 0; i < terminationSetObj.length; i++)
    {
        var htmlText = convertTerminationObjectToText(terminationSetObj[i]);
        createDivForThisTerminationTextObj(htmlText, ulElement, 'termination' + i, terminationSetObj[i]);
    }
}

function convertTerminationObjectToText(obj)
{
    var termination = obj.termination;
    var parameters = obj.parameters; // this is a collection;
    var interactionText = termination;

    for(var key in parameters) {
        interactionText = interactionText + " " + key + " " + parameters[key];
    }

    return interactionText;
}

function createDivForThisTerminationTextObj(textToPutInTheDiv, parentElement, id, terminationObj)
{
    var div = document.createElement('div');
    div.classList.add('terminationDiv');
    div.id = id;
    div.innerHTML = textToPutInTheDiv;
    mapIdToTermination.set(id, terminationObj);
    div.setAttribute("onclick", "getTerminationForUpdatingOnMouseClick(this.id)");
    parentElement.append(div);
}

function updateTerminationElementText(obj, elementId)
{
    var text = convertTerminationObjectToText(obj);
    document.getElementById(elementId).innerHTML = text;
}

function getTerminationForUpdatingOnMouseClick(e) {
    var terminationObj = mapIdToTermination.get(e);
    showTerminationInfo(terminationObj, e);
}