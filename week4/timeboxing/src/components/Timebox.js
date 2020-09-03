import React from "react";

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

export default Timebox;