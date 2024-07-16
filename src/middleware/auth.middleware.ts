import {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken'

type UserJWT  = {
  userId: string
}

export function decodeBasicAuth  (req: Request, res: Response, next: NextFunction) {
  const authHeader = req?.headers?.authorization

  if(!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({message: 'Missing or invalid authorization header'})
  }

  const base64Credentials = authHeader.split(' ')[1]
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
  const [username, password] = credentials.split(':')

  if(!username || !password) {
    return res.status(401).json({message: 'Invalid authorization credentials'})
  }

  req.body.username = username
  req.body.password = password

  next()
}

const secretKey = process.env?.JWT_SECRET || 'your-secret-token'

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' })
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if(!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Missing or invalid authorization header'
    })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, secretKey) as UserJWT
    req.body.userId = decoded.userId
    next()
  } catch (err) {
     return res.status(401).json({message: 'Invalid token'})
  }
}
