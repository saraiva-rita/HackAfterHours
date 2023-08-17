// Express Tool that helps us to create Routes outside app.js
const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedIn');
const User = require('../models/User.model');

/* GET Landing Page */
router.get('/', (req, res, next) => {
  res.render('landingpage', {layout: 'landingLayout.hbs'});
});
/* GET home page */
router.get('/index', (req, res, next) => {
  res.render('index');
});
/* GET About */
router.get('/about', (req, res, next) => {
  res.render('about');
});
/* GET Contacts */
router.get('/contacts', (req, res, next) => {
  res.render('contacts');
});

/* USER PROFILE */
router.get('/profile', isLoggedIn, async (req, res) => {
  try {
    const user = req.session.currentUser;
    let profileInfo = await User.findById(user._id)
      .populate('favoriteLeisure')
      .populate('favoriteCulture')
      .populate('favoriteFooddrink')
      .populate('reviewCulture')
      .populate('reviewLeisure')
      .populate('reviewFooddrink');

    res.render('profile', profileInfo);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
