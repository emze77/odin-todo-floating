import { handleNewCard } from "../deck/deck__model.js";
import { clearMainInput, createDomMainInput } from "./dom.js";
import { currentProject } from "./project-space.js";
import { buildDeck } from "../deck/deck__controller.js";


export function renderMainInput() {
  clearMainInput();
  createDomMainInput();
  
  const mainInput = document.querySelector("#main-block__main-input");

  mainInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      console.log("Input is given!: " + mainInput.value);
      const input = mainInput.value;
      mainInput.value = "";
      handleNewCard(input);
      buildDeck();
    }
  });
}


export function themeAdjustmentMainInput () {
  const mainInput = document.querySelector("#main-block__main-input");
  mainInput.style.borderColor = `var(--${currentProject.theme}-7)` 
}
