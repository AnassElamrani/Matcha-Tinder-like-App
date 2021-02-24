const authVrfy = require('../middleware/autMiddleware');

const express = require('express');
const route = express.Router();

// Checkuser for post method and get method
// route.get('*', authVrfy.requireAuth);
// route.post('*', authVrfy.requireAuth);

module.exports = route; 