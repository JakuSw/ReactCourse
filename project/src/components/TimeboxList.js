import React, {useState, useEffect, useContext} from "react";

import TimeboxCreator from "./TimeboxCreator";
import ErrorBoundary from "./ErrorBoundary";
import TimeboxesAPI from "../api/FetchTimeboxingApi"
import AuthenticationContext from "../contexts/AuthenticationContext";

const Timebox = React.lazy(() => import("./Timebox"));


function TimeboxList() {
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
    })

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
            {
                timeboxes.map((timebox, index) => (
                    <React.Suspense fallback="...Loading">
                        <Timebox 
                            key={timebox.id} 
                            title={timebox.title} 
                            totalTimeInMinutes={timebox.totalTimeInMinutes}
                            onDelete={() => removeTimebox(index)}
                            onEdit={(updatedTitle) => updateTimebox(index, {...timebox, title: `${updatedTitle}`})}
                            />
                    </React.Suspense>
            ))}
            </ErrorBoundary>
            
        </>
    )
}

export default TimeboxList;