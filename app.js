const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const feedRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use('/feed', feedRoutes);

app.listen(PORT);
