import { v4 as uuidv4 } from 'uuid';

export class Todo {
  uuid: string;
  name: string;
  description: string;
  creationDate: number;
  creator: string;
  viewers: string[];

  constructor(name: string, description: string, creator: string, viewers: string[]) {
    this.uuid = uuidv4();
    this.name = name;
    this.description = description;
    this.creationDate = Math.floor(Date.now() / 1000); // Unix timestamp
    this.creator = creator;
    this.viewers = viewers;
  }
}
