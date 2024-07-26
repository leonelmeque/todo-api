import { sessionRepository, userRepository } from '../../repositories/'
import bcrypt from 'bcryptjs';
import { generateToken } from '../../middleware/auth.middleware';
import { UserDTO } from '../user/user.dto';
import jwt from 'jsonwebtoken';

export class AuthService {
  constructor() {
  }

  async signin(username: string, password: string, deviceType: string, deviceId: string)  {
    const user = await userRepository.findUserByUsername(username);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    const existingSession = await sessionRepository.findSessionByDeviceId(deviceId, user.uuid);
    if (existingSession) {
      try {
        jwt.verify(existingSession.token, process.env.JWT_SECRET as string);
        return existingSession.token;
      } catch {
        console.log('Token has expired');
      }
    }

    const token = generateToken(user.uuid);
    await sessionRepository.createSession({ token, uuid: user.uuid, deviceType, deviceId });
    return token;

  }

  async signup({username, password, age, todos, viewedTodos, firstName, lastName}: Omit<UserDTO, 'uuid'>) {
    const userExists = await userRepository.findUserByUsername(username)

    if(!userExists) {
      const hashedPassword = await bcrypt.hash(password, 10)
      return userRepository.createUser({
        username,
        password: hashedPassword,
        age,
        firstName,
        lastName
       })
    }

    return null
  }

  async getUserData(username: string) {
    return userRepository.findUserByUsername(username);
  }

  async signout(token: string) {
    return await sessionRepository.deleteSessionByToken(token)
  }
}
