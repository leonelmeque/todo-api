import { Router } from 'express';
import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo, getTodoByUserId } from './todo.controller';

const router = Router();

router.get('/', getTodos)
router.post('/create', createTodo)
router.get('/:id', getTodoById)
router.post('/user', getTodoByUserId)
router.put('/:id', updateTodo)
router.delete('/:id', deleteTodo)

export default router
