// Require Mongoose
const mongoose = require('mongoose');

// Require Leisure Model
const Leisure = require('../models/Leisure.model.js');

const MONGO_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://ritasaraiva:WmfU7os0He3f2X0c@cluster0.su6yose.mongodb.net/?retryWrites=true&w=majority';

const leisureSpots = [
  {
    name: 'Minigolf Lisbon',
    address: 'Calçada Ferragial 8, 1200-484 Lisboa',
    description: 'xx',
    spotUrl: 'minigolflisbon.com',
    imgUrl: 'xx',
    schedule: 'xx',
  },
];

async function insertLeisure() {
  try {
    // establishing the connection with our DB
    let db = await mongoose.connect(MONGO_URI);

    // Feedback regarding our connection
    console.log('Database is now connected');

    // Create Leisure Spots in our database with the seeds array
    let LeisureCreated = await Leisure.create(leisureSpots);

    // Feedback about Leisure Spots creation
    console.log(`Created ${LeisureCreated.length} Leisure Spots!`);

    // Close the connection
    await mongoose.connection.close();
  } catch (error) {
    console.log('An error occurred while connecting to DB', error);
  }
}
insertLeisure();
