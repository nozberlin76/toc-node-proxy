const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const feedRoutes = require('./routes');

const https = require('https');
const http = require('http');
const fs = require('fs');

/*const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/orderapi.prod.tastesofchicago.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/orderapi.prod.tastesofchicago.com/fullchain.pem')
};*/

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

//app.use(cors());

app.use('/feed', feedRoutes);
// app.use('/.well-known', feedRoutes);

//app.listen(PORT);

app.listen(PORT, () => {
  console.info(`server started on port ${PORT}`);
});

// http.createServer(app).listen(80);
// Create an HTTPS service identical to the HTTP service.
// https.createServer(options, app).listen(443);