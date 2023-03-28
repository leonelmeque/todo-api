import "colors";
import { Router } from "express";
import {
  createUser,
  createUserCustomToken,
  deleteUser,
  getAuthUser,
  revokeUserCustomToken,
  updateUser,
} from "../services/users.services";

const router = Router();

// find user by id
router.get("/find/:id", getAuthUser);

// create user with firebase
router.post("/create", createUser);

// create user custom token with firebase
router.post("/custom-token", createUserCustomToken);

// revoke user custom token with firbase
router.delete("/revoke-custom-token/:id", revokeUserCustomToken);

// remove user from firebase
router.delete("/remove", deleteUser);

// update user from firebase
router.put("/update/:id", updateUser);

export default router;
