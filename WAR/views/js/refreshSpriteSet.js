/**
 * Created by tiagomachado on 5/9/18.
 */


function updateObj() {

    var spriteList = document.getElementById('spriteList');

    var ddHandleArray = spriteList.getElementsByClassName('dd-handle');

    console.log("h");
    for(var i = 0; i < ddHandleArray.length; i++)
    {
        var ddHandle = ddHandleArray[i];

        console.log(ddHandle.id)
    }


}