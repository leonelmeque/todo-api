import "colors";
import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAuthentificatedUser,
  getUser,
  getUsers,
  updateUser,
} from "../services/users.services";
import { User } from "../types";

const router = Router();

router.get("/auth", (req, res) => {
  const user = req.body.user as Partial<User<any>>;
  const authenticatedUser = getAuthentificatedUser(user.username as string, "");

  res.status(200).json({
    message: "User authenticated",
    result: authenticatedUser,
  });
});

router.post("/find/all", (req, res) => {
  const user = getUsers(req.body.uid as string[]);

  res.status(200).json({
    message: "Users found",
    result: user,
  });
});

router.get("/find/:id", (req, res) => {
  const user = getUser(req.params.id as string);

  res.status(200).json({
    message: "User found",
    result: user,
  });
});

router.post("/create", (req, res) => {
  const result = createUser(req.body.user as User<any>);

  res.status(200).json({
    message: "User created",
    result: result,
  });
});

router.delete("/remove", (req, res) => {
  const result = deleteUser(req.body.uid as string);

  res.status(200).json({
    message: "User deleted",
    result: result,
  });
});

router.put("/update", (req, res) => {
  const result = updateUser(req.query.id as string, req.body.user as Partial<User<any>>);

  res.status(200).json({
    message: "User updated",
    result: result,
  });
});

export default router;
