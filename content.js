// List of common ad elements to block
const adSelectors = [
    "iframe[src*='ads']",
    "div[class*='ad']",
    "div[id*='ad']",
    "img[src*='ad']",
    "div[class*='banner']",
    "div[id*='banner']",
    "div[class*='sponsor']"
  ];
  
  let blockedAds = [];
  
  // Function to block ads
  function blockAds() {
    adSelectors.forEach(selector => {
      const ads = document.querySelectorAll(selector);
      ads.forEach(ad => {
        // Store the ad in the blockedAds array for later restoration
        if (!blockedAds.includes(ad)) {
          blockedAds.push(ad);
          ad.style.display = 'none';  // Hide the ad
        }
      });
    });
  }
  
  // Function to restore ads
  function restoreAds() {
    blockedAds.forEach(ad => {
      if (ad && ad.style.display === 'none') {
        ad.style.display = '';  // Restore the ad visibility
      }
    });
  }
  
  // Check if the ad blocker is enabled and run the appropriate function
  chrome.storage.local.get("adBlockerEnabled", (data) => {
    if (data.adBlockerEnabled) {
      // Block ads on page load and whenever new ads are added
      window.addEventListener("load", blockAds);
      const observer = new MutationObserver(blockAds); // Watch for new ads being added
      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      restoreAds();  // Restore ads if ad blocker is disabled
    }
  });
  