//the purpose of this module to to produce html element that contains the pen pal message output
import { Authors } from "./Authors.js"
import { Letters } from "./Letters.js"
import { Recipients } from "./Recipients.js"
import { Topics } from "./Topics.js"
import { applicationState, getLetters, setAuthor, setLetter, setRecipient, setLetterId, resetLetterBuilder, sendLetterBuilder, getAuthors, getTopics, getRecipients } from "./DataAccess.js"

export const Outputs = () => {
    return `<h1>Pen Pal Society</h1>
        <section id = "authorInput">
            <h4>Authors</h4>
            ${Authors()}

        </section>
        <section id = "message">
            <h4>Letter</h4>
            ${Letters()}
    



        </section>
        <section id = "topics">
            <h4>Topics</h4>
            ${Topics()}



        </section>
        <section id = "recipients">
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


export const letterOutput = () => {
    const letters = getLetters()
    let html = `<div class = "letterOutput">`
        
    const listArray = letters.map((letter) => {
        const letterObject = letterBuilder(letter)
        return `<div>
        Dear ${letterObject.recipientName} (${letterObject.recipientEmail})
        <p>
        ${letterObject.content}
        <p>
        Sincerely, ${letterObject.authorName} (${letterObject.authorEmail})
        <p>
        ${letterObject.date}
        <div class="topicLabel">${letterObject.topicName}</div>
        
        </div>`

    })
    html+= listArray.join("")
    html+=`</div>`
    console.log(listArray)
    return html
        
    };
    
    

//finds the names of each id value and set to an object that will be passed into an ouput function that will display values under send letter button

const letterBuilder = (letterInputObject) => {
    const authors = getAuthors()
    const topics = getTopics()
    const recipients = getRecipients()
    console.log(letterInputObject)



    const outputLetterObject = {}
    const foundAuthor = authors.find(author => {
        return author.id === letterInputObject.authorId
    }) 
    outputLetterObject.authorName = foundAuthor.name
    outputLetterObject.authorEmail = foundAuthor.email

    const foundRecipient = recipients.find(recipient => {
        return recipient.id === letterInputObject.recipientId
    }) 
    outputLetterObject.recipientName = foundRecipient.name
    outputLetterObject.recipientEmail = foundRecipient.email


    outputLetterObject.content = letterInputObject.content
    console.log(topics)
    console.log(letterInputObject)
    const foundTopic = topics.find(topic => {
        return topic.id === letterInputObject.topicId}) 
    
    outputLetterObject.topicName = foundTopic.name



    outputLetterObject.date = letterInputObject.date

    return outputLetterObject

}



