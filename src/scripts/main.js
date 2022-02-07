//purpose of this module is to outline the skeleton of the html content
import { setSentTime, applicationState, getLetters, setAuthor, setLetter, setRecipient, setLetterId, resetLetterBuilder, sendLetterBuilder, fetchAuthors, fetchRecipients, fetchTopics, fetchLetters } from "./DataAccess.js"
import { Outputs } from "./Outputs.js"


//choose element to target for html insert
const mainContainer = document.querySelector("#mainContainer")
const renderHTML = () => {
    fetchAuthors()
    fetchRecipients()
    fetchTopics()
    fetchLetters().then( //****DONT FORGET TO ADD "THEN" AFTER USING FETCH */
        () => {
            mainContainer.innerHTML = Outputs() //replaces maincontainer content with outputs html content
        }
    )
}
renderHTML()
//do the set function when they are clicked on for each input///change event
document.addEventListener(
    "click",
    (clickEvent)=> {
        if(clickEvent.target.id === "sendButton"){

            //need to get new Id
            findNewId()

            const authorId = document.getElementById("author").value
            setAuthor(parseInt(authorId))
            
            const letterContent = document.getElementById("letterContent").value
            setLetter(letterContent)

            //gets the value of the 
            const recipientId = document.getElementById("recipient").value
            setRecipient(parseInt(recipientId))

            //records time the button was clicked aka letter was sent
            setSentTime()

            //send letterBuilder temporary letter object to json file
            sendLetterBuilder(applicationState.letterBuilder)

            //clear the temp letterBuilder array for next input
            resetLetterBuilder()

            //rerender the page with the updated information
            renderHTML()
            

        }
    }
)

mainContainer.addEventListener(
    "stateChanged",
    (customEvent) => {
        console.log("State Changed")
    }
)


const findNewId = () => {
    const letters = getLetters()
    const lastIndex = letters.length -1
    const newId = letters[lastIndex].id + 1
    setLetterId(newId)
}
