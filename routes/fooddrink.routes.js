const express = require('express');
const router = express.Router();

// Requiring Models
const Fooddrink = require('../models/Fooddrink.model.js');
const Review = require('../models/Review.model.js');
const User = require('../models/User.model.js');

// GET Route to display all the Food and Drink Spots in the Database
router.get('/fooddrinkSpots', async (req, res) => {
  try {
    // Get all Food and Drink Spots from our Database via .find() method
    let fooddrinkSpotsFromDB = await Leisure.find();
    res.render('categories/fooddrinkSpots/fooddrink.list.hbs', {
      fooddrinkSpots: fooddrinkSpotsFromDB,
    });
  } catch (error) {
    console.log('Error while getting Food and Drink Spots', error);
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
