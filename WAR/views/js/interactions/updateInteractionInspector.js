var currentInteractionObj;
var currentInteractionElementId;

function createSprite1SelectList()
{
    var divParent = document.getElementById('interactionSprite1Div');
    var sprite1Select = document.createElement('select');
    sprite1Select.id = "sprite1SelectId";

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
    var divParent = document.getElementById('interactionDiv');
    var interactionSelect = document.createElement('select');
    interactionSelect.id = "interactionSelect";

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
    var divParent = document.getElementById('spritesToInteractDiv');
    for (var i = 0; i < spriteNameCollection.length; i++) {
        var divForCheckBoxContents = document.createElement('div');
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

        divParent.append(divForCheckBoxContents);
    }
}

function showInfo(interactionObj, interactionElementId)
{
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
    currentInteractionObj.sprite1 = value;
    console.log(currentInteractionObj);
    setTextOfDivElement(currentInteractionElementId);
}

function updateInteractionInsideTheObj(value)
{
    currentInteractionObj.interactionName = value;
    console.log(currentInteractionObj);
    setTextOfDivElement(currentInteractionElementId);
}

function updateSpritesToInteractList(value, spriteName)
{
    spriteName = spriteName.replace('CheckBoxId', '');
    var spriteNameToInteract = spriteName;
    if(value == true)
    {
        currentInteractionObj.sprite2.push(spriteNameToInteract);
    }
    else
    {
        var index = currentInteractionObj.sprite2.indexOf(spriteNameToInteract);
        if (index > -1) {
            currentInteractionObj.sprite2.splice(index, 1);
        }
    }
    setTextOfDivElement(currentInteractionElementId);
}

function setTextOfDivElement(divId)
{
    var textObj = convertObjectToText(currentInteractionObj);
    document.getElementById(divId).innerHTML = textObj;
}

function showParameters()
{
    removeParameterContents();
    var parameters = currentInteractionObj.parameters;
    if("scoreChange" in parameters)
    {
        createScoreChangeField(parameters.scoreChange);
    }
}

function createScoreChangeField(value)
{
    var div = document.getElementById('interactionDiv');

    var scoreSpan = document.createElement('span');
    scoreSpan.id = 'scoreSpanId';
    scoreSpan.innerHTML = "score:";

    var scoreInput = document.createElement('input');
    scoreInput.setAttribute('oninput', 'updateScoreParameter(this.value)');
    scoreInput.id = 'scoreInputId';
    scoreInput.type = 'number';
    scoreInput.value = value;

    div.append(scoreSpan);
    div.append(scoreInput);
}

function updateScoreParameter(value)
{
    currentInteractionObj.parameters.scoreChange = value;
}

function removeParameterContents()
{
    var interactionDiv = document.getElementById('interactionDiv');

    while (interactionDiv.childNodes.length > 1) {
        interactionDiv.removeChild(interactionDiv.lastChild);
    }
}