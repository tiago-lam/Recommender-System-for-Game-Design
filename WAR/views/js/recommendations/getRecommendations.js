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
function askForRecommendations(type) {
    if(type != "Regular") {
        xmlhttp.open("GET", "http://localhost:9001/recc" + "?type=" + type, true);
        xmlhttp.send();
    }
}

function createReccomendationList(recommendationList)
{
    resetRecommendations();
    var ul = document.getElementById("recommenderUl");
    for(var i = 0; i < recommendationList.length; i++)
    {
        var recommendation = recommendationList[i];
        var gameName = recommendation["game"];
        var sprite = recommendation["sprites"];

        var li = document.createElement('li');
        li.classList.add('recLiClass');

        var span = document.createElement('span');
        span.classList.add("recSpanClass");
        span.innerHTML = "from " + gameName;

        var div = document.createElement('div');
        div.id = sprite.identifier + "Rec" + i;
        div.classList.add("recDivClass");
        div.innerHTML = sprite.identifier;
        div.setAttribute('onmousedown', 'getRecObj(this.id)');

        if('img' in sprite.parameters)
        {
            var img = document.createElement('img');
            img.classList.add('recImgClass');
            img.src = sprite.parameters["img"] + ".png";
            div.appendChild(img);
        }

        span.appendChild(div);
        li.appendChild(span);
        ul.appendChild(li);

        mapRecommendationToObj.set(div.id, sprite);
    }
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
        refreshGame(gameObj);
        askForRecommendations(obj.referenceClass);
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