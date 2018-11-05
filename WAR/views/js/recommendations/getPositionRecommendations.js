var xmlhttpPos = new XMLHttpRequest();

var mapTypeToPositions = new Map();

/**
* Function responsible for perform the GET response
*/
xmlhttpPos.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        if(this.responseText.length > 1) {
            var typePositions = JSON.parse(this.responseText);
            var t = typePositions['type'];
            var ps = typePositions['posCollection'];
            //ps = applyFilterMapPosition(ps);
            mapTypeToPositions.set(t, ps);
        }
        else
        {
            console.log("nothing to recommend, sorry");
        }
    }
};

/**
 * Prepare and send the GET request to the server
 */
function askForPositions(gameName, type) {

    xmlhttpPos.open("GET", "http://localhost:9001/pos" + "?askForPosIn=" + gameName + "&type=" + type, true);
    xmlhttpPos.send();
}

function applyFilterMapPosition(ps)
{
    var newPs = [];

    var row = gameObj["Level"].length;
    var column = gameObj["Level"][0].length;

    for(var i = 0; i < ps.length; i++)
    {
        var p = ps[i];
        if( ( (p['x'] >= 0 && p['y'] <= row-1) && (p['y'] >= 0 && p['y'] <= column-1) ))
        {
            newPs.push(ps);
        }
    }
    return newPs;
}