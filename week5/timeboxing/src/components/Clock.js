import React from "react";

function Clock({className = "", hours, minutes, seconds}){
    hours = hoursValidation(hours);
    minutes = minutesAndSecondsValidation(minutes);
    seconds = minutesAndSecondsValidation(seconds);

    hours = addZeroWhenOneDigit(hours);
    minutes = addZeroWhenOneDigit(minutes);
    seconds = addZeroWhenOneDigit(seconds);

    return <h2 className={"Clock " + className}>Time left 
        <span className="Clock__Hours"> {hours}</span>
        <span className="Clock__Separator">:</span>
        <span className="Clock__Minutes">{minutes}</span>
        <span className="Clock__Separator">:</span>
        <span className="Clock__Seconds">{seconds}</span></h2>
}

function addZeroWhenOneDigit(numberToCheck){
    if(numberToCheck.toString().length === 1){
        return `0${numberToCheck.toString()}`
    }else {
        return numberToCheck.toString();
    }
}

function hoursValidation(numberToCheck){
    if(numberToCheck < 0){
        return 0;
    }else if(numberToCheck > 23){
        return 23;
    }else{
        return numberToCheck;
    }
}

function minutesAndSecondsValidation(numberToCheck){
    if(numberToCheck < 0){
        return 0;
    }else if(numberToCheck > 59){
        return 59;
    }else{
        return numberToCheck;
    }
}

export default Clock;