import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

import { prismaClient } from '../src/utils/prismaClient'
import { mockedTodo } from './mocks/todo.mocks';
import { mockedUser } from './mocks/user.mocks';

jest.mock('../src/utils/prismaClient', ()=> ({
  __esModule: true,
  prismaClient: mockDeep<PrismaClient>()
}))


beforeEach(() => {
  mockReset(prismaMock)
  // Todos
  prismaMock.todo.create.mockResolvedValue(mockedTodo)
  prismaMock.todo.update.mockResolvedValue(mockedTodo)
  prismaMock.todo.delete.mockResolvedValue(mockedTodo)
  prismaMock.todo.findUnique.mockResolvedValue(mockedTodo)

  // Users
  prismaMock.user.create.mockResolvedValue(mockedUser)
  prismaMock.user.update.mockResolvedValue(mockedUser)
  prismaMock.user.delete.mockResolvedValue(mockedUser)
  prismaMock.user.findUnique.mockResolvedValue(mockedUser)
  prismaMock.user.findMany.mockResolvedValue([mockedUser])
})

export const prismaMock = prismaClient as unknown as DeepMockProxy<PrismaClient>
