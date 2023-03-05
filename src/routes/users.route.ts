import "colors";
import { Router } from "express";
import {
  createUser,
  deleteUser,
  // getAuthentificatedUser,
  getAuthUser,
  // getUsers,
  updateUser,
} from "../services/users.services";

const router = Router();

// find user by id
router.get("/find/:id", getAuthUser);

// create user with firebase
router.post("/create", createUser);

// remove user from firebase
router.delete("/remove", deleteUser);

// update user from firebase
router.put("/update", updateUser)

export default router;
