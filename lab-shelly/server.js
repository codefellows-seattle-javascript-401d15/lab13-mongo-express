'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const morgan = require('morgan');
const jsonParser = require('body-parser').json();

const app = module.exports = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/cat-env';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

require('./routes/cat-routes')(router);

app.use(jsonParser);
app.use(morgan('dev'));
app.use(router);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
// module.exports = app;
