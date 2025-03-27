let trackedStructures = [];

// Load tracked structures from storage on startup
chrome.storage.local.get(["trackedStructures"], (data) => {
  if (data.trackedStructures) {
    trackedStructures = data.trackedStructures;
  }
});

// Listen for messages from the popup (for decay tracking, etc.)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  chrome.storage.local.get(["trackedStructures"], (data) => {
    let stored = data.trackedStructures || [];
    if (message.action === "trackDecay") {
      stored.push({ structure: message.structure, hp: message.hp });
    } else if (message.action === "removeDecay") {
      // Remove by structure name for reliability
      stored = stored.filter(item => item.structure !== message.structure);
    }
    chrome.storage.local.set({ trackedStructures: stored }, () => {
      sendResponse({ trackedStructures: stored });
    });
  });
  return true; // Indicate asynchronous response
});

// Create an alarm to update decay timers every minute
chrome.alarms.create("decayUpdate", { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "decayUpdate") {
    chrome.storage.local.get(["trackedStructures"], (data) => {
      let stored = data.trackedStructures || [];
      let updated = false;
      stored = stored.map(item => {
        if (item.hp > 0) {
          let newHp = Math.max(0, item.hp - 10);
          // 10-minute warning: HP falls below or equal to 100 (and above 90)
          if (newHp <= 100 && newHp > 90) {
            chrome.notifications.create({
              type: "basic",
              iconUrl: "icons/icon48.png",
              title: "Decay Warning",
              message: `${item.structure} is close to decaying! (≈ 10 minutes left)`
            });
          }
          // 5-minute warning: HP falls below or equal to 50 (and above 40)
          if (newHp <= 50 && newHp > 40) {
            chrome.notifications.create({
              type: "basic",
              iconUrl: "icons/icon48.png",
              title: "Decay Imminent",
              message: `${item.structure} will decay soon! (≈ 5 minutes left)`
            });
          }
          // Final notification when structure is fully decayed
          if (newHp === 0) {
            chrome.notifications.create({
              type: "basic",
              iconUrl: "icons/icon48.png",
              title: "Structure Decayed!",
              message: `${item.structure} has fully decayed.`
            });
          }
          updated = true;
          return { ...item, hp: newHp };
        }
        return item;
      });
      if (updated) {
        chrome.storage.local.set({ trackedStructures: stored });
        chrome.runtime.sendMessage({ action: "updateDecay", trackedStructures: stored });
      }
    });
  }
});

// Periodically fetch live server data (simulated integration)
function fetchServerData() {
  fetch("https://api.rustraidcalc.com/servers")
    .then(response => response.json())
    .then(data => {
      // Assume data has fields: serverSettings, leaderboard, raidAlerts
      chrome.runtime.sendMessage({ action: "updateServerData", serverData: data });
    })
    .catch(err => console.error("Error fetching server data:", err));
}

// Fetch server data every 5 minutes
setInterval(fetchServerData, 5 * 60 * 1000);
