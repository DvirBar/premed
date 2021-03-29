import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import cors from 'cors';
import errorHandler from  '../middleware/errorHandler';
import morgan from 'morgan';

// Init app
const app = express();

// Middlewares
// Entry middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'))

// App routes

// import paths from '../routes/api/paths';

// import sections from '../routes/api/sections';
// import pages from '../routes/api/pages';
// import topics from '../routes/api/topics';
// // import datagroups from '../routes/api/data-groups';
// // import datafields from '../routes/api/data-fields';
// import universities from '../routes/api/universities';
// // import calculations from '../routes/api/calculations';
// import userdata from '../routes/api/user-data';


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




