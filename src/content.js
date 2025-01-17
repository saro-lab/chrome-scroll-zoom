let zoom = {
  get active() {
    return (zoom.keyTime + 500) > new Date().getTime();
  },
  key: "Meta",
  keyTime: 0,
  unit: 0.05,
  useScroll: true,
  useReset: true,
};

document.addEventListener("keypress", (event) => {
  if (event.key === zoom.eventKey) {
    zoom.keyTime = new Date().getTime();
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === zoom.eventKey) {
    zoom.keyTime = 0;
  }
});

document.addEventListener("wheel", (event) => {
  if (zoom.active && zoom.useScroll) {
    chrome.runtime.sendMessage({action: "zoom", zoom: event.deltaY > 0 ? -zoom.unit : zoom.unit});
  }
});

window.addEventListener('mousedown', (event) => {
  if (zoom.active && zoom.useReset && event.button === 1) {
    try { event.preventDefault(); } catch (e) {}
    chrome.runtime.sendMessage({action: "zoom", zoom: 0});
  }
});
