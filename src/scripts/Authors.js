//the purpose of this module is to produce the author drop down html element

import { getAuthors, setAuthor } from "./DataAccess.js";


//import and create array for authors data


//function creates the authors input section with dropdown box
export const Authors = () => {
    const authors = getAuthors()
    //select takes the value of whichever option is chosen...don't need to assign initial value
    let html = `<select class = "dropdown" id="author">`
    for (const author of authors){
        html+= `<option value = ${author.id}>${author.name}</option>`
    }

    
    html+= `</select>`
    return html
}


