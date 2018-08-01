
var left = false;
var imgSrc = '';

function allowDrop(ev) {
    ev.preventDefault();
    //var data = ev.dataTransfer.getData("key");
    console.log(ev);
    //var tmp = document.getElementById(data);
    if(left == true) {
        ev.target.src = imgSrc;
    }
}

function drag(ev) {
	console.log(ev.target);
	imgSrc = ev.target.src;
    ev.dataTransfer.setData("key", ev.target.id);
    left = true;
}

//<li id="li"><img src="yeti4.png" draggable ="true" ondragstart ="drag(event)" id="drag1"></li>
function drop(ev) {
    //ev.preventDefault();
}

function createDiv(id)
{
	var div = document.createElement('div');
    div.classList.add("div1");
	div.setAttribute('ondrop', "drop(event)");
    div.setAttribute('ondragover', "allowDrop(event)");

    var img = document.createElement('img');
    img.draggable = true;
    img.setAttribute('ondragstart', 'drag(event)');
    img.id = id;

    div.append(img);

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
			var div = createDiv(i + " " + j);
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