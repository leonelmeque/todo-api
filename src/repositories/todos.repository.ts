import { Prisma } from '@prisma/client'
import { prismaClient } from '../utils/prismaClient';

export const findTodoById = async (id: string) => {
  return prismaClient.todo.findUnique({
    where: {
      id
    }
  })
}

export const findTodoByUserId = async (uuid: string) => {
  return prismaClient.todo.findMany({
    where:{
        user_uuid: uuid
    }
  })
}

export const createTodo = async (todo: Pick<Prisma.TodoCreateInput, 'name'| 'description'>, user_uuid: string) => {
 return prismaClient.todo.create({
   data: {
     name: todo.name,
     description: todo.description,
     creator: {
       connect: {
         uuid: user_uuid
       }
     }
   },
 });
}

export const updateTodo = async (todo: Prisma.TodoUpdateInput) => {
  const { name, description, id } = todo

  return prismaClient.todo.update({
    where: {
      id: id as string
    },
    data: {
      name,
      description
    }
  })
}

export const deleteTodo = async (id: string) => {
  return prismaClient.todo.delete({
    where: {
      id: id
    }
  })
}

