import {User} from "./user.model";
import path from "path";
import {promises as fs} from 'fs'

export class UserService {
  private users: User [] = []
  private dbPath: string = path.join(__dirname, '../../', 'db/users.json')

  constructor() {
    fs.readFile(this.dbPath).then((data) => {
      this.users = JSON.parse(data.toString())
    })
  }

  getUsers(): User[] {
    return this.users
  }

  createUser({ username, firstName, lastName,age}: Omit<User, 'createdTodos'| 'uuid'>) {
    const newUser = new User(username, firstName,lastName,age)
    this.users.push(newUser)
    return newUser
  }

  getUserById(uuid: string): User | undefined {
    return this.users.find(user=> user.uuid === uuid)
  }

  deleteUserById(uuid: string): boolean {
    const index = this.users.findIndex(user => user.uuid == uuid)

    if(index !== -1) {
      this.users.splice(index, 1)
      return true
    }

    return false
  }

  updateUser(newUserData: User): User {
    const prevUser = this.users.find((user) => user.uuid === newUserData.uuid)
    return {...prevUser, ...newUserData}
  }
}
