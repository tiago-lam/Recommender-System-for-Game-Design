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
        }

        function convertObjectToText(obj)
        {
                var interaction = obj.interactionName;
                var sprite1 = obj.sprite1;
                var sprite2 = obj.sprite2; // this is a collection (array), not a single string;
                var interactionText = interaction + " " +
                    sprite1 + " ";
                for(var i = 0; i < sprite2.length; i++)
                {
                    interactionText = interactionText + sprite2[i] + ' ';
                }
                var parameters = obj.parameters; // this is a collection;
                for(var i = 0; i < parameters.length; i++)
                {
                    interactionText = interactionText + parameters[i];
                }

                return interactionText;
        }

        function createDivForThisTextObj(textToPutInTheDiv, parentElement, id, interactionObj)
        {
            var div = document.createElement('div');
            div.classList.add('interactionDiv');
            div.id = id;
            div.innerHTML = textToPutInTheDiv;
            mapIdToInteraction.set(id, interactionObj);
            div.setAttribute("onclick", "getInteractionForUpdatingOnMouseClick(this.id)");
            div.setAttribute("onmousedown", "rightButton(event)");
            parentElement.append(div);
        }

        function rightButton(e)
        {
            var isRightMB;
            e = e || window.event;

            if ("which" in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
                isRightMB = e.which == 3;
            else if ("button" in e)  // IE, Opera
                isRightMB = e.button == 2;

            if(isRightMB)
            {
                var isOkToRemove = confirm("Are you sure yo want to remove this item?");
                if(isOkToRemove) {
                    saveGameState();
                    removeObjectFromTheInteractionSet(e);
                    removeObjectFromTheInteractionList(e.target.id);
                }
            }
        }

        function getInteractionForUpdatingOnMouseClick(e)
        {
            var interactionObj = mapIdToInteraction.get(e);
            showInfo(interactionObj, e);
        }

        function deleteObjectInTheInteractionSet(obj) {
            var index = interactionSetObj.indexOf(obj);
            if (index > -1) {
                interactionSetObj.splice(index, 1);
            }
        }

        function removeObjectFromTheInteractionSet(e)
        {
            var objID = e.target.id;
            var obj = mapIdToInteraction.get(objID);
            deleteObjectInTheInteractionSet(obj);

            //todo - we a need a target to get the interaction id from it
            mapIdToInteraction.delete(objID);
        }

        function removeObjectFromTheInteractionList(id)
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