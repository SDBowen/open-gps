const express = require('express');
const mongoose = require('mongoose');

// Routes
const users = require('./routes/api/users');
const devices = require('./routes/api/devices');
const reports = require('./routes/api/reports');

const app = express();

// DB Config
const db = require('./config/config').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('hello'));

// Use routes
app.use('/api/users', users);
app.use('/api/devices', devices);
app.use('/api/reports', reports);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
