var currentTerminationObj;
var currentTerminationElementId;

function showTerminationInfo(terminationObj, terminationElement)
{
    currentTerminationObj = terminationObj;
    currentTerminationElementId = terminationElement;
    removeTerminationComponents();
    createTerminationSelectList();
    updateSelectParameter('terminationSelectId', currentTerminationObj.termination);
    showTerminationParameters(terminationObj);
}

function createTerminationSelectList()
{
    var divParent = document.getElementById('terminationSelectDiv');
    var terminationSelect = document.createElement('select');
    terminationSelect.id = "terminationSelectId";
    terminationSelect.classList.add('style-rounded');
    terminationSelect.classList.add('blue');
    terminationSelect.classList.add('rounded');

    for (var i = 0; i < terminationCollection.length; i++) {
        var option = document.createElement("option");
        var termination = terminationCollection[i];
        option.value = termination;
        option.text = termination;
        terminationSelect.appendChild(option);
    }

    terminationSelect.setAttribute('oninput', 'updateTerminationInsideTheObj(this.value)');

    divParent.append(terminationSelect);
}

function updateTerminationInsideTheObj(value)
{
    currentTerminationObj.termination = value;
    updateTerminationElementText(currentTerminationObj, currentTerminationElementId);
}


function removeTerminationComponents()
{
    var terminationDiv = document.getElementById('terminationSelectDiv');

    while (terminationDiv.childNodes.length > 0) {
        terminationDiv.removeChild(terminationDiv.lastChild);
    }
}

function showTerminationParameters(terminationObj)
{
    if('stype' in terminationObj.parameters)
    {
        createSelectForTermination('terminationSelectDiv', 'stypeTerminationSelectId', 'sprite');
        updateSelectParameter('stypeTerminationSelectId', terminationObj.parameters['stype']);
    }

    if('stype1' in terminationObj.parameters)
    {
        createSelectForTermination('terminationSelectDiv', 'stype1TerminationSelectId', 'sprite');
        updateSelectParameter('stype1TerminationSelectId', terminationObj.parameters['stype1']);
    }

    if('stype2' in terminationObj.parameters)
    {
        createSelectForTermination('terminationSelectDiv', 'stype2TerminationSelectId', 'sprite');
        updateSelectParameter('stype2TerminationSelectId', terminationObj.parameters['stype2']);
    }

    if('limit' in terminationObj.parameters)
    {
        createLimitForTermination();
        updateTerminationLimitParameterElement(terminationObj.parameters.limit);
    }

    if('count_score' in terminationObj.parameters)
    {
        createSelectForTermination('terminationSelectDiv', 'countScoreSelect', 'boolean');
        updateSelectParameter('countScoreSelect', terminationObj.parameters['count_score']);
    }

    if('win' in terminationObj.parameters)
    {
        createSelectForTermination('terminationSelectDiv', 'winSelect', 'boolean');
        updateSelectParameter('winSelect', terminationObj.parameters['win']);
    }

}

function createSelectForTermination(terminationDiv, stypeId, type)
{
    var divParent = document.getElementById(terminationDiv);
    var sprite1Select = document.createElement('select');
    sprite1Select.id = stypeId;
    sprite1Select.classList.add('style-rounded');
    sprite1Select.classList.add('blue');
    sprite1Select.classList.add('rounded');

    if(type == 'sprite') {
        for (var i = 0; i < spriteNameCollection.length; i++) {
            var option = document.createElement("option");
            var spriteName = spriteNameCollection[i];
            option.value = spriteName;
            option.text = spriteName;
            sprite1Select.appendChild(option);
        }
    }
    else
    {
        for (var i = 0; i < result.length; i++) {
            var option = document.createElement("option");
            var res = result[i];
            option.value = res;
            option.text = res;
            sprite1Select.appendChild(option);
        }
    }

    if(stypeId == 'stypeTerminationSelectId') {
        sprite1Select.setAttribute('oninput', 'updateStypeInsideTheObj(this.value)');
    }

    if(stypeId == 'stype1TerminationSelectId') {
        sprite1Select.setAttribute('oninput', 'updateStype1InsideTheObj(this.value)');
    }

    if(stypeId == 'stype2TerminationSelectId') {
        sprite1Select.setAttribute('oninput', 'updateStype2InsideTheObj(this.value)');
    }

    if(stypeId == 'countScoreSelect') {
        sprite1Select.setAttribute('oninput', 'updateCountScoreInsideTheObj(this.value)');
    }

    if(stypeId == 'winSelect') {
        sprite1Select.setAttribute('oninput', 'updateWinInsideTheObj(this.value)');
    }

    divParent.append(sprite1Select);
}

function createLimitForTermination()
{
    var divContainer = document.createElement('div');
    divContainer.id = 'limitTerminationDivId';
    divContainer.classList.add('terminationElementDiv');
    var div = document.getElementById('terminationSelectDiv');

    var limitSpan = document.createElement('span');
    limitSpan.id = 'limitTerminationSpanId';
    limitSpan.classList.add('spanForInteractionParameters');
    limitSpan.classList.add('spanLimitOverflow');
    limitSpan.innerHTML = "limit:";

    var limitInput = document.createElement('input');
    limitInput.type = 'number';
    limitInput.id = "limitTerminationInputId";
    limitInput.classList.add('forSelectParameters');
    limitInput.min = '0';

    limitInput.setAttribute('oninput', 'updateTerminationLimitParameterInsideObject(this.value)');
    divContainer.append(limitSpan);
    divContainer.append(limitInput);
    div.append(divContainer);
}

function updateStypeInsideTheObj(value)
{
    currentTerminationObj.parameters['stype'] = value;
    updateTerminationElementText(currentTerminationObj, currentTerminationElementId);
}

function updateStype1InsideTheObj(value)
{
    currentTerminationObj.parameters['stype1'] = value;
    updateTerminationElementText(currentTerminationObj, currentTerminationElementId);
}

function updateStype2InsideTheObj(value)
{
    currentTerminationObj.parameters['stype2'] = value;
    updateTerminationElementText(currentTerminationObj, currentTerminationElementId);
}

function updateCountScoreInsideTheObj(value)
{
    currentTerminationObj.parameters['count_score'] = value;
    updateTerminationElementText(currentTerminationObj, currentTerminationElementId);
}

function updateWinInsideTheObj(value)
{
    currentTerminationObj.parameters['win'] = value;
    updateTerminationElementText(currentTerminationObj, currentTerminationElementId);
}

function updateTerminationLimitParameterElement(value) {
    var inputLimit = document.getElementById('limitTerminationInputId');
    inputLimit.value = value;
}

function updateTerminationLimitParameterInsideObject(value)
{
    currentTerminationObj.parameters.limit = value;
    updateTerminationElementText(currentTerminationObj, currentTerminationElementId);
}