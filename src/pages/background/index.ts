// console.log("background script loaded");
// @ts-ignore
// chrome.sidePanel
//     .setPanelBehavior({ openPanelOnActionClick: true })
//     .catch((error: any) => console.error(error));

// In your background script
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.executeScript(
    tab.id,
    { file: "contentScript.js" },
    (response) => {
      // Handle the data here
      // console.log("background", response);
    }
  );
});
