import "colors";
import express from "express";
import {
  deleteTodo,
  getMultipleTodos,
  getTodoById,
  saveTodos,
  updateTodo,
} from "../services/todos.service";

const router = express.Router();

router.get("/find/:id", getTodoById);

router.post("/find-multiple", getMultipleTodos);

router.post("/save", saveTodos);

router.put("/update/:id", updateTodo);

router.delete("/remove/:id", deleteTodo);

export default router;
