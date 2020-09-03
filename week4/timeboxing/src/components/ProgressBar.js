import React from "react";

function ProgressBar({className = "", percent = 50, trackRemaining = false}){
    if(trackRemaining){
        return <div className={"ProgressBarTrackRemaining " + className} style = {{"--passedTime": `${percent}%`}}></div>
    }else{
        return <div className={"DefaultProgressBar " + className} style = {{"--passedTime": `${percent}%`}}></div>

    }
    
}

export default ProgressBar;