import { rateLimiter } from './rate-limiter';
import {Request, Response} from 'express'

function test (_req: Request, res: Response)  {
  const date = Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'medium'
  }).format(new Date())
  res.render("test", {
    date
  })
}

function resetLimit (req: Request, res: Response)   {
  if(req.ip) {
    rateLimiter.resetKey(req.ip)
    res.send('Limit reset was reset for this IP ' + req.ip)
  } else {
    res.send('Cannot reset limit')
  }
}


export const endpoints = {
  test,
  resetLimit
}
