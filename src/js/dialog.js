import {
  clearSite,
  renderDialogFrame,
  renderProjectForm,
  renderCardDetails,
  renderAccomblishedCardsList,
} from "./dom.js";
import { buildDeck, allAccomblishedCards } from "./deck.js";
import { renderMainInput } from "./input-field.js";
import { renderProjects } from "./project-space.js";

export const dialog = document.querySelector("#dialog");

export function renderProjectDialog(isExisting) {
  clearSite();
  renderDialogFrame(true);
  renderProjectForm(isExisting);
}

export function openCardDialog(element) {
  clearSite();

  renderDialogFrame(true);
  renderCardDetails(element);

  createConfirmEvent(element);
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



function rebuildSite() {
  renderMainInput();
  buildDeck();
  renderProjects();
}

function createConfirmEvent(element) {
  const dialogConfirmButton = document.querySelector("#dialog__confirm-button");

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
