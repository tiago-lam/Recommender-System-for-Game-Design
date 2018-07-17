function sendSpriteSetToTheServer(spriteSet)
{
    xhr = new XMLHttpRequest();
    var url = "http://localhost:9001/processing";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json.email + ", " + json.name)
        }
    }
    var data = JSON.stringify(spriteSet);
    xhr.send(data);
}

function sendStringToServer()
{
    xhr = new XMLHttpRequest();
    var url = "http://localhost:9001/uploadImage";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "text/plain");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var resp = xhr.responseText;
            console.log(resp);
        }
    }
    var data = "https://imgix.bustle.com/uploads/image/2018/6/29/dd61f31c-26af-4ab9-9102-6d3647b18029-cattoys.jpg";
    xhr.send(data);
}