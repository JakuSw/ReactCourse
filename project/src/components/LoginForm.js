import React, { useRef } from "react";


function LoginForm(props){

    const formInput = useRef();

    function handleSubmit(event){
        event.preventDefault(); 
        props.onLoginAttempt({
            email: formInput.current[0].value, 
            password: formInput.current[1].value});
        formInput.current[0].value = "";
        formInput.current[1].value = "";
    }


    return (
    <form onSubmit={handleSubmit} ref={formInput} className="LoginForm">
    {
        props.errorMessage ? 
        <div className="LoginForm__error-message">{props.errorMessage}</div>
        :
        null
    }
        <label>Email
            <input 
                type="text"
                defaultValue="ola@mail.pl"
            />
        </label><br/>
        <label>Password
            <input 
                type="password"
                defaultValue="asdfgh"
            />
        </label><br/>
        <button
        >Login</button>
    </form>
    )
    
}

export default LoginForm;