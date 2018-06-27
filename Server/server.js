/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */

// Modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');
const data = require('../src/assets/data');
const ObjectID = require('mongodb').ObjectID;


// Config
const config = require('./config');

/*
 |--------------------------------------
 | MongoDB
 |--------------------------------------
 */

mongoose.connect(config.MONGO_URI);
const monDb = mongoose.connection;

monDb.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that', config.MONGO_URI, 'is running.');
});

monDb.once('open', function callback() {
  console.info('Connected to MongoDB:', config.MONGO_URI);
});

let movieModel = require('./movie.model');
let movies = mongoose.model('movies',movieModel);



/*
 |--------------------------------------
 | App
 |--------------------------------------
 */

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());

// Set port
const port = process.env.PORT || '8083';
app.set('port', port);

// Set static path to Angular app in dist
// Don't run in dev
if (process.env.NODE_ENV !== 'dev') {
  app.use('/', express.static(path.join(__dirname, '../dist/movie-theatre')));
}

/*
 |--------------------------------------
 | Routes
 |--------------------------------------
 */

require('./movie.model');
const Movie = mongoose.model('movies');

// GET API root
app.get('/api/', (req, res) => {
  res.send('API works');
});

app.get('/api/data',(req, res) => {
  movies.find().then((movies) => {
    console.log(movies);
    res.send(movies);
  })
});

app.post('/api/data',(req,res) => {
  let d = data;
  // d.forEach((item) => {
    let movie = new movies({
      name: data.name,
      desc: data.desc,
      short_desc: data.short_desc,
      author: data.author,
      year: data.year,
      actors: data.actors,
      poster: data.poster,
      video_Url: data.video_Url,
      _id: new ObjectID()
    });
    movie.save().then(()=> {
      res.send(200);
    });
  // });
});


// Pass routing to Angular app
// Don't run in dev
if (process.env.NODE_ENV !== 'dev') {
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/movie-theatre/index.html'));
  });
}

/*
 |--------------------------------------
 | Server
 |--------------------------------------
 */

app.listen(port, () => console.log(`Server running on localhost:${port}`));
