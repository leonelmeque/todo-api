import express from  'express'
import path from  'path'
import cookieParser from  'cookie-parser'
import logger from  'morgan'
import { verifyToken } from './middleware/auth.middleware';
import cors from 'cors';
import usersRouter from './api/user/user.routes'
import todosRouter from './api/todos/todo.routes'
import authRouter from './api/auth/auth.routes'
import { constants, corsOptions, endpoints, rateLimiter } from './utils/';

const {API_PREFIX, API_VERSION} = constants
const app = express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(API_PREFIX + '/', rateLimiter)
app.use('/api/test', endpoints.test)

if(process.env.ENV === 'DEV') {
  app.use('/reset-limit', endpoints.resetLimit)
}

app.use('/auth', authRouter)
app.use(`${API_PREFIX}${API_VERSION}/todos`, verifyToken, todosRouter)
app.use(`${API_PREFIX}${API_VERSION}/users`, verifyToken,usersRouter)

export default app
