import React from "react";

import Clock from "./Clock";
import ProgressBar from "./ProgressBar";

class CurrentTimebox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        }
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.togglePause = this.togglePause.bind(this);
        this.intervalId = null;
    }
    
    componentDidMount(){
        console.count("componentDidMount");
    }

    componentDidUpdate(){
        console.count("componentDidUpdate");
    }

    componentWillUnmount(){
        console.count("componentWillUnmount");
        this.stopTimer();
    }

    startTimer(){
        if(this.intervalId === null){
            this.intervalId = window.setInterval(
                () => {
                    this.setState(
                        (prevState) => ({ elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1 })
                    )
                
                },
                100
            );
        }
    }

    stopTimer(){
        window.clearInterval(this.intervalId);
        this.intervalId = null;
    }

    handleStart(event){
        this.setState({
            isRunning: true
        });
        this.startTimer();
    }

    handleStop(event){
        this.setState({
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        });
        this.stopTimer();
    }

    togglePause(){
        this.setState(
            function(prevState) {
                const isPaused = !prevState.isPaused;
                if(isPaused){
                    this.stopTimer();
                }else{
                    this.startTimer();
                }
                return {
                    isPaused,
                    pausesCount: isPaused ? prevState.pausesCount + 1 : prevState.pausesCount
                }
            }
        );
    }

    render() {
        const {isRunning, isPaused, pausesCount, elapsedTimeInSeconds} = this.state;
        const {title, totalTimeInMinutes, isEditable, onEdit} = this.props
        const totalTimeInSeconds = totalTimeInMinutes * 60;
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
        const secondsLeft = Math.floor(timeLeftInSeconds%60);
        const minutesLeft = Math.floor(timeLeftInSeconds/60);
        const hoursLeft = Math.floor(timeLeftInSeconds/3600);
        const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;

        return (
        <div className={`CurrentTimebox ${isEditable ? "inactive" : ""}`}>
            <h1>{title}</h1>
            <Clock className={isPaused ? "inactive" : ""} hours={hoursLeft} minutes={minutesLeft} seconds={secondsLeft}  /> 
            <ProgressBar 
                percent={progressInPercent} 
                className={isPaused ? "inactive" : ""}
                color = "red"
                big
                trackRemaining = {false}/>
            <button onClick = {onEdit} disabled = {isEditable}>Edit</button>
            <button onClick = {this.handleStart} disabled = {isRunning}>Start</button>
            <button onClick = {this.handleStop} disabled = {!isRunning}>Stop</button>
            <button onClick = {this.togglePause} disabled = {!isRunning}>{isPaused ? "Continue" : "Pause"}</button>
            Breaks: {pausesCount}
        </div>
    )}
}

export default CurrentTimebox;