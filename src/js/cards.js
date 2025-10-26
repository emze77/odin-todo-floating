import { Card } from "./classes.js";
import { renderCards, clearDeck, openCardDialog } from "./dom.js";

const allCards = [];
export let filteredCards = [];


export function handleNewCard(input) {
  const newCard = new Card(input, "", "default", "", "low");
  allCards.push(newCard);
  buildDeck();
}

function buildDeck() {
  clearDeck();
  filterCards();
  renderCards();
  handleCardClick();
  handleTrashCard();
  handleCardAccomblished();
}

function filterCards() {
    // wenn currentProject = ..., .filter(...)
    filteredCards = [...allCards];
}




function handleCardClick() {
  const currentCards = document.querySelectorAll(".deck__card-frame");
  currentCards.forEach((el, index) => {
    el.addEventListener("click", () => {
      console.log(`card ${el.id} clicked!`);
      openCardDialog(allCards[index]);
    });
  });
}

function handleTrashCard() {
  const currentCards = document.querySelectorAll(".deck__card-frame");
  const currentCardsTrashSymbol = document.querySelectorAll(".deck__trash-button");

  currentCardsTrashSymbol.forEach((el, index) => {
    el.addEventListener("click", () => {
      const trashCardtitle = allCards[index].title
      console.log(trashCardtitle);
    });
  });
}

function handleCardAccomblished() {}
