import mongoose from 'mongoose';
import Movie from '../models/movie.js';
import Comment from '../models/comment.js';
import moment from 'moment';

const ObjectId = mongoose.Types.ObjectId;

export const titleGetController = async (req, res) => {
  const movie_id = req.params.id;

  try {
    const movie = await Movie.findById(movie_id).lean();
    const comments = await Comment.find({
      movie_id: new ObjectId(movie_id),
    })
      .sort({ date: -1 })
      .lean();
    res.status(200).render('title', {
      movie,
      comments,
      movie_id,
      moment,
    });
  } catch (err) {
    console.log(err);
  }
};

export const titlePostController = async (req, res) => {
  const comment = {
    name: req.body.name === '' ? 'Anonymous' : req.body.name,
    text: req.body.text,
    movie_id: new ObjectId(req.body.movie_id),
    date: new Date(),
  };

  const newComment = new Comment(comment);

  try {
    await newComment.save();
    res.redirect(`/title/${req.body.movie_id}`);
  } catch (err) {
    console.log(err);
  }
};

export const titleDeleteController = async (req, res) => {
  if (req.query.password !== process.env.PASSWORD) {
    res.json('Invalid Password');
    console.log(req.query.movie_id);
  } else {
    try {
      if (!req.query.movie_id) {
        await Movie.findByIdAndDelete(req.query.id);
        res.json('The movie was successfully deleted');
      } else {
        await Comment.findByIdAndDelete(req.query.id);
        res.json('The comment was successfully deleted');
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export const titlePutController = async (req, res) => {
  try {
    await Movie.findByIdAndUpdate(req.query.id, {
      title: req.query.title,
      year: req.query.year,
      rated: req.query.rated,
      runtime: req.query.runtime,
      directors: req.query.directors,
      writers: req.query.writers,
      casts: req.query.casts,
      plot: req.query.plot,
    });
  } catch (err) {
    console.log(err);
  }
};
