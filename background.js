chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["content.js"],
    }).catch(err => console.error("error", err));
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "zoom") {
    chrome.tabs.getZoom(sender.tab.id, (currentZoom) => {
      const zoomChange = request.delta < 0 ? 0.05 : -0.05;
      chrome.tabs.setZoom(sender.tab.id, currentZoom + zoomChange);
    });
  }
});
  