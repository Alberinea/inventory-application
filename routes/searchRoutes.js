import express from 'express';
import { searchGetController } from '../controllers/search.js';

const searchRouter = express.Router();

searchRouter.get('/search', searchGetController);

export default searchRouter;
