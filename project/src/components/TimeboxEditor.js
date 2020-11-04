import React, { useRef } from "react";


function TimeboxEditor(props){
    const formInput = useRef();

    function handleSubmit(event){
        event.preventDefault(); 
        props.onUpdate({
            title: formInput.current[0].value, 
            totalTimeInMinutes: formInput.current[1].value});
        resetToInitialValues();
    }

    function handleCancel(){
        resetToInitialValues();
        props.onCancel();
    }

    function resetToInitialValues(){
        formInput.current[0].value = props.initialTitle;
        formInput.current[1].value = props.initialTotalTimeInMinutes;
    }
    return (
    <form onSubmit={handleSubmit} ref={formInput} className="TimeboxCreator">
        <label>What?
            <input 
                type="text"
                defaultValue={props.initialTitle}
            />
        </label><br/>
        <label>How long?
            <input 
                type="number"
                defaultValue={props.initialTotalTimeInMinutes}

            />
        </label><br/>
        <a onClick = {handleCancel}>Cancel</a>
        <button
        >Save changes</button>
    </form>
    )
    
}

export default TimeboxEditor;