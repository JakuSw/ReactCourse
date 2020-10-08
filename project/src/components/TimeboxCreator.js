import React from "react";


class TimeboxCreator extends React.Component {
    constructor(props) {
        super(props);
        this.formInput = React.createRef();
    }

    handleSubmit = (event) => {
        event.preventDefault(); 
        this.props.onCreate({
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

export default TimeboxCreator;