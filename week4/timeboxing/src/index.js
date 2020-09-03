import React from "react";
import ReactDOM from "react-dom";
import { v4 as uuidv4 } from "uuid";

function Clock({className = "", hours, minutes, seconds}){
    hours = hoursValidation(hours);
    minutes = minutesAndSecondsValidation(minutes);
    seconds = minutesAndSecondsValidation(seconds);

    hours = addZeroWhenOneDigit(hours);
    minutes = addZeroWhenOneDigit(minutes);
    seconds = addZeroWhenOneDigit(seconds);

    return <h2 className={"Clock " + className}>Time left {hours}:{minutes}:{seconds}</h2>
}

function ProgressBar({className = "", percent = 50, trackRemaining = false}){
    if(trackRemaining){
        return <div className={"ProgressBarTrackRemaining " + className} style = {{"--passedTime": `${percent}%`}}></div>
    }else{
        return <div className={"DefaultProgressBar " + className} style = {{"--passedTime": `${percent}%`}}></div>

    }
    
}

class CurrentTimebox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        }
        this.handleStart = this.handleStart.bind(this)
        this.handleStop = this.handleStop.bind(this)
        this.togglePause = this.togglePause.bind(this)
    }

    startTimer(){
        this.intervalId = window.setInterval(
            () => {
                this.setState(
                    (prevState) => ({ elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1 })
                )
            
            },
            100
        );
    }

    stopTimer(){
        window.clearInterval(this.intervalId);
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
            <ProgressBar percent={progressInPercent} className={isPaused ? "inactive" : ""} trackRemaining = {true}/>
            <button onClick = {onEdit} disabled = {isEditable}>Edit</button>
            <button onClick = {this.handleStart} disabled = {isRunning}>Start</button>
            <button onClick = {this.handleStop} disabled = {!isRunning}>Stop</button>
            <button onClick = {this.togglePause} disabled = {!isRunning}>{isPaused ? "Continue" : "Pause"}</button>
            Breaks: {pausesCount}
        </div>
    )}
}

function TimeboxEditor(props) {
    const {
        title, 
        totalTimeInMinutes,
        isEditable,
        onTitleChange,
        onTotalTimeInMinutesChange,
        onConfirm
    } = props;
    return (
    <div className={`TimeboxEditor ${isEditable ? "" : "inactive"}`}>
        <label>What?
            <input 
                onChange = {onTitleChange}
                disabled = {!isEditable}
                value={title}
                type="text"
            />
        </label><br/>
        <label>How long?
            <input 
                onChange = {onTotalTimeInMinutesChange}
                disabled = {!isEditable}
                value={totalTimeInMinutes}
                type="number"
            />
        </label><br/>
        <button
            onClick = {onConfirm}
            disabled = {!isEditable}
        >Save changes</button>
    </div>
    )
}

class TimeboxCreator extends React.Component {
    constructor(props) {
        super(props);
        this.formInput = React.createRef();
    }

    handleSubmit = (event) => {
        event.preventDefault(); 
        this.props.onCreate({
            id: uuidv4(), 
            title: this.formInput.current[0].value, 
            totalTimeInMinutes: this.formInput.current[1].value});
        this.formInput.current[0].value = "";
        this.formInput.current[1].value = "";
    }

    render() {
        return (
        <form onSubmit={this.handleSubmit} ref={this.formInput} className="TimeboxCreator">
            <label>What?
                <input 
                    type="text"
                />
            </label><br/>
            <label>How long?
                <input 
                    type="number"
                />
            </label><br/>
            <button
            >Add timebox</button>
        </form>
        )
    }
}

class TimeboxList extends React.Component{
    state = {
        timeboxes: [
            {id: "a",title: "Learning React", totalTimeInMinutes: 25},
            {id: "b",title: "Learning front end", totalTimeInMinutes: 5},
            {id: "c",title: "Learning is cool", totalTimeInMinutes: 15}
        ]
    }

    addTimebox = (timebox) => {
        this.setState(prevState => {
            const timeboxes = [timebox, ...prevState.timeboxes];
            return {timeboxes};
        })
    }

    removeTimebox = (indexToRemove) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
            return {timeboxes};
        })
    }

    updateTimebox = (indexToUpdate, updatedTimebox) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.map((timebox, index) => 
                index === indexToUpdate ? updatedTimebox : timebox
            );
            return {timeboxes};
        })
    }

    handleCreate = (createdTimebox) => {
        this.addTimebox(createdTimebox)
    }

    render() {
        return (
            <>
                <TimeboxCreator onCreate={this.handleCreate}/>
                {this.state.timeboxes.map((timebox, index) => (
                    <Timebox 
                        key={timebox.id} 
                        title={timebox.title} 
                        totalTimeInMinutes={timebox.totalTimeInMinutes}
                        onDelete={() => this.removeTimebox(index)}
                        onEdit={(updatedTitle) => this.updateTimebox(index, {...timebox, title: `${updatedTitle}`})}
                        />
                ))}
            </>
        )
    }
}

class EditableTimebox extends React.Component{
    state = {
        title: "Learning React",
        totalTimeInMinutes: 20,
        isEditable: true
    }

    handleTitleChange = (event) => {
        this.setState({title: event.target.value});
    }

    handleTotalTimeInMinutesChange = (event) => {
        this.setState({totalTimeInMinutes: event.target.value});
    }

    handleConfirm = () => {
        this.setState({isEditable: false});
    }

    handleEdit = () => {
        this.setState({isEditable: true});
    }

    render(){
        const {title, totalTimeInMinutes, isEditable} = this.state
        return(
            <>
                <TimeboxEditor
                    title = {title}
                    totalTimeInMinutes = {totalTimeInMinutes}
                    isEditable = {isEditable}
                    onConfirm = {this.handleConfirm}
                    onTitleChange = {this.handleTitleChange}
                    onTotalTimeInMinutesChange = {this.handleTotalTimeInMinutesChange}
                />
                <CurrentTimebox 
                    isEditable = {isEditable}
                    title={title} 
                    totalTimeInMinutes={totalTimeInMinutes}
                    onEdit = {this.handleEdit}
                />
            </>
        )
    }
}


class TimeboxUpdate extends React.Component{
    constructor(props) {
        super(props);
        this.titleInput = React.createRef();
    }
    render(){    
        return(
            <>
                <input ref={this.titleInput}/>
                <button onClick={()=>{this.props.onSave(this.titleInput.current.value)}}>Save</button>
            </>
        )}
}

class Timebox extends React.Component {
    state = {
        isUpdating: false
    }

    handleEditEnable = (event) => {
        event.preventDefault(); 
        this.setState({isUpdating: !this.state.isUpdating})
    }

    render(){
        return (
            <div className="Timebox">
                <h3>{this.props.title} - {this.props.totalTimeInMinutes} min.</h3>
                <button onClick={this.props.onDelete}>Delete</button>
                <button onClick={this.handleEditEnable}>Edit</button>
                {this.state.isUpdating ? <TimeboxUpdate 
                    onSave={this.props.onEdit}
                    /> : null}
            </div>
        )}
}

function App() {
    return (
        <div className="App">
            <TimeboxList/>
            <EditableTimebox/>
        </div>
        
    )
}

function addZeroWhenOneDigit(numberToCheck){
    if(numberToCheck.toString().length === 1){
        return `0${numberToCheck.toString()}`
    }else {
        return numberToCheck.toString();
    }
}

function addZerosForMiliseconds(numberToCheck){
    if(numberToCheck.toString().length === 1){
        return `00${numberToCheck.toString()}`
    }else if(numberToCheck.toString().length === 2){
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

function milisecondsValidation(numberToCheck){
    if(numberToCheck < 0){
        return 0;
    }else if(numberToCheck > 999){
        return 999;
    }else{
        return numberToCheck;
    }
}

const rootElement = document.getElementById("root");
const element = (<div> 
    <App />
    </div>);

ReactDOM.render(element, rootElement);
