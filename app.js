import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import mongoose from 'mongoose';
import indexRouter from './routes/indexRoutes.js';
import titleRouter from './routes/titleRoutes.js';
import genreRouter from './routes/genreRoutes.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
express.urlencoded({ extended: true });

mongoose
  .connect(process.env.URI)
  .then(app.listen(port, () => console.log(`listening on port ${port}`)))
  .catch((err) => {
    console.log(err);
  });

app.use(logger('dev'));
app.use([indexRouter, titleRouter, genreRouter]);

app.use((req, res) => {
  res.status(404).render('404');
});

// TODO Add search function and nav
// TODO Add CRUD
