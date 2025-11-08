import "../css/styles.css";

import { buildDeck } from "../deck/deck__controller.js";
import { allAccomplishedCards, allCards } from "../deck/deck__model.js";
import { clearDeck } from "../deck/deck__view.js";

import { clearDialog, clearMainInput, clearProjectSpace } from "./dom.js";
import { renderMainInput } from "./input-field.js";
import { allProjects, buildProjectSpace, initializeDefaultProject } from "./project-space.js";
import { loadFromLocalStorage } from "./utils.js";

function init() {
  loadFromLocalStorage(allCards, "allCards");
  loadFromLocalStorage(allProjects, "allProjects");
  loadFromLocalStorage(allAccomplishedCards, "allAccomplishedCards");

  initializeDefaultProject();
  rebuildSite();
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

// load arrays from local storage;
// onload = () => {
//   loadFromLocalStorage(allProjects);
  // loadFromLocalStorage(allCards, "allCards");
// }

// localStorage.setItem('fromVSCodium', 'hello-hello');


// ___ for testing purpose: ____

// handleNewCard("Go to Manhatten");
// handleNewCard("driving home sober");
// handleNewCard("just be myself");
// handleNewCard("working out");

// handleNewProject("Music", themeColors[2]);
// handleNewProject("Shopping", themeColors[4]);
// handleNewProject("Music", themeColors[1]);
// handleNewProject("Ocean", themeColors[4]);
// handleNewProject("Forest", themeColors[1]);
// handleNewProject("Asphalt", themeColors[0]);




// _____________________________
