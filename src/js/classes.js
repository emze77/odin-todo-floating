import { v4 as uuidv4 } from 'uuid';

export class Card {
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

export class Project {
  constructor (name, theme) {
    this.name = name,
    this.theme = theme,
    this.uuid = uuidv4();
  }
}
