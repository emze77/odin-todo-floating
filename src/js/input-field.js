import { createDomMainInput } from "./dom.js";
import { handleNewCard } from "./deck.js";


export function renderMainInput() {
  createDomMainInput();

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
