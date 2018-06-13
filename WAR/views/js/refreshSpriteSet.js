/**
 * Created by tiagomachado on 5/9/18.
 */
var verified = [];

function updateObj() {

    var spriteList = document.getElementById('spriteList');

    var ddItemArray = spriteList.getElementsByClassName('dd-item');

    //console.log("h");
    for(var i = 0; i < ddItemArray.length; i++)
    {
        var ddItem = ddItemArray[i];
        //does ddItem has children?
        updateHierarchies(ddItem);
    }
    // console.log(verified);
    // console.log(myObj);
    verified = [];

}

function storingItemIds(ddItemKids, idCollection) {
    for (var i = 0; i < ddItemKids.length; i++) {
        idCollection.push(ddItemKids[i].id);
    }
}

///////ADD CHILDREN
function updateHierarchies(ddItem)
{
    if(!(ddItem.id in verified)) {
        var ddItemChildrenRoot = ddItem.querySelector('ol');

        if(ddItemChildrenRoot != null) {

            var ddItemKids = ddItemChildrenRoot.childNodes;
            var idCollection = [];

            storingItemIds(ddItemKids, idCollection);

            var parentObj = retrieveObjectByTarget(ddItem.id);

            if (ddItemKids.length > 0) {

                for (var j = 0; j < ddItemKids.length; j++) {
                    var child = ddItemKids[j];
                    var childrenObj = retrieveObjectByTarget(child.id);

                    removeUnecessaryObjects(idCollection, parentObj);
                    if(parentObj.children.indexOf(childrenObj) == -1) {
                        parentObj.children.push(childrenObj);
                        attributeImage(parentObj, childrenObj);
                        attributeProperties(parentObj.parameters, childrenObj.parameters);
                        updateHierarchies(ddItemKids[j]);
                    }
                }
            }
            verified.push(ddItem.id);
        }else{
            var obj = retrieveObjectByTarget(ddItem.id);
            if(obj.children.length > 0)
            {
                obj.children = [];
            }
        }
    }
}

function removeUnecessaryObjects(htmlIdCollection, obj)
{
    var objChildren = obj.children;

    objChildren.forEach(function(item, index, object) {
        var identifier = item.identifier;

        if(!htmlIdCollection.includes(identifier))
        {
            object.splice(index, 1);
        }
    });
}

function attributeProperties(parentParams, childrenParams)
{
    for(param in parentParams)
    {
        childrenParams[param] = parentParams[param];
    }
}

function attributeImage(parent, kid)
{
    var parentImg = document.getElementById(parent.identifier + "ImgId");
    var childrenImg = document.getElementById(kid.identifier + "ImgId");

    if(parentImg.src != "")
    {
        childrenImg.src = parentImg.src;
    }

    if(kid.children.length > 0)
    {
        for(var i = 0; i < kid.children.length; i++)
        {
            attributeImage(kid, kid.children[i]);
        }
    }
}