/**
 * Created by tiagomachado on 5/10/18.
 */

/**
 * Stores the names of all the sprites (with images) to be used as a list for the stype parameter
 * @type {Array}
 */
var stypeCollection = [];

/**
 * Uses the map (identifier, object) to return an array with all the sprites for being used on the stype parameter list
 * @returns {Array}
 */
function retrieveStypeOptions() {

    stypeCollection = [] //reset

    var stypeNull = {name: "none", img: undefined};//gives the user the option to choose nothing

    stypeCollection.push(stypeNull);

    mapIdentifierToObject.forEach(function (value, key) {
        var gameObj = mapIdentifierToObject.get(key);
        var identifier = gameObj.identifier;
        var img = document.getElementById(identifier + "ImgId");
        var color = "";
        if("color" in gameObj.parameters)
        {
            color = gameObj.parameters["color"];
        }

        if((img != null && img.currentSrc != "") || color != "") {
            var stypeObject = {name: identifier, img: img};
            stypeCollection.push(stypeObject);
        }
    });

    return stypeCollection;

}

/**
 * Uses the stype array and filters it to return a list with all the sprites of the type Resource
 * @param stypeCollection
 * @returns {Array}
 */
function retrievingAmmoSprites(stypeCollection)
{
    var resourceSprites = [];

    resourceSprites.push("none");//gives the user the option to choose nothing

    stypeCollection.forEach(function(element)
        {
            if(element.name != "none") {
                var gameObj = mapIdentifierToObject.get(element.name);
                if (gameObj["referenceClass"] == "Resource") {
                    resourceSprites.push(element);
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