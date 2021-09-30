import Movie from '../models/movie.js';

export const genreGetController = async (req, res) => {
  const genre = req.params.genre;
  const page = Math.abs(req.params.page);
  const limit = 20;
  const skip = (page - 1) * limit;
  try {
    const movies = await Movie.find({
      genres: genre,
      type: 'movie',
      'imdb.rating': { $gt: 0 },
      poster: { $exists: true },
    })
      .sort({ 'awards.wins': -1 })
      .limit(limit)
      .skip(skip)
      .lean();
    const count = await Movie.find({
      genres: genre,
      type: 'movie',
      'imdb.rating': { $gt: 0 },
      poster: { $exists: true },
    }).countDocuments();
    movies.length === 0
      ? res.status(404).render('404')
      : res.status(200).render('genre', { movies, genre, count, page, limit });
  } catch (err) {
    console.log(err);
  }
};
