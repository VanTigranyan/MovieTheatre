const mongoose = require('mongoose');
const schema = mongoose.Schema;

const MovieSchema = new schema({
  id: Number,
  name: String,
  short_desc: String,
  desc: String,
  author: String,
  year: Number,
  actors: String,
  poster: String,
  video_Url: String
});

module.exports = {
  MovieSchema
}

