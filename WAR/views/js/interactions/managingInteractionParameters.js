function createInteractionStypeParameter()
{
    var div = document.getElementById('interactionDiv');

    var divContainer = document.createElement('div');
    divContainer.id = 'stypeInteractionDivId';
    divContainer.classList.add('interactionElementDiv');

    var scoreSpan = document.createElement('span');
    scoreSpan.id = 'stypeInteractionSpanId';
    scoreSpan.classList.add('spanForInteractionParameters');
    scoreSpan.innerHTML = "stype:";

    var stypeSelect = document.createElement('select');
    stypeSelect.id = "stypeSelectId";
    stypeSelect.classList.add('forSelectParameters');

    for (var i = 0; i < spriteNameCollection.length; i++) {
        var option = document.createElement("option");
        var spriteName = spriteNameCollection[i];
        option.value = spriteName;
        option.text = spriteName;
        stypeSelect.appendChild(option);
    }


    stypeSelect.setAttribute('oninput', 'updateStypeParameterInsideObject(this.value)');
    divContainer.append(scoreSpan);
    divContainer.append(stypeSelect);
    div.append(divContainer);
}

function createStypeParameterInsideObject()
{
    var stypeSelect = document.getElementById('stypeSelectId');
    var value = stypeSelect.options[stypeSelect.selectedIndex].text;

    if(!('stype' in currentInteractionObj.parameters))
    {
        currentInteractionObj.parameters['stype'] = value;
    }
}

function updateStypeParameterInsideObject(value)
{
    currentInteractionObj.parameters.stype = value;
}

function updateStypeParameterElement(value)
{
    updateSelectParameter('stypeSelectId', value);
}

function updateInteractionParameterElements(interaction)
{
    managingElementsUpdating();

    if(interaction == transformToSingleton || interaction == spawnBehind || interaction == spawnIfHasMore
        || interaction == spawnIfHasLess || interaction == transformTo || interaction == transformToRandomChild
        || interaction == updateSpawnType || interaction == removeScore || interaction == subtractHealthPoints
        || interaction == increaseSpeedToAll || interaction == decreaseSpeedToAll || interaction == setSpeedForAll)
    {
        createInteractionStypeParameter();
        createStypeParameterInsideObject();
    }

    if(interaction == killIfHasMore || interaction == killIfHasLess || interaction == killIfOtherHasMore
        || interaction == spawnIfHasMore || interaction == spawnIfHasLess || interaction == changeResource)
    {
        createInteractionResourceParameter();
        createResourceParameterInsideObject();
    }

    if(interaction == transformToSingleton)
    {
        createInteractionStypeOtherParameter();
        createStypeOtherParameterInsideObject();
    }

    if(interaction == killIfHasMore || interaction == killIfHasLess || interaction == killIfOtherHasMore
        || interaction == spawnIfHasMore || interaction == spawnIfHasLess)
    {
        createInteractionLimitParameter();
        createLimitParameterInsideObject();
    }

    if(interaction == addHealthPoints || interaction == addHealthPointsToMax || interaction == subtractHealthPoints
        || interaction == increaseSpeedToAll || interaction == decreaseSpeedToAll || interaction == setSpeedForAll
        || interaction == changeResource)
    {
        createInteractionValueParameter();
        createValueParameterInsideObject();
    }
}

function createInteractionResourceParameter()
{
    var divContainer = document.createElement('div');
    divContainer.id = 'stypeResourceInteractionDivId';
    divContainer.classList.add('interactionElementDiv');
    var div = document.getElementById('interactionDiv');

    var resourceSpan = document.createElement('span');
    resourceSpan.id = 'resourceInteractionSpanId';
    resourceSpan.classList.add('spanForInteractionParameters');
    resourceSpan.innerHTML = "resource:";

    var resourceSelect = document.createElement('select');
    resourceSelect.id = "resourceSelectId";
    resourceSelect.classList.add('forSelectParameters');

    var resourceSprites = retrievingAmmoSprites(spriteNameCollection);
    for (var i = 0; i < resourceSprites.length; i++) {
        var option = document.createElement("option");
        var spriteName = resourceSprites[i];
        option.value = spriteName;
        option.text = spriteName;
        resourceSelect.appendChild(option);
    }

    resourceSelect.setAttribute('oninput', 'updateResourceParameterInsideObject(this.value)');
    divContainer.append(resourceSpan);
    divContainer.append(resourceSelect);
    div.append(divContainer);
}

function createResourceParameterInsideObject()
{
    var resourceSelect = document.getElementById('resourceSelectId');
    var value = resourceSelect.options[resourceSelect.selectedIndex].text;

    if(!('resource' in currentInteractionObj.parameters))
    {
        currentInteractionObj.parameters['resource'] = value;
    }
}

function updateResourceParameterInsideObject(value)
{
   currentInteractionObj.parameters.resource = value;
}

function updateResourceParameterElement(value)
{
    updateSelectParameter('resourceSelectId', value);
}

function createInteractionStypeOtherParameter()
{
    var divContainer = document.createElement('div');
    divContainer.id = 'stypeOtherInteractionDivId';
    divContainer.classList.add('interactionElementDiv');
    var div = document.getElementById('interactionDiv');

    var stypeOtherSpan = document.createElement('span');
    stypeOtherSpan.id = 'stypeOtherInteractionSpanId';
    stypeOtherSpan.classList.add('spanForInteractionParameters');
    stypeOtherSpan.innerHTML = "stypeOther:";

    var stypeOtherSelect = document.createElement('select');
    stypeOtherSelect.id = "stypeOtherSelectId";
    stypeOtherSelect.classList.add('forSelectParameters');

    for (var i = 0; i < spriteNameCollection.length; i++) {
        var option = document.createElement("option");
        var spriteName = spriteNameCollection[i];
        option.value = spriteName;
        option.text = spriteName;
        stypeOtherSelect.appendChild(option);
    }

    stypeOtherSelect.setAttribute('oninput', 'updateStypeOtherParameterInsideObject(this.value)');
    divContainer.append(stypeOtherSpan);
    divContainer.append(stypeOtherSelect);
    div.append(divContainer);
}

function createStypeOtherParameterInsideObject()
{
    var stypeOther = document.getElementById('stypeOtherSelectId');
    var value = stypeOther.options[stypeOther.selectedIndex].text;

    if(!('stypeOther' in currentInteractionObj.parameters))
    {
        currentInteractionObj.parameters['stypeOther'] = value;
    }
}

function updateStypeOtherParameterInsideObject(value)
{
    updateSelectParameter('stypeOtherSelectId', value);
}

function updateStypeOtherParameterElement(value)
{
    updateSelectParameter('stypeOtherSelectId', value);
}

function createInteractionLimitParameter()
{
    var divContainer = document.createElement('div');
    divContainer.id = 'limitInteractionDivId';
    divContainer.classList.add('interactionElementDiv');
    var div = document.getElementById('interactionDiv');

    var limitSpan = document.createElement('span');
    limitSpan.id = 'limitInteractionSpanId';
    limitSpan.classList.add('spanForInteractionParameters');
    limitSpan.innerHTML = "limit:";

    var limitInput = document.createElement('input');
    limitInput.type = 'number';
    limitInput.id = "limitInputId";
    limitInput.classList.add('forSelectParameters');
    limitInput.min = '0';

    limitInput.setAttribute('oninput', 'updateLimitParameterInsideObject(this.value)');
    divContainer.append(limitSpan);
    divContainer.append(limitInput);
    div.append(divContainer);
}

function createLimitParameterInsideObject()
{
    var limitInput = document.getElementById('limitInputId');
    var value = limitInput.value;

    if(!('limit' in currentInteractionObj.parameters))
    {
        currentInteractionObj.parameters['limit'] = value;
    }
}

function updateLimitParameterInsideObject(value)
{
    currentInteractionObj.parameters['limit'] = value;
}

function updateLimitParameterElement(value)
{
    var inputLimit = document.getElementById('limitInputId');
    inputLimit.value = value;
}

function createInteractionValueParameter()
{
    var divContainer = document.createElement('div');
    divContainer.id = 'valueInteractionDivId';
    divContainer.classList.add('interactionElementDiv');
    var div = document.getElementById('interactionDiv');

    var valueSpan = document.createElement('span');
    valueSpan.id = 'valueInteractionSpanId';
    valueSpan.classList.add('spanForInteractionParameters');
    valueSpan.innerHTML = "value:";

    var valueInput = document.createElement('input');
    valueInput.type = 'number';
    valueInput.id = "valueInputId";
    valueInput.classList.add('forSelectParameters');
    valueInput.min = '0';

    valueInput.setAttribute('oninput', 'updateValueParameterInsideObject(this.value)');
    divContainer.append(valueSpan);
    divContainer.append(valueInput);
    div.append(divContainer);
}

function createValueParameterInsideObject()
{
    var valueInput = document.getElementById('valueInputId');
    var value = valueInput.value;

    if(!('value' in currentInteractionObj.parameters))
    {
        currentInteractionObj.parameters['value'] = value;
    }
}

function updateValueParameterInsideObject(value)
{
    currentInteractionObj.parameters['value'] = value;
}

function updateValueParameterElement(value)
{
    var valueInput = document.getElementById('valueInputId');
    valueInput.value = value;
}


