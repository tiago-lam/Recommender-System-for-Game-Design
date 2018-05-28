        function updateShrinkValue(val) {
          document.getElementById('shrinkValue').textContent=val; 
        }

        function updateSpeedValue(val) {
          document.getElementById('speedValue').textContent=val; 
        }

        function updateCooldownValue(val) {
          document.getElementById('cooldownValue').textContent=val; 
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

        function updateDigitalParameters(obj)
        {
            var invisibleCheckBoxControl =  document.getElementById("invisibleCheckBoxId");
            var singletonCheckBoxControl =  document.getElementById("singletonCheckBoxId");
            var rotateCheckBoxControl =  document.getElementById("rotateCheckBoxId");

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
            console.log("obj");
            console.log(obj);

            updateAnalogueParameters(obj);

            updateDigitalParameters(obj)

            //var interval = setInterval(function(){
            //    obj.identifier = "oi";
            //    obj.parameters["speed"] = 1.45;
            //    if("orientation" in obj.parameters)
            //    {
            //        obj.parameters["orientation"] = "RIGHT";
            //    }
            //    else
            //    {
            //        console.log("else");
            //        obj.parameters["orientation"] = "UP";
            //    }
            //    updateAnalogueParameters(obj);
            //    console.log(obj);
            //     }, 2000);

            //clearInterval(interval);
            //
            //var type = obj["referenceClass"];
            //var parameters = obj.parameters;
            //
            //designSpecialTypesParameters(type, parameters);

            //retrieveStypeOptions();
        }

        function updateObject()
        {

        }