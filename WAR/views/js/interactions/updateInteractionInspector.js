var currentInteractionObj;
var currentInteractionElementId;

function updateOrCreateImg(identifier, divToBeAppendedId, imgElementId)
{
    var divParent = document.getElementById(divToBeAppendedId);
    var img = document.getElementById(imgElementId);
    if(divParent.contains(img))
    {
        img.src = document.getElementById(identifier + "ImgId").currentSrc;
    }
    else
    {
        img = document.createElement('img');
        img.id = imgElementId;
        img.src = document.getElementById(identifier + "ImgId").currentSrc;
    }
    divParent.append(img);
}

function createSprite1SelectList()
{
    var divParent = document.getElementById('interactionSprite1Div');
    var sprite1Select = document.createElement('select');
    sprite1Select.id = "sprite1SelectId";
    sprite1Select.classList.add('style-rounded');
    sprite1Select.classList.add('blue');
    sprite1Select.classList.add('rounded');

    for (var i = 0; i < spriteNameCollection.length; i++) {
        var option = document.createElement("option");
        var spriteName = spriteNameCollection[i];
        option.value = spriteName;
        option.text = spriteName;
        sprite1Select.appendChild(option);
    }

    sprite1Select.setAttribute('oninput', 'updateSprite1InsideTheObj(this.value)');

    divParent.append(sprite1Select);
}

function createInteractionSelectList()
{
    var divParent = document.getElementById('interactionContainerDiv');
    var interactionSelect = document.createElement('select');
    interactionSelect.id = "interactionSelect";
    interactionSelect.classList.add('style-rounded');
    interactionSelect.classList.add('blue');
    interactionSelect.classList.add('rounded');

    for (var i = 0; i < interactionCollection.length; i++) {
        var option = document.createElement("option");
        var interaction = interactionCollection[i];
        option.value = interaction;
        option.text = interaction;
        interactionSelect.appendChild(option);
    }

    interactionSelect.setAttribute('oninput', 'updateInteractionInsideTheObj(this.value)');

    divParent.append(interactionSelect);
}

function createCheckBoxList()
{
    addNoneAndEosOptions();
    var divParent = document.getElementById('spritesToInteractDiv');
    for (var i = 0; i < spriteNameCollection.length; i++) {
        var divForCheckBoxContents = document.createElement('div');
        divForCheckBoxContents.id = 'checkBoxContents' + i + 'Id';
        divForCheckBoxContents.classList.add('checkboxImgDiv');
        var inputCheckBox = document.createElement('input');
        inputCheckBox.type = 'checkbox';
        inputCheckBox.classList.add('interactionCheckBox');
        inputCheckBox.id = spriteNameCollection[i] + 'CheckBoxId';
        var label = document.createElement('label');
        label.htmlFor = 'inputCheckBox.id';
        label.innerHTML = spriteNameCollection[i];

        inputCheckBox.setAttribute('oninput', 'updateSpritesToInteractList(this.checked, this.id)');

        divForCheckBoxContents.append(inputCheckBox);
        divForCheckBoxContents.append(label);

        var obj = mapIdentifierToObject.get(spriteNameCollection[i]);
        if(obj != undefined) {
            if ("img" in obj.parameters) {
                var img = document.createElement('img');
                img.id = 'imgOption' + i + 'Id';
                var imgPath = obj.parameters['img'];
                if (!imgPath.includes('.png')) {
                    imgPath = imgPath + '.png';
                }
                img.src = imgPath;
                divForCheckBoxContents.append(img);
            }
        }

        divParent.append(divForCheckBoxContents);
    }

}

function showInfo(interactionObj, interactionElementId)
{
    updateOrCreateImg(interactionObj.sprite1, 'interactionSprite1Div', 'sprite1InteractionImg');
    currentInteractionObj = interactionObj;
    currentInteractionElementId = interactionElementId;
    updateSelectParameter('sprite1SelectId', interactionObj.sprite1);
    updateSelectParameter('interactionSelect', interactionObj.interactionName);
    var spritesToInteract = retrieveSpritesToInteract(interactionObj);
    updateCheckBox(spritesToInteract);

    showParameters();
}

function retrieveSpritesToInteract(interactionObj)
{
    var sprites = interactionObj.sprite2;
    var spritesToInteract = [];
    for(var i = 0; i < sprites.length; i++)
    {
        spritesToInteract.push(sprites[i]);
    }
    return spritesToInteract;
}

function updateCheckBox(spritesToInteract)
{
    deselectAllCheckboxes();
    for(var i = 0; i < spritesToInteract.length; i++)
    {
        var inputCheckBox = document.getElementById(spritesToInteract[i] + 'CheckBoxId');
        inputCheckBox.checked = true;
    }
}

function deselectAllCheckboxes()
{
    var checkBoxes = document.getElementsByClassName('interactionCheckBox');
    for(var i = 0; i < checkBoxes.length; i++)
    {
        checkBoxes[i].checked = false;
    }
}

function updateSprite1InsideTheObj(value)
{
    updateOrCreateImg(value, 'interactionSprite1Div', 'sprite1InteractionImg');
    currentInteractionObj.sprite1 = value;
    console.log(currentInteractionObj);
    setTextOfDivElement(currentInteractionElementId);
}

function updateInteractionInsideTheObj(value)
{
    currentInteractionObj.interactionName = value;
    setTextOfDivElement(currentInteractionElementId);

    var scoreValue = currentInteractionObj.parameters.scoreChange;
    currentInteractionObj.parameters = {};
    currentInteractionObj.parameters['scoreChange'] = scoreValue;

    updateInteractionParameterElements(value);
}

function updateSpritesToInteractList(value, spriteName)
{
    spriteName = spriteName.replace('CheckBoxId', '');
    var spriteNameToInteract = spriteName;
    if(value == true)
    {
        currentInteractionObj["sprite2"].push(spriteNameToInteract);
    }
    else
    {
        var index = currentInteractionObj["sprite2"].indexOf(spriteNameToInteract);
        if (index > -1) {
            currentInteractionObj["sprite2"].splice(index, 1);
        }
    }
    setTextOfDivElement(currentInteractionElementId);
}

function setTextOfDivElement(divId)
{
    var textObj = convertObjectToText(currentInteractionObj);
    document.getElementById(divId).innerHTML = textObj;
}

function managingElementsUpdating() {
    removeParameterContents();
    if ("scoreChange" in currentInteractionObj.parameters) {
        createScoreChangeField(currentInteractionObj.parameters.scoreChange);
    }
    else {
        createScoreChangeField(0);
    }
}

function showParameters()
{
    managingElementsUpdating();

    if("stype" in currentInteractionObj.parameters)
    {
        createInteractionStypeParameter();
        updateStypeParameterElement(currentInteractionObj.parameters.stype);
    }

    if("resource" in currentInteractionObj.parameters)
    {
        createInteractionResourceParameter();
        updateResourceParameterElement(currentInteractionObj.parameters.resource);
    }

    if("stypeOther" in currentInteractionObj.parameters)
    {
        createInteractionStypeOtherParameter();
        updateStypeOtherParameterElement(currentInteractionObj.parameters.stypeOther);
    }

    if("limit" in currentInteractionObj.parameters)
    {
        createInteractionLimitParameter();
        updateLimitParameterElement(currentInteractionObj.parameters.limit);
    }

    if("value" in currentInteractionObj.parameters)
    {
        createInteractionValueParameter();
        updateValueParameterElement(currentInteractionObj.parameters.value);
    }
}

function createScoreChangeField(value)
{
    var div = document.getElementById('interactionContainerDiv');

    var scoreDiv = document.createElement('div');
    scoreDiv.id = 'scoreInteractionDivId';
    scoreDiv.classList.add('interactionElementDiv');

    var scoreSpan = document.createElement('span');
    scoreSpan.id = 'scoreSpanId';
    scoreSpan.innerHTML = "score:";
    scoreSpan.classList.add('spanLimitOverflow');

    var scoreInput = document.createElement('input');
    scoreInput.setAttribute('oninput', 'updateScoreParameter(this.value)');
    scoreInput.id = 'scoreInputId';
    scoreInput.type = 'number';
    if(value != undefined) {
        scoreInput.value = value;
        currentInteractionObj.parameters.scoreChange = value;
    }else{
        scoreInput.value = 0;
        currentInteractionObj.parameters.scoreChange = 0;
    }

    scoreDiv.append(scoreSpan);
    scoreDiv.append(scoreInput);
    div.append(scoreDiv);
}

function updateScoreParameter(value)
{
    currentInteractionObj.parameters.scoreChange = value;
}

function removeParameterContents()
{
    var interactionDiv = document.getElementById('interactionContainerDiv');

    while (interactionDiv.childNodes.length > 1) {
        interactionDiv.removeChild(interactionDiv.lastChild);
    }
}

function openImagePicker()
{
    document.getElementById('imagePickerDiv').style.display = "block";
    document.getElementById('hideImgPickerInput').style.display = "block";
    document.getElementById('inspector').style.display = "none";
}