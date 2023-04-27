const openCGPT = () => {
    chrome.tabs.create({ url: "https://chat.openai.com/chat" });
};
chrome.runtime.onInstalled.addListener(() => {
    openCGPT();
});