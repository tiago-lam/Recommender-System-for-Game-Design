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
function updateInputNumberValue(val, updateFunction)
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


