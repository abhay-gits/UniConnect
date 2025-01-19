import express from 'express';

import { getConfessions } from '../controllers/confessions.controller.js';
import { postConfessions } from '../controllers/confessions.controller.js';

const Router = express.Router();

Router.get('/',getConfessions);
Router.post('/',postConfessions);

export default Router;