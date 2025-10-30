import { createDomMainInput } from "./dom.js";
import { handleNewCard } from "./deck.js";
import { currentTheme } from "./project-space.js";


export function renderMainInput() {
  createDomMainInput();
  themeAdjustmentMainInput();
  
  const mainInput = document.querySelector("#main-block__main-input");

  mainInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      console.log("Input is given!: " + mainInput.value);
      const input = mainInput.value;
      mainInput.value = "";
      handleNewCard(input);
    }
  });
}

function themeAdjustmentMainInput () {
  const mainInput = document.querySelector("#main-block__main-input");
  mainInput.style.borderColor = `var(--${currentTheme}-7)` 
}
