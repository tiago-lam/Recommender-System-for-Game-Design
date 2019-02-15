// Select the node that will be observed for mutations
var spriteListTarget;

// Options for the observer (which mutations to observe)
var configSpriteListTarget = {
    attributes: true,
    childList: true,
    subtree: true,
    attributeFilter:['src']
};

// Callback function to execute when mutations are observed
var listCallback = function(mutationSpriteList) {
    for(var mutation of mutationSpriteList) {
        // if (mutation.type == 'childList') {
        //     console.log('A child node has been added or removed.');
        // }
        if (mutation.type == 'childList') {
            alert("Hey");
        }
    }
};

// Create an observer instance linked to the callback function
var observerSpriteList = new MutationObserver(listCallback);

function startSpriteListObserver()
{
    // Start observing the target node for configured mutations
    spriteListTarget = document.getElementById('spriteList');
    observerSpriteList.observe(spriteListTarget, configSpriteListTarget);
}