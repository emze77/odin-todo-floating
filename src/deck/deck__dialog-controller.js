import {
  renderAccomplishedCardsList,
  renderCardDescriptionArea,
  renderCardDueDate,
  renderCardHead,
  renderCardPrioritySelection,
  renderCardProjectSelection,
} from "./deck__view.js";

import { allAccomplishedCards } from "./deck__model.js";

import {
  renderDialogFrame,
} from "../js/dom.js";

import { clearSite, rebuildSite } from "../js/index.js";

import { updateCardData } from "./deck__model.js";

export function openCardDialog(card, priorities, allProjects) {
  clearSite();

  renderDialogFrame(true);

  renderCardHead(card);
  renderCardDescriptionArea(card);
  renderCardDueDate(card);
  renderCardPrioritySelection(card, priorities);
  renderCardProjectSelection(card, allProjects);

  createCardConfirmEvent(card);
  dialog.showModal();
}

export function openAccomplishedCardsDialog() {
  clearSite();
  renderDialogFrame(false);
  renderAccomplishedCardsList(allAccomplishedCards);
  dialog.showModal();
}

dialog.addEventListener("close", () => {
  rebuildSite();
});

function createCardConfirmEvent(element) {
  const dialogConfirmButton = document.querySelector("#dialog__confirm-button");
  const dialogForm = document.querySelector("#dialog__form");

  dialogForm.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      dialogConfirmButton.click();
    }
  });

  dialogConfirmButton.addEventListener("click", () => {
    updateCardData(element);
  });
}
