var parentId = '';
var paintMode = true;

var imgSrc = '';
var imgLogicClass = [];
var isDragEnabled = false;
var clickedElement = '';

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
    img.setAttribute('ondragend', "cancel()");
    return img;
}

function allowDrop(ev) {

    ev.preventDefault();


    if(!paintMode)
    {
        if(ev.target.childNodes.length == 0)
        {
            var img = extractImageFrom(ev);
            ev.target = img;
        }
        else
        {
            var imgToModify = document.getElementById('drag_' + ev.target.id);

            if(imgToModify != null) {
                if (imgToModify.src != imgSrc) {

                    imgToModify.src = imgSrc;

                    while (imgToModify.classList.length > 0) {
                        imgToModify.classList.remove(imgToModify.classList[imgToModify.classList.length - 1]);
                    }

                    for (var i = 0; i < imgLogicClass.length; i++) {
                        imgToModify.classList.add(imgLogicClass[i]);
                    }
                }
            }
        }
    }
}

function cancel()
{
    console.log("GGGGGGG");
    var tiles = document.getElementsByClassName('suggestedTile');
    if(tiles.length > 0) {
        for (var i = 0; i < tiles.length; i++) {
            tiles[i].classList.remove('suggestedTile');
            i = 0;
        }
        tiles[0].classList.remove('suggestedTile');
    }
}

function drag(ev) {
    clickedElement = ev.currentTarget;
    ev.dataTransfer.setData("key", ev.target.id);
    imgSrc = ev.target.src;
    for(var i = 0; i < ev.target.classList.length; i++)
    {
        imgLogicClass[i] = ev.target.classList[i];
    }
    parentId = ev.target.parentNode.id;
    isDragEnabled = !isDragEnabled;
    console.log('dragging');
    // var id = ev.target.id;
    //
    // id = id.replace("drag_", "");
    // id = id.replace("DragImgIdId", "");
    // var refClass = (mapIdentifierToObject.get(id).referenceClass);
 
//     var posToSuggest = mapTypeToPositions.get(refClass);

//     if(posToSuggest != undefined) {
//         for (var i = 0; i < posToSuggest.length; i++) {
//             var p = posToSuggest[i];
//             var x = p['x'];
//             var y = p['y'];
//             document.getElementById(x + " " + y).classList.add("suggestedTile");
//         }
//     }

}

function drop(ev) {
    ev.preventDefault();
    if(paintMode)
    {
        var data = ev.dataTransfer.getData("key");
        var img = document.getElementById(data);
        img.removeAttribute('onmousedown');
        console.log(ev.target);
        img.id = 'drag_' + ev.target.id;

        if(!ev.target.hasAttribute('src')) {
            if(!ev.target.contains(img))
            {
                console.log(ev.target);
                ev.target.append(img);
            }
            var newImg = document.createElement('img');
            newImg.src = img.src;
            newImg.draggable = true;
            newImg.setAttribute('ondragstart', "drag(event)");
            newImg.setAttribute('onmousedown', "createImgId(this.classList[0])");
            newImg.setAttribute('ondragend', "cancel()");

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
        }
        else{
            ev.target.src = img.src;
            ev.target.classList = img.classList;
            if(clickedElement.parentNode.tagName != 'LI')
            {
                var bgId = getLevelBackgroundIdentifierForThisLevel();
                var bgSymbol = getSymbol(bgId);
                clickedElement.src = getBackGroundImage();
                clickedElement.classList.replace(clickedElement.classList[0], 'drag_' + bgId + 'DragImgId');
                clickedElement.classList.replace(clickedElement.classList[1], bgSymbol);
            }
        }

    }
    console.log('drop');
    //             if(parentElement.nodeName == 'DIV')
//             {
//                 if(parentElement.childNodes.length > 1)
//                 {
//                     parentElement.removeChild(parentElement.childNodes[0]);
//                 }
//             }

    // if(ev.target.tagName != "TAG")
    // {
    //     var bgId = getLevelBackgroundIdentifierForThisLevel()
    //     var symbol = getSymbol(bgId)
    //     var pos = img.id.replace("drag_", "");
    //     pos = pos.split(' ');
    //     pos[0] = pos[0].replace("drag_", "");
    //     document.getElementById('drag_' + pos[0] + " " + pos[1]).remove();
    //     drawAtPosition(Number(pos[0]), Number(pos[1]), symbol);
    // }
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
    table.id = 'gridTableId';
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
    document.getElementById('tableGridContainer').append(table);
    console.log("here");
}

function saveLevelState()
{
    console.log('save');
    var rows = levelMatrixObject.rows;
    var columns = levelMatrixObject.columns;
    var map = []

    for(var i = 0; i < rows; i++)
    {
        var components = []
        for(var j = 0; j < columns; j++)
        {
            var img = document.getElementById('drag_' + i + ' ' + j);
            if(img != null)
            {
                var imgSymbol = img.classList[1];
                components.push(imgSymbol);
            }
            else
            {
                components.push("");
            }
        }
        map.push(components)
    }
    return map;
}

function removeTable()
{
    var level = document.getElementById('tableGridContainer');
    for(var i = 0; i < level.childNodes.length; i++)
    {
        if(level.childNodes[i].id == 'gridTableId')
        {
            level.removeChild(level.childNodes[i]);
            return;
        }
    }
}

function updateGameLevelObject(nRow, nColumn) {
    var newMapRows = []; newMapRows.length = nRow;
    for (var i = 0; i < newMapRows.length; i++)
    {
        newMapRows[i] = [];
        newMapRows[i].length = nColumn;
    }

    levelMatrixObject.rows = nRow;
    levelMatrixObject.columns = nColumn;
    levelMatrixObject.map = newMapRows;

    gameObj.Level = levelMatrixObject.map;
}

function fillLevelWithThisSprite(symbol)
{
    for(var i = 0; i < levelMatrixObject.map.length; i++)
    {
        for(var j = 0; j < levelMatrixObject.map[i].length; j++)
        {
            levelMatrixObject.map[i][j] = symbol;
        }
    }

    gameObj["Level"] = levelMatrixObject.map;
}

function createTableByInput()
{
    if (confirm("This will override all your level information. Press OK if you want to proceed?"))
    {
        resetGameStates();
        removeTable();
        var nRow = document.getElementById('rowInput').value;
        var nColumn = document.getElementById('colInput').value;

        var table = document.createElement('table');
        table.id = 'gridTableId';
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

        updateGameLevelObject(nRow, nColumn);
        fillLevelWithThisSprite("");

        document.getElementById('tableGridContainer').append(table);
        console.log("here");

        startLevelObserver();
    }
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

function removeAllElementsFromTheImgList()
{
    deleteElementsFrom(document.getElementById('imageListUl'));
}

function createImgList(sprites)
{
    for (var i = 0; i < sprites.length; i++)
    {
        configureImages(sprites[i]);
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
        else
        {
            appendSymbol(sprite.identifier);
        }
        imgCopy.setAttribute('ondragstart', "drag(event)");
        imgCopy.setAttribute('onmousedown', "createImgId(this.classList[0])");
        imgCopy.setAttribute('ondragend', "cancel()");

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

function paintLevelWithThisSprite(image)
{

   var divs = document.getElementsByClassName('div1');
   for(var i = 0; i < divs.length; i++)
   {
       var img = divs[i].getElementsByTagName('img')[0];
       img.src = image;
   }
}

/////////////

function getSymbol(identifier)
{
    var keys = Object.keys(mappingObj);
    for(var k = 0; k < keys.length; k++)
    {
        var code = keys[k];
        if(mappingObj[code].length > 1)
        {
            var position = getPositionOfTheLevelBackground(code)
            {
                if(position == 0)
                {
                    if(mappingObj[code][1] == identifier)
                    {
                        return code;
                    }
                }
                else if(position == mappingObj[code].length - 1)
                {
                    if(mappingObj[code][0] == identifier)
                    {
                        return code;
                    }
                }
            }
        }
        else
        {
            if(mappingObj[code][0] == identifier)
            {
                return code;
            }
        }
    }

    return "";
}

function findObjectsWithoutSymbols()
{
    for(var key of mapIdentifierToObject.keys())
    {
        var obj = mapIdentifierToObject.get(key);
        if('img' in obj.parameters)
        {
           if(!doesThisIdentifierHasSymbol(obj.identifier))
           {
               appendSymbol(obj.identifier);
           }
        }
    }
}

function doesThisIdentifierHasSymbol(identifier)
{
    var symbol = getSymbol(identifier);
    if(symbol == "")
    {
        return false;
    }
    return true;
}

function appendSymbol(identifier)
{
    var symbol = symbols[pointer];
    pointer++;
    if(doesThisMapHasBackground())
    {
        var levelBG = getLevelBackgroundIdentifierForThisLevel();
        if(levelBG !=  "this level has no background")
        {
            var whereToPut = whereDoesTheLevelBGAppearsInTheArray();
            if(whereToPut == 0)
            {
                mappingObj[symbol] = [levelBG, identifier];
            }
            else if(whereToPut > 0)
            {
                mappingObj[symbol] = [identifier, levelBG];
            }
        }
    }
}

function doesThisMapHasBackground()
{
    for(key in mappingObj)
    {
        if(mappingObj[key].length > 1)
        {
            return true;
        }
    }
    return false;
}

function getLevelBackgroundIdentifierForThisLevel()
{
    for(key in mappingObj)
    {
        if(mappingObj[key].length == 1 && mappingObj[key][0] != 'wall')
        {
            return mappingObj[key][0];
        }
    }

    return "this level has no background";
}

function doesThisGameHaveWall()
{
    var keys = mapIdentifierToObject.keys();
    for(var key of keys)
    {
        if(key == 'wall')
        {
            return true;
        }
    }
    return false;
}

function appendWallToMappingObj()
{
    if(doesThisGameHaveWall()) {
        if(!('w' in mappingObj)) {
            mappingObj['w'] = ['wall'];
        }
    }
}

function whereDoesTheLevelBGAppearsInTheArray()
{
    var levelBG = getLevelBackgroundIdentifierForThisLevel();

    var keys = Object.keys(mappingObj);
    for(var k = 0; k < keys.length; k++)
    {
        var code = keys[k];
        if(mappingObj[code].length > 1)
        {
            return getPositionOfTheLevelBackground(code);
        }
    }

    return -1;
}

function removeSpriteFromLevelSpriteList(sprite)
{
    var imageListUl = document.getElementById('imageListUl');
    var liCollection = imageListUl.getElementsByTagName('li');
    for(var i = 0; i < liCollection.length; i++)
    {
        if(liCollection[i].id.includes(sprite))
        {
            liCollection[i].remove();
            return;
        }
    }
}

function removeSpriteInTheGridLevel(sprite)
{
    var rows = levelMatrixObject.rows;
    var columns = levelMatrixObject.columns;

    for (var i = 0; i < rows; i++)
    {
        for(var j = 0; j < columns; j++)
        {
            var div = document.getElementById(i + " " + j);
            var img = div.getElementsByClassName("drag_" + sprite + "DragImgId");
            if(img[0] != undefined)
            {
                img[0].parentNode.removeChild(img[0]);
                replaceDeletedSpriteByBackground(i, j);
            }
        }
    }
}

function getPositionOfTheLevelBackground(key)
{
    var levelBG = getLevelBackgroundIdentifierForThisLevel();

    if(levelBG != "this level has no background")
    {
        var identifiers = mappingObj[key];
        for(var i = 0; i < identifiers.length; i++)
        {
            if(identifiers[i] == levelBG)
            {
                return i;
            }
        }
    }return -1;
}

function drawLevel(savers)
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
    savers();
}

function drawAtPosition(i, j, symbol)
{
    var div = document.getElementById(i + " " + j);
    var img = document.getElementsByClassName(symbol)[0];
    if(img != undefined) {
        var dropImg = img.cloneNode(true);
        dropImg.id = 'drag_' + i + ' ' + j;
        div.appendChild(dropImg);
    }
    else
    {
        img = document.createElement('img');
        img.src = getBackGroundImage();
        img.id = "drag_" + i + " " + j;
        img.draggable = true;
        img.classList.add("drag_" + getLevelBackgroundIdentifierForThisLevel() + "DragImgId");
        img.classList.add(getSymbol(getLevelBackgroundIdentifierForThisLevel()));
        img.setAttribute('ondragstart', "drag(event)");
        img.setAttribute('onmousedown', "createImgId(this.classList[0])");
        img.setAttribute('ondragend', "cancel()");
        div.appendChild(img);
    }
}

function replaceDeletedSpriteByBackground(i, j)
{
    var div = document.getElementById(i + " " + j);
    var img = document.createElement('img');
    img.src = getBackGroundImage();
    img.id = "drag_" + i + " " + j;
    img.draggable = true;
    img.classList.add("drag_" + getLevelBackgroundIdentifierForThisLevel() + "DragImgId");
    img.classList.add(getSymbol(getLevelBackgroundIdentifierForThisLevel()));
    img.setAttribute('ondragstart', "drag(event)");
    img.setAttribute('onmousedown', "createImgId(this.classList[0])");
    img.setAttribute('ondragend', "cancel()");
    div.appendChild(img);
}

function getBackGroundImage()
{
    var id = getLevelBackgroundIdentifierForThisLevel();
    var obj = mapIdentifierToObject.get(id);
    return obj['parameters']['img'] + ".png";
}