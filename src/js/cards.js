import { Card } from "./classes.js";
import { renderCards, clearDeck } from "./dom.js";

export const cards = [];


export function handleNewCard (input) {
    const newCard = new Card (input, "", "default", "", "low");
    cards.push(newCard);
    clearDeck();
    renderCards();
}

