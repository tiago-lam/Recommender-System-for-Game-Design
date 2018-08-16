// /**
//  * access the serve in order to get the level matrix of a game
//  * @type {XMLHttpRequest}
//  * */
// var xmlhttp = new XMLHttpRequest();
//
// /**
//  * The level matrix obj
//  */
// var levelMatrixObject;
//
// /**
//  * Function responsible for perform the GET response
//  */
// xmlhttp.onreadystatechange = function() {
//
//     if (this.readyState == 4 && this.status == 200) {
//
//         levelMatrixObject = JSON.parse(this.responseText);
//         console.log(levelMatrixObject);
//
//         var rows = levelMatrixObject.rows;
//         var columns = levelMatrixObject.columns;
//         createTable(rows, columns);
//         createImgList();
//         drawLevel();
//     }
// };
// /**
//  * Prepare and send the GET request to the server
//  */
// xmlhttp.open("GET", "http://localhost:9001/levelMatrix", true);
// xmlhttp.send();

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



