import Movie from '../models/movie.js';

export const indexGetController = async (req, res) => {
  try {
    const popularMovies = await Movie.find({
      type: 'movie',
      'imdb.rating': { $gt: 0 },
      year: { $gt: 2010 },
      poster: { $exists: true },
    })
      .sort({ 'awards.wins': -1 })
      .limit(6)
      .lean();
    const newestMovies = await Movie.find({
      type: 'movie',
      'imdb.rating': { $gt: 0 },
      poster: { $exists: true },
    })
      .sort({ released: -1 })
      .limit(6)
      .lean();
    res.status(200).render('index', { popularMovies, newestMovies });
  } catch (err) {
    console.log(err);
  }
};
