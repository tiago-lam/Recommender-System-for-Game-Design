        /**
        * Stores the current sprite set object
        */
        var currentObj;

        /**
         * Initilizes the currentObj variable
         * @param obj
         */
        function initializeCurrentObj(obj)
        {
            currentObj = obj;
        }

        /**
         * Updates the invisible parameter
         * @param val
         * @param updateFunction
         */
        function updateInvisibleValue(val, updateFunction)
        {
            console.log(val);
            updateFunction(val, "invisible");
        }

        /**
         * Updates the rotate in place parameter
         * @param val
         * @param updateFunction
         */
        function updateRotateValue(val, updateFunction)
        {
            console.log(val);
            updateFunction(val, "rotateInPlace");
        }

        /**
         * Updates the singleton parameter
         * @param val
         * @param updateFunction
         */
        function updateSingletonValue(val, updateFunction)
        {
            document.getElementById('shrinkValue').textContent=val;
            updateFunction(val, "singleton");
        }

        /**
         * Updates the shrinkfactor parameter
         * @param val
         * @param updateFunction
         */
        function updateShrinkValue(val, updateFunction) {
          document.getElementById('shrinkValue').textContent=val;
            updateFunction(val, "shrinkfactor");
        }

        /**
         * Updates the speed parameter
         * @param val
         * @param updateFunction
         */
        function updateSpeedValue(val, updateFunction) {
          document.getElementById('speedValue').textContent=val;
            updateFunction(val, "speed");
        }

        /**
         * Updates the cooldown parameter
         * @param val
         * @param updateFunction
         */
        function updateCooldownValue(val, updateFunction) {
          document.getElementById('cooldownValue').textContent=val;
            updateFunction(val, "cooldown");
        }

        /**
         * Updates orientation select value
         * @param val
         * @param updateFunction
         */
        function updateOrientationSelectValue(val, updateFunction)
        {
            var selectComponent = document.getElementById('orientationSelectId');
            var choice = selectComponent.options[val];
            updateFunction(choice.value, "orientation");
        }

        function updateReferenceClassSelectValue(obj)
        {
            var v = document.getElementById('refClassSelectId');
            v.disabled = false;
            if(mapChildToParent.has(obj.identifier))
            {
                console.log("oi");
                console.log(obj.identifier);
                var parentObjIdentifier = mapChildToParent.get(obj.identifier);
                console.log("PI");
                console.log(parentObjIdentifier);
                var parentObj = retrieveObjectByTarget(parentObjIdentifier);

                if(parentObj.referenceClass != null)
                {
                    v.disabled = true;
                }


            }

            updateSelectParameter('refClassSelectId', obj.referenceClass);
        }

        /**
         * Updates object parameter values (for all objects in the hierarchy)
         * @param obj
         * @param param
         * @param val
         */
        function updateForAllObjectsInTheHierarchy(obj, param, val) {var selectRefClass = document.getElementById('refClassSelectId');
            // //gets this dd-item/li element
            // var li = document.getElementById(obj.identifier);
            // //check if this li/dd-item/obj has a parent
            // var parentLi = li.parentNode;
            // if(parentLi.id != "spriteList")
            // {
            //     if(parentLi.classList.contains("dd-list"))
            //     {
            //         parentLi = parentLi.parentNode;
            //         var parentObj = retrieveObjectByTarget(parentLi.id);
            //         if(parentObj.referenceClass != null) {
            //             selectRefClass.disabled = true;
            //         }
            //     }
            // }
            obj.parameters[param] = val;
            if ("children" in obj) {
                var children = obj.children;
                for (var i = 0; i < children.length; i++) {
                    children[i].parameters[param] = val;
                    updateForAllObjectsInTheHierarchy(children[i], param, val);
                }
            }
            mapIdentifierToObject.set(obj.identfier, currentObj);
        }

        /**
         * Updates object parameter values
         * @param val
         * @param param
         */
        function updateObjParamValue(val, param)
        {
            updateForAllObjectsInTheHierarchy(currentObj, param, val);
        }

        /**
         * Updates the analogue parameters
         * @param obj
         */
        function updateAnalogueParameters(obj)
        {
            var shrinkControl = document.getElementById("shrinkControl");
            shrinkControl.disabled = checkIfItsParentHasParam(obj, "shrinkfactor");
            var speedControl = document.getElementById('speedControl');
            speedControl.disabled = checkIfItsParentHasParam(obj, "speed");
            var cooldownControl = document.getElementById("cooldownControl");
            cooldownControl.disabled = checkIfItsParentHasParam(obj, "cooldown");

            var shrinkValue = document.getElementById("shrinkValue");
            var speedValue = document.getElementById('speedValue');
            var cooldownValue = document.getElementById("cooldownValue");

            if (("parameters" in obj)) {
                var parameters = obj["parameters"];
                manageParameterValues(speedValue, speedControl, parameters, 1, "speed");
                manageParameterValues(shrinkValue, shrinkControl, parameters, 0, "shrinkfactor");
                manageParameterValues(cooldownValue, cooldownControl, parameters, 1, "cooldown");
            }

        }

        /**
         * Updates the digital parameters
         * @param obj
         * @param invisibleCheckBoxControl
         * @param singletonCheckBoxControl
         * @param rotateCheckBoxControl
         */
        function updatingTheDigitalParameterValues(obj, invisibleCheckBoxControl, singletonCheckBoxControl, rotateCheckBoxControl) {
            if ("parameters" in obj) {
                var parameters = obj["parameters"];
                if ("invisible" in parameters) {
                    invisibleCheckBoxControl.checked = parameters["invisible"];
                }
                else {
                    invisibleCheckBoxControl.checked = false;
                }
                if ("singleton" in parameters) {
                    singletonCheckBoxControl.checked = parameters["singleton"];
                }
                else {
                    singletonCheckBoxControl.checked = false;
                }
                if ("rotateInPlace" in parameters) {
                    rotateCheckBoxControl.checked = parameters["rotateInPlace"];
                }
                else {
                    rotateCheckBoxControl.checked = false;
                }
            }
        }

        /**
         * Controling all the digital parameters
         * @param obj
         */
        function controlingDigitalParameters(obj)
        {
            var invisibleCheckBoxControl =  document.getElementById("invisibleCheckBoxId");
            invisibleCheckBoxControl.disabled = checkIfItsParentHasParam(obj, "invisible");
            var singletonCheckBoxControl =  document.getElementById("singletonCheckBoxId");
            singletonCheckBoxControl.disabled = checkIfItsParentHasParam(obj, "singleton");
            var rotateCheckBoxControl =  document.getElementById("rotateCheckBoxId");
            rotateCheckBoxControl.disabled = checkIfItsParentHasParam(obj, "rotateInPlace");

            updatingTheDigitalParameterValues(obj, invisibleCheckBoxControl, singletonCheckBoxControl, rotateCheckBoxControl);
        }

        /**
         * Updates orientation value
         * @param obj
         */
        function updateOrientationParameter(obj)
        {
            var selectComponent = document.getElementById('orientationSelectId');
            selectComponent.disabled = checkIfItsParentHasParam(obj, 'orientation');
            updateSelectParameter("orientationSelectId", obj.parameters["orientation"]);
        }

        /**
         * Updates the name and the image of the object on the inspector window
         * @param obj
         */
        function updateNameAndImage(obj) {
            document.getElementById("name").innerHTML = obj.identifier;
            var img = document.getElementById("image");
            img.src = document.getElementById(obj.identifier + "ImgId").currentSrc;
        }

        /**
         * Updates the special parameter values (the ones presented on spcific reference classes - sprite types)
         * @param obj
         */
        function updatingSpecialParameterValues(obj) {
            if ("stype" in obj.parameters) {
                updateStypeParameter(obj);
            }

            if ("spawnorientation" in obj.parameters) {
                updateSpawnOrientationParameter(obj);
            }

            if ("prob" in obj.parameters) {
                updateProbParameter(obj);
            }

            if ("total" in obj.parameters) {
                updateTotalParameter(obj);
            }

            if ("ammo" in obj.parameters) {
                updateAmmoParameter(obj);
            }

            if ("stype1" in obj.parameters) {
                updateStype1Parameter(obj);
            }

            if ("stype2" in obj.parameters) {
                updateStype2Parameter(obj);
            }

            if ("limit" in obj.parameters) {
                updateLimitParameter(obj);
            }

            if ("minAmmo" in obj.parameters) {
                updateMinAmmoParameter(obj);
            }

            if ("ammoCost" in obj.parameters) {
                updateAmmoCostParameter(obj);
            }

            if ("spreadprob" in obj.parameters) {
                updateSpreadProbParameter(obj);
            }

            if("value" in obj.parameters)
            {
                updateValueParameter(obj);
            }
        }

        /**
         * Main function to update the object information on the inspector window
         * @param obj
         */
        function updateInspector(obj)
        {
            console.log(obj);

            updateNameAndImage(obj);

            initializeCurrentObj(obj);

            updateAnalogueParameters(obj);

            controlingDigitalParameters(obj);

            updateOrientationParameter(obj);

            updateReferenceClassSelectValue(obj);

            designSpecialTypesParameters(obj, obj.parameters);

            updatingSpecialParameterValues(obj);
        }

        /**
         * Applies the specified value to the specified parameter
         * @param parameters
         * @param parameterValue
         * @param parameterControl
         * @param parameterMatch
         * @returns {boolean}
         */
        function assignValueToTheParameter(parameters, parameterValue, parameterControl, parameterMatch) {

                if (parameterMatch in parameters) {
                    parameterValue.value = parameters[parameterMatch];
                    parameterValue.textContent = parameterValue.value;
                    parameterControl.value = parameterValue.value;
                    return true;
                }

            return false;
        }

        /**
         * Applies the specified value to the specified parameter (if the parameter is included on the list)
         * @param parameterValue
         * @param parameterControl
         * @param parameters
         * @param value
         * @param parameterMatch
         */
        function manageParameterValues(parameterValue, parameterControl, parameters, value, parameterMatch) {

            var hasParameter = assignValueToTheParameter(parameters, parameterValue, parameterControl, parameterMatch);
            if(!hasParameter)
            {
                defaultValues(parameterValue, parameterControl, value);
            }
        }

        /**
         * Applies default values to the specified parameter
         * @param parameterValue
         * @param parameterControl
         * @param defaultValue
         */
        function defaultValues(parameterValue, parameterControl, defaultValue)
        {
            parameterValue.value = defaultValue;
            parameterValue.textContent = parameterValue.value;
            parameterControl.value = parameterValue.value;
        }

        /**
         * Returns true if this object has a parent
         * @param obj
         * @param param
         * @returns {boolean}
         */
        function checkIfItsParentHasParam(obj, param)
        {
            var htmlElement = document.getElementById(obj.identifier);

            var parent = htmlElement.parentNode;

                if (parent.id == 'spriteList') {

                    return false;
                }

                while (parent.className != 'dd-item') {

                    parent = parent.parentNode;
                }

                if (parent.id != 'spriteList') {

                    var parentObj = mapIdentifierToObject.get(parent.id);

                    if (param in parentObj.parameters) {

                        return true;
                    }
                }

            return false;
        }