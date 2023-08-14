// Require Mongoose
const mongoose = require('mongoose');

// Require Fooddrink Model
const Fooddrink = require('../models/Fooddrink.model.js');

const MONGO_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://ritasaraiva:WmfU7os0He3f2X0c@cluster0.su6yose.mongodb.net/?retryWrites=true&w=majority';

const fooddrinkSpots = [
  {
    name: 'O Cofre',
    address: 'R. dos Bacalhoeiros 2, 1100-069 Lisboa',
    description: 'xx',
    spotUrl: 'http://ocofre.eatbu.com/',
    imgUrl: 'xx',
    schedule: 'xx',
  },
];

async function insertFooddrink() {
  try {
    // establishing the connection with our DB
    let db = await mongoose.connect(MONGO_URI);

    // Feedback regarding our connection
    console.log('Database is now connected');

    // Create Food and Drinks Spots in our database with the seeds array
    let FooddrinkCreated = await Fooddrink.create(fooddrinkSpots);

    // Feedback about Food and Drink Spots creation
    console.log(`Created ${FooddrinkCreated.length} Fooddrink Spots!`);

    // Close the connection
    await mongoose.connection.close();
  } catch (error) {
    console.log('An error occurred while connecting to DB', error);
  }
}
insertFooddrink();
