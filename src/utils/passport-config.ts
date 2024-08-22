import passport from 'passport'
import localStrategy from 'passport-local'
import bcrypt from 'bcrypt'
import * as userRepository from '../repositories/user-repository'

passport.use(new localStrategy.Strategy(async (username, password, done)=> {
  try {
    const user = await userRepository.findUserByUsername(username)
    if(!user) return done(null, false, {message: 'Invalid username or password'})
  }catch(err) {

  }
}))
