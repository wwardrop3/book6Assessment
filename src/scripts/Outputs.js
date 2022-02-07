//the purpose of this module to to produce html element that contains the pen pal message output
import { Authors } from "./Authors.js"
import { Letters } from "./Letters.js"
import { Recipients } from "./Recipients.js"
import { Topics } from "./Topics.js"
import { applicationState, getLetters, setAuthor, setLetter, setRecipient, setLetterId, resetLetterBuilder, sendLetterBuilder, getAuthors, getTopics, getRecipients } from "./DataAccess.js"


//function that returns the skeleton of the html elements
export const Outputs = () => {
    return `<nav>
        <h1>Pen Pal Society</h1></nav>
        <section id = "authorInput" class = "inputSelection">
            <h4>Authors</h4>
            ${Authors()}

        </section>
        <section id = "message">
            <h4>Letter</h4>
            ${Letters()}
    

        </section>
        <section id = "topics" class = "inputSelection">
            <h4>Topics</h4>
            ${Topics()}



        </section>
        <section id = "recipients" class = "inputSelection">
            <h4>Recipient</h4>
            ${Recipients()}

        </section>
        <section id = "sendLetter">
            <button id = "sendButton">Send Letter</button>
        </section>
        <section id="letterOutput">
            ${letterOutput()}
        </section>`
}


//function produces html element for each stored message to be shown under letter submit button
export const letterOutput = () => {
    const letters = getLetters()
    let html = `<div class = "letterOutput">`
    
    //use MAP to return array of html objects from each saved letter object
    const listArray = letters.map((rawLetterObject) => {
        //for each saved letter object, invoke letterBuilder to the ids of each letter, to values
        const builtLetterObject = letterBuilder(rawLetterObject)
        return `<div>
        Dear ${builtLetterObject.recipientName} (${builtLetterObject.recipientEmail})
        <p>
        ${builtLetterObject.content}
        <p>
        Sincerely, ${builtLetterObject.authorName} (${builtLetterObject.authorEmail})
        <p>
        ${builtLetterObject.date}
        <div class="topicLabel">${builtLetterObject.topicName}</div>
        
        </div>`

    })
    // joins each array item into one html string
    html+= listArray.join("") 
    html+=`</div>`
    return html
        
    };
    

//finds the names of each id value and set to an object that will be passed into an ouput function that will display values under send letter button
const letterBuilder = (rawLetterObject) => {
    const authors = getAuthors()
    const topics = getTopics()
    const recipients = getRecipients()

    //creates an empty object that will store values for each id for presentation on page
    const outputLetterObject = {} 
    
    //use find to match authorids with rawLetterObject author id and return author object
    const foundAuthor = authors.find(author => {
        return author.id === rawLetterObject.authorId
    }) 
    //set new properties for author name and email
    outputLetterObject.authorName = foundAuthor.name
    outputLetterObject.authorEmail = foundAuthor.email

    //use find to match recipientIds with rawLetterObject recipient id and return recipient object
    const foundRecipient = recipients.find(recipient => {
        return recipient.id === rawLetterObject.recipientId
    }) 
    //set new properties in output object with recipient name and email
    outputLetterObject.recipientName = foundRecipient.name
    outputLetterObject.recipientEmail = foundRecipient.email

    //iterate through topics objects until topic.id equals the inputobject topicId
    const foundTopic = topics.find(topic => {
        return topic.id === rawLetterObject.topicId}) 

    //use returned topicobject to set new property in outputObject that has topic name
    outputLetterObject.topicName = foundTopic.name

    //message content does not have an ID so the content is simply copied
    outputLetterObject.content = rawLetterObject.content

    //date does not have ID so simply copy to output object
    outputLetterObject.date = rawLetterObject.date

    return outputLetterObject

}



