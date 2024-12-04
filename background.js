chrome.runtime.onInstalled.addListener(() => {
    console.log("Ad Disabler Extension Installed!");
    
    // Initialize the ad blocker state (enabled by default)
    chrome.storage.local.set({ adBlockerEnabled: true });
  });
  