import express from 'express';
import { indexGetController } from '../controllers/index.js';

const indexRouter = express.Router();

indexRouter.get('/', indexGetController);

export default indexRouter;
