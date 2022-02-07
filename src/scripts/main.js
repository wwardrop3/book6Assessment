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




document.addEventListener(
    "click",
    (clickEvent)=> {
        if(clickEvent.target.id === "sendButton"){

            //need to get new Id
            const letters = getLetters()
            const lastIndex = letters.length -1
            const newId = letters[lastIndex].id + 1

            setLetterId(newId)

            const authorId = document.getElementById("author").value
            setAuthor(parseInt(authorId))
            
            const letterContent = document.getElementById("letterContent").value
            setLetter(letterContent)

            const recipientId = document.getElementById("recipient").value
            setRecipient(parseInt(recipientId))

            setSentTime()

            sendLetterBuilder(applicationState.letterBuilder)

            resetLetterBuilder()

            renderHTML()
            

        }
    }
)


