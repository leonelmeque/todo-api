import { Request, Response } from "express";
import { UserService } from "./user.service";

const userService = new UserService()

export const createUser = (req: Request, res: Response) => {
  const {username, firstName, lastName, age} = req.body
  const newUser = userService.createUser({username, firstName, lastName, age})
  res.status(201).json(newUser)
}

export const getUsers = (req: Request, res: Response) => {
  const allUsers = userService.getUsers()
  res.status(201).json(allUsers)
}

export const deleteUser = (req: Request, res: Response) => {
  const { uuid } = req.body
  const success = userService.deleteUserById(uuid)

  if(success) res.status(200).json({message: 'User was successfully delete'})
  else res.status(404).json({message: 'User not found'})
}

export const getUserById = (req: Request, res: Response) => {
  const { uuid } = req.params
  const user = userService.getUserById(uuid)

  if(user) res.status(200).json(user)
  else res.status(404).json({message: 'User not found'})
}


export const updateUser = (req: Request, res: Response) => {
  const { uuid } = req.params
  const newUserdata = req.body

  const newUser = userService.updateUser(newUserdata)

  res.status(200).json(newUser)

}
