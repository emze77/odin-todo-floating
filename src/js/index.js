import "../css/styles.css";
import { renderMainInput} from "./dom.js";
import { handleNewCard } from "./cards.js";
import { handleNewProject } from "./mainInput.js";
import { projects } from "./mainInput.js";

renderMainInput();

// ___ for testing purpose: ____

handleNewCard("Go to Manhatten");
handleNewCard("driving home sober");
handleNewProject("Music", "red");
handleNewProject("Shopping", "yellow")

// openCardDialog(cards[0])




// _____________________________