import { Card } from "./classes.js";
import {
  clearDeck,
  createDomAccomblishedCard,
  createDomCard,
  colorCardAccordingPriority,
} from "./dom.js";
import { openCardDialog, openAccomblishedCardsDialog } from "./dialog.js";

const allCards = [];
export const allAccomblishedCards = [];
export let filteredCards = [];

export function handleNewCard(input) {
  const newCard = new Card(input, "", "default", "", "low");
  allCards.push(newCard);
  buildDeck();
}

export function buildDeck() {
  clearDeck();
  filterCards();
  renderCards();
  appendAccomblishedCard();
  handleTrashCard();
  handleCardAccomblished();
  handleCardClick();
}

function filterCards() {
  // wenn currentProject = ..., .filter(...)
  filteredCards = [...allCards];
}

// "export muss noch weg! dialog ist noch abhängig davon"
export function renderCards() {
  for (let i = 0; i < filteredCards.length; i++) {
    createDomCard(filteredCards[i], i);
    colorCardAccordingPriority(filteredCards[i], i);
  }
}

function handleTrashCard() {
  const currentCardsTrashSymbol = document.querySelectorAll(
    ".deck__trash-button"
  );
  currentCardsTrashSymbol.forEach((el, index) => {
    el.addEventListener("click", (event) => {
      event.stopPropagation();
      // get title of filteredCard-Array and delete titel from allCards-Array.
      const trashCardtitle = filteredCards[index].title;
      const allCardsTrashIndex = allCards.indexOf((el) => {
        el.title = trashCardtitle;
      });

      allCards.splice(allCardsTrashIndex - 1, 1);
      buildDeck();
    });
  });
}

function handleCardAccomblished() {
  const currentCardsAccomblishedSymbol = document.querySelectorAll(
    ".deck__accomblished-button"
  );
  currentCardsAccomblishedSymbol.forEach((el, index) => {
    el.addEventListener("click", (event) => {
      event.stopPropagation();
      // get title of filteredCard-Array and find titel in allCards-Array.
      const AccomblishedCardtitle = filteredCards[index].title;
      const allCardsAccomblishedIndex = allCards.indexOf((el) => {
        el.title = AccomblishedCardtitle;
      });

      // delete Card from current array
      allCards.splice(allCardsAccomblishedIndex - 1, 1);

      // add title to accomblished-ToDo-List
      allAccomblishedCards.push(AccomblishedCardtitle);

      buildDeck();
    });
  });
}

function appendAccomblishedCard() {
  if (allAccomblishedCards.length > 0) {
    const title = "Accomblished Tasks";
    createDomAccomblishedCard(title, allAccomblishedCards.length);
  }
}

function handleCardClick(isAccomblishedCard) {
  const currentCards = document.querySelectorAll(".deck__card-frame");
  currentCards.forEach((el, index) => {
    el.addEventListener("click", () => {
      console.log(`card ${el.id} clicked!`);

      if (el.id === "deck__card-frame-accomblished") {
        openAccomblishedCardsDialog();
      } else {
        openCardDialog(allCards[index]);
      }
    });
  });
  return true;
}
