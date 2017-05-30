'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const Cat = require('../model/cat');

module.exports = exports = {};

exports.createItem = function(item) {
  if(!item) return Promise.reject(createError(400, 'item required'));
  return new Cat(item).save();
};

exports.fetchItem = function(id){
  if(!id) return Promise.reject(createError(400, 'id required'));
  return Cat.findById(id);
};

exports.fetchAll = function() {
  return Cat.find();
};

exports.deleteItem = function(id) {
  if(!id) return Promise.reject(createError(400, 'id required'));
  return Cat.findByIdAndRemove(id);
};

exports.updateItem = function(id, item) {
  if(!id) return Promise.reject(createError(400, 'id required'));
  if(!item) return Promise.reject(createError(400, 'name and mood required'));

  return Cat.findByIdAndUpdate(id, {name: item.name, mood: item.mood}, {new: true});
};
