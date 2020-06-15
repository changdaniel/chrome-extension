/*global chrome*/
import React from 'react';
import './paywall-banner.css'


function PaywallBanner(props) {

    function updateCurrentUrl() {

        var queryInfo = {
          active: true, 
          currentWindow: true
        };
      
        chrome.tabs.query(queryInfo, function(tabs) {
          var tab = tabs[0]; 
          var url = tab.url;
          var myNewUrl = props.currentUrl.concat("?testparam=1")

          chrome.tabs.update(tab.id, {url: myNewUrl});
        });


        props.setBalance(props.balance - 25)
        props.setPaid(true)

      }

    return(

        <div class="row">
            <p> Would you like to read this article from joincobble.com for $0.25?</p>
                <button onClick={updateCurrentUrl} class="buy-button">Yes</button>
                <a class="buy-button">No</a> 
        </div>
    )

}

export default PaywallBanner