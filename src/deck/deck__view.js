import camelcase from "camelcase";
import check from "../assets/icons/Haken.png";
import trashIcon from "../assets/icons/noun-trash-7960688.png";
import { createAndAppend } from "../js/utils.js";


export function clearDeck() {
  const deck = document.querySelector("#deck");
  while (deck.hasChildNodes()) {
    deck.removeChild(deck.firstChild);
  }
}

export function createDomCard(cardData, iterator) {
  // render card title on main screen
  createAndAppend(
    "article",
    "deck",
    `card-frame-${iterator}`,
    "deck__card-frame",
    { "data-uuid": cardData.uuid },
    ""
  );
  createAndAppend(
    "h2",
    "deck",
    `card-title-${iterator}`,
    "",
    "",
    cardData.title,
    `deck__card-frame-${iterator}`
  );

  // Due Date renders if available
  if (cardData.dueDate !== "") {
    createAndAppend(
      "div",
      "deck",
      `card-dueDate-container-${iterator}`,
      "deck__card-dueDate-container",
      "",
      "",
      `deck__card-frame-${iterator}`
    );
    createAndAppend(
      "h3",
      "deck",
      `card-dueDate-title-${iterator}`,
      "deck__card-dueDate-title",
      "",
      "Due Date:",
      `deck__card-dueDate-container-${iterator}`
    );
    createAndAppend(
      "p",
      "deck",
      `card-dueDate-${iterator}`,
      "deck__card-dueDate",
      "",
      cardData.dueDate,
      `deck__card-dueDate-container-${iterator}`
    );
  }

  // Container with trash- and finished-symbol
  createAndAppend(
    "div",
    "deck",
    `icon-container-${iterator}`,
    "deck__icon-container",
    "",
    "",
    `deck__card-frame-${iterator}`
  );
  createAndAppend(
    "button",
    "deck",
    `trash-button-${iterator}`,
    ["deck__icon-button", "deck__trash-button"],
    "",
    "",
    `deck__icon-container-${iterator}`
  );
  createAndAppend(
    "img",
    "deck",
    "trash-button-img",
    "deck__icon",
    { src: trashIcon, width: "25px", height: "25px" },
    "",
    `deck__trash-button-${iterator}`
  );
  createAndAppend(
    "button",
    "deck",
    `accomplished-button-${iterator}`,
    ["deck__icon-button", "deck__accomplished-button"],
    "",
    "",
    `deck__icon-container-${iterator}`
  );
  createAndAppend(
    "img",
    "deck",
    "accomplished-button-img",
    "deck__icon",
    { src: check, width: "25px", height: "25px" },
    "",
    `deck__accomplished-button-${iterator}`
  );
}

export function createDomAccomplishedCard(title, accomplishedCardsLength) {
  createAndAppend(
    "article",
    "deck",
    `card-frame-accomplished`,
    "deck__card-frame",
    "",
    ""
  );
  createAndAppend(
    "h2",
    "deck",
    `card-title-accomplished`,
    "",
    "",
    title,
    `deck__card-frame-accomplished`
  );
  createAndAppend(
    "p",
    "deck",
    `card-accomplished-counter`,
    "deck__card-accomplished-counter",
    "",
    `${accomplishedCardsLength} Entries`,
    `deck__card-frame-accomplished`
  );
}

export function colorCardAccordingPriority(cardData, priorities, currentProject) {
  const domCards = document.querySelectorAll(".deck__card-frame");
  const domCard = Array.from(domCards).find(
    (el) => el.dataset.uuid === cardData.uuid
  );
  
  if (cardData.priority === priorities[2]) {
    domCard.style.borderColor = `var(--${currentProject.theme}-7)`;
    domCard.style.backgroundColor = `var(--${currentProject.theme}-5-trans50)`;
  } else if (cardData.priority === priorities[1]) {
    domCard.style.borderColor = `var(--${currentProject.theme}-7)`;
  }
}


export function renderCardHead(card) {
  createAndAppend(
    "h2",
    "dialog",
    "title",
    "",
    "",
    card.title,
    "dialog__content"
  );
}

export function renderCardDescriptionArea(card) {
  createAndAppend(
    "label",
    "dialog",
    "description-label",
    "dialog__label",
    { for: "dialog__description-input" },
    "Description:",
    "dialog__content"
  );
  createAndAppend(
    "textarea",
    "dialog",
    "description-input",
    "dialog__input",
    { rows: 4, name: "description-input" },
    card.description,
    "dialog__description-label"
  );
}

export function renderCardDueDate(card) {
  createAndAppend(
    "label",
    "dialog",
    "dueDate-label",
    "dialog__label",
    { for: "dialog__dueDate-input" },
    "Due Date:",
    "dialog__content"
  );
  createAndAppend(
    "input",
    "dialog",
    "dueDate-input",
    "dialog__input",
    { type: "date", name: "dueDate-input", value: card.dueDate },
    "",
    "dialog__dueDate-label"
  );
}

export function renderCardPrioritySelection(card, prios) {
  // || __ADD PRIORITY SELECT___

  createAndAppend(
    "fieldset",
    "dialog",
    "priority-fieldset",
    "dialog__fieldset",
    "",
    "",
    "dialog__content"
  );
  createAndAppend(
    "legend",
    "dialog",
    "priority-legend",
    "",
    "",
    "Priority:",
    "dialog__priority-fieldset"
  );

  for (let i = 0; i < prios.length; i++) {
    let isChecked;
    // console.log(`Card priority: ${card.priority}. \n prios${i}: ${prios[i]}`);
    if (card.priority === prios[i]) {
      isChecked = "checked";
      // document
      //   .querySelector(`#dialog__radio-button-prio-${prios[i]}`)
      //   .setAttribute("checked", "checked");
    } else {
      isChecked = "false";
    }
    createAndAppend(
      "span",
      "dialog",
      `span-prio-${prios[i]}`,
      "",
      "",
      "",
      "dialog__priority-fieldset"
    );
    createAndAppend(
      "input",
      "dialog",
      `radio-button-prio-${prios[i]}`,
      "dialog__radio-button",
      { type: "radio", name: "prio", value: prios[i] },
      "",
      `dialog__span-prio-${prios[i]}`
    );
    createAndAppend(
      "label",
      "dialog",
      `radio-label-prio-${prios[i]}`,
      "dialog__radio-label",
      { for: `dialog__radio-button-prio-${prios[i]}` },
      prios[i],
      `dialog__span-prio-${prios[i]}`
    );
  }

  setCurrentPrio(card);
}

function setCurrentPrio(card) {
  const highRadioButton = document.querySelector(
    "#dialog__radio-button-prio-high"
  );
  const mediumRadioButton = document.querySelector(
    "#dialog__radio-button-prio-medium"
  );
  const lowRadioButton = document.querySelector(
    "#dialog__radio-button-prio-low"
  );

  if (card.priority === "high") {
    highRadioButton.setAttribute("checked", true);
  } else if (card.priority === "low") {
    lowRadioButton.setAttribute("checked", true);
  } else {
    mediumRadioButton.setAttribute("checked", true);
  }
}

export function renderCardProjectSelection(card, allProjects) {
  console.log(`card project value: ${card.project}`);

  createAndAppend(
    "label",
    "dialog",
    "project-select-label",
    "dialog__label",
    { for: "dialog__project-select" },
    "Project:",
    "dialog__content"
  );

  createAndAppend(
    "select",
    "dialog",
    "project-select",
    "dialog__input",
    { name: "projectSelect" },
    "",
    "dialog__content"
  );

  for (let i = 0; i < allProjects.length; i++) {
    createAndAppend(
      "option",
      "dialog",
      `option-project-${camelcase(allProjects[i].name)}`,
      "dialog__option-project",
      { value: allProjects[i].name },
      allProjects[i].name,
      "dialog__project-select"
    );
  }

  const selector = document.querySelector("#dialog__project-select");
  selector.value = card.project;
  // setCurrentProject(card);
}

// function setCurrentPrio(card) {
//   const highRadioButton = document.querySelector(
//     "#dialog__radio-button-prio-high"
//   );
//   const mediumRadioButton = document.querySelector(
//     "#dialog__radio-button-prio-medium"
//   );
//   const lowRadioButton = document.querySelector(
//     "#dialog__radio-button-prio-low"
//   );

//   if (card.priority === "high") {
//     highRadioButton.setAttribute("checked", true);
//   } else if (card.priority === "low") {
//     lowRadioButton.setAttribute("checked", true);
//   } else {
//     mediumRadioButton.setAttribute("checked", true);
//   }
// }

export function renderAccomplishedCardsList(accomplishedCards) {
  createAndAppend(
    "h2",
    "dialog",
    "title",
    "",
    "",
    "Accomblished Tasks:",
    "dialog__content"
  );
  createAndAppend(
    "ul",
    "dialog",
    "accomplished-cards-list-container",
    "",
    "",
    "",
    "dialog__content"
  );

  for (let i = 0; i < accomplishedCards.length; i++) {
    createAndAppend(
      "li",
      "dialog",
      `accomplished-list-item-${i}`,
      "dialog__accomplished-list-item",
      "",
      accomplishedCards[i],
      "dialog__accomplished-cards-list-container"
    );
  }
}
