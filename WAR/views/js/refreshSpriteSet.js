/**
 * Created by tiagomachado on 5/9/18.
 */

/**
 * Keeps every sprite name already accessed to avoid unecessary copies
 * @type {Array}
 */
var verified = [];

/**
 * Update the object - both on its HTML hierarchy and its JSON representation
 */
function updateObj() {

    var spriteList = document.getElementById('spriteList');

    var ddItemArray = spriteList.getElementsByClassName('dd-item');

    for(var i = 0; i < ddItemArray.length; i++)
    {
        var ddItem = ddItemArray[i];

        updateHierarchies(ddItem);
    }

    verified = [];

}

/**
 * Stores all the li ids coming from ol elements
 * @param liItemsFromOl - every li element that comes from an ol element
 * @param idCollection - stores the li ids (which is equal to the object name)
 */
function storingItemIds(liItemsFromOl, idCollection) {
    for (var i = 0; i < liItemsFromOl.length; i++) {
        idCollection.push(liItemsFromOl[i].id);
    }
}

/**
 * Update the hierarchy both in HTML and Object form
 * @param ddItem
 */
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
                        attributeRefClass(parentObj, childrenObj);
                        attributeImage(parentObj, childrenObj);
                        attributeParameterProperties(parentObj, childrenObj);
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

/**
 * Remove children objects (from an object) not presented in the same object HTML hierarchy
 * @param htmlIdCollection
 * @param obj
 */
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

/**
 * Attributes the same parameters through an hierarchy of elements
 * @param parent
 * @param kid
 */
function attributeParameterProperties(parent, kid)
{
    for(param in parent["parameters"])
    {
        kid.parameters[param] = parent.parameters[param];
    }

    if(kid.children.length > 0)
    {
        for(var i = 0; i < kid.children.length; i++)
        {
            attributeParameterProperties(kid, kid.children[i]);
        }
    }
}

/**
 * Attributes the same image through an hierarchy of elements
 * @param parent
 * @param kid
 */
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

/**
 * Attributes the same reference class through an hierarchy of elements
 * @param parent
 * @param kid
 */
function attributeRefClass(parent, kid)
{
    if(parent["referenceClass"] != null)
    {
        kid["referenceClass"] = parent["referenceClass"];
    }

    if(kid.children.length > 0)
    {
        for(var i = 0; i < kid.children.length; i++)
        {
            attributeRefClass(kid, kid.children[i]);
        }
    }
}