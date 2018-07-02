function addNewSpriteToSpriteSet(spriteSet) {
    var object = new Object();
    object.identifier = 'bob';
    object.children = [];
    object.parameters = {img: "oryx/scorpion1"};
    object.referenceClass = "Immovable";
    spriteSet.unshift(object);
}

function rebuildSpriteSetAndDependencies(spriteSet, upperUl) {
    buildTheSpriteSet(spriteSet, upperUl);
    console.log(spriteSet);
    activateHierarchyListSort();
    getObjectForUpdatingOnMouseClick();
    updateObjectsAfterListChange();
}

function removeElementsFromUl()
{
    var upperUl = document.getElementById('spriteList');
    while (upperUl.firstChild) {
        upperUl.removeChild(upperUl.firstChild);
    }
    return upperUl;
}

function action(spriteSet)
{
    addNewSpriteToSpriteSet(spriteSet);
    var upperUl = removeElementsFromUl();
    rebuildSpriteSetAndDependencies(spriteSet, upperUl);
}