import "../css/styles.css";
import { renderMainInput, openCardDialog} from "./dom";
import { handleNewCard, cards } from "./cards.js";
// import forestBG from "../assets/img/forest__aaron-alvarado-OZSNnAU5RPk-unsplash.jpg"


renderMainInput();

// ___ for testing purpose: ____

handleNewCard("Go to Manhatten");
handleNewCard("driving home sober")

openCardDialog(cards[0])




// _____________________________