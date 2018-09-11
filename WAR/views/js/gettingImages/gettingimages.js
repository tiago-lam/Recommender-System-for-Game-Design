
    var frameXmlhttp = new XMLHttpRequest();

    /**
     * Function responsible for perform the GET response
     */
    frameXmlhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var img = document.getElementById('gameRunImg');
            img.src = "http://localhost:9001/images/frame" + this.responseText + ".png";
        }
    };

