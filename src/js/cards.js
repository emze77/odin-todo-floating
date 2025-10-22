import { Card } from "./classes.js";
import { renderCards, clearCards } from "./dom.js";

export const cards = [];


export function handleNewCard (input) {
    const newCard = new Card (input, "", "default", "", "");
    cards.push(newCard);
    clearCards();
    renderCards();
}
