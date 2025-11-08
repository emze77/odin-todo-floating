import { v4 as uuidv4 } from 'uuid';
import { currentProject } from '../js/project-space';
import { saveToLocalStorage } from "../js/utils";

export const allCards = [];
export const allAccomplishedCards = [];
export const priorities = ["low", "medium", "high"];

class Card {
  project = "default";

  constructor(title, description, project, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.project = project;
    this.dueDate = dueDate;
    this.priority = priority;
    this.uuid = uuidv4();
  }

  set project (value) {
    this._project = value;
    console.log(`The associated project of card ${this.title} is now ${value}`);
  }

  get project() {
    return this._project
  }
}

export function handleNewCard(input) {
  const newCard = new Card(input, "", currentProject.name, "", "low");
  allCards.push(newCard);
  saveToLocalStorage(allCards, "allCards");
  //   
}

export function filterCards(currentProject) {
  if (currentProject.project === "default") {
    return [...allCards];
  } else {
    return allCards.filter(
      (item) => item.project === currentProject.name
    );
  }
}


export function deleteCardByUuid(cardUuid) {
  const allCardsIndex = allCards.findIndex((el) => el.uuid === cardUuid);

  allCards.splice(allCardsIndex, 1);
  saveToLocalStorage(allCards, "allCards");
}

export function putCardOnAccomplishList(card) {
  allAccomplishedCards.push(card.title);
  saveToLocalStorage(allAccomplishedCards, "allAccomplishedCards");
}

export function updateCardData(element) {
  const dialogDescriptionValue = document.querySelector(
    "#dialog__description-input"
  ).value;
  const dueDateValue = document.querySelector("#dialog__dueDate-input").value;
  const checkedRadio = document.querySelector(
    'input[name="prio"]:checked'
  ).value;
  const selectedProject = document.querySelector(
    "#dialog__project-select"
  ).value;

  element.priority = checkedRadio;
  element.description = dialogDescriptionValue;
  element.dueDate = dueDateValue;
  element.project = selectedProject;
}

export function moveHangingCardsToDefault(project = false, allProjects) {
  if (project) {
    // if project given, change project-setting to default
    const projectCards = allCards.forEach((el) => el.project === project.name);
    console.table(projectCards);
    if (projectCards) {
      projectCards.forEach((e) => {
        e.project = "default";
      });
    }
  } else {
    // test if card.project is any of allProjects. If not, change card.project to default
    for (let i = 0; i < allCards.length; i++) {
      if (!allProjects.some((el) => el.name === allCards[i].project)) {
        allCards[i].project = "default";
      }
    }
  }
}
