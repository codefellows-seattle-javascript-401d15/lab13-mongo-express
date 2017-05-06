'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const Lure = require('../model/lure');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports = exports = {};

exports.createItem = function(req) {
  if(!req) return Promise.reject(createError(400, 'Bad request'));

  return new Lure(req.body).save();
};

exports.fetchItem = function(id) {
  if (!id) return Promise.reject(createError(400, 'Bad request, id required'));

  return Lure.findById(id);
};

exports.fetchAllItems = function() {
  return Lure.find();
};

exports.updateItem = function(req, res, id, lure) {
  if (!id || !lure) return Promise.reject(createError(400, 'bad request'));

  return Lure.findByIdAndUpdate(id, lure, {new: true})
  .then(lure => {
    res.json(lure);
  })
  .catch(err => res.status(400).send(err.message));
};

exports.deleteItem = function(id, res) {
  if (!id) return Promise.reject(createError(400, 'bad request, id required'));

  return Lure.findByIdAndRemove(id)
  .then(() => {
    res.sendStatus(204);
  })
  .catch(err => res.status(404).send(err.message));
};
