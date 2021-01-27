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
import auth from '../routes/api/auth';
import paths from '../routes/api/paths';
import anouncements from '../routes/api/anouncements';
import ancgroups from '../routes/api/anc-groups';
import sections from '../routes/api/sections';
import steps from '../routes/api/steps';
import pages from '../routes/api/pages';
import topics from '../routes/api/topics';
// import datagroups from '../routes/api/data-groups';
// import datafields from '../routes/api/data-fields';
import universities from '../routes/api/universities';
// import calculations from '../routes/api/calculations';
import userdata from '../routes/api/user-data';
import datatables from '../routes/api/data-tables';
import questgroups from '../routes/api/question-groups';
import inquiries from '../routes/api/inquiries';
import serverdata from '../routes/api/server-data';

app.use('/api/auth', auth);
app.use('/api/paths', paths);
app.use('/api/anouncements', anouncements);
app.use('/api/ancgroups', ancgroups);
app.use('/api/sections', sections);
app.use('/api/steps', steps);
app.use('/api/pages', pages);
app.use('/api/topics', topics);
// app.use('/api/datagroups', datagroups);
// app.use('/api/datafields', datafields);
app.use('/api/universities', universities);
// app.use('/api/calculations', calculations);
app.use('/api/userdata', userdata);
app.use('/api/datatables', datatables);
app.use('/api/questgroups', questgroups);
app.use('/api/inquiries', inquiries);
app.use('/api/serverdata', serverdata);

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
        useCreateIndex: true 
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));




