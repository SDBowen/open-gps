const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
  const errors = {};
  const user = {};

  // Turn empty fields into a string to allow validator testing
  user.name = !isEmpty(data.name) ? data.name : '';
  user.email = !isEmpty(data.email) ? data.email : '';
  user.password = !isEmpty(data.password) ? data.password : '';
  user.passwordConfirm = !isEmpty(data.passwordConfirm)
    ? data.passwordConfirm
    : '';

  if (Validator.isEmpty(user.name)) {
    errors.name = 'Name field is required';
  }

  if (!Validator.isLength(user.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(user.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(user.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(user.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(user.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be atleast 6 characters';
  }

  if (Validator.isEmpty(user.passwordConfirm)) {
    errors.passwordConfirm = 'Confirm password field is required';
  }

  if (!Validator.equals(user.password, user.passwordConfirm)) {
    errors.password = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
