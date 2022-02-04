//purpose of this module is to outline the skeleton of the html content

import { fetchRequests } from "./DataAccess.js"


const mainContainer = document.querySelector("#mainContainer")

const renderHTML = () => {
    fetchRequests().then(
        mainContainer.innerHTML = Outputs()

    )

}