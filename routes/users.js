const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/config');
const passport = require('passport');

const router = express.Router();

// Load input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

// Load user model
const User = require('../models/User');

// @Router  GET /users/test
// @Desc    Tests get route
// @Access  Private
router.get('/test', (req, res) => res.json({ msg: 'Users works' }));

// @Router  GET /users/register
// @Desc    Register user
// @Access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already registered';
      return res.status(400).json(errors);
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    bcrypt.genSalt(10, (bcryptErr, salt) => {
      bcrypt.hash(newUser.password, salt, (hashErr, hash) => {
        if (hashErr) throw hashErr;
        newUser.password = hash;
        newUser
          .save()
          .then(completeUser => res.json(completeUser))
          .catch(err => console.log(err));
      });
    });
    // ****************************************************
    // to clear ESLint no function return (best practice?)
    return undefined;
  });
  // ****************************************************
  // to clear ESLint no function return (best practice?)
  return undefined;
});

// @Router  GET /users/login
// @Desc    Login user / Return JWT token
// @Access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email } = req.body;
  const { password } = req.body;

  // Find user email
  User.findOne({ email }).then(user => {
    // Check user email
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // JWT payload
        const payload = { id: user.id, name: user.name };

        // Sign token
        jwt.sign(payload, keys.tokenKey, { expiresIn: 36000 }, (err, token) => {
          res.json({ success: true, token: `Bearer ${token}` });
        });
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
      // *************************************
      // to clear ESLint no function return (best practice?)
      return undefined;
    });
    // ****************************************************
    // to clear ESLint no function return (best practice?)
    return undefined;
  });
  // ****************************************************
  // to clear ESLint no function return (best practice?)
  return undefined;
});

// @Router  GET /users/current
// @Desc    Return current user
// @Access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) =>
    res.json({
      id: req.user.id,
      name: req.user.name
    })
);

module.exports = router;
