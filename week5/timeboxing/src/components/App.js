import React from "react";

import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox"
import Error from "./Error";

function App() {
    return (
        <div className="App">
            <Error message="Global error occured">
                <TimeboxList/>
                <Error message="Error in EditableTimebox">
                    <EditableTimebox/>  
                </Error>
            </Error>
        </div>
        
    )
}

export default App;