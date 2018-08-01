var parentId = '';
var paintMode = true;

var imgSrc = '';
var imgLogicClass = '';

function extractImageFrom(ev) {
    var img = document.createElement('img');
    img.id = "drag_" + ev.target.id;
    img.classList.add(imgLogicClass);
    img.src = imgSrc;
    img.draggable = true;
    img.setAttribute('ondragstart', "drag(event)");
    return img;
}

function allowDrop(ev) {
    ev.preventDefault();

    if(paintMode)
    {
        if(ev.target.childNodes.length == 0)
        {
            var img = extractImageFrom(ev);
            ev.target.append(img);
        }
        else
        {
            var imgToModify = document.getElementById('drag_' + ev.target.id);
            imgToModify.src = imgSrc;
            imgToModify.classList[0] = imgLogicClass;
        }
    }

}

function drag(ev) {
    ev.dataTransfer.setData("key", ev.target.id);
    imgSrc = ev.target.src;
    imgLogicClass = ev.target.classList[0];
    parentId = ev.target.parentNode.id;
}

//<li id="li"><img src="yeti4.png" draggable ="true" ondragstart ="drag(event)" id="drag1"></li>
function drop(ev) {
    ev.preventDefault();
    if(!paintMode)
    {
        var data = ev.dataTransfer.getData("key");
        var img = document.getElementById(data);
        img.removeAttribute('onmousedown');
        console.log(ev.target);
        img.id = 'drag_' + ev.target.id;

        if(!ev.target.hasAttribute('src')) {
            ev.target.append(img);
            var newImg = document.createElement('img');
            newImg.src = img.src;
            newImg.draggable = true;
            newImg.setAttribute('ondragstart', "drag(event)");
            newImg.setAttribute('onmousedown', "createImgId(this.classList[0])");
            newImg.classList.add(img.classList[0]);

            var ul = document.getElementById('imgUl');

            var liCollection = ul.getElementsByTagName('li');

            for(var i = 0; i < liCollection.length; i++) {
                if (liCollection[i].id == parentId) {
                    var li = document.getElementById(parentId);
                    if (!li.contains(newImg)) {
                        li.append(newImg);
                    }
                }
            }
        }else{
            ev.target.src = img.src;
            var parentElement = document.getElementById(parentId);
            if(parentElement.nodeName == 'DIV')
            {
                parentElement.removeChild(parentElement.childNodes[0]);
            }
        }
    }
}

function createDiv(id)
{
    var div = document.createElement('div');
    div.classList.add("div1");
    div.setAttribute('ondrop', "drop(event)");
    div.setAttribute('ondragover', "allowDrop(event)");
    div.id = id;
    return div;
}

function createTable(nRow, nColumn)
{
    var table = document.createElement('table');
    for (var i = 0; i < nRow; i++)
    {
        var row = document.createElement('tr');
        for (var j = 0; j < nColumn; j++)
        {
            var column = document.createElement('td');
            var div = createDiv(i + " " + j);
            column.append(div);
            row.append(column);
        }
        table.append(row);
    }

    document.getElementById('level').append(table);
    console.log("here");
}

function createImgId(className)
{
    var img = document.querySelector('.' + className);
    img.id = className + 'Id';
}

function changeMode()
{
    paintMode = !paintMode;
}

function createImgList()
{
    var spriteSetContainer = document.getElementById('spriteList');
    var imgCollection = spriteSetContainer.getElementsByTagName('img');
    for (var i = 0; i < imgCollection.length; i++)
    {
        var li = document.createElement('li');
        li.id = imgCollection[i].id + 'Li';
        var imgCopy = document.createElement('img');
        imgCopy.src = imgCollection[i].src;
        imgCopy.id = imgCollection[i].id;
        imgCopy.draggable = true;
        imgCopy.setAttribute('ondragstart', "drag(event)");
        imgCopy.setAttribute('onmousedown', "createImgId(this.classList[0])");
        imgCopy.classList.add('drag_' + imgCopy.id);

        li.append(imgCopy);
        document.getElementById('imageListUl').append(li);
    }
}