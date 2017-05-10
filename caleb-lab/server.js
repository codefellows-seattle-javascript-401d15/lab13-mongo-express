'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const bodyParser = require('body-parser').json();
// const noteRoutes = require('./routes/note-routes.js');

const app = module.exports = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;

//veslan:15e4tkmhkeih@
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/person-env';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

require('./routes/person-routes.js')(router);

app.use(bodyParser);
app.use(router);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
