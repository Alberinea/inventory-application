import mongoose from 'mongoose';
import Movie from '../models/movie.js';
import Comment from '../models/comment.js';

export const titleGetController = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  try {
    const movie = await Movie.findById(req.params.id).lean();
    const comments = await Comment.find({
      movie_id: new ObjectId(req.params.id),
    })
      .sort({ date: -1 })
      .lean();
    res.status(200).render('title', { movie, comments });
    console.log(movie)
  } catch (err) {
    console.log(err);
  }
};
