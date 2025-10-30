import {
  clearSite,
  renderDialogFrame,
  renderProjectForm,
  renderCardDetails,
  renderAccomblishedCardsList,
} from "./dom.js";
import { buildDeck, allAccomblishedCards } from "./deck.js";
import { renderMainInput } from "./input-field.js";
import {
  allProjects,
  buildProjectSpace,
  currentProject,
  handleNewProject,
  deleteCurrentProject,
} from "./project-space.js";

export const dialog = document.querySelector("#dialog");

export function openProjectDialog(isExisting, element) {
  clearSite();

  renderDialogFrame(true, isExisting);
  renderProjectForm(isExisting, element);

  createProjectConfirmEvent(isExisting, element);
  createProjectDeleteEvent(element);

  dialog.showModal();
}

export function openCardDialog(element) {
  clearSite();

  renderDialogFrame(true);
  renderCardDetails(element);

  createCardConfirmEvent(element);
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

export function rebuildSite() {
  renderMainInput();
  buildDeck();
  buildProjectSpace();
}

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

    console.log("check Radio: " + checkedRadio);

    element.priority = checkedRadio;
    element.description = dialogDescriptionValue;
    element.dueDate = dueDateValue;
  });
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
  console.log(
    element.name + " " + allProjects.indexOf((el) => el.uuid === element.uuid)
  );

  dialogDeleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    deleteCurrentProject(element);
    dialog.close();
    // rebuildSite();
  });
}
