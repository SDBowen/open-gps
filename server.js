const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Routes
const users = require('./routes/users');
const settings = require('./routes/settings');
const reports = require('./routes/reports');

const app = express();

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/config').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('hello'));

// Use routes
app.use('/users', users);
app.use('/settings', settings);
app.use('/reports', reports);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
