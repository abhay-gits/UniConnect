import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import confessions from './routes/confessions.route.js';
import notices from './routes/notices.route.js';
import admin from './routes/admin.route.js';
import messages from './routes/messages.js';
import { connectDatabase } from './database/connect.database.js';
import initializeSocket from './socket.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

/* MiddleWares */
app.use(cors());
app.use(bodyParser.json());

/* Routes */
app.use('/api/confessions', confessions);
app.use('/api/notices', notices);
app.use('/api/messages', messages);
app.use('/admin', admin);

// Initialize Socket.IO
initializeSocket(io);

/* PORT Listening */
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    connectDatabase();
    console.log(`Server is running on PORT ${PORT}`);
});
