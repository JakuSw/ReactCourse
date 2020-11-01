import React, {useState, useEffect, useContext} from "react";

import TimeboxCreator from "./TimeboxCreator";
import ErrorBoundary from "./ErrorBoundary";
import TimeboxesAPI from "../api/FetchTimeboxingApi"
import AuthenticationContext from "../contexts/AuthenticationContext";
import { TimeboxesList } from "./TimeboxesList";

export const Timebox = React.lazy(() => import("./Timebox"));


function TimeboxesManager() {
    const [timeboxes, setTimeboxes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    return (
        <>

            <TimeboxCreator onCreate={handleCreate}/>
            <ErrorBoundary message="Some error in timebox list">
            {loading ? "Loading" : null}
            {error ? "Something went wrong" : null}
            <TimeboxesList 
                timeboxes = {timeboxes}
                onTimeboxDelete = {removeTimebox}
                onTimeboxEdit = {updateTimebox}

            />
            </ErrorBoundary>
            
        </>
    )
}

export default TimeboxesManager;

