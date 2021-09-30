import express from 'express';
import { genreGetController } from '../controllers/genre.js';

const genreRouter = express.Router();

genreRouter.get('/genre/:genre/', (req, res) => {
  const genre = req.params.genre;
  res.redirect(`/genre/${genre}/1`);
});

genreRouter.get('/genre/:genre/:page', genreGetController);

export default genreRouter;
