import { createAndAppend } from "./utils";
import { handleNewCard, cards } from "./cards";


// '##::::'##::::'###::::'####:'##::: ##:
//  ###::'###:::'## ##:::. ##:: ###:: ##:
//  ####'####::'##:. ##::: ##:: ####: ##:
//  ## ### ##:'##:::. ##:: ##:: ## ## ##:
//  ##. #: ##: #########:: ##:: ##. ####:
//  ##:.:: ##: ##.... ##:: ##:: ##:. ###:
//  ##:::: ##: ##:::: ##:'####: ##::. ##:
// ..:::::..::..:::::..::....::..::::..::


export function renderMainInput() {
  createAndAppend("input", "main-block", "main-input", "", { placeholder: "What's To Do?", maxlength: 30, } , "", "" );

  const mainInput = document.querySelector("#main-block__main-input");

  mainInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      console.log("Input is given!: " + mainInput.value);
      const input = mainInput.value;
      mainInput.value = "";
      handleNewCard(input);
    }
  });
}

function clearMainInput () {
  const main = document.querySelector("#main-block");
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


export function renderCards() {
  for (let i = 0; i < cards.length; i++) {
    createDomCard(cards[i], i);
  }

  const currentCards = document.querySelectorAll(".deck__card-frame");
  currentCards.forEach((el, index) => {
    el.addEventListener('click', () => {
      console.log(`card ${el.id} clicked!`)
      openCardDialog(cards[index]);
    })
  })  
}

function createDomCard(cardData, iterator) {
 createAndAppend("article", "deck", `card-frame-${iterator}`, "deck__card-frame", "", "");
 createAndAppend("h2", "deck", "title", "", "", cardData.title, `deck__card-frame-${iterator}`);
}

export function clearDeck() {
  const deck = document.querySelector("#deck");
  while (deck.hasChildNodes()) {
    deck.removeChild(deck.firstChild);
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

const dialog = document.querySelector("#dialog");

export function openCardDialog (element) {
  clearDialog();
  clearDeck();
  clearMainInput();

  renderDialogFrame();
  renderCardDetails(element);
  
  console.log("step 1")

  createConfirmEvent(element);

  dialog.showModal();
}

dialog.addEventListener('close', () => {
  renderMainInput();
  renderCards();
})

function createConfirmEvent(element) {
  const dialogConfirmButton = document.querySelector("#dialog__confirm-button");

  console.table(element)
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





// dialog.addEventListener("click", (event) => {
//     // form should not submit
//     event.preventDefault();
//     // returns input when closing
//     createNewProject([projectDialog.nameInput.value, projectDialog.colorInput.value])
//     projectDialog.dialog.close();
//   });


function clearDialog () {
 while (dialog.hasChildNodes()) {
      dialog.removeChild(dialog.firstChild)
    }
}


function renderDialogFrame() {
  createAndAppend("form", "dialog", "form", "", "", "", "dialog");
  createAndAppend("div", "dialog", "content", "", "", "", "dialog__form");

  createAndAppend("div", "dialog", "buttons", "", "", "", "dialog__form");
  createAndAppend("button", "dialog", "cancel-button", "dialog__button", {value: "cancel", formmethod: "dialog"}, "Cancel", "dialog__buttons");
  createAndAppend("button", "dialog", "confirm-button", "dialog__button", {value: "default", formmethod: "dialog"}, "Okay", "dialog__buttons");
}

function renderCardDetails (card) {
  createAndAppend("h2", "dialog", "title", "", "", card.title, "dialog__content");

  createAndAppend("label", "dialog", "description-label", "dialog__label", {for: "dialog__description-input"}, "Description:", "dialog__content");
  createAndAppend("textarea", "dialog", "description-input", "dialog__input", { rows: 4, name: "description-input",}, card.description, "dialog__description-label"); 
  
  createAndAppend("label", "dialog", "dueDate-label", "dialog__label", {for: "dialog__dueDate-input"}, "Due Date:", "dialog__content");
  createAndAppend("input", "dialog", "dueDate-input", "dialog__input", {type: "date", name: "dueDate-input", value: card.dueDate,}, "", "dialog__dueDate-label");

  createAndAppend("fieldset", "dialog", "priority-fieldset", "dialog__fieldset", "", "", "dialog__content");
  createAndAppend("legend", "dialog", "priority-legend", "", "", "Priority:", "dialog__priority-fieldset");
  
  createAndAppend("span", "dialog", "span-prio-high", "", "", "", "dialog__priority-fieldset");
  createAndAppend("input", "dialog", "radio-button-prio-high", "dialog__radio-button", {type: "radio", name: "prio", value: "high"}, "", "dialog__span-prio-high");
  createAndAppend("label", "dialog", "radio-label-prio-high", "dialog__radio-label", {for: "dialog__radio-button-prio-high"}, "High", "dialog__span-prio-high");
  
  createAndAppend("span", "dialog", "span-prio-mid", "", "", "", "dialog__priority-fieldset");
  createAndAppend("input", "dialog", "radio-button-prio-mid", "dialog__radio-button", {type: "radio", name: "prio", value: "mid",}, "", "dialog__span-prio-mid");
  createAndAppend("label", "dialog", "radio-label-prio-mid", "dialog__radio-label", {for: "dialog__radio-button-prio-mid"}, "Medium", "dialog__span-prio-mid");
  
  createAndAppend("span", "dialog", "span-prio-low", "", "", "", "dialog__priority-fieldset");
  createAndAppend("input", "dialog", "radio-button-prio-low", "dialog__radio-button", {type: "radio", name: "prio", value: "low"}, "", "dialog__span-prio-low");
  createAndAppend("label", "dialog", "radio-label-prio-low", "dialog__radio-label", {for: "dialog__radio-button-prio-low"}, "Low", "dialog__span-prio-low");
  
  checkCorrectPrio(card);
}

function checkCorrectPrio (card) {
  const highRadioButton = document.querySelector("#dialog__radio-button-prio-high");
  const midRadioButton = document.querySelector("#dialog__radio-button-prio-mid");
  const lowRadioButton = document.querySelector("#dialog__radio-button-prio-low");

  if (card.priority === "high") {
    highRadioButton.setAttribute("checked", true);
  } else if (card.priority === "low") {
    lowRadioButton.setAttribute("checked", true);
  } else {
    midRadioButton.setAttribute("checked", true);
  }
}


// checked = true




