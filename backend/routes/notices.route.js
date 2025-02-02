import express from 'express'

import { getNotices } from '../controllers/notices.controller.js';
import { postNotices } from '../controllers/notices.controller.js';

const router = express.Router();

router.get('/',getNotices)
router.post('/',postNotices)

export default router