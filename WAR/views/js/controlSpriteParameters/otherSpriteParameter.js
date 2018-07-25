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
    createDivSpanElements('limitDiv', 'limitSpan', 'limit');
    createInputNumber('limitDiv', 'number', 1, 100, 1, 'limitInputId');
    if(parameters.limit) {
        updateInputNumber(parameters.limit, 'limitInputId');
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
    createDivSpanElements('stypeDiv', 'stypeSpan', 'stype');
    createStypeTerminationSelectList('stypeDiv', 'stypeSelectId');
    if(parameters.stype) {
        updateSelectParameter('stypeSelectId', parameters.stype);
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
    createDivSpanElements('stype1Div', 'stype1Span', 'stype1');
    createStypeTerminationSelectList('stype1Div', 'stype1SelectId');
    updateSelectParameter('stype1SelectId', parameters.stype1);
    createDivSpanElements('stype2Div', 'stype2Span', 'stype2');
    createStypeTerminationSelectList('stype2Div', 'stype2SelectId');
    updateSelectParameter('stype2SelectId', parameters.stype2);
}

/**
 * Creates the RandomAltChaser parameters components
 * @param parameters
 */
function createRandomAltChaserParameter(parameters)
{
    createAlternateChaserParameter(parameters);
    createDivSpanElements('probDiv', 'probSpan', 'prob');
    createInputRange('probDiv', 'range', 0.0, 1.0, 0.1, 'probSpanId', 0.0, 'probInputId');
    if(parameters.prob) {
        updateInputRange(parameters.prob, 'probInputId', 'probSpanId');
    }
}

/**
 * Creates the SpawnPoint parameters components
 * @param parameters
 */
function createSpawnPoint(parameters)
{
    createDivSpanElements('stypeDiv', 'stypeSpan', 'stype');
    createStypeTerminationSelectList('stypeDiv', 'stypeSelectId');
    updateSelectParameter('stypeSelectId', parameters.stype);
    createDivSpanElements('totalDiv', 'totalSpan', 'total');
    createInputNumber('totalDiv', 'number', 0, 100, 0, 'totalInputId');
    updateInputNumber(parameters.total, 'totalInputId');
    createDivSpanElements('probDiv', 'probSpan', 'prob');
    createInputRange('probDiv', 'range', 0.0, 1.0, 0.1, 'probSpanId', 0.0, 'probInputId');
    if(parameters.prob) {
        updateInputRange(parameters.prob, 'probInputId', 'probSpanId');
    }
    createDivSpanElements('orientationDiv', 'orientationSpanId', 'spawnorientation');
    createOrientationSelectList('orientationDiv', 'spawnOrientationSelectId');
    if(parameters.spawnorientation) {
        updateSelectParameter('spawnOrientationSelectId', parameters.spawnorientation);//feature not available in all gvgai versions
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
    createDivSpanElements('stypeDiv', 'stypeSpan', 'stype');
    createStypeTerminationSelectList('stypeDiv', 'stypeSelectId');
    updateSelectParameter('stypeSelectId', parameters.stype);
    createDivSpanElements('spreadProbDiv', 'spreadprobSpan', 'spreadprob');
    createInputRange('spreadProbDiv', 'range', 0.0, 1.0, 0.1, 'spreadProbSpanId', 0.0, 'spreadProbRangeId');
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
    //createDivSpanElements('resourceDiv', 'resourceSpan', 'resource');
    // createAmmoSelectList('resourceDiv', 'ammoSelectId');
    // updateSelectParameter('ammoSelectId', parameters.ammo);
    createDivSpanElements('valueDiv', 'valueSpan', 'value');
    createInputNumber('valueDiv', 'number', 1, 100, 1, 'valueInputId');
    updateInputNumber(parameters.value, 'valueInputId');
    createDivSpanElements('limitDiv', 'limitSpan', 'limit');
    createInputNumber('limitDiv', 'number', 1, 100, 1, 'limitInputId');
    updateInputNumber(parameters.limit, 'limitInputId');
}