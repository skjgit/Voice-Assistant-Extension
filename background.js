// background.js

chrome.commands.onCommand.addListener(function(command) {
    if (command === "openSavedPosts") {
        // Send a message to the active tab to trigger the action in content script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "openSavedPosts"}, function(response) {
                console.log("Message sent to content script");
            });
        });
    }
});
