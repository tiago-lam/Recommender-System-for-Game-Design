/**
 * Created by tiagomachado on 5/21/18.
 */
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

function createAmmoSelectList(divToBePartOf)
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

    div = document.getElementById(divToBePartOf);
    div.appendChild(divStypeAmmoSelect);

}

function createStypeSelectList(divToBePartOf)
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

    divOrientation = document.getElementById(divToBePartOf);
    divOrientation.appendChild(divStypeSelect);

}

function createOrientationSelectList(divToBePartOf)
{
    var divOrientationSelect = document.createElement("div");
    divOrientationSelect.classList.add("styled-select");
    divOrientationSelect.classList.add("blue");
    divOrientationSelect.classList.add("rounded");

    var orientationCollection = ['NONE', 'LEFT', 'RIGHT', 'UP', 'DOWN'];

    var listOrientation = document.createElement("select");
    listOrientation.id = "listOrientation";
    divOrientationSelect.appendChild(listOrientation);


    for (var i = 0; i < orientationCollection.length; i++) {
        var option = document.createElement("option");
        var orientationObject = orientationCollection[i];
        option.value = orientationObject.name;
        option.text = orientationObject.name;
        listOrientation.appendChild(option);
    }

    divOrientation = document.getElementById(divToBePartOf);
    divOrientation.appendChild(divOrientationSelect);

}

function createInputNumber(divToAddId, type, min, max, valueToShow)
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

function createInputRange(divToAddId, type, min, max, step, spanId, valueToShow)
{
    var inputRange = document.createElement("input");
    inputRange.classList.add('bars');
    inputRange.classList.add('sliders');
    inputRange.type = type;
    inputRange.min = min;
    inputRange.max = max;
    inputRange.step = step;
    inputRange.value = valueToShow;

    var spanElement = document.createElement('span');
    spanElement.id = spanId;
    spanElement.style.cssFloat = 'right';
    spanElement.innerHTML = '0.5';
    spanElement.classList.add("spanCenteredText");
    spanElement.classList.add("checkBoxSpan");

    inputRange.addEventListener("input", function()
    {
        spanElement.innerHTML = inputRange.value;
    });

    var div = document.getElementById(divToAddId);
    div.appendChild(spanElement);
    div.appendChild(inputRange);
}

function removeElements(parentElement)
{
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}