import React from "react";

import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox"
import ErrorBoundary from "./ErrorBoundary";
import LoginForm from "./LoginForm";
import AuthenticationApi from "../api/FetchAuthenticationApi";
import jwt from "jsonwebtoken";

class App extends React.Component{
    state = {
        accessToken: null,
        previousLoginAttemptFailed: false
    }

    isUserLoggedIn(){
        return !!this.state.accessToken;
    }

    getUserEmail(){
        const decodedToken = jwt.decode(this.state.accessToken);
        return decodedToken.email;
    }

    handleLoginAttempt = (credentials) => {
        AuthenticationApi.login(credentials)
            .then(({accessToken}) => {
                this.setState({
                    accessToken,
                    previousLoginAttemptFailed:false
                })
            })
            .catch(() => {
                this.setState({
                    previousLoginAttemptFailed:true
                })
            })
    }

    handleLogout = () => {
        this.setState({
            accessToken: null,
            previousLoginAttemptFailed:false
        })
    }

    render() {
        return (
            <div className="App">
                <ErrorBoundary message="Global error occured">
                {
                    this.isUserLoggedIn() ? 
                    <>
                        <header className="header">
                            Hello {this.getUserEmail()}
                            <a onClick={this.handleLogout} className="header__logout-link" href="#">Logout</a>
                        </header>
                        <TimeboxList/>
                        <ErrorBoundary message="Error in EditableTimebox">
                            <EditableTimebox/>  
                        </ErrorBoundary>

                    </> :
                    <LoginForm 
                        errorMessage={this.state.previousLoginAttemptFailed ? "Fail to login" : null}
                        onLoginAttempt={this.handleLoginAttempt}
                    />
                }
                </ErrorBoundary>
            </div>
        )
    }
    
}

export default App;