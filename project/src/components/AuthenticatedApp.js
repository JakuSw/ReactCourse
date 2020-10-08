import React from 'react';
import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox"
import Header from "./Header";
import ErrorBoundary from "./ErrorBoundary";


function AuthenticatedApp({accessToken, onLogout}) {
    return (
        <>
            <Header accessToken={accessToken} onLogout={onLogout}/>
            <TimeboxList accessToken={accessToken}/>
            <ErrorBoundary message="Error in EditableTimebox">
                <EditableTimebox/>  
            </ErrorBoundary>
        </>
    )
    
}

export default AuthenticatedApp;