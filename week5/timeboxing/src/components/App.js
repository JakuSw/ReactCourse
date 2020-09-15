import React from "react";

import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox"
import ErrorBoundary from "./ErrorBoundary";

function App() {
    return (
        <div className="App">
            <ErrorBoundary message="Global error occured">
                <TimeboxList/>
                <ErrorBoundary message="Error in EditableTimebox">
                    <EditableTimebox/>  
                </ErrorBoundary>
            </ErrorBoundary>
        </div>
        
    )
}

export default App;