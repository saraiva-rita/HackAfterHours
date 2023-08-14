// Express Tool that helps us to create Routes outside app.js
const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedIn');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* USER PROFILE */
router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { userInSession: req.session.currentUser });
});

module.exports = router;
