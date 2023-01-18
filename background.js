let manifest_version = chrome.runtime.getManifest().manifest_version;

const openCGPT = () => {
    chrome.tabs.create({ url: "https://chat.openai.com/chat" });
}

chrome.runtime.onInstalled.addListener(() => {
    openCGPT();
});

// open chatgpt webpage when extension icon is clicked
manifest_version == 2 ?
    chrome.browserAction.onClicked.addListener(openCGPT)
    :
    chrome.action.onClicked.addListener(openCGPT);
