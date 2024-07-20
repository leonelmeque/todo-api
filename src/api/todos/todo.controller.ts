import { Request, Response } from 'express';
import { TodoService } from './todo.service';
import { extractPrismaErrorMessage } from '../../utils/prismaClient';

const todoService = new TodoService();

export const createTodo = async (req: Request, res: Response) => {
  const { name, description, creator } = req.body;
  try {

    const newTodo = await todoService.createTodo(name, description, creator);
    res.status(201).json(newTodo);
  } catch (e) {
    console.error(e)
    const cause = extractPrismaErrorMessage(e)
    res.status(400).json({message: 'Could not create Todo', cause: cause || ''})
  }
};

export const getTodos = (req: Request, res: Response) => {
  res.status(200).json([]);
};

export const getTodoById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const todo = await todoService.getTodoById(id)

    if(todo) res.status(200).json(todo)
    else res.status(404).json({message: 'Todo not found'})

  } catch (e) {
    console.error(e)
    const cause = extractPrismaErrorMessage(e)
    res.status(401).json({message: 'Something went wrong!', cause: cause || ''})
  }
};

export const getTodoByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body
    const data = await todoService.getTodosByUserId(userId)

    res.status(200).json(data)

  } catch (e) {
    console.error(e)
    const cause = extractPrismaErrorMessage(e)
    res.status(401).json({message: "An error occurred", cause: cause || ''})
  }
}

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try{
    const updatedTodo = await todoService.updateTodo(id, name, description);

    res.status(200).json(updatedTodo);

  }catch (e) {
    const cause = extractPrismaErrorMessage(e)
    res.status(401).json({message: "An error occurred", cause: cause || ''})
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await todoService.deleteTodo(id)

    if(success) res.status(200).json({message: 'Todo successfully removed'})
    else res.status(401).json({message: 'Todo could not be deleted'})
  } catch (e) {
    console.error(e)

    const cause = extractPrismaErrorMessage(e)
    res.status(401).json({message: "An error occurred", cause: cause || ''})
  }
};
