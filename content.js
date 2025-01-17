let isCommandPressed = false;

document.addEventListener("keydown", (event) => {
  if (event.key === "Meta") {
    isCommandPressed = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "Meta") {
    isCommandPressed = false;
  }
});

document.addEventListener("wheel", (event) => {
  if (isCommandPressed) {
    chrome.runtime.sendMessage({action: "zoom", delta: event.deltaY});
  }
});
