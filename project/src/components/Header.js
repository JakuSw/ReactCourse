import React from 'react';
import UserGreeting from "./UserGreeting";

function Header({onLogout}) {
    return (
        <header className="header">
            <UserGreeting />         
            <a onClick={onLogout} className="header__logout-link" href="#">Logout</a>
        </header>
    )
}

export default Header;