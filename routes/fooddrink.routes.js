const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

// Requiring Models
const Fooddrink = require('../models/Fooddrink.model.js');
const Review = require('../models/Review.model.js');
const User = require('../models/User.model.js');

// GET Route to display all the Food and Drink Spots in the Database
router.get('/fooddrinkSpots', async (req, res) => {
  try {
    // Get all Food and Drink Spots from our Database via .find() method
    let fooddrinkSpotsFromDB = await Fooddrink.find();
    res.render('categories/fooddrinkSpots/foodndrink.list.hbs', {
      fooddrinkSpots: fooddrinkSpotsFromDB,
    });
  } catch (error) {
    console.log('Error while getting Food and Drink Spots', error);
  }
});

// GET Route to display info about a specific Food and Drink Spots
router.get('/fooddrinkSpots/:fooddrinkId', isLoggedIn, async (req, res) => {
  try {
    //ES6 Object Destructuring with fooddrinkId route param
    const { fooddrinkId } = req.params;

    // Find Food and Drink Spot via its Id inside the Database
    let foundFooddrinkSpot = await Fooddrink.findById(fooddrinkId);

    const users = await User.find();
    // populate
    await foundFooddrinkSpot.populate('reviews name');
    await foundFooddrinkSpot.populate({
      path: 'reviews',
      populate: {
        path: 'name',
        model: 'User',
      },
    });
    res.render('categories/fooddrinkSpots/foodndrink.detail.hbs', {
      fooddrink: foundFooddrinkSpot,
      users,
    });
  } catch (error) {
    console.log(error);
  }
});

// REVIEWS ACTIONS
router.post('/review/create/:fooddrinkId', async (req, res) => {
  try {
    const { fooddrinkId } = req.params;
    const { content, author } = req.body; // req: info about the request; what was sent through the body
    const newReview = await Review.create({ content, author });

    // update the Food and Drink Spot with new review that was created
    const fooddrinkUpdate = await Fooddrink.findByIdAndUpdate(fooddrinkId, {
      $push: { reviews: newReview._id },
    });

    // add the review to the user
    const userUpdate = await User.findByIdAndUpdate(author, {
      $push: { reviews: newReview._id },
    });
    res.redirect(`/fooddrinkSpots/${fooddrinkId}`);
  } catch (error) {
    console.log(error);
  }
});
// the :fooddrinkId is going to wait for a value, is a parameter

router.post('/review/delete/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  try {
    const removedReview = await Review.findByIdAndRemove(reviewId);
    await User.findByIdAndUpdate(removedReview.author, {
      $pull: { reviews: removedReview._id },
    });
    res.redirect('/fooddrinkSpots');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
