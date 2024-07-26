import { v4 as uuidv4 } from 'uuid';
import { UserDTO } from "./user.dto";
import { TodoDto } from '../todos/todo.dto';


export class User implements UserDTO {
  age: number;
  todos: TodoDto [];
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  uuid: string;
  viewedTodos?: []

  constructor(username: string, firstName: string, lastName: string, age: number, password: string) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.uuid = uuidv4();
    this.todos = [];
    this.password = password
  }

}
