console.log(``);
console.log(`Express Server by NodeJS - HTML(EJS)/CSS(SCSS) - SALAR MUHAMMADI`);
console.log(``);

const express = require('express');

const path = require('path');

const cookieSession = require('cookie-session');

const createError = require('http-errors');

const bodyParser = require('body-parser');

const RegisterService = require('./services/registerService');

const FeedbackService = require('./services/feedbackService');

const registerService = new RegisterService('./data/register.json');

const feedbackService = new FeedbackService('./data/feedback.json');

const routes = require('./routes');

const app = express();
const port = process.env.PORT ||6119;

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['xkb661199', '991166bkx'],
  }),
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/static')));

app.use(
  '/',
  routes({
    registerService,
    feedbackService,
  }),
);

app.use((Request, Response, next) => {
  return next(createError(404, 'File not found'));
});
app.use((err, request, response, next) => {
  response.locals.message = err.message;
  const status = err.status || 500;
  response.locals.status = status;
  response.status(status);
  response.render('error');
});
app.listen(port, () => {
  console.log(`Express Server listening on port ${port}!`);
});
