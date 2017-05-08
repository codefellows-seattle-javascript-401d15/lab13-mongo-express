'use strict';

const express = require('express');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const morgan = require('morgan');
const jsonParser = require('body-parser').json();

const PORT = process.env.PORT || 3000;
const app = module.exports = express();
const router = express.Router();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/dbhawk';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

require('./routes/routes.js')(router);
app.use(jsonParser);
app.use(morgan('dev'));

app.use(router);

app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));

// module.exports = app;
