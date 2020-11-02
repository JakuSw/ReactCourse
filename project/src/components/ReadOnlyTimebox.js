import React from "react";

class ReadOnlyTimebox extends React.Component {

    render(){
        if(this.props.totalTimeInMinutes <= 0) {
            throw new Error("Time can't be negative");
        }
        return (
            <div className="Timebox">
                <h3>{this.props.title} - {this.props.totalTimeInMinutes} min.</h3>
            </div>
        )}
}

export default ReadOnlyTimebox;