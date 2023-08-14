// Require Mongoose
const mongoose = require('mongoose');

// Require Culture Model
const Culture = require('../models/Culture.model.js');

const MONGO_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://ritasaraiva:WmfU7os0He3f2X0c@cluster0.su6yose.mongodb.net/?retryWrites=true&w=majority';

const cultureSpots = [
  {
    name: 'Museu do Fado',
    address: 'Alfama, Largo do Chafariz de Dentro 1, 1100-139 Lisboa',
    description: 'xxx',
    spotUrl: 'http://www.museudofado.pt/',
    imgUrl: 'xx',
    schedule: 'xx',
  },
];

async function insertCulture() {
  try {
    // establishing the connection with our DB
    let db = await mongoose.connect(MONGO_URI);

    // Feedback regarding our connection
    console.log('Database is now connected');

    // Create Culture Spots in our database with the seeds array
    let CultureCreated = await Culture.create(cultureSpots);

    // Feedback about Culture Spots creation
    console.log(`Created ${CultureCreated.length} Culture Spots!`);

    // Close the connection
    await mongoose.connection.close();
  } catch (error) {
    console.log('An error occurred while connecting to DB', error);
  }
}
insertCulture();
