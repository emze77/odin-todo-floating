import { Card } from "./classes.js";
import {
  clearDeck,
  createDomAccomblishedCard,
  createDomCard,
  colorCardAccordingPriority,
} from "./dom.js";
import { openCardDialog, openAccomblishedCardsDialog } from "./dialog.js";
import { currentProject } from "./project-space.js";

export let allCards = [];
export const allAccomblishedCards = [];
export let filteredCards = [];
export const prios = ["low", "medium", "high"];
let cardCounter = 0;

export function handleNewCard(input) {
  const newCard = new Card(input, "", currentProject.name, "", "low");
  cardCounter++
  console.table(newCard)
  localStorage.setItem(`card-${cardCounter}`, JSON.stringify(newCard));
  // allCards.push(newCard);
  buildDeck();
}

export function buildDeck() {
  clearDeck();
  loadCardsfromLocalStorage();
  filterCards();
  renderCards();
  appendAccomblishedCard();
  handleTrashCard();
  handleCardAccomblished();
  handleCardClick();
}

function loadCardsfromLocalStorage() {
  allCards = [];
  for (let i = 1; i < cardCounter; i++ ) {
    const storedCard = localStorage.getItem(`card-${i}`);
    console.log("parsed card: " + storedCard)
    allCards.push(JSON.parse(storedCard));
  }
}

function filterCards() {
  if (currentProject.project === "default") {
    filteredCards = [...allCards];
  } else {
    filteredCards = allCards.filter(
      (item) => item.project === currentProject.name
    );
  }
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
      // get uuid of filteredCard-Array and delete titel from allCards-Array.
      const trashCardUuid = filteredCards[index].uuid;
      const allCardsTrashIndex = allCards.findIndex((el) => {
        return el.uuid === trashCardUuid;
      });

      allCards.splice(allCardsTrashIndex, 1);
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
      const accomblishCardUuid = filteredCards[index].uuid;
      const accomblishedCardtitle = filteredCards[index].title;
      const allCardsAccomblishIndex = allCards.findIndex((el) => {
        return el.uuid === accomblishCardUuid;
      });

      // delete Card from current array
      allCards.splice(allCardsAccomblishIndex, 1);

      // add title to accomblished-ToDo-List
      allAccomblishedCards.push(accomblishedCardtitle);

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
