const express = require('express');

const { check, validationResult } = require('express-validator');

const router = express.Router();

const validations = [
  check('name')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('A Name is required'),
  check('mobile')
    .trim()
    .isLength({ min: 10 })
    .escape()
    .withMessage('A Mobile Number is required'),
  check('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('An Email is required'),
  check('subject')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('A Subject is required'),
  check('message')
    .trim()
    .isLength({ min: 6 })
    .escape()
    .withMessage('A Message is required'),
];

module.exports = params => {
  const { feedbackService } = params;
  router.get('/', async (request, response, next) => {
    try {
      const feedback = await feedbackService.getList();

      const errors = request.session.feedback ? request.session.feedback.errors : false;

      const successMessage = request.session.feedback ? request.session.feedback.message : false;

      request.session.feedback = {};

      return response.render('layout', {
        pageTitle: 'Feedback',
        template: 'feedback/index',
        feedback,
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
        request.session.feedback = {
          errors: errors.array(),
        };
        return response.redirect('/feedback');
      }

      const { name, mobile, email, subject, message } = request.body;

      await feedbackService.addEntry(name, mobile, email, subject, message);

      request.session.feedback = {
        message: 'Thank you for your Feedback!',
      };
      return response.redirect('/feedback');
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
