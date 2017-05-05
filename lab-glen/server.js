'use strict';

//module dependencies
const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const bodyParser = require('body-parser').json();
const errorWare = require('./lib/error-middleware.js');

//server shit
const app = module.exports = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/weapon-env';

//mongo shit
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//routes
require('./route/weapon-routes')(router);
require('./route/blueprint-routes')(router);

//middleware / plugins
app.use(bodyParser);
app.use(errorWare);
app.use(router);

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
