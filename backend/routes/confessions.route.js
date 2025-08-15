import express from 'express';

import { getConfessions } from '../controllers/confessions.controller.js';
import { postConfessions } from '../controllers/confessions.controller.js';

const router = express.Router();

router.get('/',getConfessions);
router.post('/',postConfessions);

export default router;