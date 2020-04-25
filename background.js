chrome.runtime.onInstalled.addListener(function() {

    fetch('http://localhost:5000/get-balance').then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });

});


  chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
  
      
  
    }
  })