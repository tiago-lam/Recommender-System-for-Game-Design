        /**
        * map that relates identifier to objects
        * @type {Map}
        */
        var mapIdentifierToObject = new Map();

        /**
         * map that relates identifier to objects
         * @type {Map}
         */
        var mapChildToParent = new Map();

        /**
         * Stores the main Ul element responsible for the Sprite Set hierarchy
         * @type {HTMLElement | null}
         */
        var spriteListUl = document.getElementById("spriteList");
        /**
         * Apply the dd-list nestable style to the spriteListUl
         */
        spriteListUl.classList.add("dd-list");

        /**
         * access the serve in order to get the sprite set of a game
         * @type {XMLHttpRequest}
         * */
        var xmlhttp = new XMLHttpRequest();

        /**
         * The sprite set obj
         */
        var spriteSetObj;

        /**
         * Build the whole sprite set as an HTML hierarchy list
         * @param spriteSetObj
         * @param ulElement
         */
        function buildTheSpriteSet(spriteSetObj, ulElement) {
            for (var i = 0; i < spriteSetObj.length; i++) {
                getObjectData(spriteSetObj[i], ulElement);
            }
            console.log(mapChildToParent);
        }

        /**
         * Function responsible for perform the GET response
         */
        xmlhttp.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                spriteSetObj = JSON.parse(this.responseText);
                console.log(spriteSetObj);
                buildTheSpriteSet(spriteSetObj, spriteListUl);
                activateHierarchyListSort();
                getObjectForUpdatingOnMouseClick();
                updateObjectsAfterListChange();
            }
        };
        /**
         * Prepare and send the GET request to the server
         */
        xmlhttp.open("GET", "http://localhost:9001/spriteSet", true);
        xmlhttp.send();

        /**
         * Basically activates the nestable library
         */
        function activateHierarchyListSort()
        {
               $('.dd').nestable('');
        }

        /**
         * It shows the information of the sprite you clicked on
         */
        function getObjectForUpdatingOnMouseClick()
        {
            $(".dd-handle")
               .mousedown(function(e) {
                var obj = retrieveObjectByTarget(e.target.id);
                updateInspector(obj);
             });
        }

        /**
         * Updates the sprite set after any changes on the hierarchy
         */
        function updateObjectsAfterListChange()
        {
            $('.dd').on('change', function() {
                updateObj();
            });
        }

        /**
         * Extracts all  information of a sprite and add it to a list element
         */
        function getObjectData(obj, upperUl)
        {
            var currentObj = obj;
            var identifier = currentObj.identifier;
            var parameters = currentObj.parameters;
            var imgSrc = document.createElement("img");
            imgSrc.id = identifier + "ImgId";

            if("img" in parameters)
            {
                var imgPathForUrlCreation = parameters["img"] + ".png";
                fetchBlob(imgPathForUrlCreation, imgSrc);
            }

            var li = document.createElement("li");
            li.id = identifier;
            li.classList.add("dd-item");

            var div = document.createElement("div");
            div.classList.add("dd-handle");
            div.id = identifier;
            var divText = document.createTextNode(identifier);
            div.appendChild(divText);
            div.appendChild(imgSrc);
            li.appendChild(div);

            var textElement = identifier;

            li.setAttribute('data-obj', currentObj);
            mapIdentifierToObject.set(textElement, currentObj);
            upperUl.appendChild(li);

            var objChildren = currentObj.children;
            if(objChildren)
            {
                var innerOl = document.createElement("ol");
                innerOl.classList.add("dd-list");
                innerOl.classList.add("children");

                for(var j = 0; j < objChildren.length; j++)
                {
                    var innerCurrentObj = objChildren[j];
                    mapChildToParent.set(innerCurrentObj.identifier, currentObj.identifier);
                    getObjectData(innerCurrentObj, innerOl);
                    li.appendChild(innerOl);
                }
            }
        }

        /**
         * Get the image of an specific sprite
         * @param imgPath
         * @param imgElement
         */
        function fetchBlob(imgPath, imgElement) {
            // construct the URL path to the image file from the product.image property
            var urlSrc = null;
            // Use XHR to fetch the image, as a blob
            // Again, if any errors occur we report them in the console.
            var request = new XMLHttpRequest();
            var params = "picture=" + imgPath;
            request.open('GET', "http://localhost:9001/imgs" + "?" + params, true);
            request.responseType = 'blob';
            var objectURL = null;

            request.onload = function() {
                if(request.status === 200) {
                // Convert the blob to an object URL — this is basically an temporary internal  URL
                // that points to an object stored inside the browser
                var blob = request.response;
                objectURL = URL.createObjectURL(blob);
                // invoke showProduct
                imgElement.src = objectURL;
                urlSrc = imgElement.src;
                    return urlSrc;

                } else {
                    alert('Network request for "' + product.name + '" image failed with response ' +     request.status + ': ' + request. statusText);
                }
            };

            request.send();

        }

        /**
         * Returns a sprite obj, Given a target (name)
         * @param target
         * @returns {*}
         */
        function retrieveObjectByTarget(target)
        {
            var obj =  mapIdentifierToObject.get(target);
            return obj;
        }

        function getMapListObject()
        {
            return mapIdentifierToObject;
        }

        function removeObjectFromTheSpriteSet(obj)
        {
            var index = spriteSetObj.indexOf(obj);
            if (index > -1) {
                spriteSetObj.splice(index, 1);
            }
        }