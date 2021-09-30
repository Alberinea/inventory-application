import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  imdb: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  released: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  genres: {
    type: Array,
    required: true,
  },
});

const Movie = mongoose.model('movies', movieSchema);

export default Movie;
