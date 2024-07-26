import { User } from "./user.model";
import { UserDTO } from './user.dto';
import { userRepository } from '../../repositories/'

export class UserService {

  constructor() {}

  async createUser(user: Omit<UserDTO, 'uuid'>) {
    return userRepository.createUser({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
      age: user.age,
    })
  }

  async getUserById(uuid: string) {
    return userRepository.findUserById(uuid)
  }

  async deleteUserById(uuid: string, scheduleDeletion = true) {
    if(scheduleDeletion) return userRepository.scheduleDeletion(uuid)
    return userRepository.deleteUserById(uuid)
  }

  async updateUser(uuid: string, newUserData: Partial<User>) {
    return userRepository.updateUserById(uuid, {
      ...newUserData as unknown as Parameters<typeof userRepository.updateUserById>[1]
    })
  }

  async findUserById(uuid: string) {
    return userRepository.findUserById(uuid)
  }
}
