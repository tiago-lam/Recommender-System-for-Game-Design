/**
 * Created by tiagomachado on 5/21/18.
 */
var specialParameters = document.getElementById("divSpecialParameters");
//specialParameters.style.display

function createFlickerParameter() {
    createDivSpanElements('divLimit', 'spanLimit', 'limit');
    createInputNumber('divLimit', 'number', 1, 100, 1);
}

function createOrientedFlickerParameter()
{
    createFlickerParameter();
}

function createChaserParameter()
{
    createDivSpanElements('divStype', 'spanStype', 'stype');
    createStypeSelectList('divStype');
}

function createFleeingParameter()
{
    createChaserParameter();
}

function createAlternateChaserParameter()
{
    createDivSpanElements('divStype1', 'spanStype1', 'stype1');
    createStypeSelectList('divStype1');
    createDivSpanElements('divStype2', 'spanStype2', 'stype2');
    createStypeSelectList('divStype2');
}

function createRandomAltChaserParameter()
{
    createAlternateChaserParameter();
    createDivSpanElements('divProb', 'spanProb', 'prob');
    createInputRange('divProb', 'range', 0.0, 1.0, 0.1, 0.0);

}

function createSpawnPoint()
{
    createDivSpanElements('divStype', 'spanStype', 'stype');
    createStypeSelectList('divStype');
    createDivSpanElements('divTotal', 'spanTotal', 'total');
    createInputNumber('divTotal', 'number', 0, 100, 0);
    createDivSpanElements('divProb', 'spanProb', 'prob');
    createInputRange('divProb', 'range', 0.0, 1.0, 0.1, 0.0);
    createDivSpanElements('divOrientation', 'spanOrientation', 'spawnorientation');
    createOrientationSelectList('divOrientation');
}

function createBomber()
{
    createSpawnPoint();
}

function createRandomBomber()
{
    createBomber();
}

//todo
function createBomberRandomMissile()
{

}

function createSpreader()
{
    createDivSpanElements('divStype', 'spanStype', 'stype');
    createStypeSelectList('divStype');
    createDivSpanElements('divProb', 'spanProb', 'spreadprob');
    createInputRange('divProb', 'range', 0.0, 1.0, 0.1, 0.0);
}

function createPortal()
{
    createChaserParameter();
}

function createResource()
{
    createDivSpanElements('divResource', 'spanResource', 'resource');
    createAmmoSelectList('divResource')
    createDivSpanElements('divValue', 'spanValue', 'value');
    createInputNumber('divValue', 'number', 1, 100, 1);
    createDivSpanElements('divLimit', 'spanLimit', 'limit');
    createInputNumber('divLimit', 'number', 1, 100, 1);
}