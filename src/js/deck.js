import { Card } from "./classes.js";
import {
  clearDeck,
  createDomAccomblishedCard as createDomAccomplishedCard,
  createDomCard,
  colorCardAccordingPriority,
} from "./dom.js";
import { openCardDialog, openAccomplishedCardsDialog as openAccomplishedCardsDialog } from "./dialog.js";
import { allProjects, currentProject } from "./project-space.js";
import { saveToLocalStorage } from "./utils.js";

export let allCards = [];
export const allAccomplishedCards = [];

export let filteredCards = [];
export const prios = ["low", "medium", "high"];

export function handleNewCard(input) {
  const newCard = new Card(input, "", currentProject.name, "", "low");
  allCards.push(newCard);
  saveToLocalStorage(allCards, "allCards");
  buildDeck();
}

export function buildDeck() {
  clearDeck();
  filterCards();
  renderCards();
  appendAccomplishedCard();
  handleTrashCard();
  handleCardAccomplished();
  handleCardClick();
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
      saveToLocalStorage(allCards, "allCards");

      buildDeck();
    });
  });
}

function handleCardAccomplished() {
  const currentCardsAccomplishedSymbol = document.querySelectorAll(
    ".deck__accomblished-button"
  );
  currentCardsAccomplishedSymbol.forEach((el, index) => {
    el.addEventListener("click", (event) => {
      event.stopPropagation();
      // get title of filteredCard-Array and find titel in allCards-Array.
      const accomplishCardUuid = filteredCards[index].uuid;
      const accomplishedCardtitle = filteredCards[index].title;
      const allCardsAccomplishIndex = allCards.findIndex((el) => {
        return el.uuid === accomplishCardUuid;
      });

      // delete Card from current array
      allCards.splice(allCardsAccomplishIndex, 1);
      saveToLocalStorage(allCards, "allCards");

      // add title to accomblished-ToDo-List
      allAccomplishedCards.push(accomplishedCardtitle);
      saveToLocalStorage(allAccomplishedCards, "allAccomplishedCards");

      buildDeck();
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
  currentCards.forEach((el, index) => {
    el.addEventListener("click", () => {
      console.log(`card ${el.id} clicked!`);

      if (el.id === "deck__card-frame-accomblished") {
        openAccomplishedCardsDialog();
      } else {
        console.log("el.uuid: " + el.dataset.uuid)
        const clickedCard = allCards.find((card) => card.uuid === el.dataset.uuid)
        console.log("clicked Card: " + clickedCard.title)
        openCardDialog(clickedCard);
      }
    });
  });
  return true;
}

export function moveHangingCardsToDefault(project) {

  console.log("PROJECT:")
  console.table(project);

  if (project) {
    // if project given, change project-setting to default
    const projectCards = allCards.forEach((el) => el.project === project.name);
    console.table(projectCards);
    if (projectCards) {
      projectCards.forEach((e) => {
        e.project = "default";
      })
    }
  } else {
    // test if card.project is any of allProjects. If not, change card.project to default
    for (let i = 0; i < allCards.length; i++) {
      if (!allProjects.some((el) => el.name === allCards[i].project)) {
        allCards[i].project = "default"
      }
    }
  }
}
