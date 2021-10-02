import express from 'express';

const passwordRouter = express.Router();

passwordRouter.get('/password', (req, res) => {
  res.status(200).render('password', { movie_id: req.query.movie_id, doc: req.query.doc, id: req.query.id });
});

export default passwordRouter;
