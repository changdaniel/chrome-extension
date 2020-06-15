/*global chrome*/

export default function getCurrentTabUrl(callback) {

    var queryInfo = {
      active: true, 
      currentWindow: true
    };
  
    chrome.tabs.query(queryInfo, function(tabs) {
      var tab = tabs[0]; 
      var url = tab.url;
      callback(url);
    });
  }
  
//   function getCurrentTabContent(callback) {
  
//     //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
//     chrome.tabs.executeScript({
//         code: 'document.getElementById("pebbl-tag").innerText;'
//     }, (result) => { 
//         callback(result);
//     });
//   }

  