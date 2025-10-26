import "../css/styles.css";
import { renderMainInput} from "./dom.js";
import { handleNewCard } from "../deck/deck.js";
import { projects, handleNewProject } from "../project-space/project-space.js";
// import { projects } from "./mainInput.js";

renderMainInput();

// ___ for testing purpose: ____

handleNewCard("Go to Manhatten");
handleNewCard("driving home sober");
handleNewProject("Music", "red");
handleNewProject("Shopping", "yellow")

// openCardDialog(cards[0])




// _____________________________