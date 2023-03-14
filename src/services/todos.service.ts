import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import { Todo } from "../types";

export const getTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid = req.params.id;
    const ref = await admin.firestore().collection("todos").doc(uid);

    const todo = (await ref.get()).data();

    if (!todo) res.status(404).json({ message: "Todo not found", result: {} });

    res.status(200).json({
      message: "Todo found",
      result: {
        todo,
      },
    });
  } catch (e) {
    next(e);
  }
};

export const getMultipleTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const multipleIDs = req.body.uid as string[];

    let todos: Todo[] = [];

    const snapshot = await admin.firestore().collection("todos").get();

    snapshot.docs.forEach(async (doc) => {
      const todo = { id: doc.id, ...(doc.data() as Omit<Todo, "id">) };
      multipleIDs.includes(doc.id) && (todos as typeof todo[]).push(todo);
    });

    if (!todos)
      res.status(404).json({ message: "Todos not found", result: {} });

    res.status(200).json({
      message: "Todos found",
      result: {
        todos,
      },
    });
  } catch (e) {
    next(e);
  }
};

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid = req.params.id;
    const todoFields = req.body.todo;

    await admin.firestore().collection("todos").doc(uid).update(todoFields);

    res.status(200).json({
      message: "Todo updated",
      result: {},
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const saveTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newTodo = req.body.todo;
    const ref = await admin.firestore().collection("todos").doc();
    await ref.create(newTodo);
    
    res.status(201).json({
      message: "Todo saved",
      result: {
        id: ref.id,
        ...newTodo,
      },
    });
  } catch (e) {
    next(e);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid = req.params.id;

    await admin.firestore().collection("todos").doc(uid).delete();

    res.status(200).json({
      message: "Todo deleted",
      result: {},
    });
  } catch (e) {
    next(e);
  }
};
