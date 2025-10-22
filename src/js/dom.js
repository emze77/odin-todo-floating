import { createAndAppend } from "./utils";
import { handleNewCard, cards } from "./cards";

export function createMainInput() {
  createAndAppend(
    "input",
    "main-block",
    "main-input",
    "",
    { placeholder: "What's To Do?",
      maxlength: 30,
     },
    "",
    ""
  );

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
      openDialog("cardDetails", cards[index]);
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


function openDialog (type, element) {
  renderDialogFrame();

  if (type === "cardDetails") {
    renderCardDetails(element);
    console.log("card Details will be rendered")
  }

  const dialog = document.querySelector("#dialog__container");
  dialog.showModal();
}


function renderDialogFrame() {
  createAndAppend("dialog", "dialog", "container", "", {closedby: "any"}, "", "body");
  createAndAppend("form", "dialog", "form", "", "", "", "dialog__container");

  createAndAppend("div", "dialog", "buttons", "", "", "", "dialog__container");
  createAndAppend("button", "dialog", "cancel-button", "dialog__button", {value: "cancel", formmethod: "dialog"}, "Cancel", "dialog__buttons");
  createAndAppend("button", "dialog", "confirm-buton", "dialog__button", {value: "default", formmethod: "dialog"}, "Okay", "dialog__buttons");
}

function renderCardDetails (card) {
  createAndAppend("h2", "dialog", "title", "", "", card.title, "dialog__form");

}


//  <!-- A modal dialog containing a form -->
//     <dialog id="project-dialog" class="entry-dialog" closedby="any">
//       <form id="project-dialog__form" class="entry-dialog__form">
//         <!-- <div id="entry-dialog__content" class="entry-dialog__content"></div> -->

//         <h2 id="project-dialog__title">New Project</h2>

//         <div>
//           <label for="project-dialog__name-input" class="project-dialog__label">
//             <input
//               id="project-dialog__name-input"
//               class="project-dialog__input"
//               type="text"
//               autofocus
//             />
//           </label>
//         </div>

//         <div>
//           <label
//             for="project-dialog__color-input"
//             class="project-dialog__label"
//           >
//             <input
//               id="project-dialog__color-input"
//               class="project-dialog__color"
//               type="color"
//             />
//           </label>
//         </div>

//         <div class="project-dialog__buttons">
//           <button
//             value="cancel"
//             formmethod="dialog"
//             class="project-dialog__button"
//           >
//             Cancel
//           </button>
//           <button
//             id="project-dialog__confirm-button"
//             value="default"
//             class="project-dialog__button"
//           >
//             Confirm
//           </button>
//         </div>
//       </form>
//     </dialog>
