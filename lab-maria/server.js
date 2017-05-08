'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const jsonParser = require('body-parser').json();

const app = express();
const router = express.Router();
app.use(jsonParser);
app.use(router);

const PORT = process.env.PORT || 4000;

require('./routes/note-routes')(router);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/note-env';
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


app.listen(PORT, () => console.log(`Listening on port, ${PORT}`));

module.exports = app;
