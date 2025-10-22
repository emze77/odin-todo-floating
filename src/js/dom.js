import { createAndAppend } from "./utils";
import { handleNewCard, cards } from "./cards";




export function createMainInput() {
  createAndAppend(
    "input",
    "main-block",
    "main-input",
    "",
    { placeholder: "What's To Do?" },
    "",
    ""
  );

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

function createDomCard(cardData) {
 createAndAppend("article", "deck", "card-frame", "deck__card-frame", "", "");
 createAndAppend("h2", "deck", "title", "", "", cardData.title, "deck__card-frame");
}




export function renderCards() {
  for (let i = 0; i < cards.length; i++) {
    createDomCard(cards[i]);
  }
}

export function clearCards() {
  const deck = document.querySelector("#deck");
  while (deck.hasChildNodes()) {
    deck.removeChild(deck.firstChild);
  }
}

