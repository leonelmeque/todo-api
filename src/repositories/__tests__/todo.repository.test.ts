import {createTodo, updateTodo, deleteTodo, findTodoById, findTodoByUserId} from '../todos.repository'
import { mockedTodo } from '../../../testUtils/mocks/todo.mocks';

describe('Todo repository', ()=>{
  test('should create a new todo', async ()=> {
    await expect(createTodo(mockedTodo, '12345')).resolves.toEqual(mockedTodo)
  })

  test('should update an existing todo', async ()=> {
    await expect(updateTodo(mockedTodo)).resolves.toEqual(mockedTodo)
  })

  test('should delete an existing todo', async ()=> {
    await expect(deleteTodo(mockedTodo.id)).resolves.toEqual(mockedTodo)
  })
})
