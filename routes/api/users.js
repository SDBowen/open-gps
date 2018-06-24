const express = require('express');

const router = express.Router();

// @Router  GET /users/test
// @Desc    Tests get route
// @Access  Private
router.get('/test', (req, res) => res.json({ msg: 'Users works' }));

module.exports = router;
