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
}

function retrieveSpritesToInteract(interactionObj)
{
    var sprites = interactionObj.sprite2;
    var spritesToInteract = [];
    for(var i = 0; i < sprites.length; i++)
    {
        spritesToInteract.push(sprites[i].spriteToInteract);
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

function setTextOfDivElement(divId)
{
    var textObj = convertObjectToText(currentInteractionObj);
    document.getElementById(divId).innerHTML = textObj;
}