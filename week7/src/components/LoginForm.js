import React from "react";


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.formInput = React.createRef();
    }

    handleSubmit = (event) => {
        event.preventDefault(); 
        this.props.onLoginAttempt({
            email: this.formInput.current[0].value, 
            password: this.formInput.current[1].value});
        this.formInput.current[0].value = "";
        this.formInput.current[1].value = "";
    }

    render() {
        return (
        <form onSubmit={this.handleSubmit} ref={this.formInput} className="LoginForm">
        {
            this.props.errorMessage ? 
            <div className="LoginForm__error-message">{this.props.errorMessage}</div>
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
}

export default LoginForm;