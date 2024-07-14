import { v4 as uuidv4 } from 'uuid';
import {UserDTO} from "./user.dto";


export class User implements UserDTO{
  age: number;
  createdTodos: string[];
  firstName: string;
  lastName: string;
  username: string;
  uuid: string;

  constructor(username: string, firstName: string, lastName: string, age: number) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.uuid = uuidv4();
    this.createdTodos = [];
  }

}
