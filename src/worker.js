chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "zoom") {
    chrome.tabs.getZoom(sender.tab.id, (currentZoom) => {
      let zoom = request.zoom === 0
          ? 1
          : Math.max(Math.min(request.zoom + currentZoom, 5), 0.25);
      if (zoom !== currentZoom) {
        chrome.tabs.setZoom(sender.tab.id, zoom);
      }
    });
  }
});
