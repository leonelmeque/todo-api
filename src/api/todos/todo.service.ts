import { createTodo,updateTodo,deleteTodo,findTodoById,findTodoByUserId } from '../../repositories'

export class TodoService {
  constructor() {}

  async createTodo(name: string, description: string, creator: string) {
   return await createTodo({
     name: name,
     description: description
   }, creator)
  }

  async getTodos(uuid: string) {
    return findTodoByUserId(uuid)
  }

  async getTodosByUserId(uuid: string) {
    return findTodoByUserId(uuid)
  }

  async getTodoById(uuid: string) {
    return findTodoById(uuid)
  }

  async updateTodo(uuid: string, name: string, description: string) {
    return updateTodo({name, description, id: uuid})
  }

  async deleteTodo(id: string) {
     const success = await deleteTodo(id)
     return !!success
  }
}
