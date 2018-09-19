var imgList;
/**
 * access the serve in order to get the sprite set of a game
 * @type {XMLHttpRequest}
 * */
var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

        console.log(this.responseText);
        imgList = JSON.parse(this.responseText);
        storeImages(imgList);
    }
};

xmlhttp.open("GET", "http://localhost:9001/loadImages", true);
xmlhttp.send();

function storeImages(imgList)
{
    for(var i = 0; i < imgList.length; i++)
    {
        createDivForImg(imgList[i], i);
    }
}

function createDivForImg(imgAddress,idNumber)
{
    var div = document.createElement('div');
    div.display = "none";
    div.id = imgAddress + idNumber;
    div.classList.add("singleImgPickerDiv");
    var span = document.createElement('span');
    var copyAddr = imgAddress;
    span.innerHTML = getImageNameFrom(copyAddr.replace(".png",""));
    var img = document.createElement('img');
    img.src = "oryx/" + imgAddress;

    div.append(span);
    div.append(img);
    div.setAttribute("onclick", "transferImgToInspector(this.id)");

    var divContainer = document.getElementById('imagePickerListDiv');
    divContainer.append(div);
}

function transferImgToInspector(id)
{
    console.log(currentObj);
    var img = document.getElementById(id).childNodes[1];
    document.getElementById('image').src = img.src;
    currentObj.parameters['img'] = img.src;
    createLevelMappingForThisImage(currentObj.identifier);
    refreshGame(gameObj);
}

function getImageNameFrom(imgAdrress)
{
    if(imgAdrress.includes("oryx/"))
    {
        imgAdrress.replace("oryx/", "");
    }
    else if(imgAdrress.includes("newset/"))
    {
        imgAdrress.replace("newset/", "");
    }

    imgAdrress.replace(".png", "");

    return imgAdrress;
}

function load()
{
    const testFolder = '.sprites/newset/';
    const fs = require('fs');

    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            console.log(file);
        });
    })
}

function closeImagePicker()
{
    var imgPicker = document.getElementById('imagePickerDiv');
    var imgPickerInput = document.getElementById('hideImgPickerInput');
    imgPicker.style.display = "none";
    imgPickerInput.style.display = "none"
}

function createLevelMappingForThisImage(identifier)
{
    var background = getLevelBackgroundIdentifierForThisLevel();
    var mapEntry;
    if (background != "this level has no background")
    {
        var position = whereDoesTheLevelBGAppearsInTheArray();

        if (position == 0) {
            mapEntry = [background, identifier];
        }
        else {
            mapEntry = [identifier, background];
        }
    }
    else {
        mapEntry = [identifier];
    }
    gameObj["LevelMapping"][symbols[pointer++]] = mapEntry;
}