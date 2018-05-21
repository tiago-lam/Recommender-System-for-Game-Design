/**
 * Created by tiagomachado on 5/10/18.
 */

var specialParameters = document.getElementById("divSpecialParameters");
//specialParameters.style.display

function createShootAvatarParameters() {
    createDivSpanElements('divStype', 'spanStype', 'stype');
    createStypeSelectList();
    createDivSpanElements('divAmmo', 'spanAmmo', 'ammo');
    createAmmoSelectList();
}

function createFlakAvatarParameters() {
    createShootAvatarParameters();
    createDivSpanElements('divMinAmmo', 'spanMinAmmo', 'minAmmo');
    createInput('divMinAmmo', 'number', 0, 100, 0);
    createDivSpanElements('divAmmoCost', 'spanAmmoCost', 'ammoCost');
    createInput('divAmmoCost', 'number', 1, 100, 1);
}

function designSpecialTypesParameters(specialType)
{
    removeElements(specialParameters);

    if(specialType == ShootAvatar)
    {
        createShootAvatarParameters();
    }
    else if(specialType == FlakAvatar)
    {
        createFlakAvatarParameters();
    }

}

function createDivSpanElements(divId, spanId, innerHtmlText)
{
    var divElement = document.createElement('div');
    divElement.classList.add("distance");
    divElement.id = divId;
    var spanElement = document.createElement('span');
    spanElement.id = spanId;
    spanElement.innerHTML = innerHtmlText;
    spanElement.classList.add("spanCenteredText");
    spanElement.classList.add("checkBoxSpan");
    divElement.appendChild(spanElement);
    specialParameters.appendChild(divElement);
}

function createAmmoSelectList()
{
    var divStypeAmmoSelect = document.createElement("div");
    divStypeAmmoSelect.classList.add("styled-select");
    divStypeAmmoSelect.classList.add("blue");
    divStypeAmmoSelect.classList.add("rounded");

    var ammoSpritesCollection = retrievingAmmoSprites(stypeCollection);

    var listAmmoResource = document.createElement("select");
    listAmmoResource.id = "listAmmoStype";
    divStypeAmmoSelect.appendChild(listAmmoResource);

    for (var i = 0; i < ammoSpritesCollection.length; i++) {
        var option = document.createElement("option");
        spriteName = ammoSpritesCollection[i];
        option.value = spriteName;
        option.text = spriteName;
        listAmmoResource.appendChild(option);
    }

    divStype = document.getElementById('divAmmo');
    divStype.appendChild(divStypeAmmoSelect);

}

function createStypeSelectList()
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

function createInput(divToAddId, type, min, max, valueToShow)
{
    var inputNumber = document.createElement("input");
    inputNumber.classList.add('input-spacing');
    inputNumber.type = type;
    inputNumber.min = min;
    inputNumber.max = max;
    inputNumber.value = valueToShow;

    var div = document.getElementById(divToAddId);
    div.appendChild(inputNumber);

}

function removeElements(parentElement)
{
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}