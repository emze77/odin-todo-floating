import {
  renderDialogFrame,
  renderProjectForm,
  renderCardHead,
  renderCardDescriptionArea,
  renderCardDueDate,
  renderCardPrioritySelection,
  renderCardProjectSelection,
  renderAccomblishedCardsList,
} from "./dom.js";
import { allAccomblishedCards, prios, allCards } from "./deck.js";
import {
  handleNewProject,
  deleteCurrentProject,
  currentProject,
  themeColors,
  allProjects,
} from "./project-space.js";
import { rebuildSite, clearSite } from "./index.js";

export const dialog = document.querySelector("#dialog");

// '########::'########:::'#######::::::::'##:'########::'######::'########::'######::
//  ##.... ##: ##.... ##:'##.... ##::::::: ##: ##.....::'##... ##:... ##..::'##... ##:
//  ##:::: ##: ##:::: ##: ##:::: ##::::::: ##: ##::::::: ##:::..::::: ##:::: ##:::..::
//  ########:: ########:: ##:::: ##::::::: ##: ######::: ##:::::::::: ##::::. ######::
//  ##.....::: ##.. ##::: ##:::: ##:'##::: ##: ##...:::: ##:::::::::: ##:::::..... ##:
//  ##:::::::: ##::. ##:: ##:::: ##: ##::: ##: ##::::::: ##::: ##:::: ##::::'##::: ##:
//  ##:::::::: ##:::. ##:. #######::. ######:: ########:. ######::::: ##::::. ######::
// ..:::::::::..:::::..:::.......::::......:::........:::......::::::..::::::......:::

export function openProjectDialog(isExisting, element) {
  clearSite();
  renderDialogFrame(true, isExisting);
  renderProjectForm(isExisting, element, themeColors);

  if (isExisting) {
    preSelectProjectTheme();
  } else {
    randomSelectProjectTheme();
  }

  createProjectConfirmEvent(isExisting, element);

  if (isExisting) {
    createProjectDeleteEvent(element);
  }

  dialog.showModal();
}

function preSelectProjectTheme() {
  const currentTheme = currentProject.theme;
  const currentThemeButton = document.querySelector(
    `#dialog__radio-button-theme-${currentTheme}`
  );
  currentThemeButton.setAttribute("checked", "checked");
}

function randomSelectProjectTheme() {
  const randomIndex = Math.floor(Math.random() * themeColors.length);
  const randomizedThemeButton = document.querySelector(
    `#dialog__radio-button-theme-${themeColors[randomIndex]}`
  );
  randomizedThemeButton.setAttribute("checked", "checked");
}

function createProjectConfirmEvent(isExisting, element) {
  const dialogConfirmButton = document.querySelector("#dialog__confirm-button");
  const dialogForm = document.querySelector("#dialog__form");

  dialogForm.addEventListener("keydown", (event) => {
    // console.log("project key pressed: " + event.key)
    if (event.key == "Enter") {
      // console.log("project key is enter")
      dialogConfirmButton.click();
    }
  });

  dialogConfirmButton.addEventListener("click", () => {
    const projectName = document.querySelector(
      "#dialog__project-name-input"
    ).value;
    const checkedTheme = document.querySelector(
      'input[name="theme"]:checked'
    ).value;

    if (isExisting) {
      element.name = projectName;
      element.theme = checkedTheme;
    } else {
      handleNewProject(projectName, checkedTheme);
    }
  });
}

function createProjectDeleteEvent(element) {
  const dialogDeleteButton = document.querySelector("#dialog__delete-button");
  // console.log(
  //   element.name + " " + allProjects.indexOf((el) => el.uuid === element.uuid)
  // );

  dialogDeleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    deleteCurrentProject(element);
    dialog.close();
  });
}

// :'######:::::'###::::'########::'########:::'######::
// '##... ##:::'## ##::: ##.... ##: ##.... ##:'##... ##:
//  ##:::..:::'##:. ##:: ##:::: ##: ##:::: ##: ##:::..::
//  ##:::::::'##:::. ##: ########:: ##:::: ##:. ######::
//  ##::::::: #########: ##.. ##::: ##:::: ##::..... ##:
//  ##::: ##: ##.... ##: ##::. ##:: ##:::: ##:'##::: ##:
// . ######:: ##:::: ##: ##:::. ##: ########::. ######::
// :......:::..:::::..::..:::::..::........::::......:::

export function openCardDialog(card) {
  clearSite();

  renderDialogFrame(true);

  renderCardHead(card);
  renderCardDescriptionArea(card);
  renderCardDueDate(card); 
  renderCardPrioritySelection(card, prios); 
  renderCardProjectSelection(card, allProjects);

  createCardConfirmEvent(card);
  dialog.showModal();
}

export function openAccomblishedCardsDialog() {
  clearSite();
  renderDialogFrame(false);
  renderAccomblishedCardsList(allAccomblishedCards);
  dialog.showModal();
}

dialog.addEventListener("close", () => {
  rebuildSite();
});

function createCardConfirmEvent(element) {
  const dialogConfirmButton = document.querySelector("#dialog__confirm-button");
  const dialogForm = document.querySelector("#dialog__form");
  // const dialogCardNameInput = document.querySelector(
  //   "#dialog__project-name-input"
  // );

  dialogForm.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      dialogConfirmButton.click();
    }
  });

  dialogConfirmButton.addEventListener("click", () => {
    const dialogDescriptionValue = document.querySelector(
      "#dialog__description-input"
    ).value;
    const dueDateValue = document.querySelector("#dialog__dueDate-input").value;
    const checkedRadio = document.querySelector(
      'input[name="prio"]:checked'
    ).value;
    const selectedProject = document.querySelector('#dialog__project-select').value


    console.log("check Radio: " + checkedRadio);

    element.priority = checkedRadio;
    element.description = dialogDescriptionValue;
    element.dueDate = dueDateValue;
    element.project = selectedProject;
  });
}
