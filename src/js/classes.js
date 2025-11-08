import { v4 as uuidv4 } from 'uuid';

export class Project {
  constructor (name, theme) {
    this.name = name,
    this.theme = theme,
    this.uuid = uuidv4();
  }
}
