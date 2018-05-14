/**
 * Created by tiagomachado on 5/10/18.
 */
var stypeCollection = [];

function retrieveObjects() {

    var spriteSet = document.getElementById("spriteList");
    for(var i = 0; i < spriteSet.childNodes.length; i++)
    {
        var spriteLi = spriteSet.childNodes[i];
        filterStypesWithoutChildren(spriteLi);
    }
    console.log("collection");
    console.log(stypeCollection);
}

function filterStypesWithoutChildren(spriteLi)
{

        var arrOl = [];
        for(var i = 0; i < spriteLi.childNodes.length; i++)
        {
            if(spriteLi.childNodes[i].classList.contains("children"))
            {
                arrOl.push(spriteLi.childNodes[i]);
            }
        }

        for(var j = 0; j < arrOl.length; j++)
        {
            var ol = arrOl[j];
            var innerLi = ol.childNodes[0];
            console.log(innerLi);
            var spriteDiv = innerLi.getElementsByClassName("dd-handle")[0];
            var stypeName = spriteDiv.textContent;
            var stypeImg = spriteDiv.childNodes[1];
            if(stypeImg.currentSrc != "") {
                var stypeObject = {name: stypeName, img: stypeImg};
                stypeCollection.push(stypeObject);
            }
            filterStypesWithoutChildren(innerLi);
        }

    //else
    //{
        if(spriteLi.classList.contains("dd-item")) {
            var spriteDiv = spriteLi.getElementsByClassName("dd-handle")[0];
            var stypeName = spriteDiv.textContent;
            var stypeImg = spriteDiv.childNodes[1];
            if(stypeImg.currentSrc != "") {
                var stypeObject = {name: stypeName, img: stypeImg};
                stypeCollection.push(stypeObject);
            }
        }
    //}
}

