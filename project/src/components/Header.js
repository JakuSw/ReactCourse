import React from 'react';
import UserGreeting from "./UserGreeting";

function Header({accessToken, onLogout}) {
    return (
        <header className="header">
            <UserGreeting accessToken={accessToken} />         
            <a onClick={onLogout} className="header__logout-link" href="#">Logout</a>
        </header>
    )
}

export default Header;