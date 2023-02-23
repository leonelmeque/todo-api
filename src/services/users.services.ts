import db from "../db/users.json";
import type { BasicUserInfo, User } from "../types";
import { generateId } from "../utils/generateID";
import { writeToDB } from "../utils/writedb";

export const getAuthentificatedUser = (username: string, _password: string) => {
  const authenticatedUser: User<any> | undefined = db.users.find(
    (user) => user.username === username
  );

  if (!authenticatedUser) {
    throw new Error("User not found");
  }

  return authenticatedUser;
};

export const getUser = (id: string) => {
  const user: BasicUserInfo | undefined = db.users.find(
    (user) =>
      user.id === id && {
        id,
        username: user.username,
        avatar: user.avatar,
      }
  );

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const getUsers = (id: string[]) => {
  const users: BasicUserInfo[] = db.users.filter(
    (user) =>
      id.includes(user.id) && {
        id,
        username: user.username,
        avatar: user.avatar,
      }
  );

  if (!users) {
    throw new Error("Users not found");
  }

  return users;
};

export const createUser = (user: User<any>) => {
  const id = generateId();
  db.users.push({
    ...user,
    //@ts-ignore
    todos: user.todos,
    id,
  });

  writeToDB("users", JSON.stringify(db));

  return {
    ...user,
    id,
  };
};

export const updateUser = (id: string, user: Partial<User<any>>) => {
  const index = db.users.findIndex((user) => user.id === id);

  if (index === -1) {
    throw new Error("User not found");
  }

  //@ts-ignore
  db.users[index] = {
    ...db.users[index],
    ...user,
  };

  writeToDB("users", JSON.stringify(db));

  return db.users[index];
};

export const deleteUser = (id: string) => {
  const index = db.users.findIndex((user) => user.id === id);

  if (index === -1) {
    throw new Error("User not found");
  }

  db.users.splice(index, 1);

  writeToDB("users", JSON.stringify(db));

  return db.users[index];
};
