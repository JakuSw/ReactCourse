import React from 'react';
import TimeboxesManager from "./TimeboxesManager";
import EditableTimebox from "./EditableTimebox"
import Header from "./Header";
import ErrorBoundary from "./ErrorBoundary";
import InspirationalQuote from './InspirationalQuote';


function AuthenticatedApp({accessToken, onLogout}) {
    return (
        <>
            <Header onLogout={onLogout}/>
            <TimeboxesManager />
            <ErrorBoundary message="Error in EditableTimebox">
                <EditableTimebox/>  
            </ErrorBoundary>
            <InspirationalQuote/>
        </>
    )
    
}

export default AuthenticatedApp;