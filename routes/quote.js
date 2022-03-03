const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response, next) => {
    return response.render('layout', {
      pageTitle: 'Quotes',
      template: 'quote/index',
    });
  });
  return router;
};
