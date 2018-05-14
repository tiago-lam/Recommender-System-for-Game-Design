/**
 * Created by tiagomachado on 5/10/18.
 */
var stypeCollection = [];

function retrieveObjects() {

    var spriteSet = document.getElementById("spriteList");
    for(var i = 0; i < spriteSet.childNodes.length; i++)
    {
        var spriteLi = spriteSet.childNodes[i];
        storingSpritesCompund(spriteLi);

        storingSingleSprites(spriteLi);
    }

    console.log(stypeCollection)

}

function storingSingleSprites(spriteLi) {
    if (spriteLi.classList.contains("dd-item")) {
        var spriteDiv = spriteLi.getElementsByClassName("dd-handle")[0];
        var stypeName = spriteDiv.textContent;
        var stypeImg = spriteDiv.childNodes[1];
        if (stypeImg.currentSrc != "") {
            var stypeObject = {name: stypeName, img: stypeImg};
            stypeCollection.push(stypeObject);
        }
    }
    return {spriteDiv: spriteDiv, stypeName: stypeName, stypeImg: stypeImg, stypeObject: stypeObject};
}

function storingSpritesCompund(spriteLi)
{

        var arrSpriteOl = [];
        for(var i = 0; i < spriteLi.childNodes.length; i++)
        {
            if(spriteLi.childNodes[i].classList.contains("children"))
            {
                arrSpriteOl.push(spriteLi.childNodes[i]);
            }
        }

        for(var j = 0; j < arrSpriteOl.length; j++)
        {
            var ol = arrSpriteOl[j];
            var innerLi = ol.childNodes[0];
            console.log(innerLi);
            var spriteDiv = innerLi.getElementsByClassName("dd-handle")[0];
            var stypeName = spriteDiv.textContent;
            var stypeImg = spriteDiv.childNodes[1];
            if(stypeImg.currentSrc != "") {
                var stypeObject = {name: stypeName, img: stypeImg};
                stypeCollection.push(stypeObject);
            }
            storingSpritesCompund(innerLi);
        }

}

