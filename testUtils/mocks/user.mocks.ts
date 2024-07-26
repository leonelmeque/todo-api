import { User } from '@prisma/client';


export const mockedUser: User = {
  username: 'testUser',
  lastName: 'testLastName',
  firstName: 'testFirstName',
  uuid: 'testUUID',
  password: 'testPassword',
  age: 21
}
