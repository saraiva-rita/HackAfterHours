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
    description:
      'The Unique Minigolf Experience in the heart of Lisbon, has been specially designed for challenge and adventure with every putter in mind, whether you are a novice or a pro',
    spotUrl: 'www.minigolflisbon.com',
    imgUrl:
      'https://lh3.googleusercontent.com/p/AF1QipOf3v9cQeXA3gMCR9OPZ3O7XreBBi53A5Xkkri5=s1360-w1360-h1020',
    schedule: 'Every Day: 12hrs – 23hrs',
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
