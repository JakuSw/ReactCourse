import React from "react";

import TimeboxCreator from "./TimeboxCreator";
import Timebox from "./Timebox";
import Error from "./Error";

class TimeboxList extends React.Component{
    state = {
        timeboxes: [
            {id: "a",title: "Learning React", totalTimeInMinutes: 25},
            {id: "b",title: "Learning front end", totalTimeInMinutes: 5},
            {id: "c",title: "Learning is cool", totalTimeInMinutes: 15}
        ],
        hasError: false
    }



    addTimebox = (timebox) => {
        // throw new Error("Error while creating new Timebox");
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
        try {
            this.addTimebox(createdTimebox)
        } catch(error) {
            console.log("Error while creating TImebox", error);
        }
    }

    render() {
        return (
            <>
                <TimeboxCreator onCreate={this.handleCreate}/>
                <Error message="Some error in timebox list">
                {
                    this.state.timeboxes.map((timebox, index) => (
                        <Timebox 
                            key={timebox.id} 
                            title={timebox.title} 
                            totalTimeInMinutes={timebox.totalTimeInMinutes}
                            onDelete={() => this.removeTimebox(index)}
                            onEdit={(updatedTitle) => this.updateTimebox(index, {...timebox, title: `${updatedTitle}`})}
                            />
                ))}
                </Error>
            </>
        )
    }
}

export default TimeboxList;