/**
 * Created by tiagomachado on 5/10/18.
 */

var specialParameters = document.getElementById("divSpecialParameters");
//specialParameters.style.display

function createShootAvatarParameters(parameters) {
   createDivSpanElements('divStype', 'spanStype', 'stype');
   createStypeSelectList('divStype', 'selectStypeId');
   createDivSpanElements('divAmmo', 'spanAmmo', 'ammo');
   createAmmoSelectList('divAmmo','selectAmmoId');
   updateShootAvatarParameters(parameters);
}

function createFlakAvatarParameters(parameters) {
   createShootAvatarParameters(parameters);
   createDivSpanElements('divMinAmmo', 'spanMinAmmo', 'minAmmo');
   createInputNumber('divMinAmmo', 'number', 0, 100, 0, 'minAmmoId');
   createDivSpanElements('divAmmoCost', 'spanAmmoCost', 'ammoCost');
   createInputNumber('divAmmoCost', 'number', 1, 100, 1, 'ammoCostId');
   updateFlakAvatarParameters(parameters)
}

function updateShootAvatarParameters(parameters)
{
   updateSelectParameter('selectStypeId', parameters.stype);
   updateSelectParameter('selectAmmoId', parameters.ammo);
}

function updateFlakAvatarParameters(parameters)
{
   updateShootAvatarParameters(parameters);
   updateInputNumberParameter(parameters);
}

function updateInputNumberParameter(parameters)
{
   var inputMinAmmo = document.getElementById('minAmmoId');
   inputMinAmmo.value = parameters.minAmmo;

   var inputAmmoCost = document.getElementById('minAmmoId');
   inputAmmoCost.value = parameters.ammoCost;
}






