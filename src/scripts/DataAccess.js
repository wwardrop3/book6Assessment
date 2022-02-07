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
//json-server database.json -p 8088 -w
const API = "http://localhost:8088"

//FETCH author data from JSON file and then import it into application state
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
    
//FETCH topic data from JSON file and then import it into applicationState
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

//FETCH recipient data from JSON file and then import it into applicationState
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

//FETCH stored letter object data from JSON file and then import it into applicationState
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



//create set functions to take a chosen html element id and save to applicationState rawInputObject
export const setAuthor = (id) => {
    applicationState.letterBuilder.authorId = id
}

export const setRecipient = (id) => {
    applicationState.letterBuilder.recipientId = id
}

export const setLetter = (letterString) => {
    applicationState.letterBuilder.content = letterString
}

//**DONT NEED TO SET TOPIC ID BECAUSE THAT IS DONE IN EXENT LISTENER...RADIO OBJECT SETS WHEN CLICKED */


//takes in new unique letter id, calculated in sendButton event listener, and adds to rawInputObject
export const setLetterId = (id) => {
    applicationState.letterBuilder.id = id
}

//resets temp letterBuilder in applicationState after sending temp letter object to json file
export const resetLetterBuilder = () => {
    applicationState.letterBuilder = {}
}

//sets the date of when the submit button is clicked
export const setSentTime = () => {
    applicationState.letterBuilder.date = Date.now()
}

document.addEventListener( 
    "click",
    (clickEvent) => {
        if(clickEvent.target.id.startsWith("topic")){
            const [,topicId] = clickEvent.target.id.split("--")
            applicationState.letterBuilder.topicId = parseInt(topicId)
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

    //fetch options is defined above with the POST method.
    return fetch(`${API}/letters`, fetchOptions) 
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged")) //This will create a "stateChanged" (just like a "click") event...Program will listen for when this happens
        }
        )
    }



