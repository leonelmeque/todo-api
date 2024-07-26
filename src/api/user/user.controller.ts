import { Request, Response } from "express";
import { UserService } from "./user.service";
import { extractPrismaErrorMessage } from '../../utils/prismaClient';

const userService = new UserService()

export const createUser = async (req: Request, res: Response) => {
  try {
    const {username, firstName, lastName, age, password} = req.body
    const newUser = await userService.createUser({username, firstName, lastName, age, password, todos: [], viewedTodos: []})
    res.status(201).json(newUser)
  } catch(e) {
    console.error(e)

    const cause = extractPrismaErrorMessage(e)
    res.status(401).json({message: 'Something went wrong', cause: cause || ''})
  }
}

export const getUsers = (req: Request, res: Response) => {
  res.status(201).json([])
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { uuid, scheduledDeletion } = req.body
    const success = await userService.deleteUserById(uuid, scheduledDeletion)

    if(success) res.status(200).json({message: 'User was successfully delete'})
    else res.status(404).json({message: 'User not found'})

  }catch (e) {
    console.error(e)

    const cause = extractPrismaErrorMessage(e)
    res.status(401).json({message: 'Something went wrong', cause: cause || ''})
  }
}

export const getUserById = async(req: Request, res: Response) => {
  try {
    const { uuid } = req.params
    const user = await userService.getUserById(uuid)

    if(user) res.status(200).json(user)
    else res.status(404).json({message: 'User not found'})

  } catch (e) {
    console.error(e)

    const cause = extractPrismaErrorMessage(e)
    res.status(401).json({message: 'Something went wrong', cause: cause || ''})
  }
}


export const updateUser = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params
    const newUserdata = req.body

    const newUser = await userService.updateUser(uuid, newUserdata)

    res.status(200).json(newUser)
  } catch (e) {
    console.error(e)

    const cause = extractPrismaErrorMessage(e)
    res.status(401).json({message: 'Something went wrong', cause: cause || ''})
  }
}
