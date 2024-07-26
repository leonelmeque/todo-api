import { Request, Response } from 'express'
import { AuthService } from './auth.service';

const authService = new AuthService()

export const userSignin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const  userAgent = req?.headers['user-agent'] as string
    const deviceId = req?.headers['device-id'] as string


    // Re-evaluate these checks to see if they are necessary
    if(userAgent === undefined) {
       res.status(400).json({message: 'No user agent was found'})
    }

    // Re-evaluate these checks to see if they are necessary
    if(typeof deviceId === 'undefined' || deviceId === '' || deviceId === null) {
      res.status(400).json({message: 'No device id was found'})
    }

    const token = await authService.signin(username, password, userAgent, deviceId)

    if(token) {
      const userData = await authService.getUserData(username)

     if(!userData) {
       return res.status(400).json({message: 'User not found'})
     }

      const { password, ...user } = userData

      res.setHeader('Authorization', `Bearer ${token}`)
      res.status(200).json({  message: 'Login success', user })
      return
    }

    res.status(401).json({message: 'invalid credentials'})
  }catch (e) {
    console.error(e)
    res.status(500).json({message: 'Internal server error'})
  }
}

export const userSignup = async (req: Request, res: Response) => {
  try {
    const { username, password, firstName, lastName, age, todos, viewedTodos } = req.body

    const createUser = await authService.signup({username, password, firstName, lastName, age, todos, viewedTodos})

    if(!createUser) {
      return res.status(400).json({message: 'User already exists'})
    }

    res.status(201).json({message : 'User registered successfully'})

  } catch (e) {
    console.error(e)
    res.status(500).json({message: 'Internal server error'})
  }
}


export const userSignout = async (req: Request, res: Response) => {
  try {

    const token = req?.headers['authorization']?.split(' ')[1]

    if(!token) {
      return res.status(400).json({message: 'Token is required'})
    }

    const signout = await authService.signout(token)

    if(signout) {
      return res.status(200).json({message: 'Signout success'})
    }

    res.status(400).json({message: 'Invalid token'})

  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal server error' })
  }
}
