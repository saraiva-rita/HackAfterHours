// Express Tool that helps us to create Routes outside app.js
const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedIn');
const User = require('../models/User.model');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* USER PROFILE */
router.get('/profile', isLoggedIn, async (req, res) => {
  try {
    const user = req.session.currentUser;
    let profileInfo = await User.findById(user._id)
      .populate('favoriteLeisure')
      .populate('favoriteCulture')
      .populate('favoriteFooddrink')
      .populate('review');

    res.render('profile', profileInfo);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
