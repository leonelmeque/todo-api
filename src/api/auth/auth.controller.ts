import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { generateToken } from '../../middleware/auth.middleware';

const cachedUsers: Record<string, {password: string }> = {}

export const userSignin = async (req: Request, res: Response) => {

  const { username, password } = req.body

  const user = cachedUsers[username]

  if(!user) {
    return res.status(401).json({message: 'invalid credentials'})
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if(!isPasswordValid) {
    return res.status(401).json({message: 'invalid credentials'})
  }

  const token = generateToken(username)

  res.status(200).json({ token })
}

export const userSignup = async (req: Request, res: Response) => {
   const { username, password } = req.body
  if(cachedUsers[username]) {
    return res.status(400).json({message: 'User already exists'})
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  cachedUsers[username] = { password: hashedPassword }

  res.status(201).json({message : 'User registered successfully'})
}
