import express from  'express'
import path from  'path'
import cookieParser from  'cookie-parser'
import logger from  'morgan'
import { verifyToken } from './middleware/auth.middleware';


import usersRouter from './api/user/user.routes'
import todosRouter from './api/todos/todo.routes'
import authRouter from './api/auth/auth.routes'

let app = express();

const API_PREFIX = '/api';
const API_VERSION = '/v1';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/auth', authRouter)
app.use(`${API_PREFIX}${API_VERSION}/todos`, verifyToken, todosRouter)
app.use(`${API_PREFIX}${API_VERSION}/users`, verifyToken,usersRouter)

export default app
