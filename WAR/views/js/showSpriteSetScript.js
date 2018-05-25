        var mapListObject = new Map();
        var ul = document.getElementById("spriteList");
        ul.classList.add("dd-list");
        //access the serve in order to get the sprite set of a game
        var xmlhttp = new XMLHttpRequest();
        var myObj;

        xmlhttp.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {
                myObj = JSON.parse(this.responseText);
                console.log("H");
                console.log(myObj);
                for(var i = 0; i < myObj.length; i++)
                {
                    getObjectData(myObj[i], ul);
                }
                applyStylesToTheSpriteSet();
                appendEvents();
            }
        };
        xmlhttp.open("GET", "http://localhost:9001/spriteSet", true);
        xmlhttp.send();

        function applyStylesToTheSpriteSet()
        {
               $('.dd').nestable('');
        };

        function appendEvents()
        {
            $(".dd-handle")
               .mousedown(function(e) {
                var obj = retrieveObjectByTarget(e.target);
                updateInspector(obj);
             });
        }

        //Extracts all  information of a sprite and add it to a list element
        function getObjectData(obj, upperUl)
        {
            var currentObj = obj;
            var identifier = currentObj.identifier;
            var parameters = currentObj.parameters;
            var imgSrc = document.createElement("img");

            if("img" in parameters)
            {
                var imgPathForUrlCreation = parameters["img"] + ".png";
                fetchBlob(imgPathForUrlCreation, imgSrc);
            }


            var li = document.createElement("li");
            li.classList.add("dd-item");
            li.setAttribute('data-id', identifier);

            var div = document.createElement("div");
            div.classList.add("dd-handle");
            var divText = document.createTextNode(identifier);
            div.appendChild(divText);
            div.appendChild(imgSrc);
            li.appendChild(div);

            var textElement = li.childNodes[0].childNodes[0];

            li.setAttribute('data-obj', currentObj);
            mapListObject.set(textElement, currentObj);
            upperUl.appendChild(li);

            var objChildren = currentObj.children;
            if(objChildren)
            {
                for(var j = 0; j < objChildren.length; j++)
                {
                    var innerCurrentObj = objChildren[j];

                    var innerOl = document.createElement("ol");
                    innerOl.classList.add("dd-list");
                    innerOl.classList.add("children");

                    getObjectData(innerCurrentObj, innerOl);
                    li.appendChild(innerOl);
                }
            }

        }

        //get the image of an specific sprite
        function fetchBlob(imgPath, imgElement) {
            // construct the URL path to the image file from the product.image property
            var url = imgPath;
            // Use XHR to fetch the image, as a blob
            // Again, if any errors occur we report them in the console.
            var request = new XMLHttpRequest();
            var params = "picture=" + imgPath;
            request.open('GET', "http://localhost:9001/imgs" + "?" + params, true);
            request.responseType = 'blob';

            request.onload = function() {
                if(request.status === 200) {
                // Convert the blob to an object URL — this is basically an temporary internal  URL
                // that points to an object stored inside the browser
                var blob = request.response;
                objectURL = URL.createObjectURL(blob);
                // invoke showProduct
                imgElement.src = objectURL;
                } else {
                    alert('Network request for "' + product.name + '" image failed with response ' +     request.status + ': ' + request. statusText);
                }
            };  

            request.send();
            console.log("finished");
        }

        function retrieveObjectByTarget(target)
        {
            obj =  mapListObject.get(target.childNodes[0]);
            document.getElementById("name").innerHTML = obj.identifier;
            var img = document.getElementById("image");
            img.src = target.childNodes[1].src;
          return obj;
        }

        function retrieveObjectByName(objectName)
        {
            var objectContainers = document.getElementsByClassName('dd-handle');
            for(var i = 0; i < objectContainers.length; i++)
            {
                if(objectContainers[i].childNodes[0].textContent == objectName)
                {
                    var gameObj = mapListObject.get(objectContainers[i].childNodes[0]);
                    //console.log("kk");
                    //console.log(gameObj);
                    return gameObj;
                }
            }
            return "non-existent object with name " + objectName;
        }

        function getMapListObject()
        {
            return mapListObject;
        }