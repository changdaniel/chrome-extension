/*global chrome*/
import React from 'react';
import './paywall-banner.css'


function PaywallBanner(props) {

    function updateCurrentUrl() {

        var queryInfo = {
          active: true, 
          currentWindow: true
        };

        props.setBalance(props.balance - 25)
      
        chrome.tabs.query(queryInfo, function(tabs) {
          var tab = tabs[0]; 
          var url = tab.url;
          var myNewUrl = props.currentUrl.concat("&testparam=1")

          chrome.tabs.update(tab.id, {url: myNewUrl});
        });

      }

    return(

        <div class="row">
            <p> Would you like to read this article for $0.25?</p>
                <button onClick={updateCurrentUrl} class="buy-button">Yes</button>
                <a class="buy-button">No</a> 
        </div>
    )

}

export default PaywallBanner