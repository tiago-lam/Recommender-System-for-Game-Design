function updateShrinkValue(val) {
          document.getElementById('shrinkValue').textContent=val; 
        }

        function updateSpeedValue(val) {
          document.getElementById('speedValue').textContent=val; 
        }

        function updateCooldownValue(val) {
          document.getElementById('cooldownValue').textContent=val; 
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
            parameters.forEach(function(map){
              if("speed" in map)
              {
                speedValue.value = map["speed"];
                speedValue.textContent = speedValue.value;
                speedControl.value = speedValue.value;
              }

              if("shrinkfactor" in map)
              {
                shrinkValue.value = map["shrinkfactor"];
                shrinkValue.textContent = shrinkValue.value;
                shrinkControl.value = shrinkValue.value;
              }

              if("cooldown" in map)
              {
                cooldownValue.value = map["cooldown"];
                cooldownValue.textContent = cooldownValue.value;
                cooldownControl.value = cooldownValue.value;
              }

            });
          }
        }

        function updateInspector(obj)
        {
          updateAnalogueParameters(obj);
        }