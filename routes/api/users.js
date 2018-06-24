const express = require('express');

const router = express.Router();

// Load user model
const User = require('../../models/User');

// @Router  GET /users/test
// @Desc    Tests get route
// @Access  Private
router.get('/test', (req, res) => res.json({ msg: 'Users works' }));

// @Router  GET /users/register
// @Desc    Register user
// @Access  public

router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already registered' });
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.name,
      password: req.body.password
    });
  });
});

module.exports = router;
