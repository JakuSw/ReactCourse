import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App"

const rootElement = document.getElementById("root");
const element = (<div> 
    <App />
    </div>);

ReactDOM.render(element, rootElement);
