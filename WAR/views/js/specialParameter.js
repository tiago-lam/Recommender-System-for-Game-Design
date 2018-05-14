/**
 * Created by tiagomachado on 5/10/18.
 */
function designSpecialTypesParameters(specialType)
{

//<span class="checkBoxSpan spanCenteredText">Orientation</span>
//    <div class="styled-select blue rounded">
//    <select>
//    <option value="l">Left</option>
//    <option value="r">Right</option>
//    <option value="u">Up</option>
//    <option value="d">Down</option>
//    <option value="n">None</option>
//    </select>
//    </div>

    console.log(specialType);
    var specialParameters = document.getElementById("specialParameters");
    removeElements(specialParameters);

    if(specialType == ShootAvatar)
    {
        createStype();
        createAmmo();
    }

}

function createStype() {
    var divStype = document.createElement('div');
    var spanStype = document.createElement('span');
    spanStype.innerHTML = "stype";
    spanStype.classList.add("toggle_switch");
    spanStype.classList.add("spanCenteredText");
    spanStype.classList.add("checkBoxSpan");
    spanStype.classList.add("spanCenteredText");
    divStype.appendChild(spanStype);
    specialParameters.appendChild(divStype);
}

function createAmmo() {
    var divAmmo = document.createElement('div');
    var spanAmmo = document.createElement('span');
    spanAmmo.innerHTML = "ammo";
    spanAmmo.classList.add("toggle_switch");
    spanAmmo.classList.add("checkBoxSpan");
    spanAmmo.classList.add("spanCenteredText");
    divAmmo.appendChild(spanAmmo);
    specialParameters.appendChild(divAmmo);
}

function removeElements(parentElement)
{
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}
