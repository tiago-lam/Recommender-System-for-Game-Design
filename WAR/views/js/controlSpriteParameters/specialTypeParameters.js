//stype
function updateStypeValue(val, updateFunction)
{
    var selectComponent = document.getElementById('selectStypeId');
    var choice = selectComponent.options[val];
    updateFunction(choice.value, 'stype');
}

function updateStypeParameter(obj)
{
    var selectComponent = document.getElementById('selectStypeId');
    selectComponent.disabled = checkIfItsParentHasParam(obj, 'stype');
    updateSelectParameter("selectStypeId", obj.parameters["stype"]);
}

//spawnorientation
function updateSelectSpawnValue(val, updateFunction)
{
    var selectComponent = document.getElementById('selectSpawnOrientationId');
    var choice = selectComponent.options[val];
    updateFunction(choice.value, 'spawnorientation');
}

function updateSpawnOrientationParameter(obj)
{
    var selectComponent = document.getElementById('selectSpawnOrientationId');
    selectComponent.disabled = checkIfItsParentHasParam(obj, 'spawnorientation');
    var id = "selectSpawnOrientationId";
    updateSelectParameter(id, obj.parameters["spawnorientation"]);
}

//prob
function updateInputRangeValue(val, updateFunction)
{
    document.getElementById('inputProbId').textContent=val;
    updateFunction(val, "prob");
}

function updateProbParameter(obj) {
    var inputRangeControl = document.getElementById("inputProbId");
    inputRangeControl.disabled = checkIfItsParentHasParam(obj, "prob");

    var spanValue = document.getElementById("spanProbId");
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
    var selectComponent = document.getElementById('selectAmmoId');
    var choice = selectComponent.options[val];
    updateFunction(choice.value, 'ammo');
}

function updateAmmoParameter(obj)
{
    var selectComponent = document.getElementById('selectAmmoId');
    selectComponent.disabled = checkIfItsParentHasParam(obj, 'ammo');
    updateSelectParameter("selectAmmoId", obj.parameters["ammo"]);
}

//stype1
function updateStype1Value(val, updateFunction)
{
    var selectComponent = document.getElementById('selectStype1Id');
    var choice = selectComponent.options[val];
    updateFunction(choice.value, 'stype1');
}

function updateStype1Parameter(obj)
{
    var selectComponent = document.getElementById('selectStype1Id');
    selectComponent.disabled = checkIfItsParentHasParam(obj, 'stype1');
    updateSelectParameter("selectStype1Id", obj.parameters["stype1"]);
}

//stype2
function updateStype2Value(val, updateFunction)
{
    var selectComponent = document.getElementById('selectStype2Id');
    var choice = selectComponent.options[val];
    updateFunction(choice.value, 'stype2');
}

function updateStype2Parameter(obj)
{
    var selectComponent = document.getElementById('selectStype2Id');
    selectComponent.disabled = checkIfItsParentHasParam(obj, 'stype2');
    updateSelectParameter("selectStype2Id", obj.parameters["stype2"]);
}

//limit
function updateLimitValue(val, updateFunction)
{
    document.getElementById("limitId").value = val;
    updateFunction(val, "limit");
}

function updateLimitParameter(obj)
{
    var inputNumberControl = document.getElementById("limitId");
    inputNumberControl.disabled = checkIfItsParentHasParam(obj, "limit");
}

//value -- sorry for the redundancy
function updateValueValue(val, updateFunction)
{
    document.getElementById("valueId").value = val;
    updateFunction(val, "value");
}

function updateLimitParameter(obj)
{
    var inputNumberControl = document.getElementById("valueId");
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