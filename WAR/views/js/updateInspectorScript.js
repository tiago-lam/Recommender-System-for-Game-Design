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
            console.log(val);
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

        function updateObjParamValue(val, param)
        {
            currentObj.parameters[param] = val;
            if ("children" in currentObj) {
                var children = currentObj.children;
                for (var i = 0; i < children.length; i++) {
                    children[i].parameters[param] = val;
                }
            }
            mapListObject.set(currentObj.identfier, currentObj);
            console.log(myObj);
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

        function updateAnalogueParameters(obj)
        {
          var shrinkControl = document.getElementById("shrinkControl");
            shrinkControl.disabled = checkIfItParentHasParam(obj, "shrinkfactor");
          var speedControl = document.getElementById('speedControl');
            speedControl.disabled = checkIfItParentHasParam(obj, "speed");
          var cooldownControl = document.getElementById("cooldownControl");
            cooldownControl.disabled = checkIfItParentHasParam(obj, "cooldown");

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
            invisibleCheckBoxControl.disabled = checkIfItParentHasParam(obj, "invisible");
            var singletonCheckBoxControl =  document.getElementById("singletonCheckBoxId");
            singletonCheckBoxControl.disabled = checkIfItParentHasParam(obj, "singleton");
            var rotateCheckBoxControl =  document.getElementById("rotateCheckBoxId");
            rotateCheckBoxControl.disabled = checkIfItParentHasParam(obj, "rotateInPlace");

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

        function updateInspector(obj)
        {

            initializeCurrentObj(obj);

            updateAnalogueParameters(obj);

            updateDigitalParameters(obj)

        }


        function checkIfItParentHasParam(obj, param)
        {
            var htmlElement = document.getElementById(obj.identifier);
            console.log(htmlElement);
            var parent = htmlElement.parentNode;

            console.log(parent);
            if(parent.id == 'spriteList') {
                console.log("first cut");
                return false;
            }

            while (parent.className != 'dd-item') {
                console.log(parent);
                parent = parent.parentNode;
            }

            if(parent.id != 'spriteList')
            {
                console.log("reached");
                var parentObj = mapListObject.get(parent.id);
                console.log(parentObj);
                console.log(parentObj.parameters[param]);
                if(param in parentObj.parameters){
                    console.log(obj.identifier);
                    console.log(parentObj.identifier);
                    console.log(param);
                    console.log("true cut");
                    return true;
                }
            }
            console.log("final cut");
            return false;
        }