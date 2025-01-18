let zoom = {
  active: false,
  eventKey: "Meta",
  unit: 0.05,
  direction: 1,
  useScroll: true,
  useReset: true,
};

// activate
document.addEventListener("keydown", (event) => zoom.active = (event.key === zoom.eventKey));

// deactivate
document.addEventListener("keyup", (event) => zoom.active = false);
document.addEventListener("blur", (event) => zoom.active = false);

// zoom in/out
document.addEventListener("wheel", (event) => {
  if (zoom.active && zoom.useScroll) {
    chrome.runtime.sendMessage({action: "zoom", zoom: (event.deltaY < 0 ? -zoom.unit : zoom.unit) * zoom.direction});
  }
});

// reset zoom
window.addEventListener('mousedown', (event) => {
  if (zoom.active && zoom.useReset && event.button === 1) {
    try { event.preventDefault(); } catch (e) {}
    chrome.runtime.sendMessage({action: "zoom", zoom: 0});
  }
});
