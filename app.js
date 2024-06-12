require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 6083;
const HOST = process.env.HOST || "127.0.0.1";
const DB_URL = process.env.DB_URL || 'mongodb://0.0.0.0:27017/students';

let app = express();
const studentsRouter = require('./routes/index');

// Connect to MongoDB
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
    });

const db = mongoose.connection;

// Handle connection error
db.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
});

app.use(express.json());

app.use('/students', studentsRouter);

// Default route for root URL
app.get('/', (req, res) => {
    res.send('Ready to perform Crud!');
});
  
// Error handling for uncaught exceptions
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});
