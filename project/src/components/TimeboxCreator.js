import React, { useRef } from "react";


function TimeboxCreator(props){
    const formInput = useRef();

    function handleSubmit(event){
        event.preventDefault(); 
        props.onCreate({
            title: formInput.current[0].value, 
            totalTimeInMinutes: formInput.current[1].value});
        formInput.current[0].value = "";
        formInput.current[1].value = "";
    }

    return (
    <form onSubmit={handleSubmit} ref={formInput} className="TimeboxCreator">
        <label>What?
            <input 
                type="text"
            />
        </label><br/>
        <label>How long?
            <input 
                type="number"
            />
        </label><br/>
        <button
        >Add timebox</button>
    </form>
    )
    
}

export default TimeboxCreator;