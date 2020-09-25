/*global chrome*/
import React from 'react';
import '../styles/PaywallBanner.scss'

export default function(props) {

    function updateCurrentUrl() {

        var queryInfo = {
          active: true, 
          currentWindow: true
        };
      
        chrome.tabs.query(queryInfo, function(tabs) {
          var tab = tabs[0]; 
          var url = tab.url;
          var myNewUrl = props.currentUrl.concat("news?token=1a07ca66-14f8-4e6b-ac50-6db9779cc2b2")

          chrome.tabs.update(tab.id, {url: myNewUrl});
        });

        props.setBalance(props.balance - 25)
        props.setPaid(true)

      }

    return(
        <div className="row">
            <p style ={{color:"white"}}> Would you like to read this article from joincobble.com for $0.25?</p>
            <button onClick={updateCurrentUrl} class="buy-button">Yes</button>
            <a class="buy-button">No</a> 
        </div>
    )

}

