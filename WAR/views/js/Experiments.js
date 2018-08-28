function addNewSpriteToSpriteSet(spriteSet) {
    var object = new Object();
    object.identifier = defineIdentifier();
    if(object.identifier != null && object.identifier != "")
    {
        object.children = [];
        object.parameters = {img: "oryx/scorpion1"};
        object.referenceClass = "Immovable";

        if("img" in object.parameters) {
            var background = getLevelBackgroundIdentifierForThisLevel();
            var mapEntry;
            if (background != "this level has no background") {
                var position = whereDoesTheLevelBGAppearsInTheArray();

                if (position == 0) {
                    mapEntry = [background, object.identifier];
                }
                else {
                    mapEntry = [object.identifier, background];
                }
            }
            else {
                mapEntry = [object.identifier];
            }
            mappingObj[symbols[pointer++]] = mapEntry;
        }
        spriteSet.push(object);
        refreshGame(gameObj);
    }
}

function defineIdentifier() {
    var identifier = prompt("Please enter sprite's name:");
    while(spriteNameCollection.includes(identifier))
    {
        identifier = prompt("name already exists, please try again");
    }
    return identifier;
}

function addNewInteractionToInteractionSet(interactionSet)
{
    var object = new Object();
    var lastInteraction = interactionSet[interactionSet.length - 1];
    object.interactionName = lastInteraction.interactionName;
    object.parameters = lastInteraction.parameters;
    object.sprite2 = lastInteraction.sprite2;
    object.sprite1 = lastInteraction.sprite1;
    interactionSet.push(object);
    refreshGame(gameObj);
}

function addNewTerminationToTerminationSet(interactionSet)
{

}

function rebuildSpriteSetAndDependencies(spriteSet, upperUl) {
    buildTheSpriteSet(spriteSet, upperUl);
    console.log(spriteSet);
    activateHierarchyListSort();
    getObjectForUpdatingOnMouseClick();
    updateObjectsAfterListChange();
}

function removeElementsFromUl()
{
    var upperUl = document.getElementById('spriteList');
    while (upperUl.firstChild) {
        upperUl.removeChild(upperUl.firstChild);
    }
    return upperUl;
}

function action(spriteSet)
{
    // addNewSpriteToSpriteSet(spriteSet);
    // var upperUl = removeElementsFromUl();
    // rebuildSpriteSetAndDependencies(spriteSet, upperUl);
    // Call the function with the provided values. The mime type could also be png
// or web
    // uploadImage("oo.jpeg", "img", 'image/jpeg');
    xhr = new XMLHttpRequest();
    var url = "http://localhost:9001/uploadImage";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "text/plain");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var resp = xhr.responseText;
            console.log(resp);
        }
    }
    var data = "https://imgix.bustle.com/uploads/image/2018/6/29/dd61f31c-26af-4ab9-9102-6d3647b18029-cattoys.jpg";
    xhr.send(data);
}

// callback function that will be called with the data URL as its argument
// once processing is complete

var convertToBase64 = function(url, imagetype, callback){

    var img = document.createElement('IMG'),
        canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        data = '';

    // Set the crossOrigin property of the image element to 'Anonymous',
    // allowing us to load images from other domains so long as that domain
    // has cross-origin headers properly set

    img.crossOrigin = 'Anonymous'

    // Because image loading is asynchronous, we define an event listening function that will be called when the image has been loaded
    img.onLoad = function(){
        // When the image is loaded, this function is called with the image object as its context or 'this' value
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        data = canvas.toDataURL(imagetype);
        callback(data);
    };

    // We set the source of the image tag to start loading its data. We define
    // the event listener first, so that if the image has already been loaded
    // on the page or is cached the event listener will still fire

    img.src = url;
};

// Here we define the function that will send the request to the server.
// It will accept the image name, and the base64 data as arguments

var sendBase64ToServer = function(name, base64){
    var httpPost = new XMLHttpRequest(),
        path = "http://localhost:9001/uploadImage",
        data = JSON.stringify({image: base64});
    httpPost.onreadystatechange = function(err) {
        if (httpPost.readyState == 4 && httpPost.status == 200){
            console.log(httpPost.responseText);
        } else {
            console.log(err);
        }
    };
    // Set the content type of the request to json since that's what's being sent
    httpPost.setHeader('Content-Type', 'application/json');
    httpPost.open("POST", path, true);
    httpPost.send(data);
};

// This wrapper function will accept the name of the image, the url, and the
// image type and perform the request

var uploadImage = function(src, name, type){
    convertToBase64(src, type, function(data){
        sendBase64ToServer(name, data);
    });
};

