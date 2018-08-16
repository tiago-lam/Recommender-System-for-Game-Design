// /**
//  * access the serve in order to get the mapping (symbol to idenifier) set of a game
//  * @type {XMLHttpRequest}
//  * */
// var xmlhttp = new XMLHttpRequest();
//
// /**
//  * The mapping obj
//  */
// var mappingObj;
//
// /**
//  * Function responsible for perform the GET response
//  */
// xmlhttp.onreadystatechange = function() {
//
//     if (this.readyState == 4 && this.status == 200) {
//
//         mappingObj = JSON.parse(this.responseText);
//         console.log("mapping", mappingObj);
//     }
// };
//
// /**
//  * Prepare and send the GET request to the server
//  */
// xmlhttp.open("GET", "http://localhost:9001/levelMapping", true);
// xmlhttp.send();