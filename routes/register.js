const express = require('express');

const { check, validationResult } = require('express-validator');

const router = express.Router();

const validations = [
  check('firstName')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('A Name is required'),
  check('lastName')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('A Family is required'),
  check('userName')
    .trim()
    .isLength({ min: 6 })
    .escape()
    .withMessage('An Username is required'),
  check('password')
    .trim()
    .isLength({ min: 8 })
    .escape()
    .withMessage('A Password is required'),
  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('An E-mail is required'),
];

module.exports = params => {
  const { registerService } = params;
  router.get('/', async (request, response, next) => {
    try {
      const register = await registerService.getList();

      const errors = request.session.register ? request.session.register.errors : false;

      const successMessage = request.session.register ? request.session.register.message : false;

      request.session.register = {};

      return response.render('layout', {
        pageTitle: 'Registers',
        template: 'register/index',
        register,
        errors,
        successMessage,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post('/', validations, async (request, response, next) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty) {
        request.session.register = {
          errors: errors.array(),
        };
        return response.redirect('/register');
      }

      const { firstName, lastName, sex, birthDay, userName, password, email } = request.body;

      await registerService.addEntry(firstName, lastName, sex, birthDay, userName, password, email);

      request.session.register = {
        message: 'You are Registered Now!',
      };
      return response.redirect('/register');
    } catch (err) {
      return next(err);
    }
  });
  return router;
};
