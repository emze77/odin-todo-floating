import { createAndAppend } from "./utils";
import { handleNewCard } from "./cards";

export const DomElements = {}

export function createMainInput () {
    createAndAppend("div", "main-block", "container", "", "", "", "content")
    createAndAppend("input", "main-block", "main-input", "", {placeholder: "What's To Do?"}, "", "main-block__container")

    const mainInput = document.querySelector("#main-block__main-input");
    
    mainInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        console.log("Input is given!: " + mainInput.value);
        handleNewCard(mainInput.value);
    }
})

}

function publishDomElement (key, value) {

}