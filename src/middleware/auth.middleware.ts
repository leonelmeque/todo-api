import {NextFunction, Request, Response} from "express";

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
