        var mapIdToInteraction = new Map();
        /**
        * access the serve in order to get the sprite set of a game
        * @type {XMLHttpRequest}
        * */

        function buildTheInteractionSet(interactionObj)
        {
                var unorderedList = document.getElementById('interactionList');
                for(var i = 0; i < interactionObj.length; i++)
                {
                    var textObj = convertObjectToText(interactionObj[i]);
                    createDivForThisTextObj(textObj, unorderedList, "interaction" + i, interactionObj[i]);
                }

                createSprite1SelectList();
                if(document.getElementById('interactionContainerDiv').childNodes.length == 0)
                {    createInteractionSelectList(); }
                createCheckBoxList();

                prepareSelectionSortComponent();

                content();
        }

        function convertObjectToText(obj)
        {
                var interaction = obj.interactionName;
                var sprite1 = obj.sprite1;
                var sprite2 = obj.sprite2; // this is a collection (array), not a single string;
                var interactionText =
                    "<span style='color: #50d2ff'>" + sprite1 + "</span>";

                for(var i = 0; i < sprite2.length; i++)
                {
                    interactionText = interactionText + "<span style='color:#3bfffa'> X </span>" + sprite2[i] + ' ';
                }
                var parameters = obj.parameters; // this is a collection;
                for(var i = 0; i < parameters.length; i++)
                {
                    interactionText = interactionText + parameters[i];
                }

                interactionText = interactionText + "<span style='color: #8088ff'>=></span>" + " <span style='color: #f45e52'>" + interaction + "</span>";

                return interactionText;
        }

        function createDivSpanImage(element) {
            var divType1 = document.createElement('div');
            var imgType1 = document.createElement('img');
            var spanType1 = document.createElement('span');
            var sp1 = retrieveObjectByTarget(element);

            if(element == "EOS")
            {
                spanType1.innerHTML = "EOS";
                imgType1.src = "oryx/noimage.png";
            }
            else
            {
                spanType1.innerHTML = sp1.identifier;
                if ('img' in sp1.parameters)
                    imgType1.src = sp1.parameters['img'] + ".png";
                else
                    imgType1.src = "oryx/noimage.png";
            }

            divType1.append(spanType1);
            divType1.append(imgType1);
            return divType1;
        }

        function createDivForThisTextObj(textToPutInTheDiv, parentElement, id, interactionObj)
        {
            var divWrapper = document.createElement('div');
            divWrapper.id = 'wrapper';
            divWrapper.classList.add('wrapInteractionDiv');
            var div = document.createElement('div');
            div.classList.add('interactionDiv');
            div.id = id;
            div.innerHTML = textToPutInTheDiv;
            div.setAttribute("onclick", "getInteractionForUpdatingOnMouseClick('"+id+"')");
            mapIdToInteraction.set(id, interactionObj);
            divWrapper.append(div);

            var divCancel = document.createElement('div');
            divCancel.id = 'cancel_' + id;
            divCancel.classList.add("cancelDiv");
            //divCancel.setAttribute("onclick", "getInteractionForUpdatingOnMouseClick('"+id+"')");
            divCancel.setAttribute("onmousedown", "removeInteractionButton(event)");
            var img = document.createElement('img');
            img.id = 'cancel_' + 'img_' + id;
            //img.src = "https://www.iconsdb.com/icons/preview/red/cancel-xxl.png";
            img.src = "http://localhost:9001/WAR/views/css/cancel.png";
            divCancel.append(img);
            divWrapper.append(divCancel);
            parentElement.append(divWrapper);
        }

        function createDivForRecommendationTextObj(textToPutInTheDiv, parentElement, id, interactionObj)
        {
            var div = document.createElement('div');
            div.classList.add('interactionDiv');
            div.id = id;
            div.innerHTML = textToPutInTheDiv;
            mapIdToInteraction.set(id, interactionObj);
            div.setAttribute("onclick", "getInteractionForUpdatingOnMouseClick(this.id)");
            div.setAttribute("onmousedown", "addToTheInteractionSet(event)");
            parentElement.append(div);
        }

        function removeInteractionButton(e)
        {
                var isOkToRemove = confirm("Are you sure yo want to remove this item?");
                if(isOkToRemove) {
                    saveGameState();
                    removeObjectFromTheInteractionSet(e);
                    removeObjectFromTheInteractionList(e.target.id);
                }
        }

        function addToTheInteractionSet(e)
        {
            var isRightMB;
            e = e || window.event;

            if ("which" in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
                isRightMB = e.which == 3;
            else if ("button" in e)  // IE, Opera
                isRightMB = e.button == 2;

            if(isRightMB)
            {
                var isOkToRemove = confirm("Do you want to use this item?");
                if(isOkToRemove) {

                    var interactionObject = extractInteractionFromDivHTMLText(e.target);
                    addRecommendedInteraction(gameObj.InteractionSet, interactionObject);
                    removeObjectFromTheRecommendationList(e.target.id);
                }
            }
        }

        function getInteractionForUpdatingOnMouseClick(e)
        {
            console.log(e);
            var interactionObj = mapIdToInteraction.get(e);
            showInfo(interactionObj, e);
        }

        function deleteObjectInTheInteractionSet(obj) {
           removeItemFrom(interactionSetObj, obj);
        }

        function removeObjectFromTheInteractionSet(e)
        {
            var objID = e.target.id;
            objID = objID.replace("cancel_img_", "");
            var obj = mapIdToInteraction.get(objID);
            deleteObjectInTheInteractionSet(obj);

            //todo - we a need a target to get the interaction id from it
            mapIdToInteraction.delete(objID);
        }

        function removeObjectFromTheInteractionList(id)
        {
            console.log("id", id);
            document.getElementById(id).parentElement.parentElement.remove();
        }

        function removeObjectFromTheRecommendationList(id)
        {
            document.getElementById(id).remove();
        }

        function deleteInteractionList()
        {
            var unorderedList = document.getElementById('interactionList');
            deleteElementsFrom(unorderedList);
            var interactionSprite1Div = document.getElementById('interactionSprite1Div');
            deleteElementsFrom(interactionSprite1Div);
            //removeParameterContents()//remove from interactionContainerDiv
            var spritesToInteractDiv = document.getElementById('spritesToInteractDiv');
            deleteElementsFrom(spritesToInteractDiv);
        }

        function removeInteractionObjectWithThisSprite(sprite)
        {
            for(var key of mapIdToInteraction.keys())
            {
                var interactionObj = mapIdToInteraction.get(key);
                if(interactionObj.sprite1 == sprite || sprite in interactionObj.sprite2)
                {
                    deleteObjectInTheInteractionSet(interactionObj);
                    mapIdToInteraction.delete(key);
                    removeObjectFromTheInteractionList(key);
                }
            }
        }

        function removeFromTheSpriteCheckBoxList(sprite)
        {
            var spritesToInteractDiv = document.getElementById('spritesToInteractDiv');
            var spriteCheckBoxes = spritesToInteractDiv.getElementsByTagName('div');
            for(var i = 0; spriteCheckBoxes.length; i++)
            {
                var input = spriteCheckBoxes[i].getElementsByTagName('input');
                var id = input[0].id;
                
                if(id.includes(sprite))
                {
                    spriteCheckBoxes[i].remove();
                    return;
                }
            }
        }

        function stringfyInteractionSet()
        {
            var stringInteraction = [];
            var interactionSet = gameObj["InteractionSet"];
            for(var i = 0; i < interactionSet.length; i++)
            {
                var interactionToString = JSON.stringify(interactionSet[i]);
                stringInteraction.push(interactionToString);
            }
            return stringInteraction;
        }

        function objectifyInteractionSet(interactionStringArray)
        {
            var objectInteraction = [];
            for(var i = 0; i < interactionStringArray.length; i++)
            {
                var interactionToObject = JSON.parse(interactionStringArray[i]);
                objectInteraction.push(interactionToObject);
            }
            return objectInteraction;
        }

        function recommendInteractionsMainCall()
        {
            document.getElementById('selectSuggestionInteractionId').style.display = 'block';
            deleteElementsFrom(document.getElementById('suggestionList'));
            var recs = getInteractionsToRecommend();

            for(var i = 0; i < recs.length; i++)
            {
                var recObj = {};
                recObj["interactionName"] = recs[i].interaction;
                recObj["sprite1"] = recs[i].pair.type1;
                recObj["sprite2"] = recs[i].pair.type2;
                recObj["parameters"] =
                    createParametersForTheInteractionsRecommendations(recs[i].interaction);
                var objId = i;
                buildRecommendInteraction(recObj, objId);
            }
        }

        function buildRecommendInteraction(interactionObj, objId)
        {
            var unorderedList = document.getElementById('suggestionList');
            var textObj = convertObjectToText(interactionObj);
            createDivForRecommendationTextObj(textObj, unorderedList, "recInteraction" + objId, interactionObj);
        }

        function extractInteractionFromDivText(divText)
        {
            var text = document.getElementById(divText).innerHTML;
            var textSplitted = text.split(" ");
            var interactionObject = {};
            interactionObject.interactionName = textSplitted[0];
            interactionObject.sprite1 = textSplitted[1];
            interactionObject.sprite2 = [textSplitted[2]];
            interactionObject.parameters = {};

            return interactionObject;
        }

        function extractInteractionFromDivHTMLText(element)
        {
            var interactionObject = {};
            interactionObject.interactionName = element.childNodes[5].innerText;
            interactionObject.sprite1 = element.childNodes[0].innerText;
            interactionObject.sprite2 = [element.childNodes[2].textContent.trim()];
            interactionObject.parameters = {};

            return interactionObject;
        }


        function eliminateDuplicates(arr)
        {
            var i,
                len = arr.length,
                out = [],
                obj = {};

            for (i = 0; i < len; i++) {
                obj[arr[i]] = 0;
            }
            for (i in obj) {
                out.push(i);
            }
            return out;
        }

        function removeDuplicateInteractions()
        {
            var interactionsStringfyeid = stringfyInteractionSet();
            interactionsStringfyeid = eliminateDuplicates(interactionsStringfyeid);
            gameObj["InteractionSet"] = objectifyInteractionSet(interactionsStringfyeid);
            refreshGame(gameObj);
        }

        function prepareSelectionSortComponent()
        {
            var select = document.getElementById('sortSuggestionSelect');
            if(select.options.length > 2) return;
            for (var i = 0; i < spriteNameCollection.length; i++) {
                var option = document.createElement("option");
                var elementName = spriteNameCollection[i];
                option.value = elementName;
                option.text = elementName;
                select.appendChild(option);
            }
            select.setAttribute('oninput', "sortSuggestionBy(this.selectedIndex)");
        }

        function updateSelectSortComponent()
        {
            var select = document.getElementById('sortSuggestionSelect');
            while(select.childNodes.length > 0)
            {
                select.removeChild(select.lastChild);
            }
            for (var i = 0; i < spriteNameCollection.length; i++) {
                var option = document.createElement("option");
                var elementName = spriteNameCollection[i];
                option.value = elementName;
                option.text = elementName;
                select.appendChild(option);
            }
        }

        function sortSuggestionBy(element)
        {
            var item = findItemBySelect(document.getElementById('sortSuggestionSelect'), element);
            var newList = [];
            var recs = getInteractionsToRecommend();
            recs.forEach(function(el) {if(el['pair']['type1'] == item) {newList.push(el)}})
            if(newList.length == 0)
            {
                alert('no interactions to recommend with ' + item);
                return;
            }
            deleteElementsFrom(document.getElementById('suggestionList'));
            for(var i = 0; i < newList.length; i++)
            {
                var recObj = {};
                recObj["interactionName"] = newList[i].interaction;
                recObj["sprite1"] = newList[i].pair.type1;
                recObj["sprite2"] = newList[i].pair.type2;
                recObj["parameters"] = {};
                var objId = i;
                buildRecommendInteraction(recObj, objId);
            }
        }

        // -------------------------------------------

function createParametersForTheInteractionsRecommendations(interaction)
{
    var params = {};
    params["score"] = 0;

    if(interaction == transformToSingleton || interaction == spawnBehind || interaction == spawnIfHasMore
        || interaction == spawnIfHasLess || interaction == transformTo || interaction == transformToRandomChild
        || interaction == removeScore || interaction == subtractHealthPoints
        || interaction == increaseSpeedToAll || interaction == decreaseSpeedToAll || interaction == setSpeedForAll)
    {
        params["stype"] = spriteNameCollection[0];
    }

    if(interaction == killIfHasMore || interaction == killIfHasLess || interaction == killIfOtherHasMore
        || interaction == spawnIfHasMore || interaction == spawnIfHasLess || interaction == changeResource)
    {
        params["resource"] = "none";
    }

    if(interaction == transformToSingleton)
    {
        params["stypeOther"] = spriteNameCollection[0];
    }

    if(interaction == killIfHasMore || interaction == killIfHasLess || interaction == killIfOtherHasMore
        || interaction == spawnIfHasMore || interaction == spawnIfHasLess)
    {
       params["limit"] = 1;
    }

    if(interaction == addHealthPoints || interaction == addHealthPointsToMax || interaction == subtractHealthPoints
        || interaction == increaseSpeedToAll || interaction == decreaseSpeedToAll || interaction == setSpeedForAll
        || interaction == changeResource)
    {
       params["value"] = 1;
    }

    return params;
}