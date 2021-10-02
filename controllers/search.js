import Movie from '../models/movie.js';

export const searchGetController = async (req, res, next) => {
  const query = Object.values(req.query)[0] || 'All Movies';
  const queryKeys = Object.keys(req.query)[0];
  const queryArray = ['genres', 'title'];

  if (
    queryKeys?.length > 0 &&
    !queryArray?.some((arg) => arg === queryKeys)
  ) {
    res.redirect('/');
  } else {
    const params = {
      type: 'movie',
      'imdb.rating': { $gt: 0 },
      poster: { $exists: true },
    };
    const page = Math.abs(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    if (req.query.genres) {
      params.genres = { $regex: `^${req.query.genres}$`, $options: 'i' };
    } else if (req.query.title) {
      params.title = { $regex: new RegExp(req.query.title, 'i') };
    }

    try {
      const movies = await Movie.find(params)
        .sort({ 'awards.wins': -1 })
        .limit(limit)
        .skip(skip)
        .lean();
      const count = await Movie.find(params).countDocuments();
      movies.length === 0
        ? res.status(404).render('404')
        : res.status(200).render('search', {
            movies,
            query,
            queryKeys,
            count,
            page,
            limit,
          });
    } catch (err) {
      console.log(err);
    }
  }
};
