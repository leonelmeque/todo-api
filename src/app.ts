import express from  'express'
import path from  'path'
import cookieParser from  'cookie-parser'
import logger from  'morgan'

import usersRouter from './api/user/user.routes'
import todosRouter from './api/todos/todo.routes'
import {decodeBasicAuth} from "./middleware/auth.middleware";

let app = express();

const API_PREFIX = '/api';
const API_VERSION = '/v1';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`${API_PREFIX}${API_VERSION}/todos`, decodeBasicAuth, todosRouter)
app.use(`${API_PREFIX}${API_VERSION}/users`, usersRouter)

export default app
