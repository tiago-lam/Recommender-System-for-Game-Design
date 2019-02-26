function renderTerminationCondition(termination)
{

    if(termination == 'SpriteCounter')
    {
        loadSpriteSelect('sprite1Id');
        document.getElementById('spriteCounterId').style.display = 'block';
        document.getElementById('timeOutId').style.display = 'none';
        document.getElementById('multiSpriteCounterId').style.display = 'none';
    }
    else if(termination == 'TimeOut')
    {
        document.getElementById('timeOutId').style.display = 'block';
        document.getElementById('spriteCounterId').style.display = 'none';
        document.getElementById('multiSpriteCounterId').style.display = 'none';
    }
    else if(termination == 'MultiSpriteCounter')
    {
        loadSpriteSelect('sprite1mscId');
        loadSpriteSelect('sprite2mscId');
        document.getElementById('multiSpriteCounterId').style.display = 'block';
        document.getElementById('timeOutId').style.display = 'none';
        document.getElementById('spriteCounterId').style.display = 'none';
    }
}

function initializeRender() {
    var sel = document.getElementById('selectTerminationConditionId');
    sel.setAttribute("oninput", "renderTerminationCondition(this.value)");
}

function renderTerminationConditionAdd(termination)
{

    if(termination == 'SpriteCounter')
    {
        loadSpriteSelect('sprite1IdAdd');
        document.getElementById('spriteCounterIdAdd').style.display = 'block';
        document.getElementById('timeOutIdAdd').style.display = 'none';
        document.getElementById('multiSpriteCounterIdAdd').style.display = 'none';
    }
    else if(termination == 'TimeOut')
    {
        document.getElementById('timeOutIdAdd').style.display = 'block';
        document.getElementById('spriteCounterIdAdd').style.display = 'none';
        document.getElementById('multiSpriteCounterIdAdd').style.display = 'none';
    }
    else if(termination == 'MultiSpriteCounter')
    {
        loadSpriteSelect('sprite1mscIdAdd');
        loadSpriteSelect('sprite2mscIdAdd');
        document.getElementById('multiSpriteCounterIdAdd').style.display = 'block';
        document.getElementById('timeOutIdAdd').style.display = 'none';
        document.getElementById('spriteCounterIdAdd').style.display = 'none';
    }
}

function loadSpriteSelect(id)
{
    var sel = document.getElementById(id);
    removeOptions(sel);
    for(var i = 0; i < spriteNameCollection.length; i++)
    {
        var opt = document.createElement('option');
        opt.value = spriteNameCollection[i];
        opt.text = spriteNameCollection[i];
        sel.appendChild(opt);
    }
}

function removeOptions(selectbox)
{
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}

initializeRender();