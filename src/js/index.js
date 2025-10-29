import "../css/styles.css";
import { handleNewCard } from "./deck.js";
import { handleNewProject, themeColors } from "./project-space.js";
import { renderMainInput } from "./input-field.js";
import { openProjectDialog } from "./dialog.js";

// import { projects } from "./mainInput.js";

function init() {
  renderMainInput();
}

init();

// ___ for testing purpose: ____

handleNewCard("Go to Manhatten");
handleNewCard("driving home sober");
handleNewProject("Music", themeColors[2]);
handleNewProject("Shopping", themeColors[4]);
handleNewProject("Music", themeColors[1]);
handleNewProject("Ocean", themeColors[4]);
handleNewProject("Forest", themeColors[1]);
handleNewProject("Asphalt", themeColors[0]);

// openProjectDialog(false)

// openCardDialog(cards[0])

// _____________________________
