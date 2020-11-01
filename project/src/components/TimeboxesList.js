import React from "react";
import { Timebox } from "./TimeboxesManager";

export function TimeboxesList({ timeboxes, onTimeboxDelete, onTimeboxEdit }) {
    return timeboxes.map((timebox, index) => (
        <React.Suspense fallback="...Loading">
            <Timebox
                key={timebox.id}
                title={timebox.title}
                totalTimeInMinutes={timebox.totalTimeInMinutes}
                onDelete={() => onTimeboxDelete(index)}
                onEdit={(updatedTitle) => onTimeboxEdit(index, { ...timebox, title: `${updatedTitle}` })} />
        </React.Suspense>
    ));
}
