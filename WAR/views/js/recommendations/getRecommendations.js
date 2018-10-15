var mapRecommendationToObj = new Map();

var xmlhttp = new XMLHttpRequest();
/**
 * Function responsible for perform the GET response
 */
xmlhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        if(this.responseText.length > 1) {
            var recommendationList = JSON.parse(this.responseText);
            createReccomendationList(recommendationList);
        }
        else
        {
            console.log("nothing to recommend, sorry");
        }
    }
};
/**
 * Prepare and send the GET request to the server
 */
function askForRecommendations(sendSet) {
    if(sendSet != "") {
        xmlhttp.open("GET", "http://localhost:9001/recc" + "?askForRecommendations=" + sendSet, true);
        xmlhttp.send();
    }
}

var types = [];
function sendSpriteTypesToTheServe(spriteSet)
{
    types = typeSetCollection;
    var send = "";
    for(var i = 0; i < types.length; i++)
    {
        send = types[i] + " " + send;
    }
    types = [];
    askForRecommendations(send);
}

function createReccomendationList(recommendationList)
{
    resetRecommendations();
    var ul = document.getElementById("recommenderUl");
    for(var i = 0; i < recommendationList.length; i++)
    {
        var r = recommendationList[i];
        var confidence = r['confidence'];
        var type = r['type'];
        var specObj = r['specialized'];
        var commObj = r['common'];

        var containerDiv = document.createElement('div');
        containerDiv.id = "containerDiv";

        var gameNameDiv = document.createElement('div');
        gameNameDiv.id = "gameNameDiv";

        var gameNameSpan = document.createElement('span');
        gameNameSpan.id = 'gameNameSpan';
        gameNameSpan.classList.add('descriptionSpan');
        gameNameSpan.innerHTML = "From: ";

        var gameNameValueSpan = document.createElement('span');
        gameNameValueSpan.id = 'gameNameValueSpan';
        gameNameValueSpan.classList.add('spanValue');
        gameNameValueSpan.innerHTML = r['game'];

        var groupSpanDiv = document.createElement('div');
        groupSpanDiv.id = "groupSpanDiv";

        var confDiv = document.createElement('div');
        confDiv.id = "confDiv";

        var confSpan = document.createElement('span');
        confSpan.id = "confSpan";
        confSpan.innerHTML = "Confidence";
        confSpan.classList.add('descriptionSpan');

        var confSpanValue = document.createElement('span');
        confSpanValue.innerHTML = confidence;
        confSpanValue.classList.add('spanValue');

        var typeDiv = document.createElement('div');
        typeDiv.id = "typeDiv";

        var typeSpan = document.createElement('span');
        typeSpan.id = 'typeSpan';
        typeSpan.classList.add('descriptionSpan');
        typeSpan.innerHTML = "Type";

        var typeSpanValue = document.createElement('span');
        typeSpanValue.innerHTML = type;
        typeSpanValue.classList.add('spanValue');

        var spriteContainerDiv = document.createElement('div');
        spriteContainerDiv.id = 'spriteContainerDiv';
        var spanSpecialized = document.createElement('div');
        spanSpecialized.innerHTML = "Specialized";

        var specializedDiv = document.createElement('div');
        specializedDiv.id = "specializedDiv" + i;
        specializedDiv.classList.add('specializedDiv');
        mapRecommendationToObj.set(specializedDiv.id, specObj);

        var specializedSpan = document.createElement('span');
        specializedSpan.id = 'specializedSpan';
        specializedSpan.innerHTML = 'Specialized';

        var commonSpan = document.createElement('span');
        commonSpan.id = 'commonSpan';
        commonSpan.innerHTML = 'Common';

        var specializedSpriteImg = document.createElement('img');
        specializedSpriteImg.src = specObj.parameters['img'] + ".png";

        var commonDiv = document.createElement('div');
        commonDiv.id = "commonDiv" + i;
        commonDiv.classList.add("commonDiv");
        mapRecommendationToObj.set(commonDiv.id, commObj);

        var commonSpriteImg = document.createElement('img');
        commonSpriteImg.src = commObj.parameters['img'] + ".png";

        confDiv.appendChild(confSpan);
        confDiv.appendChild(confSpanValue);

        typeDiv.appendChild(typeSpan);
        typeDiv.appendChild(typeSpanValue);

        groupSpanDiv.appendChild(confDiv);
        groupSpanDiv.appendChild(typeDiv);

        specializedDiv.appendChild(specializedSpriteImg);
        var specObj = retrieveRecommendationObj(specializedDiv.id);
        var specInfoDiv = divObj(specObj);
        specializedDiv.appendChild(specInfoDiv);
        specializedDiv.setAttribute("onclick", "getRecObj(this.id)");

        commonDiv.appendChild(commonSpriteImg);
        var obj = retrieveRecommendationObj(commonDiv.id);
        var commonInfoDiv = divObj(obj);
        commonDiv.appendChild(commonInfoDiv);
        commonDiv.setAttribute("onclick", "getRecObj(this.id)");

        spriteContainerDiv.appendChild(specializedSpan);
        spriteContainerDiv.appendChild(specializedDiv);
        spriteContainerDiv.appendChild(commonSpan);
        spriteContainerDiv.appendChild(commonDiv);

        gameNameDiv.appendChild(gameNameSpan);
        gameNameDiv.appendChild(gameNameValueSpan);

        containerDiv.appendChild(gameNameDiv);
        containerDiv.appendChild(groupSpanDiv);
        containerDiv.appendChild(spriteContainerDiv);

        ul.appendChild(containerDiv);
    }
}

function show()
{
    alert('Show!');
}

function divObj(obj)
{
    var parContainerDiv = document.createElement('div');
    parContainerDiv.id = 'parContainerDiv';

    var nameDiv = document.createElement('div');
    nameDiv.id = 'nameDiv';

    var nameSpan = document.createElement('span');
    nameSpan.id = 'nameSpan';
    nameSpan.innerHTML = 'id: ' + obj.identifier;

    nameDiv.appendChild(nameSpan);
    parContainerDiv.appendChild(nameDiv);

    for(var par in obj.parameters)
    {
        if(par != "img") {
            var div = document.createElement('div');
            div.classList.add('parDiv');

            var keySpan = document.createElement('span');
            keySpan.classList.add('parKeySpan');
            keySpan.innerHTML = par;

            var valSpan = document.createElement('span');
            valSpan.classList.add('parKeyValue');
            valSpan.innerHTML = obj.parameters[par];

            div.appendChild(keySpan);
            div.appendChild(valSpan);
            parContainerDiv.appendChild(div);
        }
    }

    return parContainerDiv;
}

function retrieveRecommendationObj(id)
{
    return mapRecommendationToObj.get(id);
}

function getRecObj(id)
{
    var recObj = retrieveRecommendationObj(id);
    addToSpriteSet(recObj);
}

function addToSpriteSet(obj)
{
    if (confirm("Add to sprite set?")) {
        gameObj["SpriteSet"].push(obj);
        createLevelMappingForThisImage(obj.identifier);
        refreshGame(gameObj);
    }
}

function resetRecommendations()
{
    var ul = document.getElementById("recommenderUl");
    while (ul.childNodes.length > 0)
    {
        ul.removeChild(ul.lastChild);
    }

    mapRecommendationToObj = new Map();
}