
var left = false;
var imgSrc = '';
var paintMode = false;
var parentId = '';

function allowDrop(ev) {
    ev.preventDefault();
    //var data = ev.dataTransfer.getData("key");
    if(paintMode) {
        //var tmp = document.getElementById(data);
        if (left == true) {
            if(ev.target.childNodes.length == 0)
            {
                var img = document.createElement('img');
                img.id = "drag" + ev.target.id;
                img.classList.add('drag' + img.id);
                img.src = imgSrc;
                img.draggable = true;
                img.setAttribute('ondragstart', drag(event));
                ev.target.append(img);
            }
            else
            {
                if(ev.target.src != imgSrc)
                {
                    ev.target.childNodes[0].src = imgSrc;
                }
            }
        }
    }
}

function drag(ev) {
    console.log(ev.target);
    imgSrc = ev.target.src;
    ev.dataTransfer.setData("key", ev.target.id);
    parentId = ev.target.parentNode.id;
    if(paintMode) {
        left = true;
    }
}

//<li id="li"><img src="yeti4.png" draggable ="true" ondragstart ="drag(event)" id="drag1"></li>
function drop(ev) {
    if(!paintMode) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("key");
        var img = document.getElementById(data);
        img.removeAttribute('onmousedown');
        console.log(ev.target.id);
        img.id = 'drag' + ev.target.id;
        ev.target.append(img);

        var newImg = document.createElement('img');
        newImg.src = img.src;
        newImg.draggable = true;
        newImg.setAttribute('ondragstart', "drag(event)");
        newImg.setAttribute('onmousedown', "createImgId()");
        newImg.id = img.id;
        newImg.classList.add(img.classList[0]);

        var liCollection = document.getElementsByTagName('li');
        var li = document.getElementById(parentId);

        for(var i = 0; i < liCollection.length; i++)
        {
            if(liCollection[i].id == li.id && liCollection[i].childNodes.length == 0)
            {
                if(!li.contains(newImg))
                {
                    li.append(newImg);
                }
            }
        }

        // if(liCollection.includes(li)) {
        //     if (!li.contains(newImg)) {
        //         li.append(newImg);
        //     }
        // }

    }
}

function createDiv(id)
{
    var div = document.createElement('div');
    div.classList.add("div1");
    div.setAttribute('ondrop', "drop(event)");
    div.setAttribute('ondragover', "allowDrop(event)");
    div.id = id;

    // var img = document.createElement('img');
    // img.draggable = true;
    // img.setAttribute('ondragstart', 'drag(event)');
    // img.id = id;

    // div.append(img);

    return div;
}

function createTable(nRow, nColumn)
{
    if(document.getElementById('levelTable') != null) {
        destroyTable();
    }
    var table = document.createElement('table');
    table.id = 'levelTable';
    //onmouseenter="whichButton(event)" onmouseup="whichButton(event)"
    table.setAttribute('onmouseenter', 'whichButton(event)');
    table.setAttribute('onmouseup', 'whichButton(event)');
    for (var i = 0; i < nRow; i++)
    {
        var row = document.createElement('tr');
        for (var j = 0; j < nColumn; j++)
        {
            var column = document.createElement('td');
            var div = createDiv(i + "" + j);
            column.append(div);
            row.append(column);
        }
        table.append(row);
    }

    document.getElementById('level').append(table);
    console.log("here");
}

function destroyTable()
{
    body.remove(document.getElementById('levelTable'));
}

function cleanTable()
{
    var table = document.getElementById('levelTable');
    var imgCollection = table.getElementsByTagName('img');
    for(var i = 0; i < imgCollection.length; i++)
    {
        imgCollection[i].src = "blank.png";
    }
}

var whichButton = function (e) {
    // Handle different event models
    var e = e || window.event;
    var btnCode;

    if ('object' === typeof e) {
        btnCode = e.button;

        switch (btnCode) {
            case 0:
                left = !left;
                console.log(left);
                return 0;

            case 1:
                return 1;

            case 2:
                return 2;

            default:
                return 'Unknown';
        }
    }
}


function createImgId(value)
{
    var img = document.querySelector('.' + value);
    img.id = value;
}