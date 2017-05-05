'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const Lure = require('../model/lure');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports = exports = {};


exports.createItem = function(lure) {
  if(!lure) return Promise.reject(createError(400, 'Bad request'));

  return Lure(lure).save();
};

exports.fetchItem = function(id) {
  if (!id) return Promise.reject(createError(400, 'id is required'));

  return Lure.findById(id);
};

exports.fetchItems = function() {
  return Lure.find({});
};

exports.updateItem = function(id, lure) {
  if (!id || !lure) return Promise.reject(createError(400, 'bad request'));
};

exports.deleteItem = function(id) {
  if (!id) return Promise.reject(createError(400, 'bad request, id required'));

  return Lure.findByIdAndRemove(id);
};
