import React from "react";
import PropTypes from "prop-types";

function Clock({className, hours, minutes, seconds}){
    hours = addZeroWhenOneDigit(hoursValidation(hours));
    minutes = addZeroWhenOneDigit(minutesAndSecondsValidation(minutes));
    seconds = addZeroWhenOneDigit(minutesAndSecondsValidation(seconds));

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
        return numberToCheck;
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

Clock.defaultProps = {
    className:  "",
    hours: 0,
    minutes: 0,
    seconds: 0
}

const NumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

Clock.propTypes = {
    className: PropTypes.string,
    hours: NumberOrString.isRequired,
    minutes: NumberOrString.isRequired,
    seconds: NumberOrString.isRequired
}

export default Clock;