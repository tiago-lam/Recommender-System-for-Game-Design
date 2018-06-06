/**
 * Created by tiagomachado on 5/10/18.
 */
var stypeCollection = [];

function retrieveStypeOptions() {

    stypeCollection = [] //reset

    var stypeNull = {name: "none", img: undefined};//gives the user the option to choose nothing

    stypeCollection.push(stypeNull);

    mapIdentifierToObject.forEach(function (value, key) {
        var gameObj = mapIdentifierToObject.get(key);
        //console.log(gameObj);
        var identifier = gameObj.identifier;
        var img = document.getElementById(identifier + "ImgId");
        var color = "";
        if("color" in gameObj.parameters)
        {
            color = gameObj.parameters["color"];
        }
        if(img.currentSrc != "" || color != "") {
            var stypeObject = {name: identifier, img: img};
            stypeCollection.push(stypeObject);
        }
    });

    return stypeCollection;

}

//get all resource sprites type
function retrievingAmmoSprites(stypeCollection)
{
    var resourceSprites = [];

    resourceSprites.push("none");//gives the user the option to choose nothing

    stypeCollection.forEach(function(element)
        {
            if(element.name != "none") {
                var gameObj = mapIdentifierToObject.get(element.name);
                if (gameObj["referenceClass"] == "Resource") {
                    resourceSprites.push(element.name);
                }
            }
        });

    return resourceSprites;

}

function retrievingSpawnSprites(stypeCollection)
{
    var spawnPointSprites = [];

    spawnPointSprites.push("none");//gives the user the option to choose nothing

    stypeCollection.forEach(function(element)
    {
        if(element.name != "none") {
            var gameObj = retrieveObjectByName(element.name);
            if (gameObj["referenceClass"] == "SpawnPoint") {
                spawnPointSprites.push(element.name);
            }
        }
    });

    return spawnPointSprites;
}