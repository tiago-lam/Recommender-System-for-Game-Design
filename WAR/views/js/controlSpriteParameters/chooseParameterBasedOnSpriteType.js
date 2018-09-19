/**
 * Created by tiagomachado on 5/21/18.
 */

/**
 * Selects the correct creator method to apply to the specified reference class
 * @param specialType(referenceClass)
 * @param parameters
 */

/**
 * List with all the reference classes - Regular means elements without a class
 * @type {*[]}
 */
const typeList = ["Regular", Immovable, Passive, ShootAvatar, FlakAvatar, Flicker, OrientedFlicker, Missile, RandomMissile, RandomNPC, Chaser, Fleeing, AlternateChaser, RandomPathAltChaser, SpawnPoint, Bomber, RandomBomber, Spreader, Door, Portal, Resource];

var thisObj;

function designSpecialTypesParameters(obj, parameters)
{
    var specialType = obj.referenceClass;

    removeElements(specialParameters);

    if(specialType == ShootAvatar)
    {
        createShootAvatarParameters(parameters);
    }
    else if(specialType == FlakAvatar)
    {
        createFlakAvatarParameters(parameters);
    }
    else if(specialType == Flicker)
    {
        createFlickerParameter(parameters);
    }
    else if(specialType == OrientedFlicker)
    {
        createOrientedFlickerParameter(parameters);
    }
    else if(specialType == Chaser)
    {
        createChaserParameter(parameters);
    }
    else if(specialType == Fleeing)
    {
        createFleeingParameter(parameters);
    }
    else if(specialType == AlternateChaser)
    {
        createAlternateChaserParameter(parameters);
    }
    else if(specialType == RandomPathAltChaser)
    {
        createRandomAltChaserParameter(parameters);
    }
    else if(specialType == SpawnPoint)
    {
        createSpawnPoint(parameters);
    }
    else if(specialType == Bomber)
    {
        createBomber(parameters);
    }
    else if(specialType == RandomBomber)
    {
        createRandomBomber(parameters);
    }
    else if(specialType == Spreader)
    {
        createSpreader(parameters);
    }
    else if(specialType == Portal)
    {
        createPortal(parameters);
    }
    else if(specialType == Resource)
    {
        createResource(parameters);
    }

}

function changeElementType(newRefClass, update)
{
    // var warning = confirm("Are you sure you want to change the element type? " +
    //                         "This will alter the element behavior");
    //if(warning == true) {

        update(thisObj, newRefClass);
    //}

    // console.log('tempobj')
    // console.log(thisObj);
}

function updateParametersOfTheReferenceClass(thisObj, newRefClass)
{

    var oldRefClass = thisObj.referenceClass;

    var listOldParams = returnParametersOfThisReference(oldRefClass);

    for(var i = 0; i < listOldParams.length; i++) {
        var paramOld = listOldParams[i];
        if (thisObj.parameters[paramOld]) {
            delete thisObj.parameters[paramOld];
        }
    }

    var listNewParams = returnParametersOfThisReference(newRefClass)

    console.log(listNewParams);

    for(var i = 0; i < listNewParams.length; i++) {
        var paramNew = listNewParams[i];
        thisObj.parameters[paramNew] = returnDefaultValuesOfThisParameter(paramNew);
    }

    thisObj.referenceClass = newRefClass;
    if(thisObj.children.length > 0)
    {
        for(var i = 0; i < thisObj.children.length; i++)
        {
            var childrenObj = thisObj.children[i];
            //thisObj = childrenObj;
            //var emptyParamList = getCorrectListOfEmptyParameters(newRefClass);
            updateParametersOfTheReferenceClass(childrenObj, newRefClass);
            updateInspector(childrenObj);
        }
    }
    updateInspector(thisObj);
}

function updateRefClass(obj)
{
    thisObj = obj;
    var specialType = obj.referenceClass;
    var divSelectRefClass = document.createElement('div');
    divSelectRefClass.id = 'refClassDivId';
    var selectRefClass = document.createElement('select');
    selectRefClass.id = "refClassSelectId";

    //gets this dd-item/li element
    var li = document.getElementById(obj.identifier);
    //check if this li/dd-item/obj has a parent
    var parentLi = li.parentNode;
    if(parentLi.id != "spriteList")
    {
        if(parentLi.classList.contains("dd-list"))
        {
            parentLi = parentLi.parentNode;
            var parentObj = retrieveObjectByTarget(parentLi.id);
            if(parentObj.referenceClass != null) {
                selectRefClass.disabled = true;
            }
        }
    }

    selectRefClass.setAttribute("onchange", "changeElementType(this.value, callBack)");
    //selectRefClass.addEventListener("onchange", changeElementType(selectRefClass.value, obj);
    for (var i = 0; i < typeList.length; i++) {
        var option = document.createElement("option");
        var refClassType = typeList[i];
        option.value = String(refClassType);
        option.text = String(refClassType);
        selectRefClass.appendChild(option);
    }
    divSelectRefClass.appendChild(selectRefClass);
    document.getElementById("divSpecialParameters").appendChild(divSelectRefClass);

    updateSelectParameter('refClassSelectId', specialType);
}

function createRefClass()
{
    var divSelectRefClass = document.createElement('div');
    divSelectRefClass.id = 'refClassDivId';
    var selectRefClass = document.createElement('select');
    selectRefClass.id = "refClassSelectId";
    divSelectRefClass.appendChild(selectRefClass);
    document.getElementById("divSpecialParameters").appendChild(divSelectRefClass);
}

function getRefClassSelected()
{
    var selectRefClass = document.getElementById('refClassSelectId');

    var selectedOption = selectRefClass.options[selectRefClass.selectedIndex].text;

    return selectedOption;
}

function updateRefClassInTheObject(obj)
{
    obj.referenceClass = getRefClassSelected();
    for(var i = 0; i < obj.children.length; i++)
    {
        var kid = obj.children[i];
        updateRefClassInTheObject(kid);
    }
}

function getSpecialParameters()
{
    var specialParameters = document.getElementById('divSpecialParameters');
    var spanCollection = specialParameters.getElementsByTagName('span');
}

