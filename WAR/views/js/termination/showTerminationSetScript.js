var mapIdToTermination = new Map();
var mapTerminationIdToTerminationObj = [];


function buildTerminationSet(terminationSetObj)
{
    // var ulElement = document.getElementById('terminationList');
    // for(var i = 0; i < terminationSetObj.length; i++)
    // {
    //     var htmlText = convertTerminationObjectToText(terminationSetObj[i]);
    //     createDivForThisTerminationTextObj(htmlText, ulElement, 'termination' + i, terminationSetObj[i]);
    // }
    renderTerminationList(terminationSetObj);
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

function renderTerminationList(terminationList)
{
    for(var i = 0; i < terminationList.length; i++)
    {
        var terObj = terminationList[i];
        convertTerminationObjToHTML(terObj, i);
    }
}

function convertTerminationObjToHTML(terminationObj, index) {
    var parameters = terminationObj["parameters"];
    var result = ""

    if (parameters['win'] == 'False') {
        result = "Lose";
    } else {
        result = "Win"
    }

    if (terminationObj["termination"] == "SpriteCounter") {

        var div = document.createElement('div');
        var divContent =
            "<div id=termination" + index + " class=terminationContainerSc>\n" +
            "    <span>Sprite Counter</span>\n" +
            "    <div>\n" +
            "        If number of <span>" + parameters['stype'] + "</span> = <span>" + parameters['limit'] + "</span>" +
            " => <span>" + result + "</span>\n" +
            "    </div>\n" +
            "</div>";
        div.innerHTML = divContent;
        mapTerminationIdToTerminationObj['termination' + index] = terminationObj;
        document.getElementById('terminationList').appendChild(div);
        div.setAttribute("onmousedown", "showTerminationOnInspector('"+ 'termination' + index + "')");
    }

    if (terminationObj["termination"] == "Timeout") {
        var div = document.createElement('div');
        var divContent =
            "<div id=termination" + index + " class=terminationContainerTo>\n" +
            "    <span>Time Out</span>\n" +
            "    <div>\n" +
            "        If time = <span>" + parameters['limit'] + "</span> => <span>" + result + "</span>\n" +
            "    </div>\n" +
            "</div>"
        div.innerHTML = divContent;
        mapTerminationIdToTerminationObj['termination' + index] = terminationObj;
        document.getElementById('terminationList').appendChild(div);
        div.setAttribute("onmousedown", "showTerminationOnInspector('"+ 'termination' + index + "')");
    }

    if(terminationObj['termination'] == "MultiSpriteCounter")
    {
        var div = document.createElement('div');
        var divContent =
            "<div id=termination\" + index + class=terminationContainerMsc>\n" +
            "    <span>Multi Sprite Counter</span>\n" +
            "    <div>\n" +
            "        If number of <span>" + parameters['stype1'] + "</span> or <span>" + parameters['stype2'] + "</span> =" + parameters['limit'] + " <span></span>\n" +
            "         => <span>" + result + "</span>\n" +
            "    </div>\n" +
            "</div>"
        div.innerHTML = divContent;
        mapTerminationIdToTerminationObj['termination' + index] = terminationObj;
        document.getElementById('terminationList').appendChild(div);
        div.setAttribute("onmousedown", "showTerminationOnInspector('"+ 'termination' + index + "')");
    }

}

function showTerminationOnInspector(id)
{
    var terminationObj = mapTerminationIdToTerminationObj[id];
    if(terminationObj["termination"] == "SpriteCounter")
    {
        renderTerminationCondition('SpriteCounter');
        document.getElementById('sprite1Id').value = terminationObj['parameters']['stype'];
        document.getElementById('inputSpriteCounterId').value = terminationObj['parameters']['limit'];
        var winLose = terminationObj['parameters']['win'] ? "Win" : "Lose";
        document.getElementById('gameOverScId').value = winLose;

    }
    if(terminationObj["termination"] == "Timeout")
    {
        renderTerminationCondition("TimeOut");
        document.getElementById('timeOutInputId').value = terminationObj['parameters']['limit'];
        var winLose =  terminationObj['parameters']['win'] ? "Win" : "Lose";
        document.getElementById('gameOverToId').value = winLose;
    }

    if(terminationObj["termination"] == "MultiSpriteCounter")
    {
        renderTerminationCondition("MultiSpriteCounter");
        document.getElementById('sprite1mscId').value = terminationObj['parameters']['stype1'];
        document.getElementById('sprite2mscId').value = terminationObj['parameters']['stype2'];
        document.getElementById('inputMspriteCounterId').value = terminationObj['parameters']['limit'];
        var winLose = terminationObj['parameters']['win'] ? "Win" : "Lose";
        document.getElementById('gameOverMscId').value = winLose;
    }

}



