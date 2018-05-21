/**
 * Created by tiagomachado on 5/10/18.
 */

var specialParameters = document.getElementById("divSpecialParameters");
//specialParameters.style.display

function createShootAvatarParameters() {
    createDivSpanElements('divOrientation', 'spanStype', 'stype');
    createStypeSelectList('divOrientation');
    createDivSpanElements('divAmmo', 'spanAmmo', 'ammo');
    createAmmoSelectList('divAmmo');
}

function createFlakAvatarParameters() {
    createShootAvatarParameters();
    createDivSpanElements('divMinAmmo', 'spanMinAmmo', 'minAmmo');
    createInputNumber('divMinAmmo', 'number', 0, 100, 0);
    createDivSpanElements('divAmmoCost', 'spanAmmoCost', 'ammoCost');
    createInputNumber('divAmmoCost', 'number', 1, 100, 1);
}

function designSpecialTypesParameters(specialType)
{


}