document.getElementById("enableAds").addEventListener("click", () => {
    chrome.storage.local.set({ adBlockerEnabled: false }, () => {
      // Notify the content script to restore ads dynamically
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: () => {
            // Restore ads on the page without reloading
            if (window.restoreAds) {
              window.restoreAds();
            }
          }
        });
      });
    });
  });
  
  document.getElementById("disableAds").addEventListener("click", () => {
    chrome.storage.local.set({ adBlockerEnabled: true }, () => {
      // Notify the content script to block ads dynamically
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: () => {
            // Block ads on the page without reloading
            if (window.blockAds) {
              window.blockAds();
            }
          }
        });
      });
    });
  });
  