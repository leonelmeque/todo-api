import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";
import { User } from "../types";
import { NextFunction, Request, Response } from "express";

export const getAuthUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id as string;

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
    const userRecord = await getAuth().createUser({
      email: payload.email,
      password: payload.password,
      disabled: false,
      emailVerified: false,
    });

    await admin
      .firestore()
      .collection("users")
      .doc(userRecord.uid)
      .set({
        ...payload,
      });

    res.status(200).json({
      message: "User created",
      result: {
        ...payload,
        id: userRecord.uid,
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
