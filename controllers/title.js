import Movie from '../models/movie.js';

export const titleGetController = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).lean();
    res.status(200).render('title', { movie });
  } catch (err) {
    console.log(err);
  }
};
