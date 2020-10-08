import React from "react";

function TimeboxEditor(props) {
    const {
        title, 
        totalTimeInMinutes,
        isEditable,
        onTitleChange,
        onTotalTimeInMinutesChange,
        onConfirm
    } = props;
    return (
    <div className={`TimeboxEditor ${isEditable ? "" : "inactive"}`}>
        <label>What?
            <input 
                onChange = {onTitleChange}
                disabled = {!isEditable}
                value={title}
                type="text"
            />
        </label><br/>
        <label>How long?
            <input 
                onChange = {onTotalTimeInMinutesChange}
                disabled = {!isEditable}
                value={totalTimeInMinutes}
                type="number"
            />
        </label><br/>
        <button
            onClick = {onConfirm}
            disabled = {!isEditable}
        >Save changes</button>
    </div>
    )
}

export default TimeboxEditor;
