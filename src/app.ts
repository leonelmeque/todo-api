import express from  'express'
import path from  'path'
import cookieParser from  'cookie-parser'
import logger from  'morgan'

import indexRouter from './routes/index'
import usersRouter from './routes/users'
import todosRouter from './api/todos/todo.routes'

let app = express();

const API_PREFIX = '/api';
const API_VERSION = '/v1';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(`${API_PREFIX}${API_VERSION}/todos`, todosRouter)

export default app
