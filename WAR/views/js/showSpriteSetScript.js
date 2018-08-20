/**
 * map that relates identifier to objects
 * @type {Map}
 */
var mapIdentifierToObject = new Map();

/**
 * map that relates identifier to objects
 * @type {Map}
 */
var mapChildToParent = new Map();

/**
 * Stores the names of all the sprites to be used as a list for the interactions
 * @type {Array}
 */
var spriteNameCollection = [];

var levelStates = {count: 0, levelMap: []};

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
 * Build the whole sprite set as an HTML hierarchy list
 * @param spriteSetObj
 * @param ulElement
 */
function buildTheSpriteSet(spriteSetObj, ulElement) {
    spriteNameCollection = [];
    for (var i = 0; i < spriteSetObj.length; i++) {
        getObjectData(spriteSetObj[i], ulElement);
    }
    console.log(mapChildToParent);
}

var getGameParam = localStorage.getItem("varGetGameParam");

/**
 * Function responsible for perform the GET response
 */
xmlhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

        console.log(this.responseText);

        gameObj = JSON.parse(this.responseText);

        spriteSetObj = gameObj["SpriteSet"];
        mappingObj = gameObj["LevelMapping"];
        interactionSetObj = gameObj["InteractionSet"];
        terminationSetObj = gameObj["TerminationSet"];
        levelMatrixObject = gameObj["Level"];
        console.log(spriteSetObj);
        console.log(mappingObj);
        console.log(interactionSetObj);
        console.log(terminationSetObj);
        console.log(levelMatrixObject);
        structureTheSpriteSetOnHtml();
        buildTheInteractionSet(interactionSetObj);
        buildTerminationSet(terminationSetObj);
        appendWallToMappingObj();
        findObjectsWithoutSymbols();
        var rows = levelMatrixObject.rows;
        var columns = levelMatrixObject.columns;
        createTable(rows, columns);
        createImgList();
        drawLevel();
        saveLevelMapProcedure();
        startLevelObserver();
        document.onkeydown = redoLevelByPressingCtrlZ;
    }
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
    $('.dd').nestable('');
}

/**
 * It shows the information of the sprite you clicked on
 */
function getObjectForUpdatingOnMouseClick()
{
    $(".dd-handle")
        .mousedown(function(e) {
            var obj = retrieveObjectByTarget(e.target.id);
            updateInspector(obj);
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
    var identifier = currentObj.identifier;
    spriteNameCollection.push(identifier);
    var parameters = currentObj.parameters;
    var imgSrc = document.createElement("img");
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

        // return Promise.all(objChildren.map(new Promise(function() {
        //
        //     apChildToParent.set(innerCurrentObj.identifier, currentObj.identifier);
        //     getObjectData(innerCurrentObj, innerOl);
        //     li.append(innerOl)})));
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

function removeObjectFromTheSpriteSet(obj)
{
    var index = spriteSetObj.indexOf(obj);
    if (index > -1) {
        spriteSetObj.splice(index, 1);
    }

    mapIdentifierToObject.delete(obj.identifier);
}