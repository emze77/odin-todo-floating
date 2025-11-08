import { allProjects, currentProject } from "../js/project-space.js";
import { saveToLocalStorage } from "../js/utils.js";
import {
  openAccomplishedCardsDialog,
  openCardDialog,
} from "./deck__dialog-controller.js";
import {
  allAccomplishedCards,
  allCards,
  deleteCardByUuid,
  filterCards,
  priorities
} from "./deck__model.js";
import {
  clearDeck,
  colorCardAccordingPriority,
  createDomAccomplishedCard,
  createDomCard,
} from "./deck__view.js";

// import {deleteCardByUuid} from deck__model

export function buildDeck() {
  clearDeck();

  const filteredCards = filterCards(currentProject);
  renderCards(filteredCards);
  appendAccomplishedCard();

  handleTrashCard();
  handleCardAccomplished(filteredCards);
  handleCardClick();
}

export function renderCards(filteredCards) {
  for (let i = 0; i < filteredCards.length; i++) {
    createDomCard(filteredCards[i], i);
    colorCardAccordingPriority(filteredCards[i], priorities, currentProject);
  }
}

function handleTrashCard() {
  const currentCardsTrashSymbol = document.querySelectorAll(
    ".deck__trash-button"
  );
  currentCardsTrashSymbol.forEach((el) => {
    el.addEventListener("click", (event) => {
      event.stopPropagation();
      const trashCardUuid = el.dataset.uuid;
      deleteCardByUuid(trashCardUuid);
      buildDeck();
    });
  });
}

function handleCardAccomplished(filteredCards) {
  const currentCardsAccomplishedSymbol = document.querySelectorAll(
    ".deck__accomplished-button"
  );
  currentCardsAccomplishedSymbol.forEach((el, index) => {
    el.addEventListener("click", (event) => {
      event.stopPropagation();
      // get title of filteredCard-Array and find titel in allCards-Array.
      const accomplishCardUuid = filteredCards[index].uuid;
      const accomplishedCardTitle = filteredCards[index].title;
      const allCardsAccomplishIndex = allCards.findIndex((el) => {
        return el.uuid === accomplishCardUuid;
      });

      // // delete Card from current array
      allCards.splice(allCardsAccomplishIndex, 1);
      saveToLocalStorage(allCards, "allCards");

      // // add title to accomplished-ToDo-List
      allAccomplishedCards.push(accomplishedCardTitle);
      saveToLocalStorage(allAccomplishedCards, "allAccomplishedCards");

      buildDeck();

      // const accomplishedCard = allCards.find(
      //   (card) => el.dataset.uuid === card.uuid
      // );

      // console.log(
      //   "This is" + el.dataset.uuid + " and " + accomplishedCard.uuid
      // );

      // putCardOnAccomplishList(accomplishedCard);
      // deleteCardByUuid(accomplishedCard.uuid);
      // buildDeck();
    });
  });
}

function appendAccomplishedCard() {
  if (allAccomplishedCards.length > 0) {
    const title = "Accomplished Tasks";
    createDomAccomplishedCard(title, allAccomplishedCards.length);
  }
}

function handleCardClick() {
  const currentCards = document.querySelectorAll(".deck__card-frame");
  currentCards.forEach((el) => {
    el.addEventListener("click", () => {
      console.log(`card ${el.id} clicked!`);

      if (el.id === "deck__card-frame-accomplished") {
        openAccomplishedCardsDialog();
      } else {
        const clickedCard = allCards.find(
          (card) => card.uuid === el.dataset.uuid
        );
        console.log("clicked Card: " + clickedCard.title);
        openCardDialog(clickedCard, priorities, allProjects);
      }
    });
  });
  return true;
}
