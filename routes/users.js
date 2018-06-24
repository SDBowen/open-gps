const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

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
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already registered' });
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
    // ***********
    // to clear ESLint no function return (best practice?)
    return undefined;
  });
});

// @Router  GET /users/login
// @Desc    Login user / Return JWT token
// @Access  Public
router.post('/login', (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  // Find user email
  User.findOne({ email }).then(user => {
    // Check user email
    if (!user) {
      return res.status(404).json({ email: 'User not found' });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        res.json({ msg: 'Success' });
      } else {
        return res.status(400).json({ password: 'Password incorrect' });
      }
      // ***********
      // to clear ESLint no function return (best practice?)
      return undefined;
    });
    // ***********
    // to clear ESLint no function return (best practice?)
    return undefined;
  });
});

module.exports = router;
