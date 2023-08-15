const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

// Requiring Models
const Leisure = require('../models/Leisure.model.js');
const Review = require('../models/Review.model.js');
const User = require('../models/User.model.js');

// GET Route to display all the Leisure Spots in the Database
router.get('/leisureSpots', async (req, res) => {
  try {
    // Get all Leisure Spots from our Database via .find() method
    let leisureSpotsFromDB = await Leisure.find();
    res.render('categories/leisureSpots/leisure.list.hbs', {
      leisureSpots: leisureSpotsFromDB,
    });
  } catch (error) {
    console.log('Error while getting Leisure Spots', error);
  }
});

// GET Route to display info about a specific Leisure Spot
router.get('/leisureSpots/:leisureId', isLoggedIn, async (req, res) => {
  try {
    //ES6 Object Destructuring with leisureId route param
    const { leisureId } = req.params;

    // Find Leisure Spot via its Id inside the Database
    let foundLeisureSpot = await Leisure.findById(leisureId);
    //populate
    await foundLeisureSpot.populate({
      path: 'reviews',
      populate: {
        path: 'author',
        model: 'User',
      },
    });

    res.render('categories/leisureSpots/leisure.detail.hbs', foundLeisureSpot);
  } catch (error) {
    console.log(error);
  }
});

// FAVORITES SPOTS Actions
router.post(
  '/leisureSpots/addFavs/:leisureId/',
  isLoggedIn,
  async (req, res, next) => {
    const { leisureId } = req.params;
    const currentUser = req.session.currentUser;
    try {
      const favSpot = await User.findByIdAndUpdate(currentUser._id, {
        $push: { favoriteLeisure: leisureId },
      });
      res.redirect(`/leisureSpots/${leisureId}`);
    } catch (error) {
      console.log(error);
    }
  }
);

// REVIEWS ACTIONS
router.post('/review/leisure/:leisureId', async (req, res) => {
  try {
    const { leisureId } = req.params;
    const { content } = req.body; // req: info about the request; what was sent through the body
    const user = req.session.currentUser;
    const newReview = await Review.create({ content });

    // update the Leisure Spot with new review that was created
    const leisureUpdate = await Leisure.findByIdAndUpdate(leisureId, {
      $push: { reviews: newReview._id },
    });

    const reviewUpdate = await Review.findByIdAndUpdate(newReview._id, {
      $push: { author: user._id },
    });

    // add the review to the user
    const userUpdate = await User.findByIdAndUpdate(user._id, {
      $push: { review: newReview._id },
    });
    res.redirect(`/leisureSpots/${leisureId}`);
  } catch (error) {
    console.log(error);
  }
});
// the :leisureId is going to wait for a value, is a parameter

router.post('/review/delete/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  try {
    const removedReview = await Review.findByIdAndRemove(reviewId);
    await User.findByIdAndUpdate(removedReview.author, {
      $pull: { reviews: removedReview._id },
    });
    res.redirect('/leisureSpots');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
