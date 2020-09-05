const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const errorLogger = require('./middleware/errorLogger');

// Init app
const app = express();

// Middlewares
// Entry middlewares
app.use(express.json());
app.use (cors());

// App routes
const auth = require('./routes/api/auth');
const paths = require('./routes/api/paths');
const anouncements = require('./routes/api/anouncements');
const ancgroups = require('./routes/api/anc-groups');
const sections = require('./routes/api/sections');
const steps = require('./routes/api/steps');
const pages = require('./routes/api/pages');
const topics = require('./routes/api/topics');
const datagroups = require('./routes/api/data-groups');
const datafields = require('./routes/api/data-fields');
const univeristies = require('./routes/api/universities');
const calculations = require('./routes/api/calculations');

app.use('/api/auth', auth);
app.use('/api/paths', paths);
app.use('/api/anouncements', anouncements);
app.use('/api/ancgroups', ancgroups);
app.use('/api/sections', sections);
app.use('/api/steps', steps);
app.use('/api/pages', pages);
app.use('/api/topics', topics);
app.use('/api/datagroups', datagroups);
app.use('/api/datafields', datafields);
app.use('/api/universities', univeristies);
app.use('/api/calculations', calculations);

// Exit middlewares
app.use(errorHandler);
app.use(errorLogger);


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
