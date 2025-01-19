import express from 'express';

import { getAdminConfessions, postAdminConfessions } from '../controllers/admin.controller.js';

const Router = express.Router();

Router.get('/',getAdminConfessions);
Router.post('/',postAdminConfessions);

export default Router;