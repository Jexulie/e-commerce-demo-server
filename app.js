const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');

const config = require('./config/config.json');

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);

mongoose.connect(config.database.connString, {useNewUrlParser: true, useCreateIndex: true});
mongoose.Promise = Promise;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

module.exports = app;
