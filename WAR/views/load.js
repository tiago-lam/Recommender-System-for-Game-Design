var xmlhttp = new XMLHttpRequest();
var counter = 0;
/**
 * The sprite set obj
 */
var spriteSetObj;

function buildTheSpriteSet(spriteSetObj) {

    var ulElement = document.getElementById('imageList');

    for (var i = 0; i < spriteSetObj.length; i++) {
        getObjectData(spriteSetObj[i], ulElement);
    }

}

/**
 * Function responsible for perform the GET response
 */
xmlhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        spriteSetObj = JSON.parse(this.responseText);
        console.log(spriteSetObj);
        buildTheSpriteSet(spriteSetObj);
    }
};

xmlhttp.open("GET", "http://localhost:8001/json", true);
xmlhttp.send();

function getObjectData(spriteSet, upperUl)
{
    var li = document.createElement("li");
    li.innerHTML = spriteSet['name'];
    upperUl.appendChild(li);

    var img = document.createElement('img');
    img.id = spriteSet['name'];
    fetchBlob(spriteSet['img'], img);

    upperUl.appendChild(img);
}

function fillHorizontalList(spriteSet)
{
    var ulHorizontalElement = document.getElementById('horizontalImageList');
    for(var i = 0; i < spriteSet.length; i++)
    {
        var img = document.createElement('img');
        img.src = document.getElementById(spriteSet[i].name).src;
        ulHorizontalElement.append(img);
    }
}

function fetchBlob(imgPath, imgElement) {
    // construct the URL path to the image file from the product.image property
    var urlSrc = null;
    // Use XHR to fetch the image, as a blob
    // Again, if any errors occur we report them in the console.
    var request = new XMLHttpRequest();
    var params = "picture=" + imgPath;
    request.open('GET', "http://localhost:8001/imgs" + "?" + params, true);
    request.responseType = 'blob';
    var objectURL = null;

    request.onload = function() {
        if(request.status === 200) {
            // Convert the blob to an object URL — this is basically an temporary internal  URL
            // that points to an object stored inside the browser
            var blob = request.response;
            objectURL = URL.createObjectURL(blob);
            // invoke showProduct

        } else {
            alert('Network request for "' + product.name + '" image failed with response ' +     request.status + ': ' + request. statusText);
        }

        if(request.readyState == 4)
        {
            counter++;
            imgElement.src = objectURL;
        }

        if(counter == 3)
        {
            fillHorizontalList(spriteSetObj);
        }
    };

    request.send();
}