import React from "react";

function ProgressBar({className = "", percent = 50, trackRemaining = false}){
    if(trackRemaining){
        return <div className={"ProgressBar ProgressBar--TrackRemaining" + className} style = {{"--passedTime": `${percent}%`}}></div>
    }else{
        return <div className={"ProgressBar ProgressBar--green" + className} style = {{"--passedTime": `${percent}%`}}></div>

    }
    
}

export default ProgressBar;