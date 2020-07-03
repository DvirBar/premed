const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const auth = require('./routes/api/auth')


// Init app
const app = express();

// Middlewares
// Entry middlewares
app.use(express.json());
app.use (cors());

// App routes
app.use('/api/auth', auth)

// Exit middlewares
app.use(errorHandler);


// Create connection
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

// Database config
const db = config.get('mongoURI');

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

mongoose.set('useCreateIndex', true)