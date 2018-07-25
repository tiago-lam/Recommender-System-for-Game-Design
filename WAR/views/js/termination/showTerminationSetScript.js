var mapIdToTermination = new Map();
/**
 * access the serve in order to get the sprite set of a game
 * @type {XMLHttpRequest}
 * */
var xmlHttp = new XMLHttpRequest();
/**
 * Function responsible for perform the GET response
 */
xmlHttp.onreadystatechange = function() {

    var terminationList = document.getElementById('terminationList');
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var terminationSetObj = JSON.parse(this.responseText);
        buildTerminationSet(terminationSetObj, terminationList);
    }
};
/**
 * Prepare and send the GET request to the server -- get the interaction set
 */
xmlHttp.open("GET", "http://localhost:9001/terminationSet", true);
xmlHttp.send();

function buildTerminationSet(terminationSetObj, ulElement)
{
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