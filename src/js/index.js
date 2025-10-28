import "../css/styles.css";
import { handleNewCard } from "./deck.js";
import { handleNewProject } from "./project-space.js";
import { renderMainInput } from "./input-field.js";
import { renderProjectDialog } from "./dialog.js";

// import { projects } from "./mainInput.js";

function init() {
  renderMainInput();
}



init();

// ___ for testing purpose: ____

handleNewCard("Go to Manhatten");
handleNewCard("driving home sober");
handleNewProject("Music", "red");
handleNewProject("Shopping", "yellow");

renderProjectDialog(false)

// openCardDialog(cards[0])

// _____________________________
