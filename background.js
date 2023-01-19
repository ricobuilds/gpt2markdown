let manifest_version = chrome.runtime.getManifest().manifest_version;

const openCGPT = () => {
    chrome.tabs.create({ url: "https://chat.openai.com/chat" });
}

chrome.runtime.onInstalled.addListener(() => {
    openCGPT();
});

chrome.browserAction.onClicked.addListener(openCGPT)
