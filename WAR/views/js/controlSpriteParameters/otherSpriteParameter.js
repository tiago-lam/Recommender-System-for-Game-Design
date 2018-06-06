/**
 * Created by tiagomachado on 5/21/18.
 */
var specialParameters = document.getElementById("divSpecialParameters");
//specialParameters.style.display

//
function createFlickerParameter(parameters) {
    createDivSpanElements('divLimit', 'spanLimit', 'limit');
    createInputNumber('divLimit', 'number', 1, 100, 1, 'inputLimitId');
    if(parameters.limit) {
        updateInputNumber(parameters.limit, 'inputLimitId');
    }
}

//
function createOrientedFlickerParameter(parameters)
{
    createFlickerParameter(parameters);
}

//
function createChaserParameter(parameters)
{
    createDivSpanElements('divStype', 'spanStype', 'stype');
    createStypeSelectList('divStype', 'selectStypeId');
    if(parameter.stype) {
        updateSelectParameter('selectStypeId', parameters.stype);
    }
}
//
function createFleeingParameter(parameters)
{
    createChaserParameter(parameters);
}

//no games with this featture - AlternateChaser
function createAlternateChaserParameter(parameters)
{
    createDivSpanElements('divStype1', 'spanStype1', 'stype1');
    createStypeSelectList('divStype1', 'selectStype1Id');
    updateSelectParameter('selectStype1Id', parameters.stype1);
    createDivSpanElements('divStype2', 'spanStype2', 'stype2');
    createStypeSelectList('divStype2', 'selectStype2Id');
    updateSelectParameter('selectStype2Id', parameters.stype2);
}

//no games with this featture - RandomAltChaser
function createRandomAltChaserParameter(parameters)
{
    createAlternateChaserParameter(parameters);
    createDivSpanElements('divProb', 'spanProb', 'prob');
    //divToAddId, type, min, max, step, spanId, valueToShow, inputId)
    createInputRange('divProb', 'range', 0.0, 1.0, 0.01, 'spanProbId', 0.0, 'inputProbId');
    updateInputRange(parameters.prob, 'inputProbId', 'spanProbId');
}
//
function createSpawnPoint(parameters)
{
    createDivSpanElements('divStype', 'spanStype', 'stype');
    createStypeSelectList('divStype', 'selectStypeId');
    updateSelectParameter('selectStypeId', parameters.stype);
    createDivSpanElements('divTotal', 'spanTotal', 'total');
    createInputNumber('divTotal', 'number', 0, 100, 0, 'totalInputId');
    updateInputNumber(parameters.total, 'totalInputId');
    createDivSpanElements('divProb', 'spanProb', 'prob');
    createInputRange('divProb', 'range', 0.0, 1.0, 0.1, 'spanProbId', 0.0, 'inputProbId');
    if(parameters.prob) {
        updateInputRange(parameters.prob, 'inputProbId', 'spanProbId');
    }
    createDivSpanElements('divOrientation', 'spanOrientationId', 'spawnorientation');
    createOrientationSelectList('divOrientation', 'selectSpawnOrientationId');
    if(parameters.spawnorientation) {
        updateSelectParameter('selectSpawnOrientationId', parameters.spawnorientation);//feature not available in all gvgai versions
    }
}
//
function createBomber(parameters)
{
    createSpawnPoint(parameters);
}
//
function createRandomBomber(parameters)
{
    createBomber(parameters);
}

//todo
function createBomberRandomMissile(parameters)
{

}
//
function createSpreader(parameters)
{
    createDivSpanElements('divStype', 'spanStype', 'stype');
    createStypeSelectList('divStype', 'selectStypeId');
    updateSelectParameter('selectStypeId', parameters.stype);
    createDivSpanElements('divProb', 'spanProb', 'spreadprob');
    createInputRange('divProb', 'range', 0.0, 1.0, 0.1, 'rangeSpanId', 0.0, 'rangeId');
    updateInputRange(parameters.prob, 'rangeId', 'rangeSpanId');
}
//
function createPortal(parameters)
{
    createChaserParameter(parameters);
}
//
function createResource(parameters)
{
    createDivSpanElements('divResource', 'spanResource', 'resource');
    createAmmoSelectList('divResource', 'ammoSelectId');
    updateSelectParameter('ammoSelectId', parameters.ammo);
    createDivSpanElements('divValue', 'spanValue', 'value');
    createInputNumber('divValue', 'number', 1, 100, 1, 'valueId');
    updateInputNumber(parameters.value, 'valueId');
    createDivSpanElements('divLimit', 'spanLimit', 'limit');
    createInputNumber('divLimit', 'number', 1, 100, 1, 'limitId');
    updateInputNumber(parameters.limit, 'limitId');
}

