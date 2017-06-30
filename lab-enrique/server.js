'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const bodyParser = require('body-parser').json();
const errorMiddleware = require('./lib/error-middleware');


const app = module.exports = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/doge-env';

mongoose.Promise = Promise;

mongoose.connect(MONGODB_URI);

require('./routes/doge-routes')(router);
require('./routes/momma-routes')(router);

app.use(bodyParser);
app.use(router);
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
