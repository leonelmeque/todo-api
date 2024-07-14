import { Todo } from './todo.model';
import path from "path";
import { promises as fs } from 'fs'

export class TodoService {
  private todos: Todo[] = [];
  private dbPath: string = path.join(__dirname, '../../', 'db/todos.json')

  constructor() {
    fs.readFile(this.dbPath).then((data) => {
      this.todos = JSON.parse(data.toString())
    })
  }

  createTodo(name: string, description: string, creator: string, restrictedTo: string[]): Todo {
    const newTodo = new Todo(name, description, creator, restrictedTo);
    this.todos.push(newTodo);
    return newTodo;
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  getTodoById(uuid: string): Todo | undefined {
    return this.todos.find(todo => todo.uuid === uuid);
  }

  updateTodo(uuid: string, name: string, description: string): Todo | undefined {
    const todo = this.getTodoById(uuid);
    if (todo) {
      todo.name = name ?? todo.name;
      todo.description = description ?? todo.description;
      return todo;
    }
    return undefined;
  }

  deleteTodo(uuid: string, userid: string): [string, boolean] {
    const index = this.todos.findIndex(todo => todo.uuid === uuid);

    if (index !== -1) {
      const todo = this.todos[index]

      if(todo.creator !== userid) {
        return ['No permissions to delete Todo', false]
      }


      this.todos.splice(index, 1);
      return ['Todo was successfully removed', true];
    }

    return ['Todo not found', false];
  }
}
