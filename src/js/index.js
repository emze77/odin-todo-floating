import "../css/styles.css";
import { buildDeck, allCards, allAccomplishedCards} from "./deck.js";
import { initializeDefaultProject, buildProjectSpace, allProjects} from "./project-space.js";
import { renderMainInput } from "./input-field.js";
import { clearDialog, clearDeck, clearMainInput, clearProjectSpace } from "./dom.js";
import { loadFromLocalStorage, saveToLocalStorage } from "./utils.js";

function init() {
  loadFromLocalStorage(allCards, "allCards");
  loadFromLocalStorage(allProjects, "allProjects");
  loadFromLocalStorage(allAccomplishedCards, "allAccomblishedCards");
  // renderMainInput();
  initializeDefaultProject();
  rebuildSite();
}

init();


export function rebuildSite() {
  renderMainInput();
  buildDeck();
  buildProjectSpace();
  // saveToLocalStorage(allCards, "allCards")
  // saveToLocalStorage(allProjects, "allProjects")
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
