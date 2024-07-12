import { Request, Response } from 'express';
import { TodoService } from './todo.service';

const todoService = new TodoService();

export const createTodo = (req: Request, res: Response) => {
  const { name, description, creator, restrictedTo } = req.body;
  const newTodo = todoService.createTodo(name, description, creator, restrictedTo);
  res.status(201).json(newTodo);
};

export const getTodos = (req: Request, res: Response) => {
  const todos = todoService.getTodos();
  res.status(200).json(todos);
};

export const getTodoById = (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = todoService.getTodoById(id);
  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
};

export const getTodoByUserId = (req: Request, res: Response) => {
  const { userID } = req.body
  const data = todoService.getTodos()

  const filteredData = data.filter(todo => todo.creator === userID)

  if(filteredData) {
    res.status(200).json(filteredData)
  }else {
    res.status(404).json({message: 'Something went wrong'})
  }
}

export const updateTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const updatedTodo = todoService.updateTodo(id, name, description);
  if (updatedTodo) {
    res.status(200).json(updatedTodo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
};

export const deleteTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const success = todoService.deleteTodo(id);
  if (success) {
    res.status(204).json({success});
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
};
