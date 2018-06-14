/**
 * Created by tiagomachado on 5/21/18.
 */

/**
 * Stores the div container responsible for organizing the special parameter
 * @type {HTMLElement | null}
 */
var specialParameters = document.getElementById("divSpecialParameters");
//specialParameters.style.display

/**
 * Creates the Flicker parameters components
 * @param parameters
 */
function createFlickerParameter(parameters) {
    createDivSpanElements('divLimit', 'spanLimit', 'limit');
    createInputNumber('divLimit', 'number', 1, 100, 1, 'inputLimitId');
    if(parameters.limit) {
        updateInputNumber(parameters.limit, 'inputLimitId');
    }
}

/**
 * Creates the OrientedFlicker parameters components
 * @param parameters
 */
function createOrientedFlickerParameter(parameters)
{
    createFlickerParameter(parameters);
}

/**
 * Creates the Chaser parameters components
 * @param parameters
 */
function createChaserParameter(parameters)
{
    createDivSpanElements('divStype', 'spanStype', 'stype');
    createStypeSelectList('divStype', 'selectStypeId');
    if(parameters.stype) {
        updateSelectParameter('selectStypeId', parameters.stype);
    }
}

/**
 * Creates the Fleeing parameters components
 * @param parameters
 */
function createFleeingParameter(parameters)
{
    createChaserParameter(parameters);
}

/**
 * Creates the AlternateChaser parameters components
 * @param parameters
 */
function createAlternateChaserParameter(parameters)
{
    createDivSpanElements('divStype1', 'spanStype1', 'stype1');
    createStypeSelectList('divStype1', 'selectStype1Id');
    updateSelectParameter('selectStype1Id', parameters.stype1);
    createDivSpanElements('divStype2', 'spanStype2', 'stype2');
    createStypeSelectList('divStype2', 'selectStype2Id');
    updateSelectParameter('selectStype2Id', parameters.stype2);
}

/**
 * Creates the RandomAltChaser parameters components
 * @param parameters
 */
function createRandomAltChaserParameter(parameters)
{
    createAlternateChaserParameter(parameters);
    createDivSpanElements('divProb', 'spanProb', 'prob');
    createInputRange('divProb', 'range', 0.0, 1.0, 0.1, 'spanProbId', 0.0, 'inputProbId');
    if(parameters.prob) {
        updateInputRange(parameters.prob, 'inputProbId', 'spanProbId');
    }
}

/**
 * Creates the SpawnPoint parameters components
 * @param parameters
 */
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

/**
 * Creates the Bomber parameters components
 * @param parameters
 */
function createBomber(parameters)
{
    createSpawnPoint(parameters);
}

/**
 * Creates the RandomBomber parameters components
 * @param parameters
 */
function createRandomBomber(parameters)
{
    createBomber(parameters);
}

//todo
function createBomberRandomMissile(parameters)
{

}

/**
 * Creates the Spreader parameters components
 * @param parameters
 */
function createSpreader(parameters)
{
    createDivSpanElements('divStype', 'spanStype', 'stype');
    createStypeSelectList('divStype', 'selectStypeId');
    updateSelectParameter('selectStypeId', parameters.stype);
    createDivSpanElements('divSpreadProb', 'spanProb', 'spreadprob');
    createInputRange('divSpreadProb', 'range', 0.0, 1.0, 0.1, 'spreadProbSpanId', 0.0, 'spreadProbRangeId');
    if(parameters.spreadprob) {
        updateInputRange(parameters.spreadprob, 'spreadProbRangeId', 'spreadProbSpanId');
    }
}

/**
 * Creates the Portal parameters components
 * @param parameters
 */
function createPortal(parameters)
{
    createChaserParameter(parameters);
}

/**
 * Creates the Resource parameters components
 * @param parameters
 */
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