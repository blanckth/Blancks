const express = require('express');

const registerRoute = require('./register');

const feedbackRoute = require('./feedback');

const quoteRoute = require('./quote');

const router = express.Router();

module.exports = params => {
  router.get('/', (request, response) => {
    response.render('layout', { template: '/landingPage/index' });
  });
  router.use('/register', registerRoute(params));
  router.use('/feedback', feedbackRoute(params));
  router.use('/quote', quoteRoute(params));
  return router;
};
