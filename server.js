require('dotenv').config();
const express = require('express');
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');

const homeApi = require('./routes/api.js');
const threadsApi = require('./routes/threadsApi.js');
const repliesApi = require('./routes/repliesApi.js');

const app = express();

// Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT;

// METHOD + PATH LOGGER

app.use((req, res, next) => {
    console.log(`${req.method} @ ${req.path}`);
    next();
})

// Mounting APIs
app.use('/', homeApi);
app.use('/api/threads', threadsApi);
app.use('/api/replies', repliesApi);

// Connectiong MongoDB
const db = process.env.db;
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected successfully...'))
    .catch(err => console.log(err)); 

// 404 Middleware
app.use((req, res, next) => {
    res
        .status(404)
        .type('text')
        .send('Not found');
});


app.listen(port || 3000, () => {
    console.log(`Server listening on port ${port}`);
})