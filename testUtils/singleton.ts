import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

import { prismaClient } from '../src/utils/prismaClient'
import { mockedTodo, mockedTodoArray } from './mocks/todo.mocks';

jest.mock('../src/utils/prismaClient', ()=> ({
  __esModule: true,
  prismaClient: mockDeep<PrismaClient>()
}))


beforeEach(() => {
  mockReset(prismaMock)
  prismaMock.todo.create.mockResolvedValue(mockedTodo)
  prismaMock.todo.update.mockResolvedValue(mockedTodo)
  prismaMock.todo.delete.mockResolvedValue(mockedTodo)
  prismaMock.todo.findUnique.mockResolvedValue(mockedTodo)
})

export const prismaMock = prismaClient as unknown as DeepMockProxy<PrismaClient>
