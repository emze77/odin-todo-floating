import {
  clearSite,
  renderDialogFrame,
  renderProjectForm,
  renderCardDetails,
} from "./dom.js";
import { renderCards } from "./deck.js";
import { renderMainInput } from "./input-field.js";


export const dialog = document.querySelector("#dialog");

export function renderProjectDialog(isExisting) {
  clearSite();
  renderDialogFrame();
  renderProjectForm(isExisting);
}

export function openCardDialog(element) {
  clearSite();

  renderDialogFrame();
  renderCardDetails(element);

  createConfirmEvent(element);
  dialog.showModal();
}

dialog.addEventListener("close", () => {
  renderMainInput();
  renderCards();
});


function createConfirmEvent(element) {
  const dialogConfirmButton = document.querySelector("#dialog__confirm-button");

  // console.table(element)
  // console.log("trying to edit this el: " + element)

  dialogConfirmButton.addEventListener("click", () => {
    const dialogDescriptionValue = document.querySelector("#dialog__description-input").value;
    const dueDateValue = document.querySelector("#dialog__dueDate-input").value;
    const checkedRadio = document.querySelector('input[name="prio"]:checked').value;

    console.log("check Radio: " + checkedRadio);

    element.priority = checkedRadio;
    element.description = dialogDescriptionValue;
    element.dueDate = dueDateValue;
  })
}


