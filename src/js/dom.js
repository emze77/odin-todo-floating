import { createAndAppend } from "./utils.js";
import trashIcon from "../assets/icons/noun-trash-7960688.png";
import haken from "../assets/icons/Haken.png";

// '##::::'##::::'###::::'####:'##::: ##:
//  ###::'###:::'## ##:::. ##:: ###:: ##:
//  ####'####::'##:. ##::: ##:: ####: ##:
//  ## ### ##:'##:::. ##:: ##:: ## ## ##:
//  ##. #: ##: #########:: ##:: ##. ####:
//  ##:.:: ##: ##.... ##:: ##:: ##:. ###:
//  ##:::: ##: ##:::: ##:'####: ##::. ##:
// ..:::::..::..:::::..::....::..::::..::

export function createDomMainInput() {
  createAndAppend(
    "input",
    "main-block",
    "main-input",
    "",
    { placeholder: "What's To Do?", maxlength: 30 },
    "",
    "main-block__input-field"
  );
}

export function clearMainInput() {
  const main = document.querySelector("#main-block__input-field");
  while (main.hasChildNodes()) {
    main.removeChild(main.firstChild);
  }
}

// :'######:::::'###::::'########::'########:::'######::
// '##... ##:::'## ##::: ##.... ##: ##.... ##:'##... ##:
//  ##:::..:::'##:. ##:: ##:::: ##: ##:::: ##: ##:::..::
//  ##:::::::'##:::. ##: ########:: ##:::: ##:. ######::
//  ##::::::: #########: ##.. ##::: ##:::: ##::..... ##:
//  ##::: ##: ##.... ##: ##::. ##:: ##:::: ##:'##::: ##:
// . ######:: ##:::: ##: ##:::. ##: ########::. ######::
// :......:::..:::::..::..:::::..::........::::......:::

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
    "",
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

  // Due Date renders if availible
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
    `accomblished-button-${iterator}`,
    ["deck__icon-button", "deck__accomblished-button"],
    "",
    "",
    `deck__icon-container-${iterator}`
  );
  createAndAppend(
    "img",
    "deck",
    "accomblished-button-img",
    "deck__icon",
    { src: haken, width: "25px", height: "25px" },
    "",
    `deck__accomblished-button-${iterator}`
  );
}

// export function checkAccomblishedCardExists() {
//   return !!document.querySelector("#deck__card-frame-accomblished")
// }

export function createDomAccomblishedCard(title, accomblishedCardsLength) {
  createAndAppend(
    "article",
    "deck",
    `card-frame-accomblished`,
    "deck__card-frame",
    "",
    ""
  );
  createAndAppend(
    "h2",
    "deck",
    `card-title-accomblished`,
    "",
    "",
    title,
    `deck__card-frame-accomblished`
  );
  createAndAppend(
    "p",
    "deck",
    `card-accomblished-counter`,
    "deck__card-accomblished-counter",
    "",
    `${accomblishedCardsLength} Entries`,
    `deck__card-frame-accomblished`
  );
}

export function colorCardAccordingPriority(cardData, iterator) {
  // project-color-selector goes here
  const card = document.querySelector(`#deck__card-frame-${iterator}`);
  // const color = cardData.projectColor (kommt noch!)
  const prioLevel = cardData.priority;
  console.log("card Data prio: " + prioLevel);
  card.style.borderColor = `var(--green-prio-${prioLevel}`;
}

// '########::'########:::'#######::::::::'##:'########::'######::'########::'######::
//  ##.... ##: ##.... ##:'##.... ##::::::: ##: ##.....::'##... ##:... ##..::'##... ##:
//  ##:::: ##: ##:::: ##: ##:::: ##::::::: ##: ##::::::: ##:::..::::: ##:::: ##:::..::
//  ########:: ########:: ##:::: ##::::::: ##: ######::: ##:::::::::: ##::::. ######::
//  ##.....::: ##.. ##::: ##:::: ##:'##::: ##: ##...:::: ##:::::::::: ##:::::..... ##:
//  ##:::::::: ##::. ##:: ##:::: ##: ##::: ##: ##::::::: ##::: ##:::: ##::::'##::: ##:
//  ##:::::::: ##:::. ##:. #######::. ######:: ########:. ######::::: ##::::. ######::
// ..:::::::::..:::::..:::.......::::......:::........:::......::::::..::::::......:::

export function createDomProject(projectData, iterator) {
  createAndAppend(
    "button",
    "main-block",
    `project-button-${iterator}`,
    "main-block__project-button",
    "",
    projectData.name,
    "main-block__project-space"
  );
}

export function colorDomProject(projectData, iterator) {
  const currentProject = document.querySelector(
    `#main-block__project-button-${iterator}`
  );
  currentProject.style.backgroundColor = `${projectData.theme}`;
  // currentProject.style.backgroundColor = `var(--clr-${projectData.theme}-primary-a20)`;
}

export function createDomAddProjectButton() {
  createAndAppend(
    "button",
    "main-block",
    "add-project-button",
    "main-block__project-button",
    "",
    "+",
    "main-block__project-space"
  );
}

export function clearProjectSpace() {
  const projectSpace = document.querySelector("#main-block__project-space");
  while (projectSpace.hasChildNodes()) {
    projectSpace.removeChild(projectSpace.firstChild);
  }
}

// '########::'####::::'###::::'##::::::::'#######:::'######:::
//  ##.... ##:. ##::::'## ##::: ##:::::::'##.... ##:'##... ##::
//  ##:::: ##:: ##:::'##:. ##:: ##::::::: ##:::: ##: ##:::..:::
//  ##:::: ##:: ##::'##:::. ##: ##::::::: ##:::: ##: ##::'####:
//  ##:::: ##:: ##:: #########: ##::::::: ##:::: ##: ##::: ##::
//  ##:::: ##:: ##:: ##.... ##: ##::::::: ##:::: ##: ##::: ##::
//  ########::'####: ##:::: ##: ########:. #######::. ######:::
// ........:::....::..:::::..::........:::.......::::......::::

export function clearSite() {
  clearDeck();
  clearMainInput();
  clearProjectSpace();
  clearDialog();
}

export function renderProjectForm(isExisting, projectData) {
  let title;

  if (isExisting) {
    title = "Edit Project:";
  } else {
    title = "New Project:";
  }

  createAndAppend(
    "h2",
    "dialog",
    "title",
    "",
    "",
    `${title}`,
    "dialog__content"
  );
  createAndAppend(
    "label",
    "dialog",
    "project-name-label",
    "dialog__label",
    { for: "dialog__project-name-input" },
    "Project Name:",
    "dialog__content"
  );
  createAndAppend(
    "input",
    "dialog",
    "project-name-input",
    "dialog__input",
    { type: "text", maxlength: "25", name: "dialog__input" },
    projectData.name,
    "dialog__project-name-label"
  );

  createAndAppend(
    "fieldset",
    "dialog",
    "theme-fieldset",
    "dialog__fieldset",
    "",
    "",
    "dialog__content"
  );
  createAndAppend(
    "legend",
    "dialog",
    "theme-legend",
    "",
    "",
    "Choose Theme:",
    "dialog__theme-fieldset"
  );

  createAndAppend(
    "input",
    "dialog",
    "radio-button-theme-grey",
    "dialog__radio-button dialog__radio-button-theme",
    { type: "radio", name: "theme", value: "grey" },
    "",
    "dialog__theme-fieldset"
  );
  createAndAppend(
    "input",
    "dialog",
    "radio-button-theme-green",
    "dialog__radio-button dialog__radio-button-theme",
    { type: "radio", name: "theme", value: "green" },
    "",
    "dialog__theme-fieldset"
  );
  createAndAppend(
    "input",
    "dialog",
    "radio-button-theme-red",
    "dialog__radio-button dialog__radio-button-theme",
    { type: "radio", name: "theme", value: "red" },
    "",
    "dialog__theme-fieldset"
  );
  createAndAppend(
    "input",
    "dialog",
    "radio-button-theme-yellow",
    "dialog__radio-button dialog__radio-button-theme",
    { type: "radio", name: "theme", value: "yellow" },
    "",
    "dialog__theme-fieldset"
  );
  createAndAppend(
    "input",
    "dialog",
    "radio-button-theme-blue",
    "dialog__radio-button dialog__radio-button-theme",
    { type: "radio", name: "theme", value: "blue" },
    "",
    "dialog__theme-fieldset"
  );
}

export function clearDialog() {
  while (dialog.hasChildNodes()) {
    dialog.removeChild(dialog.firstChild);
  }
}

export function renderDialogFrame(hasConfirmButton) {
  createAndAppend("form", "dialog", "form", "", "", "", "dialog");
  createAndAppend("div", "dialog", "content", "", "", "", "dialog__form");

  createAndAppend("div", "dialog", "buttons", "", "", "", "dialog__form");
  createAndAppend(
    "button",
    "dialog",
    "cancel-button",
    "dialog__button",
    { value: "cancel", formmethod: "dialog" },
    "Cancel",
    "dialog__buttons"
  );

  if (hasConfirmButton) {
    createAndAppend(
      "button",
      "dialog",
      "confirm-button",
      "dialog__button",
      { value: "default", formmethod: "dialog" },
      "Okay",
      "dialog__buttons"
    );
  }
}

export function renderCardDetails(card) {
  createAndAppend(
    "h2",
    "dialog",
    "title",
    "",
    "",
    card.title,
    "dialog__content"
  );

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

  createAndAppend(
    "span",
    "dialog",
    "span-prio-high",
    "",
    "",
    "",
    "dialog__priority-fieldset"
  );
  createAndAppend(
    "input",
    "dialog",
    "radio-button-prio-high",
    "dialog__radio-button",
    { type: "radio", name: "prio", value: "high" },
    "",
    "dialog__span-prio-high"
  );
  createAndAppend(
    "label",
    "dialog",
    "radio-label-prio-high",
    "dialog__radio-label",
    { for: "dialog__radio-button-prio-high" },
    "High",
    "dialog__span-prio-high"
  );

  createAndAppend(
    "span",
    "dialog",
    "span-prio-medium",
    "",
    "",
    "",
    "dialog__priority-fieldset"
  );
  createAndAppend(
    "input",
    "dialog",
    "radio-button-prio-medium",
    "dialog__radio-button",
    { type: "radio", name: "prio", value: "medium" },
    "",
    "dialog__span-prio-medium"
  );
  createAndAppend(
    "label",
    "dialog",
    "radio-label-prio-medium",
    "dialog__radio-label",
    { for: "dialog__radio-button-prio-medium" },
    "Medium",
    "dialog__span-prio-medium"
  );

  createAndAppend(
    "span",
    "dialog",
    "span-prio-low",
    "",
    "",
    "",
    "dialog__priority-fieldset"
  );
  createAndAppend(
    "input",
    "dialog",
    "radio-button-prio-low",
    "dialog__radio-button",
    { type: "radio", name: "prio", value: "low" },
    "",
    "dialog__span-prio-low"
  );
  createAndAppend(
    "label",
    "dialog",
    "radio-label-prio-low",
    "dialog__radio-label",
    { for: "dialog__radio-button-prio-low" },
    "Low",
    "dialog__span-prio-low"
  );

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

export function renderAccomblishedCardsList(accomblishedCards) {
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
    "accomblished-cards-list-container",
    "",
    "",
    "",
    "dialog__content"
  );

  for (let i = 0; i < accomblishedCards.length; i++) {
    createAndAppend(
      "li",
      "dialog",
      `accomblished-list-item-${i}`,
      "dialog__accomblished-list-item",
      "",
      accomblishedCards[i],
      "dialog__accomblished-cards-list-container"
    );
  }
}
