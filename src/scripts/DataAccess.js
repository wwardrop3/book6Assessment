//purpose of this module is to fetch json database and return data in js readable format
//export data to other modules


const applicationState = {
    authors: [],
    topics: [],
    recipients: [],
    messages: []
}

//navigate to the api directory in terminal before hosting the json server
const API = "http://localhost:8088"

//define a function that extracts authors data from main database and saves to variable and export


//define a function that fetches the json database of arrays
export const fetchRequests = () => {
    return fetch (`${API}`)
    .then(response => response.json())
    .then(
        (serviceRequests) => {
            applicationState.authors = serviceRequests
            console.log(applicationState)
        }
    )
}

//define a function that extracts recipients data from main database and saves to variable and export



//define a function that extracts topics data from main database and saves to variable and export
