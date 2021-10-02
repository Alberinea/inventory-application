import express from 'express';
import {
  titleGetController,
  titlePostController,
  titleDeleteController,
  titlePutController,
} from '../controllers/title.js';

const titleRouter = express.Router();

titleRouter.get('/title/:id', titleGetController);

titleRouter.post('/title', titlePostController);

titleRouter.delete('/title', titleDeleteController)

titleRouter.put('/title', titlePutController);

export default titleRouter;
