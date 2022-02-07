//the purpose of this module is to produce an html element with topics radio choices

import { getTopics } from "./DataAccess.js";




//function creates the authors input section with radio options
export const Topics = () => {
    const topics = getTopics()
    let html = `<ul class = "topicList">`
    //element ids need to be split to allow a listener to identify the beginning and save the unique id
    for(const topic of topics){
        html+= `<input type="radio" id="topic--${topic.id}">${topic.name}</input>` //using the same name on all elements will allow user to only select one option at a time
    }

    html+= `</ul>`
    return html
}



