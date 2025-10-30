import "../css/styles.css";
import { handleNewCard, buildDeck} from "./deck.js";
import { handleNewProject, themeColors, buildProjectSpace} from "./project-space.js";
import { renderMainInput } from "./input-field.js";
import { clearDialog, clearDeck, clearMainInput, clearProjectSpace } from "./dom.js";


function init() {
  // rebuildSite();
  renderMainInput();
}

init();


export function rebuildSite() {
  renderMainInput();
  buildDeck();
  buildProjectSpace();
}

export function clearSite() {
  clearDeck();
  clearMainInput();
  clearProjectSpace();
  clearDialog();
}


// ___ for testing purpose: ____

handleNewCard("Go to Manhatten");
handleNewCard("driving home sober");
handleNewProject("Music", themeColors[2]);
handleNewProject("Shopping", themeColors[4]);
handleNewProject("Music", themeColors[1]);
handleNewProject("Ocean", themeColors[4]);
handleNewProject("Forest", themeColors[1]);
handleNewProject("Asphalt", themeColors[0]);

// _____________________________
