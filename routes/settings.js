const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();

// Load models
const Settings = require('../models/Settings');
const User = require('../models/User');

// @Router  GET /settings/test
// @Desc    Tests settings route
// @Access  Private
router.get('/test', (req, res) => res.json({ msg: 'Settings works' }));

// @Router  GET /settings
// @Desc    Get current user settings
// @Access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Settings.findOne({ user: req.user.id })
      .then(settings => {
        if (!settings) {
          errors.nosettings = 'There are no settings for this user';
          return res.status(404).json(errors);
        }
        res.json(settings);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @Router  POST /settings
// @Desc    Create or edit user settings
// @Access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const settingsFields = {};
    settingsFields.user = req.user.id;

    if (req.body.language) settingsFields.language = req.body.language;

    Settings.findOne({ user: req.user.id }).then(settings => {
      if (settings) {
        // Update settings
        Settings.findOneAndUpdate(
          { user: req.user.id },
          { $set: settingsFields },
          { new: true }
        ).then(updatedSettings => res.json(updatedSettings));
      } else {
        // Create initial settings
        new Settings(settingsFields)
          .save()
          .then(newSettings => res.json(newSettings));
      }
    });
  }
);

module.exports = router;
