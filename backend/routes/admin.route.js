import express from 'express';

import { deleteAdminConfessions, getAdminConfessions, putAdminConfessions } from '../controllers/admin.controller.js';
import { deleteAdminNotice, getAdminNotice, putAdminNotice } from '../controllers/admin.controller.js';
const Router = express.Router();

Router.get('/',getAdminConfessions);
Router.put('/',putAdminConfessions);
Router.delete('/:id',deleteAdminConfessions);

Router.get('/notice',getAdminNotice);
Router.put('/notice',putAdminNotice);
Router.delete('/notice/:id',deleteAdminNotice);

export default Router;