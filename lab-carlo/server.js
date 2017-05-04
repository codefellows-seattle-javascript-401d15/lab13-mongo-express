'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const bodyParser = require('body-parser').json();
//const carRoutes = require('./routes/car-routes');

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/cars-env'; //mongo protocol

mongoose.Promise = Promise; //allows for .then and .catch instead of callbacks
mongoose.connect(MONGODB_URI);

require('./routes/car-routes')(router);

app.use(bodyParser);
app.use(router);

app.listen(PORT,() => console.log(`Listening on PORT ${PORT}`));

//mongo shell commands
//show dbs
//use notes-dev
//db.notes.find()
//db. tab tab
//db.notes.drop
