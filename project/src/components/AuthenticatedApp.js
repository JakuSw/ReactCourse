import React from 'react';
import TimeboxesManager from "./TimeboxesManager";
import CurrentTimebox from "./CurrentTimebox";
import Header from "./Header";
import ErrorBoundary from "./ErrorBoundary";
import InspirationalQuote from './InspirationalQuote';


function AuthenticatedApp({accessToken, onLogout}) {
    return (
        <>
            <Header onLogout={onLogout}/>
            <TimeboxesManager />
            <CurrentTimebox 
                    title={"Learning React"} 
                    totalTimeInMinutes={20}
                />
            {/* <ErrorBoundary message="Error in EditableTimebox">
                <EditableCurrentTimebox/>  
            </ErrorBoundary> */}
            <InspirationalQuote/>
        </>
    )
    
}

export default AuthenticatedApp;