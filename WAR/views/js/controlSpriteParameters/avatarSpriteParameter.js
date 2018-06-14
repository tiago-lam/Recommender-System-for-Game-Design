/**
 * Created by tiagomachado on 5/10/18.
 */

/**
 * Stores the div container of the special parameters
 * @type {HTMLElement | null}
 */
var specialParameters = document.getElementById("divSpecialParameters");

/**
 * Creates the parameters for the special type (reference class): ShootAvatar
 * @param parameters
 */
function createShootAvatarParameters(parameters) {
   createDivSpanElements('divStype', 'spanStype', 'stype');
   createStypeSelectList('divStype', 'selectStypeId');
   createDivSpanElements('divAmmo', 'spanAmmo', 'ammo');
   createAmmoSelectList('divAmmo','selectAmmoId');
   updateShootAvatarParameters(parameters);
}

/**
 * Creates the parameters for the special type (reference class): FlakAvatar
 * @param parameters
 */
function createFlakAvatarParameters(parameters) {
   createShootAvatarParameters(parameters);
   createDivSpanElements('divMinAmmo', 'spanMinAmmo', 'minAmmo');
   createInputNumber('divMinAmmo', 'number', 0, 100, 0, 'minAmmoId');
   createDivSpanElements('divAmmoCost', 'spanAmmoCost', 'ammoCost');
   createInputNumber('divAmmoCost', 'number', 1, 100, 1, 'ammoCostId');
   updateFlakAvatarParameters(parameters)
}

/**
 * Updates the parameters for the special type (reference class): ShootAvatar
 * @param parameters
 */
function updateShootAvatarParameters(parameters)
{
   updateSelectParameter('selectStypeId', parameters.stype);
   updateSelectParameter('selectAmmoId', parameters.ammo);
}

/**
 * Updates the parameters for the special type (reference class): FlakAvatar
 * @param parameters
 */
function updateFlakAvatarParameters(parameters)
{
   updateShootAvatarParameters(parameters);
   updateAmmoParameters(parameters);
}

/**
 * Updates min ammo parameters
 * @param parameters
 */
function updateMinAmmoParameter(parameters) {
    var inputMinAmmo = document.getElementById('minAmmoId');
    inputMinAmmo.value = parameters.minAmmo;
}

/**
 * Updates ammo cost parameters
 * @param parameters
 */
function updateAmmoCostParameter(parameters) {
    var inputAmmoCost = document.getElementById('ammoCostId');
    inputAmmoCost.value = parameters.ammoCost;
}

/**
 * Updates ammo parameters
 * @param parameters
 */
function updateAmmoParameters(parameters)
{
    updateMinAmmoParameter(parameters);
    updateAmmoCostParameter(parameters);
}