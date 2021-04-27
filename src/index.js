import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import errorHandler from  '../middleware/errorHandler';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Init app
const app = express();

// Middlewares
// Entry middlewares
app.use(express.json());
app.use(morgan('tiny'))
// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true
// }))
app.use(cookieParser())

// App routes

import auth from './api/components/auth/routes';
import dataTables from './api/components/dataTables/routes';
import inquiries from './api/components/inquiries/routes';
import libraries from './api/components/library/routes';
import serverData from './api/components/serverData/routes';
import questions from './api/components/questions/routes';
import comments from './api/components/comments/routes'
import userdata from '../routes/api/user-data';
import steps from '../routes/api/steps';
import announcements from './api/components/announcements/announcements/routes'
import ancGroups from './api/components/announcements/groups/routes'
import viewIndex from './views/index'


app.use('/api/auth', auth);
app.use('/api/datatables', dataTables)
app.use('/api/inquiries', inquiries)
app.use('/api/libraries', libraries)
app.use('/api/serverdata', serverData)
app.use('/api/userdata', userdata);
app.use('/api/questions', questions);
app.use('/api/steps', steps);
app.use('/api/comments', comments);
app.use('/api/announcements', announcements)
app.use('/api/announcements/groups', ancGroups)

app.set('view engine', 'hjs')
app.set('views', path.join(__dirname, 'views'))
app.engine('hjs', require('hogan-express'))
app.use('/', viewIndex)

// Exit middlewares
app.use(errorHandler);


// Create connection
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

// Database config
const db = config.get('mongoURI');


// Connect to MongoDB
mongoose
    .connect(db, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true,
        useFindAndModify: false 
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));




