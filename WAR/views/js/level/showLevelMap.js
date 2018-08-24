/**
 * Draw the map
 */
function drawLevel()
{
    var rows = levelMatrixObject.rows;

    for(var i = 0; i < rows; i++)
    {
        var rowElements = levelMatrixObject.map[i];

        for(var j = 0; j < rowElements.length; j++)
        {
            //todo - deal with 'w' symbol wall not in the levelMapping
            var symbol = levelMatrixObject.map[i][j];
            var div = document.getElementById(i + " " + j);
            var img = document.getElementsByClassName(symbol)[0];
            if(img != undefined) {
                var dropImg = img.cloneNode(true);
                dropImg.id = 'drag_' + i + ' ' + j;
                div.appendChild(dropImg);
            }
        }
    }
}



