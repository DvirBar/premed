import "core-js/stable";
import "regenerator-runtime/runtime";

import express from 'express';
import mongoose from 'mongoose';
import errorHandler from  '../middleware/errorHandler';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';;

const helmet = require('helmet')

// Init app
const app = express();

app.use(helmet())
app.use(helmet.hidePoweredBy())

// Environment variables
dotenv.config({
    path: path.resolve("env",`.env.${process.env.NODE_ENV}`)
})

if(process.env.NODE_ENV === 'production') {
    app.use(/^(?!\/api\/).+/ ,express.static('../client/build/index.html'))
} 

// Middlewares
// Entry middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser());

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
app.use('/api/service', viewIndex)




// Exit middlewares
app.use(errorHandler);

console.log(process.env.NODE_ENV);

// Create connection
const port = process.env.PORT;
app.listen(port, () => console.log(`Server started on port ${port}`));

const {
    MONGO_URI,
    // DB_NAME,
    // DB_USER,
    // DB_PASS,
    // DB_PORT,
    // DB_SERVICE
} = process.env

// Database config
const db = MONGO_URI;   
// `mongodb://${DB_USER}:${DB_PASS}@${DB_SERVICE}:${DB_PORT}/${DB_NAME}?authSource=admin` 
console.log(process.env.NODE_ENV);

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







