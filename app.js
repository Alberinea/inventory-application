import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import mongoose from 'mongoose';
import indexRouter from './routes/indexRoutes.js';
import titleRouter from './routes/titleRoutes.js';
import searchRouter from './routes/searchRoutes.js';
import passwordRouter from './routes/passwordRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');

mongoose
  .connect(
    `mongodb+srv://${process.env.URI_USERNAME}:${process.env.URI_PASSWORD}@cluster0.4gvsm.mongodb.net/sample_mflix?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(app.listen(port, () => console.log(`listening on port ${port}`)))
  .catch((err) => {
    console.log(err);
  });

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use([indexRouter, titleRouter, searchRouter, passwordRouter]);

app.use((req, res) => {
  res.status(404).render('404');
});

// TODO Add search function and nav
// TODO Add CRUD
