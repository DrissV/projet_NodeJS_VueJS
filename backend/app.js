require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const path = require('path');

const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const mongoUri = `mongodb+srv://${username}:${password}@cluster0.s7xf8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(mongoUri, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/articles', articleRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;