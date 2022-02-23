const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name : {
    type: String,
    require: true
  },
  information: {
    type: String
  },
  photo: {
    type: String
  }
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;