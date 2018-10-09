function goToLoadTab()
{
    document.getElementById("levelMap").checked = false;
    document.getElementById("load").checked = true;
    document.getElementById("initPageDiv").style.display = "none";
    document.getElementById("levelDivId").style.display = "block";
}

function startWithEmptyProject()
{
    document.getElementById("levelMap").checked = false;
    document.getElementById("spriteSetTab").checked = true;
    document.getElementById("initPageDiv").style.display = "none";
    document.getElementById("levelDivId").style.display = "block";
    getGameParam = "";
    location.reload();
}

function renderHeaderDisplay()
{
    var initPageDiv = document.getElementById('initPageDiv');
    initPageDiv.style.display = "block";

    var buttonLoadTab = document.createElement('button');
    buttonLoadTab.setAttribute("onclick", "goToLoadTab()");
    buttonLoadTab.innerHTML = "Load Game";

    var buttonEmptyProject = document.createElement('button');
    buttonEmptyProject.setAttribute("onclick","startWithEmptyProject");
    buttonEmptyProject.innerHTML = "New Game";
    initPageDiv.appendChild(buttonEmptyProject);
    initPageDiv.appendChild(buttonLoadTab);
}