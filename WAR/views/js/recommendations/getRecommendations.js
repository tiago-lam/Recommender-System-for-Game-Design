var mapRecommendationToObj = new Map();

var xmlhttp = new XMLHttpRequest();
/**
 * Function responsible for perform the GET response
 */
xmlhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var recommendationList = JSON.parse(this.responseText);
        createReccomendationList(recommendationList);
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
    for(var i = 0; i < spriteSet.length; i++)
    {
        var obj = spriteSet[i];
        if(obj.referenceClass)
        {
            if(!types.includes(obj.referenceClass))
            {
                types.push(obj.referenceClass);
            }
        }

        if(obj.children.length > 0)
        {
            var childs = obj.children;
            for(var j = 0; j < childs.length; j++)
            {
                sendSpriteTypesToTheServe(childs[j]);
            }
        }
    }

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
        //commonDiv.setAttribute("onmouseover", "retrieveRecommendationObj(this.id)");
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

        commonDiv.appendChild(commonSpriteImg);
        var obj = retrieveRecommendationObj(commonDiv.id);
        var commonInfoDiv = divObj(obj);
        commonDiv.appendChild(commonInfoDiv);

        spriteContainerDiv.appendChild(specializedSpan);
        spriteContainerDiv.appendChild(specializedDiv);
        spriteContainerDiv.appendChild(commonSpan);
        spriteContainerDiv.appendChild(commonDiv);

        containerDiv.appendChild(groupSpanDiv);
        containerDiv.appendChild(spriteContainerDiv);

        ul.appendChild(containerDiv);
    }
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
    updateInspectorRec(recObj);
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

function updateInspectorRec(obj)
{
    console.log(obj);

    updateNameAndImage(obj);

    initializeCurrentObj(obj);

    updateAnalogueParametersRec(obj);//

    controlingDigitalParametersRec(obj);//

    updateOrientationParameterRec(obj);//

    updateReferenceClassSelectValue(obj);

    designSpecialTypesParameters(obj, obj.parameters);

    updatingSpecialParameterValuesRec(obj);
}

function updateAnalogueParametersRec(obj)
{
    var shrinkControl = document.getElementById("shrinkControl");
    var speedControl = document.getElementById('speedControl');
    var cooldownControl = document.getElementById("cooldownControl");

    var shrinkValue = document.getElementById("shrinkValue");
    var speedValue = document.getElementById('speedValue');
    var cooldownValue = document.getElementById("cooldownValue");

    if (("parameters" in obj)) {
        var parameters = obj["parameters"];
        manageParameterValues(speedValue, speedControl, parameters, 1, "speed");
        manageParameterValues(shrinkValue, shrinkControl, parameters, 0, "shrinkfactor");
        manageParameterValues(cooldownValue, cooldownControl, parameters, 1, "cooldown");
    }

}

function controlingDigitalParametersRec(obj)
{
    var invisibleCheckBoxControl =  document.getElementById("invisibleCheckBoxId");
    var singletonCheckBoxControl =  document.getElementById("singletonCheckBoxId");
    var rotateCheckBoxControl =  document.getElementById("rotateCheckBoxId");

    updatingTheDigitalParameterValues(obj, invisibleCheckBoxControl, singletonCheckBoxControl, rotateCheckBoxControl);
}

function updateOrientationParameterRec(obj)
{
    var selectComponent = document.getElementById('orientationSelectId');
    updateSelectParameter("orientationSelectId", obj.parameters["orientation"]);
}

function updatingSpecialParameterValuesRec(obj) {
    if ("stype" in obj.parameters) {
        updateStypeParameterRec(obj);
    }

    if ("spawnorientation" in obj.parameters) {
        updateSpawnOrientationParameterRec(obj);
    }

    if ("prob" in obj.parameters) {
        updateProbParameterRec(obj);
    }

    if ("total" in obj.parameters) {
        updateTotalParameterRec(obj);
    }

    if ("ammo" in obj.parameters) {
        updateAmmoParameterRec(obj);
    }

    if ("stype1" in obj.parameters) {
        updateStype1ParameterRec(obj);
    }

    if ("stype2" in obj.parameters) {
        updateStype2ParameterRec(obj);
    }

    if ("limit" in obj.parameters) {
        updateLimitParameterRec(obj);
    }

    if ("minAmmo" in obj.parameters) {
        updateMinAmmoParameterRec(obj);
    }

    if ("ammoCost" in obj.parameters) {
        updateAmmoCostParameterRec(obj);
    }

    if ("spreadprob" in obj.parameters) {
        updateSpreadProbParameterRec(obj);
    }

    if("value" in obj.parameters)
    {
        updateValueParameterRec(obj);
    }
}

function updateStypeParameterRec(obj)
{
    var selectComponent = document.getElementById('stypeSelectId');
    updateSelectParameter("stypeSelectId", obj.parameters["stype"]);
}

function updateSpawnOrientationParameterRec(obj)
{
    var selectComponent = document.getElementById('spawnOrientationSelectId');
    var id = "spawnOrientationSelectId";
    updateSelectParameter(id, obj.parameters["spawnorientation"]);
}

function updateProbParameterRec(obj) {
    var inputRangeControl = document.getElementById("probInputId");
    var spanValue = document.getElementById("probSpanId");
    manageParameterValues(spanValue, inputRangeControl, obj.parameters, 0, "prob");
}

function updateTotalParameterRec(obj)
{
    var inputNumberControl = document.getElementById("totalInputId");
}

function updateAmmoParameterRec(obj)
{
    var selectComponent = document.getElementById('ammoSelectId');
    updateSelectParameter("ammoSelectId", obj.parameters["ammo"]);
}

function updateStype1ParameterRec(obj)
{
    var selectComponent = document.getElementById('stype1SelectId');
    updateSelectParameter("stype1SelectId", obj.parameters["stype1"]);
}

function updateStype2ParameterRec(obj)
{
    var selectComponent = document.getElementById('stype2SelectId');
    updateSelectParameter("stype2SelectId", obj.parameters["stype2"]);
}

function updateLimitParameterRec(obj)
{
    var inputNumberControl = document.getElementById("limitInputId");
}

function updateMinAmmoParameterRec(obj)
{
    var inputNumberControl = document.getElementById("minAmmoId");
}

function updateAmmoCostParameterRec(obj)
{
    var inputNumberControl = document.getElementById("ammoCostId");
}

function updateSpreadProbParameterRec(obj) {
    var inputRangeControl = document.getElementById("spreadProbRangeId");
    var spanValue = document.getElementById("spreadProbSpanId");
    manageParameterValues(spanValue, inputRangeControl, obj.parameters, 0, "spreadprob");
}

function updateValueParameterRec(obj)
{
    var inputNumberControl = document.getElementById("valueInputId");
}
