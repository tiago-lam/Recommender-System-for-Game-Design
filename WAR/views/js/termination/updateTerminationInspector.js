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
    var containerDiv = document.createElement('div');
    containerDiv.classList.add('arrangeSpanAndElement');
    var terminationSpan = createSpan('condition', 'terminationSpanId');
    var terminationSelect = document.createElement('select');
    terminationSelect.id = "terminationSelectId";
    terminationSelect.classList.add('style-rounded');
    terminationSelect.classList.add('blue');
    terminationSelect.classList.add('rounded');
    terminationSelect.classList.add('pushToTheRight');

    for (var i = 0; i < terminationCollection.length; i++) {
        var option = document.createElement("option");
        var termination = terminationCollection[i];
        option.value = termination;
        option.text = termination;
        terminationSelect.appendChild(option);
    }

    terminationSelect.setAttribute('oninput', 'updateTerminationInsideTheObj(this.value)');

    containerDiv.append(terminationSpan);
    containerDiv.append(terminationSelect);
    divParent.append(containerDiv);
}

function updateTerminationInsideTheObj(value)
{
    removeTerminationComponents();

    currentTerminationObj.termination = value;

    if(value == SpriteCounter)
    {
        var win = currentTerminationObj.parameters.win;
        currentTerminationObj.parameters = {};
        currentTerminationObj.parameters['stype'] = spriteNameCollection[0];
        currentTerminationObj.parameters['limit'] = 0;
        currentTerminationObj.parameters['win'] = win;

       showTerminationParameters(currentTerminationObj);
    }

    if(value == TimeOut)
    {
        var win = currentTerminationObj.parameters.win;
        currentTerminationObj.parameters = {};
        currentTerminationObj.parameters['limit'] = 0;
        currentTerminationObj.parameters['count_score'] = False;
        currentTerminationObj.parameters['win'] = win;

        showTerminationParameters(currentTerminationObj);
    }

    updateTerminationElementText(currentTerminationObj, currentTerminationElementId);
    showTerminationInfo(currentTerminationObj, currentTerminationElementId);
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
    var containerDiv = document.createElement('div');
    containerDiv.classList.add('arrangeSpanAndElement');
    containerDiv.id = 'containerDiv';
    var divParent = document.getElementById(terminationDiv);
    var sprite1Select = document.createElement('select');
    sprite1Select.id = stypeId;
    sprite1Select.classList.add('style-rounded');
    sprite1Select.classList.add('blue');
    sprite1Select.classList.add('rounded');
    sprite1Select.classList.add('pushToTheRight');

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
        var stypeSpan = createSpan('stype', 'stypeSpanId');
        containerDiv.append(stypeSpan);
        sprite1Select.setAttribute('oninput', 'updateStypeInsideTheObj(this.value)');
    }

    if(stypeId == 'stype1TerminationSelectId') {
        var stype1Span = createSpan('stype1', 'stype1SpanId');
        containerDiv.append(stype1Span);
        sprite1Select.setAttribute('oninput', 'updateStype1InsideTheObj(this.value)');
    }

    if(stypeId == 'stype2TerminationSelectId') {
        var stype2Span = createSpan('stype2', 'stype2SpanId');
        containerDiv.append(stype2Span);
        sprite1Select.setAttribute('oninput', 'updateStype2InsideTheObj(this.value)');
    }

    if(stypeId == 'countScoreSelect') {
        var stypeCountScore = createSpan('count_score', 'countScoreSpanId');
        containerDiv.append(stypeCountScore);
        sprite1Select.setAttribute('oninput', 'updateCountScoreInsideTheObj(this.value)');
    }

    if(stypeId == 'winSelect') {
        var winSpan = createSpan('win', 'winSelectId');
        containerDiv.append(winSpan);
        sprite1Select.setAttribute('oninput', 'updateWinInsideTheObj(this.value)');
    }

    containerDiv.append(sprite1Select);
    divParent.append(containerDiv);
}

function createLimitForTermination()
{
    var divContainer = document.createElement('div');
    divContainer.id = 'limitTerminationDivId';
    divContainer.classList.add('arrangeSpanAndElement');
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
    limitInput.classList.add('style-rounded');
    limitInput.classList.add('blue');
    limitInput.classList.add('rounded');
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

function updateTerminationLimitParameterElement(value)
{
    var inputLimit = document.getElementById('limitTerminationInputId');
    inputLimit.value = value;
}

function updateTerminationLimitParameterInsideObject(value)
{
    currentTerminationObj.parameters.limit = value;
    updateTerminationElementText(currentTerminationObj, currentTerminationElementId);
}

function createSpan(innerHtml, id)
{
    var genericSpan = document.createElement('span');
    genericSpan.innerHTML = innerHtml;
    genericSpan.id = id;
    genericSpan.classList.add('spanForInteractionParameters');
    return genericSpan;
}