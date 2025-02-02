import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

import confessions from './routes/confessions.route.js';
import notices from './routes/notices.route.js'
import admin from './routes/admin.route.js';
import { protect } from './protected/protected.js';
import { connectDatabase } from './database/connect.database.js';

const app = express();  
const PORT = 3000;

/* MiddleWares */
app.use(cors())
app.use(bodyParser.json());

/* Routes */
//User Route
app.use('/api/confessions', confessions)
app.use('/api/notices', notices)
//Admin Route
app.use('/admin',protect, admin)

/* PORT Listening */
app.listen(PORT, () => { 
    connectDatabase();   
  console.log(`Server is running on PORT ${PORT}`);
});
