//stype
function updateStypeValue(val, updateFunction)
{
    var selectComponent = document.getElementById('stypeSelectId');
    var choice = selectComponent.options[val];
    updateFunction(choice.value, 'stype');
}

function updateStypeParameter(obj)
{
    var selectComponent = document.getElementById('stypeSelectId');
    selectComponent.disabled = checkIfItsParentHasParam(obj, 'stype');
    updateSelectParameter("stypeSelectId", obj.parameters["stype"]);
}

//spawnorientation
function updateSelectSpawnValue(val, updateFunction)
{
    var selectComponent = document.getElementById('spawnOrientationSelectId');
    var choice = selectComponent.options[val];
    updateFunction(choice.value, 'spawnorientation');
}

function updateSpawnOrientationParameter(obj)
{
    var selectComponent = document.getElementById('spawnOrientationSelectId');
    selectComponent.disabled = checkIfItsParentHasParam(obj, 'spawnorientation');
    var id = "spawnOrientationSelectId";
    updateSelectParameter(id, obj.parameters["spawnorientation"]);
}

//prob
function updateProbValue(val, updateFunction)
{
    document.getElementById('probInputId').textContent=val;
    updateFunction(val, "prob");
}

function updateProbParameter(obj) {
    var inputRangeControl = document.getElementById("probInputId");
    inputRangeControl.disabled = checkIfItsParentHasParam(obj, "prob");

    var spanValue = document.getElementById("probSpanId");
    manageParameterValues(spanValue, inputRangeControl, obj.parameters, 0, "prob");
}

//total
function updateTotalValue(val, updateFunction)
{
    document.getElementById("totalInputId").value = val;
    updateFunction(val, "total");
}

function updateTotalParameter(obj)
{
    var inputNumberControl = document.getElementById("totalInputId");
    inputNumberControl.disabled = checkIfItsParentHasParam(obj, "total");
}

//ammo
function updateSelectAmmoValue(val, updateFunction)
{
    var selectComponent = document.getElementById('ammoSelectId');
    var choice = selectComponent.options[val];
    updateFunction(choice.value, 'ammo');
}

function updateAmmoParameter(obj)
{
    var selectComponent = document.getElementById('ammoSelectId');
    selectComponent.disabled = checkIfItsParentHasParam(obj, 'ammo');
    updateSelectParameter("ammoSelectId", obj.parameters["ammo"]);
}

//stype1
function updateStype1Value(val, updateFunction)
{
    var selectComponent = document.getElementById('stype1SelectId');
    var choice = selectComponent.options[val];
    updateFunction(choice.value, 'stype1');
}

function updateStype1Parameter(obj)
{
    var selectComponent = document.getElementById('stype1SelectId');
    selectComponent.disabled = checkIfItsParentHasParam(obj, 'stype1');
    updateSelectParameter("stype1SelectId", obj.parameters["stype1"]);
}

//stype2
function updateStype2Value(val, updateFunction)
{
    var selectComponent = document.getElementById('stype2SelectId');
    var choice = selectComponent.options[val];
    updateFunction(choice.value, 'stype2');
}

function updateStype2Parameter(obj)
{
    var selectComponent = document.getElementById('stype2SelectId');
    selectComponent.disabled = checkIfItsParentHasParam(obj, 'stype2');
    updateSelectParameter("stype2SelectId", obj.parameters["stype2"]);
}

//limit
function updateLimitValue(val, updateFunction)
{
    document.getElementById("limitInputId").value = val;
    updateFunction(val, "limit");
}

function updateLimitParameter(obj)
{
    var inputNumberControl = document.getElementById("limitInputId");
    inputNumberControl.disabled = checkIfItsParentHasParam(obj, "limit");
}

//value -- sorry for the redundancy
function updateValueValue(val, updateFunction)
{
    document.getElementById("valueInputId").value = val;
    updateFunction(val, "value");
}

function updateValueParameter(obj)
{
    var inputNumberControl = document.getElementById("valueInputId");
    inputNumberControl.disabled = checkIfItsParentHasParam(obj, "value");
}

//minAmmo
function updateMinAmmoValue(val, updateFunction)
{
    document.getElementById("minAmmoId").value = val;
    updateFunction(val, "minAmmo");
}

function updateMinAmmoParameter(obj)
{
    var inputNumberControl = document.getElementById("minAmmoId");
    inputNumberControl.disabled = checkIfItsParentHasParam(obj, "minAmmo");
}

//ammoCost
function updateAmmoCostValue(val, updateFunction)
{
    document.getElementById("ammoCostId").value = val;
    updateFunction(val, "ammoCost");
}

function updateAmmoCostParameter(obj)
{
    var inputNumberControl = document.getElementById("ammoCostId");
    inputNumberControl.disabled = checkIfItsParentHasParam(obj, "ammoCost");
}

//spreadprob
function updateSpreadProbValue(val, updateFunction)
{
    document.getElementById('spreadProbRangeId').textContent=val;
    updateFunction(val, "spreadprob");
}

function updateSpreadProbParameter(obj) {
    var inputRangeControl = document.getElementById("spreadProbRangeId");
    inputRangeControl.disabled = checkIfItsParentHasParam(obj, "spreadprob");

    var spanValue = document.getElementById("spreadProbSpanId");
    manageParameterValues(spanValue, inputRangeControl, obj.parameters, 0, "spreadprob");
}