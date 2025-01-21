import express from 'express';
import bodyParser from 'body-parser';

import confessions from './routes/confessions.route.js';
import admin from './routes/admin.route.js';
import { protect } from './protected/protected.js';
import { connectDatabase } from './database/connect.database.js';

const app = express();  
const PORT = 3000;

/* MiddleWares */
app.use(bodyParser.json());

/* Routes */
//User Route
app.use('/api/confessions', confessions)
//Admin Route
app.use('/admin',protect, admin)

/* PORT Listening */
app.listen(PORT, () => { 
    connectDatabase();   
  console.log(`Server is running on PORT ${PORT}`);
});
