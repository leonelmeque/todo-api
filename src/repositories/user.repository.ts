import { Prisma } from '@prisma/client';
import { prismaClient } from '../utils/prismaClient';

export const createUser = (user: Prisma.UserCreateInput) => {
  return prismaClient.user.create({
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      username: user.username,
      age: user.age,
      todos: user.todos,
    }
  })
}

export const scheduleDeletion = (uuid: string) => {
  return prismaClient.user.update({
    where: {
      uuid: uuid
    },
    data: {
      markedForDeletionAt:  new Date(Date.now() + 60000)
    }
  })
}

export const deleteUserById = (uuid: string) => {
  return prismaClient.user.delete({
    where: {
      uuid: uuid
    }
  })
}

export const findUserById = (uuid: string) => {
  return prismaClient.user.findUnique({
    where: {
      uuid: uuid
    },
    select: {
      firstName: true,
      lastName: true,
      uuid: true,
      username: true,
      age: true,
      todos: true,
      viewedTodos: true,
    }
  })
}

export const updateUserById = (uuid: string, payload: Prisma.UserUpdateInput) => {
    return prismaClient.user.update({
      where: {
        uuid: uuid
      },
      data: {
        ...payload
      }, select: {
        firstName: true,
        lastName: true,
        age: true,
      }
    })
}

export const findUserByUsername = (username: string) => {
  return prismaClient.user.findUnique({
    where: {
      username: username
    }
  })
}

