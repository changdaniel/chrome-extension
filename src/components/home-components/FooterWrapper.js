import React from 'react';

export default function (props){
    
    return (
        <div style={{width:"100%", paddingLeft:"20px", paddingRight:"20px"}}>
            <div style={{float:"left"}}>{props.left}</div>
            <div style={{float:"right"}}>{props.right}</div>
            <div style={{margin:"0 auto", textAlign: "center"}}>{props.center}</div>
        </div>
    )
}

