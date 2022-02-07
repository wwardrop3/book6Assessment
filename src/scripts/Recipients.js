//purpose of this module is to produce an html element of the recipients drop down

import { getRecipients } from "./DataAccess.js";



//function creates the authors input section with dropdown box
export const Recipients = () => {
    const recipients = getRecipients()
    let html = `<select class = "dropdown" id = "recipient">`
    
    recipients.forEach(recipient => {
        html+= `<option value = "${recipient.id}">${recipient.name}</option>`
        
    });
    

    html+= `</select>`
    return html
}


