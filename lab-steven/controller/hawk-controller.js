'use strict';

const mongoose = require('mongoose');
const Promise = require('bluebird');
const createError = require('http-errors');
const Seahawk = require('../model/seahawk');

module.exports = exports = {};

exports.createHawk = function(hawk){
  if(!hawk) return Promise.reject(createError(400, 'hawk required'));
  return new Seahawk(hawk).save()
  .then(data => Promise.resolve(data))
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.readHawk = function(id){
  if(!id) return Promise.reject(createError(400, 'id required'));
  return Seahawk.find(id)
  .then(data => Promise.resolve(data))
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.updateHawk = function(id, hawkUp){
  if(!id) return Promise.reject(createError(400, 'id required'));
  if(!hawkUp) return Promise.reject(createError(400, 'hawk updates required'));
  return Seahawk.update(id, hawkUp)
  .then(data => Promise.resolve(data))
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.deleteHawk = function(id){
  if (!id) return Promise.reject(createError(400, 'id required'));
  return Seahawk.remove(id)
  .then(data => Promise.resolve(data))
  .catch(err => Promise.reject(createError(500, err.message)));
};
