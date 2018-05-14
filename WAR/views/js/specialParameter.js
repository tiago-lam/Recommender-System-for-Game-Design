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
        createSelectList();
        createAmmo();
    }

}

function createStype() {
    var divStype = document.createElement('div');
    divStype.id = 'divStype';
    var spanStype = document.createElement('span');
    spanStype.id = "spanStype";
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

function createSelectList()
{
    var divStypeSelect = document.createElement("div");
    divStypeSelect.classList.add("styled-select");
    divStypeSelect.classList.add("blue");
    divStypeSelect.classList.add("rounded");


    var stypeCollection = retrieveStypeOptions();

    var listStype = document.createElement("select");
    listStype.id = "listStype";
    divStypeSelect.appendChild(listStype);


    for (var i = 0; i < stypeCollection.length; i++) {
        var option = document.createElement("option");
        stypeObject = stypeCollection[i];
        option.value = stypeObject.name;
        option.text = stypeObject.name;
        listStype.appendChild(option);
    }

    divStype = document.getElementById('divStype');
    divStype.appendChild(divStypeSelect);
}

function removeElements(parentElement)
{
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}
