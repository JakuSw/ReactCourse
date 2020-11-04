import React, {useState, useEffect, useContext} from "react";

import TimeboxCreator from "./TimeboxCreator";
import ErrorBoundary from "./ErrorBoundary";
import TimeboxesAPI from "../api/FetchTimeboxingApi"
import AuthenticationContext from "../contexts/AuthenticationContext";
import { TimeboxesList } from "./TimeboxesList";
import TimeboxEditor from "./TimeboxEditor";

export const Timebox = React.lazy(() => import("./Timebox"));
export const ReadOnlyTimebox = React.lazy(() => import("./ReadOnlyTimebox"));


function TimeboxesManager() {
    const [timeboxes, setTimeboxes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const { accessToken } = useContext(AuthenticationContext)

    useEffect(() => {
        TimeboxesAPI.getAllTimeboxes(accessToken).then(
            (timeboxes) => setTimeboxes(timeboxes)
        ).catch(
            (error) => setError(error)
        ).finally(
            () => setLoading(false)
        )
    },[])

    function addTimebox(timebox)  {
        TimeboxesAPI.addTimebox(timebox, accessToken).then(
            (addedTimebox) => setTimeboxes(prevState => {
                const timeboxes = [...prevState, addedTimebox];
                return timeboxes;
            })
        )
        
    }

    function removeTimebox(indexToRemove) {
        TimeboxesAPI.removeTimebox(timeboxes[indexToRemove],accessToken)
            .then(
                () => setTimeboxes(prevState => {
                    const timeboxes = prevState.filter((timebox, index) => index !== indexToRemove);
                    return timeboxes;
                })
            )   
    }

    function updateTimebox(indexToUpdate, timeboxToUpdate) {
        TimeboxesAPI.replaceTimebox(timeboxToUpdate, accessToken).then(
            (updatedTimebox) => setTimeboxes(prevState => {
                const timeboxes = prevState.map((timebox, index) => 
                    index === indexToUpdate ? updatedTimebox : timebox
                );
                return timeboxes;
            })
        )
        
    }

    function handleCreate(createdTimebox) {
        try {
            addTimebox(createdTimebox)
        } catch(error) {
            console.log("Error while creating TImebox", error);
        }
    }

    function renderTimebox(timebox, index){
        return(
            <>

            {editIndex === index ?
                <TimeboxEditor
                    initialTitle = {timebox.title}
                    initialTotalTimeInMinutes = {timebox.totalTimeInMinutes}
                    onCancel = {() => setEditIndex(null)}
                    onUpdate = {(updatedTimebox) => {
                        updateTimebox(index, { ...timebox, ...updatedTimebox})
                        setEditIndex(null)
                    }} 
                
                />
                :
                <React.Suspense fallback="...Loading">
                    <Timebox
                    key={timebox.id}
                    title={timebox.title}
                    totalTimeInMinutes={timebox.totalTimeInMinutes}
                    onDelete={() => removeTimebox(index)}
                    onEdit={() => setEditIndex(index)} 
                    />
                </React.Suspense>
            }
            </>
        )
    }

    function renderReadOnlyTimebox(timebox, index){
        return(
            <React.Suspense fallback="...Loading">
                <ReadOnlyTimebox
                key={timebox.id}
                title={timebox.title}
                totalTimeInMinutes={timebox.totalTimeInMinutes}
                />
            </React.Suspense>
        )
    }

    return (
        <>

            <TimeboxCreator onCreate={handleCreate}/>
            <ErrorBoundary message="Some error in timebox list">
            {loading ? "Loading" : null}
            {error ? "Something went wrong" : null}
            <TimeboxesList 
                timeboxes = {timeboxes}
                renderTimebox = {renderTimebox}
            />
            </ErrorBoundary>
            
        </>
    )
}

export default TimeboxesManager;

