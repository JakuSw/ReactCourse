import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import LoginForm from "./LoginForm";
import AuthenticationApi from "../api/FetchAuthenticationApi";
import AuthenticatedApp from "./AuthenticatedApp";

class App extends React.Component{
    state = {
        accessToken: null,
        previousLoginAttemptFailed: false
    }

    isUserLoggedIn(){
        return !!this.state.accessToken;
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
                        <AuthenticatedApp accessToken={this.state.accessToken} onLogout={this.handleLogout}/>

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