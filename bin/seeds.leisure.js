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
    miniDescription: 'The Unique Minigolf Experience in the heart of Lisbon',
    description: `Situated in one of Lisbon’s historic buildings on the Calçada do Ferragial 8, this Minigolf experience has been specially designed for challenge and adventure with every putter in mind, whether you are a novice or a pro.
    Set amongst original features and amazing local artwork, you can start with a natural light course and then straight to the UV Neon light 9 holes that will add the element of competition to even the best minigolfer! 
    `,
    spotUrl: 'https://minigolflisbon.com/',
    imgUrl: './images/mini-golf-lisbon.jpeg',
    schedule: 'Every Day: 12:00 - 23:00',
  },
  {
    name: 'Rent a Fun - Electric bike tours',
    address: 'Praça do Comércio, 1100-104 Lisboa',
    miniDescription: 'xx',
    description: `xx`,
    spotUrl: 'https://www.rent-a-fun.com/',
    imgUrl: './images/rent-a-fun.jpg',
    schedule: '12:00 - 23:00',
  },
  {
    name: 'Escape Hunt Lisbon',
    address: 'R. dos Douradores 13, 1100-206 Lisboa',
    miniDescription:
      'Exciting experiences where you and your team will jump into a series of new worlds, completing innovative missions. Work together to find clues, solve puzzles, and accomplish challenges before time runs out.',
    description: `Escape Hunt noun Def: The name given to an adventure packed with excitement where you and your teammates leap into new worlds, taking on pulse-racing missions and challenges in an incredible entertainment experience against the clock.
    The pressure’s on, the clock’s ticking, the adrenaline’s pumping. Escape Hunt isn’t something you watch, it’s something you experience from the heart of the action. Once you’ve enjoyed an Escape Hunt world, all other entertainment falls flat.
    How did all this awesomeness come about? Escape Hunt began life in 2013 when they opened their first branch in Bangkok. Inspired by great online computer games such as Myst and Crimson Room,they created something utterly different but equally compelling. As a world leading investor in Researching and Developing advanced technology in this emerging sector, Escape Hunt continually strives to push the boundaries of scientific and technological advances, to offer cutting edge gaming experiences. The result is a truly immersive gaming experience where Escape Hunters are transported to another era to solve a mind-twisting mystery created by Escape Hunt Studios.
    `,
    spotUrl: 'https://escapehunt.com/pt/lisbon/',
    imgUrl: './images/escape-hunt.jpg',
    schedule: '10:00 - 20:00',
  },
  {
    name: 'Terra Heal Massage',
    address: 'R. da Madalena 219, 1100-321 Lisboa',
    miniDescription:
      'Terra Heal is a project created to help people achieve better health at all levels.',
    description: `Terra Heal is a project created to help people achieve better health at all levels. It is a concept of massages & holistic therapies based in Lisbon, designed on the principle that self-care is a necessity, not a luxury, and crafted to serve as an oasis for today's digital society.The goal is to offer high-quality massages and holistic therapies at affordable prices in a welcoming environment.

    Their therapeutic and spiritual work is personalized because each client has different needs at each level of their life. They don’t work with protocols; instead, they aim to be sensitive and guide the client towards their balance.`,
    spotUrl: 'https://www.terraheal.com/centro-massagem-lisboa.html',
    imgUrl: './images/terra-heal.jpg',
    schedule: '10:00 - 22:00',
  },
  {
    name: 'EcoMassage & Esthetics',
    address:
      'Rua Aurea, N° 260, 1100-062 Lisbon & Rua dos Fanqueiros, Nº 110,1100-404 Lisbon',
    miniDescription:
      'Feel special, Health and Wellness, a center created for you',
    description: `xx`,
    spotUrl: 'https://www.ecomassage.com/',
    imgUrl: './images/eco-massage.jpg',
    schedule: '10:00 - 22:00',
  },
  {
    name: `Taylor's Port - Wine Shop & Tasting Room`,
    address: 'R. Cais de Santarém 8, 1100-104 Lisbon',
    miniDescription: `xx`,
    description: `Located in a prestigious area within the historic district of Alfama, next to Chafariz del Rei, the first ever public fountain in Lisbon dating back to 1487, Taylor’s Port wine shop and tasting room showcases a wide range of our Ports and is the first of its kind in Lisbon.
    This recently opened space includes a shop on the ground floor and three tasting rooms on the first floor. There are 15 wines available to try in the tasting room, starting at 5 euros.
    Among these are icons such as Taylor’s Vintage 1994 (33€) or Taylor’s Quinta de Vargellas Vintage 2015 (11€). For those who wish to broaden their knowledge, we suggest the ‘Introduction to Taylor’s”, a tasting of 5 wines which define the profile and style of our Port wines: Taylor’s Chip Dry, Taylor’s LBV, Taylor’s 20 Year Old Tawny Port, Taylor’s Quinta de Vargellas Vintage 2015 and Taylor’s Vintage 2007.
    Besides Port, you can also try our award winning olive oil, produced  at our flagship property, Quinta de Vargellas, served with bread (8€). Appetisers include a selection of Portuguese cheeses (15€), Portuguese cured hams (14€) and traditional grilled almonds (4.5 €). Among the sweet pairings, one can try dark chocolate truffles (5€) or the famous Portuguese custard pastry (1,5€), and during the Summer months why not try a signature Port cocktail, Taylor’s Chip Dry and Tonic (6€).`,
    spotUrl: 'https://www.taylor.pt/en/visit-taylors/port-cellars',
    imgUrl: './images/taylor-port.jpg',
    schedule: '11:00 - 19:00',
  },
  {
    name: 'Santa Luzia Viewpoint',
    address: 'Largo de Santa Luzia, 1100-487 Lisboa',
    miniDescription:
      'A captivating Lisbon viewpoint in Alfama, adorned with intricate azulejos, offering panoramic views of the city, Tagus River, and history-rich landscapes.',
    description: `The Miradouro de Santa Luzia is a historic viewpoint in Lisbon's Alfama district, named after the nearby Church of Santa Luzia. It features decorative tile panels depicting Lisbon's history, from its Moorish and Roman roots to its maritime heritage. The viewpoint offers panoramic views of the city and the Tagus River and is a popular spot for locals and tourists. Located in the charming Alfama district, it provides a glimpse into Lisbon's past and cultural heritage while offering a serene and artistic atmosphere.
    `,
    spotUrl: 'https://www.ecomassage.com/',
    imgUrl: './images/santa-luzia-miradouro.jpg',
    schedule: '00:00 - 24:00',
  },
  {
    name: 'Chiado Training Club',
    address: 'Rua Vitor Cordon, 43, 1200-483 Lisboa',
    miniDescription: 'xx',
    description: `Chiado Training Club is a training studio and an urban, private and elegant refuge, where students can train with a team of highly qualified trainers, who develop training programs focused on individual goals.`,
    spotUrl: 'http://www.chiadotrainingclub.com/',
    imgUrl: './images/chiado-training-club.jpg',
    schedule: '07:00 - 21:00',
  },
  {
    name: 'Barbearia Campos',
    address: 'Largo do Chiado 4, 1200-108 Lisboa',
    miniDescription:
      'With 137 years of history and tradition in the heart of Chiado, find an incredible experience that goes beyond a good cut',
    description: `Barbearia Campos was founded in 1886 by José Augusto Campos and was initially installed on Avenida da Liberdade, before moving to its current address, in Largo do Chiado. Today, the barber shop is run by the third generation of the family.

    This barbershop has already appeared in different publications and received clients such as Almada Negreiros, Fernando Pessoa and Artur Agostinho.
    
    The decor is typical of the late 19th and early 20th centuries. During the first months of 2016, Barbearia Campos will be installed in Rua do Loreto, in Chiado, while the permanent space, in Largo do Chiado, is being refurbished.`,
    spotUrl: 'https://lojascomhistoria.pt/lojas/barbearia-campos',
    imgUrl: './images/barbearia-campos.jpg',
    schedule: '10:00 – 14:00 / 16:00 – 19:00',
  },
  {
    name: 'Bike Bar Tours',
    address: 'Belém and Cais do Sodré.',
    miniDescription:
      'If you want to take bike bar for a ride you just have to book your tour and bring your friends at the combined time.',
    description: `Almost like a human centipede. Bike Bar Tour’s vehicle, which has been offering tours along the river since late 2013, can hold up to 17 people, but only 10 will need to pedal to make it move. The others? Well, the others drink. The bike is ideal for stag dos or birthday parties: there’s unlimited beer, sangria and rosé for the whole hour of the tour (for kids’ parties they have sodas, too). You can also bring your own music on a USB stick to play on the ride. The experience takes place nearby MAAT museum.
    5 reason to take the bar for a walk:
    Nobody needs an excuses to have fun, but you gave you some arguments to take the bar for a walk:

    - You are visiting Lisbon and you would like to do something more radical then staying in line for Belém pastries
    - You want to have some drinks with you friends without having to stay on the same place.
    - You need to organize a office meeting outdoors before the “storm” damage’s the “brains”
    - You are looking for a hen or bachelor party with drinks and irreverence, running away from the usual strippers (our staff usually does not take off their clothes, unless it is too hot and nobody minds that they expose their greek gods' bodies)
    - Or simply because you are intelligent and know P-E-R-F-E-C-T-L-Y that life is to be lived with friends and some beauties of life must be appreciated all year, like the amazing sunset we can see from rio Tejo!`,
    spotUrl: 'https://www.bikebartours.pt/en/home/',
    imgUrl: '/images/tours.jpg',
    schedule: 'Every day',
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
