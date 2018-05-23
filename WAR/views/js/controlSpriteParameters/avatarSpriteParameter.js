/**
 * Created by tiagomachado on 5/10/18.
 */

var specialParameters = document.getElementById("divSpecialParameters");
//specialParameters.style.display

function createShootAvatarParameters(parameters) {
    createDivSpanElements('divStype', 'spanStype', 'stype');
    createStypeSelectList('divStype', 'selectStype');
    createDivSpanElements('divAmmo', 'spanAmmo', 'ammo');
    createAmmoSelectList('divAmmo', 'selectAmmo');

    updateShootAvatarParameters(parameters);
}

function createFlakAvatarParameters() {
    createShootAvatarParameters();
    createDivSpanElements('divMinAmmo', 'spanMinAmmo', 'minAmmo');
    createInputNumber('divMinAmmo', 'number', 0, 100, 0);
    createDivSpanElements('divAmmoCost', 'spanAmmoCost', 'ammoCost');
    createInputNumber('divAmmoCost', 'number', 1, 100, 1);
}

function updateShootAvatarParameters(parameters)
{
   updateSelectParameter('selectStype', parameters.stype);
    updateSelectParameter('selectAmmo', parameters.ammo);
}






