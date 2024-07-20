import { Todo } from '@prisma/client';

export const mockedTodo: Todo = {
    name: 'Get back to engineering',
    description: 'A book that teaches good engineering practices',
    user_uuid: '12345',
    id: "55478403-2d30-44de-8bbe-cde39092886b",
    createdAt: new Date("2024-07-20T21:32:42.782Z")
}


export const mockedTodoArray = [
  mockedTodo,
  {
    ...mockedTodo,
    id: "c0c8ee17-2e87-44c9-8085-ab5a55c83ec8",
  }
]
