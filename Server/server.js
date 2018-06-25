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
    res.send(movies);
  })
});

app.post('api/data',(req,res) => {
  let d = JSON.parse(data);
  d.forEach((item) => {
    let movie = new movies({
      name: item.name,
      desc: item.desc,
      id: item.id,
      short_desc: item.short_desc,
      author: item.author,
      year: item.year,
      actors: item.actors,
      poster: item.poster,
      video_Url: item.video_Url
    });
    movie.save();
  })
  res.send(movies)
})


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
