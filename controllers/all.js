import MoviePreview from '../models/indexModels.js';

export const allGetController = (req, res) => {
  const limit = 20;
  const page = Math.max(0, req.params.page);

  MoviePreview.find()
    .limit(limit)
    .skip(limit * page)
    .then((movies) => {
      res.status(200).render('all', { movies });
    })
    .catch((err) => console.log(err));
};
