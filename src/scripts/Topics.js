//the purpose of this module is to produce an html element with topics radio choices

import { getTopics } from "./DataAccess.js";




//function creates the authors input section with dropdown box
export const Topics = () => {
    const topics = getTopics()
    let html = `<ul class = "topicList">`
    
    for(const topic of topics){
        html+= `<input type="radio" id="topic--${topic.id}">${topic.name}</input>` //using the same name on all elements will allow user to only select one option at a time
    }

    html+= `</ul>`
    return html
}



