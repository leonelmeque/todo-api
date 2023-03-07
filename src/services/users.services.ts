import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";
import { User } from "../types";
import { NextFunction, Request, Response } from "express";

export const createUserCustomToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid = req.body.id as string;

    const customToken = await getAuth().createCustomToken(uid);

    res.status(200).json({
      message: "Custom token created",
      result: {
        customToken,
      },
    });

  } catch (error) {
    next(error);
  }
};

export const revokeUserCustomToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uid = req.params.id as string;

    await getAuth().revokeRefreshTokens(uid);

    res.status(200).json({
      message: "Custom token revoked",
      result: {},
    });

  } catch (error) {
    next(error);
  }
 }

export const getAuthUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  try {
    const snapshot = await admin.firestore().collection("users").doc(id).get();
    const userRecord = snapshot.data() as User<any>;

    if (!userRecord) {
      throw new Error("User not found");
    }

    res.status(200).json({
      message: "User found",
      result: {
        ...userRecord,
        id: snapshot.id,
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body?.user as Partial<User<any>>;
  const payload: Partial<User> = {
    id: user.id,
    email: user.email,
    username: user.username,
    firstname: "",
    lastname: "",
    birthdate: "",
    avatar: "",
    todos: [],
    preferences: {},
  };

  try {
    await admin
      .firestore()
      .collection("users")
      .doc(payload.id as string)
      .set({
        ...payload,
      });

    res.status(200).json({
      message: "User created",
      result: {
        ...payload,
      },
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid = req.query.uid as string;
    const user = req.body.user as Partial<User<any>>;

    await admin.firestore().collection("users").doc(uid).update(user);

    res.status(200).json({
      message: "User updated",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.body.uid as string;

    await admin.firestore().collection("users").doc(id).delete();
    await getAuth().deleteUser(id);

    res.status(200).json({
      message: "User deleted",
      result: {},
    });
  } catch (err) {
    next(err);
  }
};
