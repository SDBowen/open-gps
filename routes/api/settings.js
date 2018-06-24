const express = require('express');

const router = express.Router();

// @Router  GET /settings/test
// @Desc    Tests settings route
// @Access  Private
router.get('/test', (req, res) => res.json({ msg: 'Settings works' }));

module.exports = router;
