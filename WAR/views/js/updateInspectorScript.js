        var currentObj;

        function initializeCurrentObj(obj)
        {
            currentObj = obj;
        }

        function updateInvisibleValue(val, updateFunction)
        {
            console.log(val);
            updateFunction(val, "invisible");
        }

        function updateRotateValue(val, updateFunction)
        {
            console.log(val);
            updateFunction(val, "rotateInPlace");
        }

        function updateSingletonValue(val, updateFunction)
        {
            document.getElementById('shrinkValue').textContent=val;
            updateFunction(val, "singleton");
        }

        function updateShrinkValue(val, updateFunction) {
          document.getElementById('shrinkValue').textContent=val;
            updateFunction(val, "shrinkfactor");
        }

        function updateSpeedValue(val, updateFunction) {
          document.getElementById('speedValue').textContent=val;
            updateFunction(val, "speed");
        }

        function updateCooldownValue(val, updateFunction) {
          document.getElementById('cooldownValue').textContent=val;
            updateFunction(val, "cooldown");
        }

        function updateSelectValue(val, updateFunction)
        {
            var selectComponent = document.getElementById('orientationSelectId');
            var choice = selectComponent.options[val];
            updateFunction(choice.value, "orientation");
        }

        function updateObjParamValue(val, param)
        {
            currentObj.parameters[param] = val;
            if ("children" in currentObj) {
                var children = currentObj.children;
                for (var i = 0; i < children.length; i++) {
                    children[i].parameters[param] = val;
                }
            }
            mapIdentifierToObject.set(currentObj.identfier, currentObj);
            console.log(myObj);
        }

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

        function updateDigitalParameters(obj)
        {
            var invisibleCheckBoxControl =  document.getElementById("invisibleCheckBoxId");
            invisibleCheckBoxControl.disabled = checkIfItsParentHasParam(obj, "invisible");
            var singletonCheckBoxControl =  document.getElementById("singletonCheckBoxId");
            singletonCheckBoxControl.disabled = checkIfItsParentHasParam(obj, "singleton");
            var rotateCheckBoxControl =  document.getElementById("rotateCheckBoxId");
            rotateCheckBoxControl.disabled = checkIfItsParentHasParam(obj, "rotateInPlace");

            if("parameters" in obj)
            {
                var parameters = obj["parameters"];
                if("invisible" in parameters)
                {
                    invisibleCheckBoxControl.checked = parameters["invisible"];
                }
                else
                {
                    invisibleCheckBoxControl.checked = false;
                }
                if("singleton" in parameters)
                {
                    singletonCheckBoxControl.checked = parameters["singleton"];
                }
                else
                {
                    singletonCheckBoxControl.checked = false;
                }
                if("rotateInPlace" in parameters)
                {
                    rotateCheckBoxControl.checked = parameters["rotateInPlace"];
                }
                else
                {
                    rotateCheckBoxControl.checked = false;
                }
            }
        }

        function updateOrientationParameter(obj)
        {
            var selectComponent = document.getElementById('orientationSelectId');
            selectComponent.disabled = checkIfItsParentHasParam(obj, 'orientation');
            updateSelectParameter("orientationSelectId", obj.parameters["orientation"]);
        }

        function updateInspector(obj)
        {
            initializeCurrentObj(obj);

            updateAnalogueParameters(obj);

            updateDigitalParameters(obj);

            updateOrientationParameter(obj);

            designSpecialTypesParameters(obj.referenceClass, obj.parameters);

            if("stype" in obj.parameters) {
                updateStypeParameter(obj);
            }

            if("spawnorientation" in obj.parameters) {
                updateSpawnOrientationParameter(obj);
            }

            if("prob" in obj.parameters)
            {
                updateProbParameter(obj);
            }

            if("total" in obj.parameters)
            {
                updateTotalParameter(obj);
            }

            if("ammo" in obj.parameters)
            {
                updateAmmoParameter(obj);
            }

        }

        function assignValueToTheParameter(parameters, parameterValue, parameterControl, parameterMatch) {

                if (parameterMatch in parameters) {
                    parameterValue.value = parameters[parameterMatch];
                    parameterValue.textContent = parameterValue.value;
                    parameterControl.value = parameterValue.value;
                    return true;
                }

            return false;
        }

        function manageParameterValues(parameterValue, parameterControl, parameters, value, parameterMatch) {

            var hasParameter = assignValueToTheParameter(parameters, parameterValue, parameterControl, parameterMatch);
            if(!hasParameter)
            {
                defaultValues(parameterValue, parameterControl, value);
            }
        }

        function defaultValues(parameterValue, parameterControl, defaultValue)
        {
            parameterValue.value = defaultValue;
            parameterValue.textContent = parameterValue.value;
            parameterControl.value = parameterValue.value;
        }

        function checkIfItsParentHasParam(obj, param)
        {
            var htmlElement = document.getElementById(obj.identifier);

            var parent = htmlElement.parentNode;

            if(parent.id == 'spriteList') {

                return false;
            }

            while (parent.className != 'dd-item') {

                parent = parent.parentNode;
            }

            if(parent.id != 'spriteList')
            {

                var parentObj = mapIdentifierToObject.get(parent.id);

                if(param in parentObj.parameters){

                    return true;
                }
            }

            return false;
        }