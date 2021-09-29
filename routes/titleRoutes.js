import express from 'express';
import { titleGetController } from '../controllers/title.js';

const titleRouter = express.Router();

titleRouter.get('/title/:id', titleGetController);

export default titleRouter;
