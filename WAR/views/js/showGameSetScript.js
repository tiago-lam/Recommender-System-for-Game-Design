/**
 * map that relates identifier to objects
 * @type {Map}
 */
var mapIdentifierToObject;

/**
 * map that relates identifier to objects
 * @type {Map}
 */
var mapChildToParent;

/**
 * Stores the names of all the sprites to be used as a list for the interactions
 * @type {Array}
 */
var spriteNameCollection = [];

/**
 * Stores all the types available in the set
 * @type {Array}
 */
var typeSetCollection = []

/**
 * Stores the main Ul element responsible for the Sprite Set hierarchy
 * @type {HTMLElement | null}
 */
var spriteListUl = document.getElementById("spriteList");
/**
 * Apply the dd-list nestable style to the spriteListUl
 */
spriteListUl.classList.add("dd-list");

var gameObj;

/**
 * The sprite set obj
 */
var spriteSetObj;

/**
 * The level mapping set obj
 */
var mappingObj;

/**
 * The interaction set obj
 */
var interactionSetObj;

/**
 * The termination set obj
 */
var terminationSetObj;

/**
 * The sample level of the game (usually lvl0)
 */
var levelMatrixObject;

/**
 * access the serve in order to get the sprite set of a game
 * @type {XMLHttpRequest}
 * */
var xmlhttp = new XMLHttpRequest();

/**
 * Keeps track of the object (sprite) list size
 * */
var listCurrentLength;

/**
 * Build the whole sprite set as an HTML hierarchy list
 * @param spriteSetObj
 * @param ulElement
 */
function buildTheSpriteSet(spriteSetObj, ulElement) {
    spriteNameCollection = [];
    mapIdentifierToObject = new Map();
    mapChildToParent = new Map();
    for (var i = 0; i < spriteSetObj.length; i++) {
        getObjectData(spriteSetObj[i], ulElement);
    }
    console.log(mapChildToParent);
}

var getGameParam = localStorage.getItem("varGetGameParam");

function initializeGameObject(response) {
    gameObj = JSON.parse(response);

    if (gameObj == undefined) {
        gameObj["SpriteSet"] = [];
        gameObj["LevelMapping"] = new Object();
        gameObj["InteractionSet"] = [];
        gameObj["TerminationSet"] = [];
        gameObj["Level"] = [];
    }

    else {
        spriteSetObj = gameObj["SpriteSet"];
        mappingObj = gameObj["LevelMapping"];
        interactionSetObj = gameObj["InteractionSet"];
        terminationSetObj = gameObj["TerminationSet"];
        levelMatrixObject = gameObj["Level"];
    }

    console.log(spriteSetObj);
    console.log(mappingObj);
    console.log(interactionSetObj);
    console.log(terminationSetObj);
    console.log(levelMatrixObject);

    var sets = new Object();
    sets['iObjs'] = interactionSetObj;
    sets['tObjs'] = terminationSetObj;

    return sets;
}

function initializationProtocol(obj) {
    // initializeGameObject(obj);
    // structureTheSpriteSetOnHtml();
    // buildTheInteractionSet(interactionSetObj);
    // buildTerminationSet(terminationSetObj);
    initGameDescription(obj, initSpriteObjects, interactionSetObj, initInteractionObjects, terminationSetObj, initTerminationObjects, levelBuilder);
    //document.onkeydown = redoProcedureByPressingCtrlZ;
}

function initGameDescription(obj, structureSpriteObjects, iObjs, structureInteractionObjects, tObjs, structureTerminationObjects, levelComposer)
{
    var sets = initializeGameObject(obj);
    structureSpriteObjects(sets.iObjs, structureInteractionObjects, sets.tObjs, structureTerminationObjects, levelComposer);
}

function initSpriteObjects(iObjs, structureInteractionObjects, tObjs, structureTerminationObjects, levelComposer)
{
    structureTheSpriteSetOnHtml();
    structureInteractionObjects(iObjs, tObjs, structureTerminationObjects, levelComposer);
}

function initInteractionObjects(iObjs, tObjs, structureTerminationObjects, levelComposer)
{
    buildTheInteractionSet(iObjs);
    structureTerminationObjects(tObjs, levelComposer);
}

function initTerminationObjects(tObjs, levelComposer)
{
    buildTerminationSet(tObjs);
    levelComposer();
}

function levelBuilder() {
    appendWallToMappingObj();
    findObjectsWithoutSymbols();
    var rows = levelMatrixObject.rows;
    var columns = levelMatrixObject.columns;
    createTable(rows, columns);
    createImgList(spriteSetObj);
    drawLevel(saveAndObserver);
}

function saveAndObserver()
{
    saveGameState();
    startLevelObserver();
}

/**
 * Function responsible for perform the GET response
 */
xmlhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

        var obj = this.responseText;
        initializationProtocol(obj);
    }
    //startSpriteListObserver();
};
/**
 * Prepare and send the GET request to the server
 */
xmlhttp.open("GET", "http://localhost:9001/getGame" + "?" + getGameParam, true);
xmlhttp.send();

function structureTheSpriteSetOnHtml()
{
    buildTheSpriteSet(spriteSetObj, spriteListUl);
    activateHierarchyListSort();
    getObjectForUpdatingOnMouseClick();
    updateObjectsAfterListChange();
    updateObjectListSize();
}

function updateObjectListSize()
{
    listCurrentLength =
        document.getElementById('spriteList').childNodes.length;
}

function addNoneAndEosOptions()
{
    spriteNameCollection.push("none");
    spriteNameCollection.push("EOS");
}

/**
 * Basically activates the nestable library
 */
function activateHierarchyListSort()
{
    //$('.dd').nestable('');
}

/**
 * It shows the information of the sprite you clicked on
 */
function getObjectForUpdatingOnMouseClick()
{
    $(".dd-handle")
        .mousedown(function(e) {
            console.log("element", e);
            var id;
            if(e.target.localName == 'div')
            {
                id = e.target.id;
            }
            else
            {
                id = e.target.parentNode.id;
            }
            var obj = retrieveObjectByTarget(id);
            updateInspector(obj);
            deactivateOpacity();
        });
}

/**
 * Updates the sprite set after any changes on the hierarchy
 */
function updateObjectsAfterListChange()
{
    $('.dd').on('change', function() {
        updateObj();
    });
}

/**
 * Extracts all  information of a sprite and add it to a list element
 */
function getObjectData(obj, upperUl)
{
    var currentObj = obj;
    if(obj.referenceClass != null && !typeSetCollection.includes(obj.referenceClass))
    {
        if(obj.referenceClass != "Regular")
        {
            typeSetCollection.push(obj.referenceClass);
        }
    }
    var identifier = currentObj.identifier;
    spriteNameCollection.push(identifier);
    var parameters = currentObj.parameters;
    var imgSrc = document.createElement("img");
    imgSrc.draggable = true;
    imgSrc.setAttribute('class', 'imgSprite');
    imgSrc.id = identifier + "ImgId";

    if("img" in parameters)
    {
        var imgPathForUrlCreation;

        if(parameters['img'].includes(".png")) {
            imgPathForUrlCreation = parameters["img"];
        }
        else
        {
            imgPathForUrlCreation = parameters["img"] + ".png";
        }
        imgSrc.src = imgPathForUrlCreation;
    }

    var li = document.createElement("li");
    li.id = identifier;
    li.classList.add("dd-item");

    var div = document.createElement("div");
    div.classList.add("dd-handle");
    div.id = identifier;
    var divText = document.createTextNode(identifier);
    div.appendChild(divText);
    div.appendChild(imgSrc);
    li.appendChild(div);

    var cancelDiv = document.createElement('div');
    cancelDiv.classList.add('spriteCancelDiv');
    cancelDiv.id = "delete_" + identifier;
    cancelDiv.setAttribute("onmousedown", "removeSpriteElement(event)");
    var cancelImg = document.createElement('img');
    cancelImg.src = "http://localhost:9001/WAR/views/css/cancel.png";
    cancelDiv.appendChild(cancelImg);
    li.appendChild(cancelDiv);

    var textElement = identifier;

    li.setAttribute('data-obj', currentObj);
    mapIdentifierToObject.set(textElement, currentObj);
    upperUl.appendChild(li);

    var objChildren = currentObj.children;
    if(objChildren)
    {
        var innerOl = document.createElement("ol");
        innerOl.classList.add("dd-list");
        innerOl.classList.add("children");

        for(var j = 0; j < objChildren.length; j++)
        {
            var innerCurrentObj = objChildren[j];
            mapChildToParent.set(innerCurrentObj.identifier, currentObj.identifier);
            getObjectData(innerCurrentObj, innerOl);
            li.appendChild(innerOl);
        }
    }
}

function removeSpriteElement(e) {
    var isOkToRemove = confirm("Are you sure you want to remove this item?");
    if (isOkToRemove) {
        var id = e.target.parentNode.id.replace("delete_", "");
        e.target.parentNode.parentNode.remove();
        var obj = retrieveObjectByTarget(id);
        removeObjectFromTheSpriteSet(obj, gameObj['SpriteSet']);
        removeItemFrom(spriteNameCollection, id);
        updateObj();
        saveGameState();
    }
}

/**
 * Get the image of an specific sprite
 * @param imgPath
 * @param imgElement
 */
function fetchBlob(imgPath, imgElement) {
    // construct the URL path to the image file from the product.image property
    var urlSrc = null;
    // Use XHR to fetch the image, as a blob
    // Again, if any errors occur we report them in the console.
    var request = new XMLHttpRequest();
    var params = "picture=" + imgPath;
    request.open('GET', "http://localhost:9001/imgs" + "?" + params, true);
    request.responseType = 'blob';
    var objectURL = null;

    request.onload = function() {
        if(request.status === 200) {
            // Convert the blob to an object URL — this is basically an temporary internal  URL
            // that points to an object stored inside the browser
            var blob = request.response;
            objectURL = URL.createObjectURL(blob);
            // invoke showProduct
            imgElement.src = objectURL;
            urlSrc = imgElement.src;
            return urlSrc;

        } else {
            alert('Network request for "' + product.name + '" image failed with response ' +     request.status + ': ' + request. statusText);
        }
    };
    request.send();
}

/**
 * Returns a sprite obj, Given a target (name)
 * @param target
 * @returns {*}
 */
function retrieveObjectByTarget(target)
{
    var obj =  mapIdentifierToObject.get(target);
    return obj;
}

function getMapListObject()
{
    return mapIdentifierToObject;
}

function detachObjFromList(obj, list)
{
    var index = list.indexOf(obj);
    if (index > -1) {
        list.splice(index, 1);
    }
    removeSpriteNamesFromArraysAndMaps(obj);
}

function removeObjectFromTheSpriteSet(obj, spriteSet)
{
    for(var i = 0; i < spriteSet.length; i++)
    {
        var sprite = spriteSet[i];
        if(sprite.identifier == obj.identifier)
        {
            detachObjFromList(obj, spriteSet);
            return;
        }

        var children = sprite.children;
        for(var j = 0; j < children.length; j++)
        {
            removeObjectFromTheSpriteSet(obj, children);
        }
    }
}

function deleteSpriteHierarchyList()
{
    var spriteList = document.getElementById('spriteList');

    while(spriteList.childNodes.length > 0)
    {
        spriteList.removeChild(spriteList.lastChild);
    }
}

function removeTypeFromTypeList(objName)
{
    var obj = mapIdentifierToObject.get(objName);
    var index = typeSetCollection.indexOf(obj.referenceClass);
    if(index > -1)
    {
        typeSetCollection.splice(index, 1);
    }
}

function removeSpriteNamesFromArraysAndMaps(obj)
{
    var familyMNames = storeNamesOfThisObjAndItsKids(obj, []);
    for(var i = 0; i < familyMNames.length; i++)
    {
        removeTypeFromTypeList(familyMNames[i]);
        removeItemFrom(spriteNameCollection, familyMNames[i]);
        mapIdentifierToObject.delete(familyMNames[i]);
        removeSelectItemFrom(document.getElementById('sprite1SelectId'), familyMNames[i]);
        removeInteractionObjectWithThisSprite(familyMNames[i]);
        removeTerminationObjectWithThisSprite(familyMNames[i]);
        removeFromTheSpriteCheckBoxList(familyMNames[i]);
        removeSpriteFromLevelSpriteList(familyMNames[i]);
        removeSpriteInTheGridLevel(familyMNames[i]);
    }
}