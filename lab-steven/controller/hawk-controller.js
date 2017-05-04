'use strict';

const mongoose = require('mongoose');
const Promise = require('bluebird');
const createError = require('http-errors');
const Seahawk = require('../model/seahawk');

module.exports = exports = {};

exports.createHawk = function(schema, hawk){
  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!hawk) return Promise.reject(createError(400, 'hawk required'));
  return new Seahawk(hawk).save()
  .then(data => Promise.resolve(data))
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.readHawk = function(schema, id){

  // .find() ?
};

exports.updateHawk = function(schema, id, hawkUp){

  // .update() ?
};

exports.deleteHawk = function(schema, id){

// .remove() ?
};
