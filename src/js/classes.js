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
}

export class Project {
  constructor (name, theme) {
    this.name = name,
    this.theme = theme
  }
}
