var parentId = '';
var paintMode = true;

var imgSrc = '';
var imgLogicClass = [];

function extractImageFrom(ev) {
    var img = document.createElement('img');
    img.id = "drag_" + ev.target.id;
    for(var j = 0; j < imgLogicClass.length; j++)
    {
        img.classList.add(imgLogicClass[j]);
    }
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
    for(var i = 0; i < ev.target.classList.length; i++)
    {
        imgLogicClass[i] = ev.target.classList[i];
    }
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

            for(var i = 0; i < img.classList.length; i++)
            {
                newImg.classList.add(img.classList[i]);
            }

            var ul = document.getElementById('imageListUl');

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
    console.log(spriteSetContainer);

    for (var i = 0; i < spriteSetObj.length; i++)
    {
        configureImages(spriteSetObj[i]);
    }
}

function configureImages(sprite)
{
        var li = document.createElement('li');
        li.id = sprite.identifier + 'DragLi';
        var imgCopy = document.createElement('img');
        var imgPath = sprite.parameters["img"];
        if(imgPath != undefined && !imgPath.includes(".png"))
        {
            imgPath = imgPath + ".png";
        }
        imgCopy.src = imgPath;
        imgCopy.id = sprite.identifier + "DragImgId";
        imgCopy.draggable = true;
        imgCopy.classList.add('drag_' + imgCopy.id);

        var symbol = String(getSymbol(sprite.identifier));
        if(symbol != "")
        {
            imgCopy.classList.add(symbol);
        }
        imgCopy.setAttribute('ondragstart', "drag(event)");
        imgCopy.setAttribute('onmousedown', "createImgId(this.classList[0])");

        if("img" in sprite.parameters) {
            li.append(imgCopy);
            document.getElementById('imageListUl').append(li);
        }


        if(sprite.children.length > 0)
        {
            for(var i = 0; i < sprite.children.length; i++)
            {
                configureImages(sprite.children[i]);
            }
        }
}

function getSymbol(identifier)
{
    for(key in mappingObj)
    {
        if(mappingObj[key].length > 1)
        {
            if(mappingObj[key][1] == identifier)
            {
                return key;
            }
        }
        else
        {
            if(mappingObj[key][0] == identifier)
            {
                return key;
            }
        }
    }

    return "";
}