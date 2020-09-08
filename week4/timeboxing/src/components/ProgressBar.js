import React from "react";
import classNames from "classnames";

function ProgressBar({className = "", percent = 50, trackRemaining = false, big = false, color = null}){
    let progressClassName = classNames(
        "ProgressBar",
        className,
        {
            "ProgressBar--big": big,
            "ProgressBar--color-red": color === "red",
            "ProgressBar--color-green": color === "green",
            "ProgressBar--TrackRemaining": trackRemaining
        }
    );
    
    return <div className={progressClassName} style = {{"--passedTime": `${percent}%`}}></div>
}

export default ProgressBar;