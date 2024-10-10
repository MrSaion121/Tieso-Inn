import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import router from './routes';

const app = express();
const port = process.env.PORT || 3000;

const dbUrl = process.env.DB_URL;
//console.log(`Mongo URL: ${dbUrl}`);

app.use(express.json());
app.use(router);

mongoose.connect(dbUrl as string)
.then(res => {
    console.log('Connected succesfully!')
    app.listen(port, () => {
        console.log(`App is running in port ${port}`)
    });
}).catch(err => {
    console.log("Error");
});
