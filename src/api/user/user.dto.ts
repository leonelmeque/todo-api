import { TodoDto } from '../todos/todo.dto';

export interface UserDTO {
  uuid: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  age: number;
  todos: TodoDto [];
  viewedTodos?: TodoDto []
}
