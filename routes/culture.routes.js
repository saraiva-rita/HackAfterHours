const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

// Requiring Models
const Culture = require('../models/Culture.model.js');
const Review = require('../models/Review.model.js');
const User = require('../models/User.model.js');

// GET Route to display all the Culture Spots in the Database
router.get('/cultureSpots', async (req, res) => {
  try {
    // Get all Culture Spots from our Database via .find() method
    let cultureSpotsFromDB = await Culture.find();
    res.render('categories/cultureSpots/culture.list.hbs', {
      cultureSpots: cultureSpotsFromDB,
    });
  } catch (error) {
    console.log('Error while getting Culture Spots', error);
  }
});

// GET Route to display info about a specific Culture Spot
router.get('/cultureSpots/:cultureId', isLoggedIn, async (req, res) => {
  try {
    //ES6 Object Destructuring with cultureId route param
    const { cultureId } = req.params;

    // Find Culture Spot via its Id inside the Database
    let foundCultureSpot = await Culture.findById(cultureId);

    const users = await User.find();
    // populate
    await foundCultureSpot.populate('reviews name');
    await foundCultureSpot.populate({
      path: 'reviews',
      populate: {
        path: 'name',
        model: 'User',
      },
    });
    res.render('categories/cultureSpots/culture.detail.hbs', {
      culture: foundCultureSpot,
      users,
    });
  } catch (error) {
    console.log(error);
  }
});

// REVIEWS ACTIONS
router.post('/review/create/:cultureId', async (req, res) => {
  try {
    const { cultureId } = req.params;
    const { content, author } = req.body; // req: info about the request; what was sent through the body
    const newReview = await Review.create({ content, author });

    // update the Culture Spot with new review that was created
    const cultureUpdate = await Culture.findByIdAndUpdate(cultureId, {
      $push: { reviews: newReview._id },
    });

    // add the review to the user
    const userUpdate = await User.findByIdAndUpdate(author, {
      $push: { reviews: newReview._id },
    });
    res.redirect(`/cultureSpots/${cultureId}`);
  } catch (error) {
    console.log(error);
  }
});
// the :cultureId is going to wait for a value, is a parameter

router.post('/review/delete/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  try {
    const removedReview = await Review.findByIdAndRemove(reviewId);
    await User.findByIdAndUpdate(removedReview.author, {
      $pull: { reviews: removedReview._id },
    });
    res.redirect('/cultureSpots');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
