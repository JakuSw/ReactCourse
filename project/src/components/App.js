import React, {useState} from "react";
import ErrorBoundary from "./ErrorBoundary";
import LoginForm from "./LoginForm";
import AuthenticationApi from "../api/FetchAuthenticationApi";
import AuthenticationContext from "../contexts/AuthenticationContext";
const AuthenticatedApp = React.lazy(() => import("./AuthenticatedApp"));

function App(){
    const [accessToken, setAccessToken] = useState(null);
    const [previousLoginAttemptFailed, setpreviousLoginAttemptFailed] = useState(false);


    function isUserLoggedIn() {
        return !!accessToken;
    }

    function handleLoginAttempt(credentials) {
        AuthenticationApi.login(credentials)
            .then(({accessToken}) => {
                setAccessToken(accessToken);
                setpreviousLoginAttemptFailed(false)
                
            })
            .catch(() => {
                setpreviousLoginAttemptFailed(true)

            })
    }

    function handleLogout() {
        setAccessToken(null);
        setpreviousLoginAttemptFailed(false)
    }


    return (
        <div className="App">
            <ErrorBoundary message="Global error occured">
            {
                isUserLoggedIn() ? 
                <AuthenticationContext.Provider value={{accessToken:accessToken}}>
                {
                    <React.Suspense fallback="...Loading">
                        <AuthenticatedApp onLogout={handleLogout}/>
                    </React.Suspense>
                }
                </AuthenticationContext.Provider> :
                <LoginForm 
                    errorMessage={previousLoginAttemptFailed ? "Fail to login" : null}
                    onLoginAttempt={handleLoginAttempt}
                />
            }
            </ErrorBoundary>
        </div>
    )
    
    
}

export default App;