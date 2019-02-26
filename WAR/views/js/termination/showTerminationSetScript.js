var mapIdToTermination = new Map();
var mapTerminationIdToTerminationObj = [];
var currentTerminationId;

function deleteTerminationDiv(index)
{
    var content = "";
    var div = document.createElement('div')
    div.id = "cancel_termination" + index;
    div.classList.add('cancelTerminationDiv');
    div.setAttribute('onmousedown', "removeTerminationButton(event)");

    var img = document.createElement('img');
    img.id = 'cancel_img_' + index;
    img.src = 'http://localhost:9001/WAR/views/css/cancel.png';
    div.appendChild(img);
    content = div.outerHTML;
    return content;
}

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
    var div = document.createElement('div');
    var parameters = terminationObj["parameters"];
    let htmlString = "";
    var result = ""

    if (parameters['win'] == 'False') {
        result = "Lose";
    } else {
        result = "Win"
    }

    if (terminationObj["termination"] == "SpriteCounter") {

        var divContent =
            "<div id=termination" + index + " class=terminationContainerSc>\n" +
            "    <span>Sprite Counter</span>\n" +
            "    <div>\n" +
            "        If number of <span>" + parameters['stype'] + "</span> = <span>" + parameters['limit'] + "</span>" +
            " => <span>" + result + "</span>\n" +
            "    </div>\n" +
                deleteTerminationDiv(index) +
            "</div>";
        htmlString = divContent;
        div.innerHTML = divContent;
        mapTerminationIdToTerminationObj['termination' + index] = terminationObj;
        document.getElementById('terminationList').appendChild(div);
        div.setAttribute("onmousedown", "showTerminationOnInspector('"+ 'termination' + index + "')");
    }

    if (terminationObj["termination"] == "Timeout") {

        var divContent =
            "<div id=termination" + index + " class=terminationContainerTo>\n" +
            "    <span>Time Out</span>\n" +
            "    <div>\n" +
            "        If time = <span>" + parameters['limit'] + "</span> => <span>" + result + "</span>\n" +
            "    </div>\n" +
                deleteTerminationDiv(index) +
            "</div>"
        div.innerHTML = divContent;
        htmlString = divContent;
        mapTerminationIdToTerminationObj['termination' + index] = terminationObj;
        document.getElementById('terminationList').appendChild(div);
        div.setAttribute("onmousedown", "showTerminationOnInspector('"+ 'termination' + index + "')");
    }

    if(terminationObj['termination'] == "MultiSpriteCounter")
    {

        var divContent =
            "<div id=termination" + index + " class=terminationContainerMsc>\n" +
            "    <span>Multi Sprite Counter</span>\n" +
            "    <div>\n" +
            "        If number of <span>" + parameters['stype1'] + "</span> or <span>" + parameters['stype2'] + "</span> =" + parameters['limit'] + " <span></span>\n" +
            "         => <span>" + result + "</span>\n" +
            "    </div>\n" +
                deleteTerminationDiv(index) +
            "</div>"
        div.innerHTML = divContent;
        htmlString = divContent;
        mapTerminationIdToTerminationObj['termination' + index] = terminationObj;
        document.getElementById('terminationList').appendChild(div);
        div.setAttribute("onmousedown", "showTerminationOnInspector('"+ 'termination' + index + "')");
    }
    return htmlString;
}

function setTerminationObjToHTML(terminationObj, index) {

    var parameters = terminationObj["parameters"];
    let htmlString = "";
    var result = ""

    if (parameters['win'] == 'False') {
        result = "Lose";
    } else {
        result = "Win"
    }

    if (terminationObj["termination"] == "SpriteCounter") {

        var divContent =
            "    <span>Sprite Counter</span>\n" +
            "    <div>\n" +
            "        If number of <span>" + parameters['stype'] + "</span> = <span>" + parameters['limit'] + "</span>" +
            " => <span>" + result + "</span>\n" +
            "    </div>\n";
        htmlString = divContent;
    }

    if (terminationObj["termination"] == "Timeout") {

        var divContent =
            "    <span>Time Out</span>\n" +
            "    <div>\n" +
            "        If time = <span>" + parameters['limit'] + "</span> => <span>" + result + "</span>\n" +
            "    </div>\n";
        htmlString = divContent;
    }

    if(terminationObj['termination'] == "MultiSpriteCounter")
    {

        var divContent =
            "    <span>Multi Sprite Counter</span>\n" +
            "    <div>\n" +
            "        If number of <span>" + parameters['stype1'] + "</span> or <span>" + parameters['stype2'] + "</span> =" + parameters['limit'] + " <span></span>\n" +
            "         => <span>" + result + "</span>\n" +
            "    </div>\n";
        htmlString = divContent;
    }
    return htmlString;
}

function showTerminationOnInspector(id)
{
    currentTerminationId = id;
    var terminationObj = mapTerminationIdToTerminationObj[id];
    if(terminationObj["termination"] == "SpriteCounter")
    {
        renderTerminationCondition('SpriteCounter');
        document.getElementById('sprite1Id').value = terminationObj['parameters']['stype'];
        document.getElementById('inputSpriteCounterId').value = terminationObj['parameters']['limit'];
        var winLose =
            (terminationObj['parameters']['win'] == "True") ? "Win" : "Lose";
        document.getElementById('gameOverScId').value = winLose;

    }
    if(terminationObj["termination"] == "Timeout")
    {
        renderTerminationCondition("TimeOut");
        document.getElementById('timeOutInputId').value = terminationObj['parameters']['limit'];
        var winLose =
            (terminationObj['parameters']['win'] == "True") ? "Win" : "Lose";
        document.getElementById('gameOverToId').value = winLose;
    }

    if(terminationObj["termination"] == "MultiSpriteCounter")
    {
        renderTerminationCondition("MultiSpriteCounter");
        document.getElementById('sprite1mscId').value = terminationObj['parameters']['stype1'];
        document.getElementById('sprite2mscId').value = terminationObj['parameters']['stype2'];
        document.getElementById('inputMspriteCounterId').value = terminationObj['parameters']['limit'];
        var winLose =
            (terminationObj['parameters']['win'] == "True") ? "Win" : "Lose";
        document.getElementById('gameOverMscId').value = winLose;
    }

}

function updateThisParameterInsideObj(value, param)
{
    var terminationObj = mapTerminationIdToTerminationObj[currentTerminationId];
    if(terminationObj == undefined) return;
    if(param == 'win') {
        terminationObj['parameters'][param] = (value == 'Win') ? 'True' : 'False';
    }
    else {
        terminationObj['parameters'][param] = value;
    }
     var htmlString = setTerminationObjToHTML(terminationObj,
         currentTerminationId.replace("termination", ""));
    document.getElementById(currentTerminationId).innerHTML
        = htmlString;
}

function removeTerminationButton(e)
{
    var isOkToRemove = confirm("Are you sure yo want to remove this item?");
    if(isOkToRemove) {
        saveGameState();
        removeObjectFromTheTerminationSet(e);
    }
}

function removeObjectFromTheTerminationSet(e)
{
    var objID = e.target.id;
    objID = "termination" + objID.replace("cancel_img_", "");
    var obj = mapTerminationIdToTerminationObj[objID];
    deleteObjectInTheTerminationSet(obj);
    document.getElementById(objID).remove();
    delete mapTerminationIdToTerminationObj[objID];
}

function deleteObjectInTheTerminationSet(obj) {
    removeItemFrom(terminationSetObj, obj);
}

function addTermination()
{
    var selectChoice = document.getElementById('selectTerminationConditionId').value;

    var terminationObj = new Object();
    terminationObj['parameters'] = {};

    if(selectChoice == 'SpriteCounter')
    {
        terminationObj['termination'] = 'SpriteCounter';
        var stype = document.getElementById('sprite1Id').value;
        terminationObj['parameters']['stype'] = stype;
        var limit = document.getElementById('inputSpriteCounterId').value;
        terminationObj['parameters']['limit'] = limit;
        var win = document.getElementById('gameOverScId').value;
        terminationObj['parameters']['win'] = (win == 'Win') ? 'True' : 'False';
        if(checkIfTerminalObjHasEmptyKey(terminationObj)) { return; }
        return terminationObj;
    }

    if(selectChoice == 'MultiSpriteCounter')
    {
        terminationObj['termination'] = 'MultiSpriteCounter';
        var stype1 = document.getElementById('sprite1mscId').value;
        terminationObj['parameters']['stype1'] = stype1;
        var stype2 = document.getElementById('sprite2mscId').value;
        terminationObj['parameters']['stype2'] = stype2;
        var limit = document.getElementById('inputMspriteCounterId').value;
        terminationObj['parameters']['limit'] = limit;
        var win = document.getElementById('gameOverMscId').value;
        terminationObj['parameters']['win'] = (win == 'Win') ? 'True' : 'False';
        if(checkIfTerminalObjHasEmptyKey(terminationObj)) { return; }
        return terminationObj;
    }

    if(selectChoice == "TimeOut")
    {
         terminationObj['termination'] = 'Timeout';
        var limit = document.getElementById('timeOutInputId').value;
        terminationObj['parameters']['limit'] = limit;
        var win = document.getElementById('gameOverToId').value;
        terminationObj['parameters']['win'] = (win == 'Win') ? 'True' : 'False';
        if(checkIfTerminalObjHasEmptyKey(terminationObj)) { return; }
        return terminationObj;
    }

}

function checkIfTerminalObjHasEmptyKey(terminalObj)
{
    for(var k in terminalObj)
    {
        if(terminalObj[k] == "" || terminalObj[k] == undefined)
        {
            $("<div class=warning' title='Warning'>" +
                "Cannot add this termination: parameter " + k + " is empty or not defined" +
                "</div>")
                .dialog();
           return true;
        }
    }
    return false;
}

function addTerminationToTerminationSet(terminationObj)
{
    gameObj["TerminationSet"].push(terminationObj);
    refreshGame(gameObj, false);
    hideoutTerminationPopup();
}

function addTerminationMainCall()
{
    var terminationObj = addTermination();
    if(terminationObj == undefined)
    {
        return;
    }
    else
    {
        addTerminationToTerminationSet(terminationObj);
        redoTerminationSet(gameObj);
    }
}

$(document).ready(function() {

    $("#showTerminationComposePanel").click(function() {
        showTerminationPopup();
    });

    $("#popup").click(function() {

        // $(this).hide();
        // $(".mask").show();

    });

});

function hideoutTerminationPopup() {
    $('#terminationPopup').hide();
    $(".terminationMask").show();
    var insp = document.getElementById('terminationInspector');
    var inspClone = insp.cloneNode(true);
    var div = document.getElementById('terminationSetId');
    if(!div.contains(insp))
    {
        div.appendChild(inspClone);
    }
    var pop = document.getElementById("terminationPopup");
    if(pop.childNodes.length > 1)
    {
        pop.removeChild(pop.lastChild);
    }
}

function showTerminationPopup() {
    // show the mask

    //$(".mask").fadeTo(1000, 0.0);
    $(".terminationMask").hide();

    // show the popup
    $("#terminationPopup").show();

    var div = document.getElementById('terminationPopup');
    if(!div.contains(document.getElementById('terminationInspector'))) {
        var insp = document.getElementById('terminationInspector');
        var inspClone = insp.cloneNode(true);
        div.appendChild(inspClone);
    }

    // interactionObjX = createInteractionX();
    // showInfo(interactionObjX);
}

function deleteTerminationList()
{
    var terminationList = document.getElementById('terminationList');
    deleteElementsFrom(terminationList);
}




