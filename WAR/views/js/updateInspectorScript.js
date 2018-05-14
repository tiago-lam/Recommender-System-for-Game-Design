        function updateShrinkValue(val) {
          document.getElementById('shrinkValue').textContent=val; 
        }

        function updateSpeedValue(val) {
          document.getElementById('speedValue').textContent=val; 
        }

        function updateCooldownValue(val) {
          document.getElementById('cooldownValue').textContent=val; 
        }

        function assignValueToTheParameter(parametersArray, parameterValue, parameterControl, parameterMatch) {

            for (var i = 0; i < parametersArray.length; i++) {
                var hashMapObj = parametersArray[i];
                if (parameterMatch in hashMapObj) {
                    parameterValue.value = hashMapObj[parameterMatch];
                    parameterValue.textContent = parameterValue.value;
                    parameterControl.value = parameterValue.value;
                    return true;
                }
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

        function defaultValues(parameterValue, parameterControl, value)
        {
            parameterValue.value = value;
            parameterValue.textContent = parameterValue.value;
            parameterControl.value = parameterValue.value;
        }

        function updateAnalogueParameters(obj)
        {
          var shrinkControl = document.getElementById("shrinkControl");
          var speedControl = document.getElementById('speedControl');
          var cooldownControl = document.getElementById("cooldownControl");

          var shrinkValue = document.getElementById("shrinkValue");
          var speedValue = document.getElementById('speedValue');
          var cooldownValue = document.getElementById("cooldownValue");

          if("parameters" in obj)
          {
              var parameters = obj["parameters"];
              manageParameterValues(speedValue, speedControl, parameters, 1, "speed");
              manageParameterValues(shrinkValue, shrinkControl, parameters, 0, "shrinkfactor");
              manageParameterValues(cooldownValue, cooldownControl, parameters, 1, "cooldown");
          }

        }

        function updateInspector(obj)
        {
            updateAnalogueParameters(obj);

            var type = obj["referenceClass"];

            designSpecialTypesParameters("ShootAvatar");

            //retrieveStypeOptions();
        }


