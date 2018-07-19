        var mapIdToInteraction = new Map();
        /**
        * access the serve in order to get the sprite set of a game
        * @type {XMLHttpRequest}
        * */
        var xmlHttp = new XMLHttpRequest();
        /**
         * Function responsible for perform the GET response
         */
        xmlHttp.onreadystatechange = function() {

            var interactionList = document.getElementById('interactionList');
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                var interactionSetObj = JSON.parse(this.responseText);
                console.log(interactionSetObj);
                buildTheInteractionSet(interactionSetObj, interactionList)
            }
        };
        /**
         * Prepare and send the GET request to the server -- get the interaction set
         */
        xmlHttp.open("GET", "http://localhost:9001/interactionSet", true);
        xmlHttp.send();

        function buildTheInteractionSet(interactionObj, unorderedList)
        {

                for(var i = 0; i < interactionObj.length; i++)
                {
                    var textObj = convertObjectToText(interactionObj[i]);
                    createDivForThisTextObj(textObj, unorderedList, "interaction" + i, interactionObj[i]);
                }
                createSprite1SelectList();
                createInteractionSelectList();
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
            parentElement.append(div);
        }

        function getInteractionForUpdatingOnMouseClick(e)
        {
            var interactionObj = mapIdToInteraction.get(e);
            showInfo(interactionObj, e);
        }