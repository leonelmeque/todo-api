import "colors";
import express from "express";
import * as todoServices from "../services/todos.service";

const router = express.Router();

router.get("/", (_req, res) => {
  const data = todoServices.getTodos();
  res.status(200).send(data);
});

router.get("/find/:id", (req, res) => {
  const data = todoServices.getTodoById(req.params.id);

  res.send({
    result: data,
  });
});

router.get("/all", (req, res) => {
  const arr = (req.query.ids as string).replace(" ", "").split(/,/g);
  console.log(arr);
  const data = todoServices.getAllTodosById(arr);

  res.status(200).send({
    message: "List of all todos",
    result: data || [],
  });
});

router.post("/save", (req, res) => {
  todoServices.saveTodo(req.body);

  res.status(200).send({
    message: "Todo saved!",
    todo: req.body,
  });
});

router.put("/update/:id", (req, res) => {
  const data = todoServices.updateTodos(req.params.id, req.body);

  res.status(200).send({
    message: "Todo has been updated!",
    todo: data,
  });
});

router.delete("/remove/:id", (req, res) => {
  const result = todoServices.deleteTodo(req.params.id);

  if (result) {
    res.status(200).send({
      message: "Todo removed!",
    });
  } else {
    res.status(404).send({
      message: "Todo not found!",
    });
  }
});

export default router;
