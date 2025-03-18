import express from 'express';
import Message from '../database/models/Message.js';

const router = express.Router();

// Get all messages
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find()
            .sort({ timestamp: -1 })
            .limit(100); 
        res.json(messages.reverse()); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router; 