//purpose of this module is to fetch json database and return data in js readable format
//export data to other modules


export const applicationState = {
    authors: [],
    topics: [],
    recipients: [],
    letters: [],
    letterBuilder: {}
}

//navigate to the api directory in terminal before hosting the json server
const API = "http://localhost:8088"

//define a function that extracts authors data from main database and saves to variable and export




// this function iterates through authors, topics, recipients, and messages to fetch json for all in one function


export const fetchAuthors = () => {
    //gets the requests array from the api folder
    return fetch(`${API}/authors`) //Why doesnt this have a second parameter like the fetch method at the bottom???
        //.then() waits till the fetch is done before converting json data
        .then(response => response.json())
        .then(
            //anonymous function
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.authors = serviceRequests
            }
            )
    }
    
export const fetchTopics = () => {
    //gets the requests array from the api folder
    return fetch(`${API}/topics`) //Why doesnt this have a second parameter like the fetch method at the bottom???
        //.then() waits till the fetch is done before converting json data
        .then(response => response.json())
        .then(
            //anonymous function
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.topics = serviceRequests
            }
            )
    }

export const fetchRecipients = () => {
    //gets the requests array from the api folder
    return fetch(`${API}/recipients`) //Why doesnt this have a second parameter like the fetch method at the bottom???
        //.then() waits till the fetch is done before converting json data
        .then(response => response.json())
        .then(
            //anonymous function
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.recipients = serviceRequests
            }
            )
    }

export const fetchLetters = () => {
    //gets the requests array from the api folder
    return fetch(`${API}/letters`) //Why doesnt this have a second parameter like the fetch method at the bottom???
        //.then() waits till the fetch is done before converting json data
        .then(response => response.json())
        .then(
            //anonymous function
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.letters = serviceRequests
            }
            )
    }
    
    
    

        //BELOW IS ITERATION IDEA BUT DID NOT WORK BECAUSE I COULDNT RETURN EACH ITERATION, WOULD STOP ON FIRST ITERATION BECAUSE OF RETURN
    //------------------------------------------------------------------------
//define a function that fetches each array in the json file
//const iterList = ["authors", "topics", "recipients", "messages"]
//         

//for(const dataType of iterList){
//         fetch(`${API}/${dataType}`)
//         .then(response => response.json())
//         .then(serviceRequests => {
//             applicationState[dataType] = serviceRequests
//             }
//         )
//     }
// }
//-----------------------------------------------------

//define a GET function that returns the each data array
export const getRecipients = () => {
    return applicationState.recipients.map(recipient => ({...recipient}))
}

export const getAuthors = () => {
    return applicationState.authors.map(author => ({...author}))
}

export const getTopics = () => {
    return applicationState.topics.map(topic => ({...topic}))
}

export const getLetters = () => {
    return applicationState.letters.map(letter => ({...letter}))
}



//create set functions

export const setAuthor = (id) => {
    applicationState.letterBuilder.authorId = id
}


export const setRecipient = (id) => {
    applicationState.letterBuilder.recipientId = id
}

export const setLetter = (letterString) => {
    applicationState.letterBuilder.content = letterString
}

export const setLetterId = (id) => {
    applicationState.letterBuilder.id = id
}

export const resetLetterBuilder = () => {
    applicationState.letterBuilder = {}
}

export const setSentTime = () => {
    applicationState.letterBuilder.date = Date.now()
}

document.addEventListener( //event listener is only listening within the container element
    "click",
    (clickEvent) => {
        if(clickEvent.target.id.startsWith("topic")){
            const [,topicId] = clickEvent.target.id.split("--")
            applicationState.letterBuilder.topicId = parseInt(topicId)
                //delete request was imported from the dataAccess module where we definined the fetch call to remove the json object with the id that is passed in
        }})


//create functions to send temporary application data to permenant json file
export const sendLetterBuilder = (userServiceRequest) => {
    const fetchOptions = {
        //POST tells the API that you want to create something new
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    //function sends
    return fetch(`${API}/letters`, fetchOptions) //fetch options is defined above with the POST method.
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged")) //This will create a "stateChanged" (just like a "click") event...Program will listen for when this happens
        }
        )
    }



