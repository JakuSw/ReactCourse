import { v4 as uuidv4 } from "uuid";


const timeboxes = [
    {id: "a",title: "Learning React", totalTimeInMinutes: 25},
    {id: "b",title: "Learning front end", totalTimeInMinutes: 5},
    {id: "c",title: "Learning is cool", totalTimeInMinutes: 15}
]
function findIndexByAnId(id) {
    const result = timeboxes.findIndex((timebox) => timebox.id === id);
    if(result < 0){
        throw new Error("Cannot find timebox with this id!");
    }
    return result;

}
const FakeTimeboxesAPI = {
    getAllTimeboxes: async function()  {
        await wait(1000);
        return [...timeboxes];
    },
    addTimebox: async function (timeboxToAdd) {
        await wait(1000);
        const addedTimebox = {...timeboxToAdd, id: uuidv4()}
        timeboxes.push(addedTimebox);
        return addedTimebox;
    },
    replaceTimebox: async function (timeboxToReplace) {
        if(!timeboxToReplace.id){
            throw new Error("Cannot replace timebox without an id!")
        }
        const index = findIndexByAnId(timeboxToReplace.id);
        const replacedTimebox = {...timeboxToReplace};
        timeboxes[index] = replacedTimebox; 
        return replacedTimebox;
    },
    removeTimebox: async function (timeboxToRemove){
        if(!timeboxToRemove.id){
            throw new Error("Cannot remove timebox without an id!")
        }
        const index = findIndexByAnId(timeboxToRemove.id);
        timeboxes.splice(index, 1);

    }
}
function wait(ms=1000){
    return new Promise(
        (resolve) => {
            setTimeout(resolve, ms);
        }
    )
}
export default FakeTimeboxesAPI;