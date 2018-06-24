const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data) {
  const errors = {};
  const user = {};

  // Turn empty fields into a string to allow validator testing
  user.email = !isEmpty(data.email) ? data.email : '';
  user.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(user.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(user.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(user.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
