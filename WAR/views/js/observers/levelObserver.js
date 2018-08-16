// Select the node that will be observed for mutations
var targetNode;

// Options for the observer (which mutations to observe)
var config = { attributes: true, childList: true, subtree: true, attributeFilter:['src'] };

// Callback function to execute when mutations are observed
var callback = function(mutationsList) {
    for(var mutation of mutationsList) {
        // if (mutation.type == 'childList') {
        //     console.log('A child node has been added or removed.');
        // }
        if (mutation.type == 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
            saveLevelMapProcedure();
        }
    }
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

function startLevelObserver()
{
    // Start observing the target node for configured mutations
    targetNode = document.getElementById('gridTableId');
    observer.observe(targetNode, config);
}

function saveLevelMapProcedure()
{
    var map = saveLevelState();
    levelStates.count++;
    levelStates.levelMap.push(map);
}